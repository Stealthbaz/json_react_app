import {Component} from "react";
import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import Form from 'react-bootstrap/lib/Form.js';
import Button from 'react-bootstrap/lib/Button.js';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';


class ParseStringForm extends Component{
  constructor(props)
  {
    super(props);
  }
  render() {
    return (
      <Form>
        <Form.Group controlId="aParseString">
          <Form.Label>JSON Parse String</Form.Label>
          <Form.Control
            type="text"
            name="url"
            value={this.props.parseString}
            onChange={this.props.onChange}
          />
        </Form.Group>
      </Form>
    );
  }
}

export default ParseStringForm