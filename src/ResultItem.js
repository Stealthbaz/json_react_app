import React, {Component} from "react";
import Container from "react-bootstrap/lib/Container";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import JSONPretty from "react-json-pretty";
import Collapsible from 'react-collapsible';

class ResultItem extends Component {
  render() {
    return (
        <Row>
          <Collapsible trigger={(this.props.index + 1) + ": Click to Expand"}>
            <JSONPretty id="json-pretty{this.props.index}" json={this.props.result}/>
          </Collapsible>
        </Row>
    );
  }
}
export default ResultItem




