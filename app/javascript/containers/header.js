import React from 'react';
import { Component } from 'react';
import { Link, IndexLink } from 'react-router';

export class Header extends Component {
  render() {
    return (
      <nav id="header" className="navbar navbar-light navbar-toggleable-md fixed-top bg-faded">
        <div className="container">
          <Link to="/" className="navbar-brand">React on Rails</Link>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#main-nav-menu">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="main-nav-menu">
            <ul className="nav navbar-nav main-nav mr-auto mt-2 mt-md-0">
              <li className="nav-item"><IndexLink className="nav-link" activeClassName="active" to="/">社区</IndexLink></li>
              <li className="nav-item"><Link className="nav-link" activeClassName="active" to="/topics/popular">优质话题</Link></li>
              <li className="nav-item"><Link className="nav-link" activeClassName="active" to="/topics/no-reply">无人问津</Link></li>
              <li className="nav-item"><Link className="nav-link" activeClassName="active" to="/topics/recent">最新发布</Link></li>
            </ul>
            <ul className="nav navbar-nav my-2 my-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/sign_up">Sign Up</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}