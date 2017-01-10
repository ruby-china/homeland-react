import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { IconButton } from 'components'

export class LikeButton extends Component {
  constructor(props){
    super(props);
    const item = this.props.item;
    this.state = {
      active: this.props.state === null ? false : this.props.state,
      item: item,
      count: item.likes_count,
      item_type: this.props.type,
    };
  }

  toggle() {
    const data = {
      obj_type: this.state.item_type,
      obj_id: this.state.item.id
    };

    if (this.state.active === false) {
      Homeland.request('POST', '/likes', data).then((res) => {
        this.setState({
          count: res.count,
          active: true,
        });
      });
    } else {
      Homeland.request('DELETE', '/likes', data).then((res) => {
        this.setState({
          active: false,
          count: res.count,
        });
      });
    }
    return false;
  }

  render() {
    let item = this.state.item;
    let label = "";
    if (this.state.count > 0) {
      label = `${this.state.count} 个赞`;
    }
    let className = 'like-button';
    if (this.state.active) {
      className = className + ' active';
    }

    return (
      <IconButton label={label} icon="heart" onClick={this.toggle.bind(this)} className={className} />
    )
  }
}