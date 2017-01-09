import React from 'react';
import { Component } from 'react';

export class PageLoading extends Component {
  render() {
    return (
      <div className="row page-loading justify-content-md-center">
        <div className="col-md-6">
          <div className="text text-center">{this.props.text || "载入中，请稍后..."}</div>
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: '100%'}} />
          </div>
        </div>
      </div>
    )
  }
}