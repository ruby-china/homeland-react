import React from 'react';
import { Component } from 'react';

export class PageLoading extends Component {
  render() {
    return (
      <div className="row page-loading">
        <div className="col-md-6 offset-md-3">
          <div className="text text-center">{this.props.text || "载入中，请稍后..."}</div>
          <progress className="progress progress-striped progress-animated" value="100" max="100" />
        </div>
      </div>
    )
  }
}