import {Component} from "react";
import React from "react";

import ResultItem from './ResultItem'

import Container from 'react-bootstrap/lib/Container.js';
import Row from 'react-bootstrap/lib/Row.js';
import Col from 'react-bootstrap/lib/Col.js';

class ParsingResults extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.props.jsonPathQuery}
          </Col>
        </Row>
        <Row>
          <Col>
            <Container>
              <Row>
                Results: {this.props.results.length}
              </Row>
              {this.props.results.map((aResult, index) => (
                    aResult == null ? '' : <ResultItem key={'result' + index} result={aResult} index={index}/>
                  )
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ParsingResults