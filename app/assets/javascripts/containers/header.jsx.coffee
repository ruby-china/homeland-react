@Header = React.createClass
  render: ->
    `<div id="header" className="navbar navbar-light bg-faded">
      <div className="container">
        <ul className="nav navbar-nav nav-main">
          <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="/list">List</a></li>
        </ul>
        <ul className="nav navbar-nav float-xs-right">
          <li className="nav-item"><a className="nav-link" href="/sign_up">Sign Up</a></li>
        </ul>
      </div>
    </div>
    `