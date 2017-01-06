Router         = ReactRouter.Router
Route          = ReactRouter.Route
IndexRoute     = ReactRouter.IndexRoute
browserHistory = ReactRouter.browserHistory

routes =
  `<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="topics" component={TopicList}>
        <Route path=":id" component={TopicDetail} />
      </Route>
      <Route path="/sign_up" component={SignUp} />
    </Route>
  </Router>`

ReactDOM.render routes, document.getElementById('root')