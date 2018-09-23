import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import URLForm from './URLForm';
import LoadedJSONDisplay from './LoadedJSONDisplay';
import ParsingResults from './ParsingResults';

import Container from 'react-bootstrap/lib/Container.js';
import Row from 'react-bootstrap/lib/Row.js';
import Col from 'react-bootstrap/lib/Col.js';

import axios from "axios";


class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      loadedJSON: '',
      jsonURL: '',
      parseString: '',
      results: [],
      jsonPathQuery: ''
    };

  }

  handleParseStringChange = event => {
    this.setState({
      parseString: event.target.value
    }, () => {
      this.reparseJSON();
    });
  };

  reparseJSON = () => {

    var jp = require('jsonpath');

    //Init our json Path query
    let jsonPathQuery = '';
    let someResults = [];

    if (this.state.parseString.includes(".")){
      //we are doing a chained lookup.
      //I had trouble getting this into one query, so we will perform 2.
      someResults = [];
      let split = this.state.parseString.split(".");
      jsonPathQuery = "$..subviews[?(@.class=='" + split[0] + "' && @.classNames)]";
      let innerQuery = "$..['classNames'][?(@ == '" + split[1] + "')]";
      //Now look in those, and determine if they have a class name that matches
      let tempResults = jp.query(this.state.loadedJSON, jsonPathQuery);
      if (tempResults.length > 0)
      {
        //Now loop over all the items with a class name.
        //If the item has a matching class name, go ahead and add it
        for (let i=0; i < tempResults.length; ++i) {

          let innerResults = jp.query(tempResults[i], innerQuery);
          if (innerResults.length > 0) {
            console.log("result " + i);
            someResults.push(tempResults[i]);
          }
        }
      }
      jsonPathQuery = jsonPathQuery + " <br/> " + innerQuery;
    }
    else if (this.state.parseString.includes("#")){
      let split = this.state.parseString.split("#");
      jsonPathQuery = "$..subviews[?(@.class=='" + split[0] + "' && @.identifier=='"+ split[1] + "')]";
      someResults = jp.query(this.state.loadedJSON, jsonPathQuery);
    }
    else{
      //class query
      jsonPathQuery = "$..subviews[?(@.class=='" + this.state.parseString + "')]";
      try{
        someResults = jp.query(this.state.loadedJSON, jsonPathQuery);
      }
      catch(err)
      {
        jsonPathQuery = "Error parsing JSON";
        someResults = [];
      }
    }

    console.log(someResults);

    this.setState({
      jsonPathQuery: jsonPathQuery,
      results: someResults
    });
  };

  handleURLChange = event => {
    this.setState({
      jsonURL: event.target.value
    });
  };

  handleURLDefault = () => {
    this.setState({
      jsonURL: "https://raw.githubusercontent.com/jdolan/quetoo/master/src/cgame/default/ui/settings/SystemViewController.json"
    });
  };

  handleURLSubmit = event => {
    axios.get(this.state.jsonURL).then(response => {
      this.setState({loadedJSON: response.data})
    });
    event.preventDefault();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">JSON Parser</h1>
        </header>
        <Container>
          <Row>
            <Col>
            <URLForm onChange={this.handleURLChange} onSubmit={this.handleURLSubmit} onDefaultURL={this.handleURLDefault} {...this.state} />
            </Col>
          </Row>
          <Row>
            <Col>
              <LoadedJSONDisplay onParseStringChange={this.handleParseStringChange} {...this.state}/>
            </Col>
            <Col>
              <ParsingResults {...this.state}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
