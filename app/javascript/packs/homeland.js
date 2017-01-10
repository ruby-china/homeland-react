import $ from 'jquery'
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
  fetch(path, opts) {
    return Homeland.request('GET', path, null, opts);
  },

  request(method, path, data, opts) {
    let headers = {};
    if (window.currentUser) {
      headers['AUTHORIZATION'] = 'Bearer ' + window.currentUser.accessToken;
    }
    return $.ajax({
      method: method,
      url: "https://ruby-china.org/api/v3" + path,
      data: data,
      headers: headers
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
      <Route path="topics/:id" component={TopicDetail} />
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