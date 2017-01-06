@Timeago = React.createClass
  render: ->
    `<abbr className="timeago" title={this.props.time}>{this.props.time}</abbr>`