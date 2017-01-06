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
      <div className="title">Total {this.state.topics.length} items</div>
      <div className="items">
        {this.state.topics.map(topic => {
          return <Topic key={topic.id} topic={topic} />
        })}
      </div>
    </div>
    `