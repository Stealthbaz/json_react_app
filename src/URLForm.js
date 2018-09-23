import {Component} from "react";
import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import Form from 'react-bootstrap/lib/Form.js';
import Button from 'react-bootstrap/lib/Button.js';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';


class URLForm extends Component{
  constructor(props)
  {
    super(props);
  }
  render() {
    return (
      <Form onSubmit={this.props.onSubmit}>
        <Form.Group controlId="aJsonURL">
          <Form.Label>JSON URL to Load</Form.Label>
          <Form.Control
            type="text"
            name="url"
            value={this.props.jsonURL}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <ButtonToolbar>
          <Button variant="primary" type="submit">Load</Button>
          <Button variant="secondary" onClick={this.props.onDefaultURL}>Default</Button>
        </ButtonToolbar>
      </Form>
    );
  }
}

export default URLForm