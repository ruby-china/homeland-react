Link = ReactRouter.Link

@UserNameLink = React.createClass
  render: ->
    `<Link to={'/' + this.props.user.login} className="user-name">{this.props.user.name}</Link>`