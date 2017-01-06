Link = ReactRouter.Link;

@Header = React.createClass
  render: ->
    `<div id="header" className="navbar navbar-light bg-faded">
      <div className="container">
        <ul className="nav navbar-nav nav-main">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/list">List</Link></li>
        </ul>
        <ul className="nav navbar-nav float-xs-right">
          <li className="nav-item"><Link className="nav-link" to="/sign_up">Sign Up</Link></li>
        </ul>
      </div>
    </div>
    `