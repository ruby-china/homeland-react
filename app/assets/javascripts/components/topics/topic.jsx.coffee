Link = ReactRouter.Link

@Topic = React.createClass
  render: ->
    topic = @props.topic
    `<tr className="topic" id={'topic-' + topic.id}>
      <td className="title">
        <Link to={'/topics/' + topic.id}>{topic.title}</Link>
      </td>
      <td className="node">
        <Link to={'/c/' + topic.node_id} className="node">
          {topic.node_name}
        </Link>
      </td>
      <td className="author">
        <UserNameLink user={topic.user} />
      </td>
      <td className="replies">{topic.replies_count}</td>
      <td className="activity">
        <Timeago time={topic.updated_at} />
      </td>
    </tr>
    `