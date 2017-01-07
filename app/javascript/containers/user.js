import React from 'react';
import { Link, IndexLink } from 'react-router';
import { UserAvatarLink, NodeLink, PageLoading } from 'components';
import { TopicList } from 'containers';

export class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    Homeland.fetch("/users/"+ this.props.params.id +".json").then(res => {
      this.setState({
        user: res.user,
      });
    });
  }

  render() {
    const user = this.state.user;
    if (!user) { return <PageLoading text="载入中..." />; }

    return (
      <div className="user-profile row">
        <div className="user-info card text-center">
          <div className="card-block">
            <UserAvatarLink user={user} />
            <h4 className="card-title text-center">
              {user.login}
              {user.name && (
                <span className="name">({user.name})</span>
              )}</h4>
            <div className="card-text">{user.tagline}</div>
          </div>
        </div>
        <ul className="nav nav-pills justify-content-center">
          <li className="nav-item">
            <IndexLink className="nav-link" to={`/${user.login}`} activeClassName="active">话题</IndexLink>
          </li>
          <li className="nav-item">
            <IndexLink className="nav-link" to={`/${user.login}/replies`} activeClassName="active">回帖</IndexLink>
          </li>
        </ul>
        {this.props.children || (
          <TopicList type="user" login={user.login} />
        )}
      </div>
    )
  }
}