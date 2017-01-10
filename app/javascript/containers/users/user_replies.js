import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { UserReply, PageLoading } from 'components'

export class UserReplies extends Component {
  constructor(props){
    super(props);
    this.state = {
      replies: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.setState({
      replies: [],
    });
  }

  fetchData() {
    let path = `/users/${this.props.params.id}/replies.json`;

    Homeland.fetch(path).then(res => {
      this.setState({
        replies: res.replies
      });
    });
  }

  render() {
    let list = this.loading();
    if (this.state.replies) {
      list = this.renderReplies();
    }
    return (
      <div className="user-reply-list">
        {list}
      </div>
    )
  }

  loading() {
    return (
      <PageLoading />
    )
  }

  renderReplies() {
    return this.state.replies.map(reply => {
      return <UserReply key={reply.id} reply={reply} />
    })
  }
}
