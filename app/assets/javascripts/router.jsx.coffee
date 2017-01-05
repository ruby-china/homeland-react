Router = ReactRouter.Router
Route = ReactRouter.Route
IndexRoute = ReactRouter.IndexRoute
Link = ReactRouter.Link
browserHistory = ReactRouter.browserHistory

routes =
  `<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/list" component={List} />
      <Route path="/sign_up" component={SignUp} />
    </Route>
  </Router>`

ReactDOM.render routes, document.getElementById('root')