import React from 'react';
import { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { UserNameLink, UserAvatarLink } from 'components';

export class Header extends Component {
  signOut(e) {
    e.preventDefault();
    Homeland.signOut().then(() => {
      location.href = "/";
    });
  }

  render() {
    const currentUser = window.currentUser;

    return (
      <nav id="header" className="navbar navbar-light navbar-toggleable-md fixed-top bg-faded">
        <div className="container">
          <Link to="/" className="navbar-brand"><b>Ruby</b> China <sup>React version</sup></Link>
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

            {currentUser && (
              <ul className="nav navbar-nav my-2 my-lg-0">
                <li className="nav-item">
                  <UserAvatarLink user={currentUser} className="nav-link" size="md" />
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link" onClick={this.signOut.bind(this)}>登出</a>
                </li>
              </ul>
            )}

            {!currentUser && (
              <ul className="nav navbar-nav my-2 my-lg-0">
                <li className="nav-item"><a className="nav-link" href="/oauth/new">登录</a></li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    )
  }
}