import React from 'react';
import { Link } from 'react-router';

export class TopicDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topics: [],
    };
  }

  render() {
    return (
      <div>Topic detail</div>
    )
  }
}