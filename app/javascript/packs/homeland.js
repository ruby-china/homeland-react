const $ = require('jquery');
global.$ = $;
global.jQuery = $;
require('jquery-ujs');

import 'whatwg-fetch';
const QueryString = require('query-string');
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import {
  App,
  Home,
  User,
  TopicDetail,
  TopicList,
  NoReplyTopicList,
  PopularTopicList,
  RecentTopicList,
  NodeTopicList,
  UserTopicList,
  FavoriteTopicList,
  UserReplies,
  UserFollowers,
  UserFollowing,
} from 'containers';

window.Homeland = {
  fetch(path, data, opts) {
    return Homeland.request('GET', path, data, opts);
  },

  request(method, path, data, opts) {
    let url = "https://ruby-china.org/api/v3" + path;
    let headers = {};

    // OAuth 2
    if (window.currentUser) {
      headers['AUTHORIZATION'] = 'Bearer ' + window.currentUser.accessToken;
    }

    // default option
    const fetchOpts = { method: method, headers: headers };

    // params
    if (method === 'GET' || method === 'HEAD') {
      let queryString = QueryString.stringify(data);
      url = url + '?' + queryString;
    } else {
      var formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      fetchOpts.body = formData;
    }

    return fetch(url, fetchOpts).then((res) => {
      return res.json();
    });
  },

  signOut() {
    return $.ajax({
      url: "/oauth",
      method: 'delete'
    });
  }
};

var routes =
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="topics" component={TopicList} />
      <Route path="topics/no-reply" component={NoReplyTopicList} />
      <Route path="topics/popular" component={PopularTopicList} />
      <Route path="topics/recent" component={RecentTopicList} />
      <Route path="topics/node:id" component={NodeTopicList} />
      <Route path="topics/:id(/r/:reply_id)" component={TopicDetail} />
      <Route path=":id" component={User}>
        <IndexRoute component={UserTopicList} />
        <Route path="replies" component={UserReplies} />
        <Route path="favorites" component={FavoriteTopicList} />
        <Route path="followers" component={UserFollowers} />
        <Route path="following" component={UserFollowing} />
      </Route>
    </Route>
  </Router>

document.addEventListener("DOMContentLoaded", e => {
  ReactDOM.render(routes, document.getElementById('root'))
});