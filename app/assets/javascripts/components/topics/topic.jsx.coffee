Link = ReactRouter.Link

@Topic = React.createClass
  render: ->
    topic = @props.topic
    `<div className="topic" id={'topic-' + topic.id}>
      <Link to={'/topics/' + topic.id}>{topic.title}</Link>
    </div>
    `