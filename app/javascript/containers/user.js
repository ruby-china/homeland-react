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
    this.fetchData(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params !== nextProps.params) {
      this.fetchData(nextProps.params.id);
    }
  }

  fetchData(id) {
    Homeland.fetch("/users/"+ id +".json").then(res => {
      this.setState({
        user: res.user,
      });
    });
  }

  render() {
    const user = this.state.user;
    if (!user) { return <PageLoading text="载入中..." />; }

    return (
      <div className="user-profile">
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
          <div className="card-footer">
            <Link to={`/${user.login}/followers`} className="followers">{user.followers_count} 关注者</Link>
            <Link to={`/${user.login}/following`} className="following">{user.following_count} 正在关注</Link>
          </div>
        </div>
        <div className="clearfix">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <IndexLink className="nav-link" to={`/${user.login}`} activeClassName="active">
                话题 <span className="count">({user.topics_count})</span>
              </IndexLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${user.login}/replies`} activeClassName="active">
                回帖 <span className="count">({user.replies_count})</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${user.login}/favorites`} activeClassName="active">
                收藏 <span className="count">({user.favorites_count})</span>
              </Link>
            </li>
          </ul>
        </div>
        {this.props.children}
      </div>
    )
  }
}