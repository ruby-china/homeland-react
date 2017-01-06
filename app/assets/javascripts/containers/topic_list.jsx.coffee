fetch = Homeland.fetch;

@TopicList = React.createClass
  getInitialState: ->
    { topics: [] }

  componentDidMount: ->
    @fetchData()

  componentWillUnmount: ->
    @setState
      topics: []

  fetchData: ->
    fetch("/topics.json").done (res) =>
      @setState
        topics: res.topics

  render: ->
    `<div className="topics">
      <table className="table">
        <thead className="thead-default">
          <tr className="topic">
            <th className="title">Subject</th>
            <th className="node">Channel</th>
            <th className="author">Author</th>
            <th className="replies">Replies</th>
            <th className="activity">Activity</th>
          </tr>
        </thead>
        <tbody>
        {this.state.topics.map(topic => {
          return <Topic key={topic.id} topic={topic} />
        })}
        </tbody>
      </table>
    </div>
    `