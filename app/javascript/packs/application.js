import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { App, Home, TopicList, TopicDetail, SignUp } from 'containers'

window.Homeland = {
  fetch(path, opts) {
    return $.get("https://ruby-china.org/api/v3" + path, opts);
  }
};

var routes =
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="topics" component={TopicList}>
        <Route path="recent" type="recent" component={TopicList} />
      </Route>
      <Route path="topics/node:id" type="node" component={TopicList} />
      <Route path="topics/:id" component={TopicDetail} />
    </Route>
  </Router>

document.addEventListener("DOMContentLoaded", e => {
  ReactDOM.render(routes, document.getElementById('root'))
});