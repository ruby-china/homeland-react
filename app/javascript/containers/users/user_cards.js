import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { UserCard, PageLoading } from 'components'

export class UserCards extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.setState({
      users: [],
    });
  }

  fetchData() {
    let path = `/users/${this.props.id}/followers.json`;
    if (this.props.type === 'following') {
      path = `/users/${this.props.id}/following.json`;
    }

    Homeland.fetch(path).then(res => {
      this.setState({
        users: res.followers || res.following,
      });
    });
  }

  render() {
    let list = this.loading();
    if (this.state.users) {
      list = this.renderData();
    }
    return (
      <div className="user-cards card-columns">
        {list}
      </div>
    )
  }

  loading() {
    return (
      <PageLoading />
    )
  }

  renderData() {
    return this.state.users.map(user => {
      return <UserCard key={user.id} user={user} />
    })
  }
}

export class UserFollowers extends Component {
  render() {
    return (
      <UserCards type="followers" id={this.props.params.id} />
    )
  }
}

export class UserFollowing extends Component {
  render() {
    return (
      <UserCards type="following" id={this.props.params.id} />
    )
  }
}