@App = React.createClass
  render: ->
    `<div id="app">
      <Header />
      <div id="main">
        <div className="container">
          {this.props.children}
        </div>
      </div>
      <Footer />
    </div>
    `