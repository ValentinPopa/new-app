import React, { Component } from 'react';

export default class Project extends Component {
  render() {
    return (
      <li>
        <span className="text">
          <strong> {this.props.project.name}</strong>: {this.props.project.companyName}
        </span>
      </li>
    );
  }
}