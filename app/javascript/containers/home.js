import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { TopicList } from 'containers';

export class Home extends Component {
  render() {
    return (
      <div id="home-container">
        <TopicList type="last_actived" />
      </div>
    )
  }
}