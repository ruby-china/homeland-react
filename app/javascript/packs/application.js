import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App, Home, TopicDetail, SignUp, User } from 'containers';
import { TopicList, NoReplyTopicList, PopularTopicList, RecentTopicList, NodeTopicList } from 'containers';

window.Homeland = {
  fetch(path, opts) {
    return $.get("https://ruby-china.org/api/v3" + path, opts);
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
      <Route path=":id" component={User} />
    </Route>
  </Router>

document.addEventListener("DOMContentLoaded", e => {
  ReactDOM.render(routes, document.getElementById('root'))
});