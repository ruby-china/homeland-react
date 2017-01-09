import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { UserReply } from 'components'

export class UserReplyList extends Component {
  constructor(props){
    super(props);
    this.state = {
      replies: []
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

    Homeland.fetch(path).done(res => {
      this.setState({
        replies: res.replies
      });
    });
  }

  render() {
    let list = this.loading();
    if (this.state.replies.length > 0) {
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
      <div className="reply reply-loading text-center">
        载入中，请稍后...
      </div>
    )
  }

  renderReplies() {
    return this.state.replies.map(reply => {
      return <UserReply key={reply.id} reply={reply} />
    })
  }
}
