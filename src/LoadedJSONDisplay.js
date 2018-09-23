import {Component} from "react";
import React from "react";
import Container from 'react-bootstrap/lib/Container.js';
import Row from 'react-bootstrap/lib/Row.js';
import Col from 'react-bootstrap/lib/Col.js';

import JSONPretty from 'react-json-pretty';

import ParseStringForm from './ParseStringForm';


class LoadedJSONDisplay extends Component {

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <ParseStringForm onChange={this.props.onParseStringChange} parseString={this.props.parseString}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <JSONPretty id="json-pretty" json={this.props.loadedJSON}/>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoadedJSONDisplay