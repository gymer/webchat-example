import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class ChatContactImg extends Component {
  render() {
    const { users } = this.props
    let isGroup = users.length > 1
    let label = isGroup ? users.map(u => u.name[0]).join(',') : users[0].name[0];

    return (
      <span className={classnames({'media-object img-circle b-contact-item__pic': true, group: isGroup})}>{label}</span>
    )
  }
}

ChatContactImg.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object.isRequired)
}

export default ChatContactImg
