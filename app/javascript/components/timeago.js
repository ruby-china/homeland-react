import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import TimeAgo from 'timeago-react'

export class Timeago extends Component {
  render() {
    if (!this.props.time) { return <abbr></abbr> }
    const date = new Date(this.props.time);
    return (
      <TimeAgo datetime={date} locale='zh_CN' />
    )
  }
}