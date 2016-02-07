import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import ChatContactImg from './ChatContactImg'

class ChatContactItem extends Component {
  render() {
    const { contact, active, onSelect } = this.props
    return (
      <li className={classnames({'media b-contact-item': true, active: active})} onClick={() => onSelect(contact)}>
        <div className="media-body">
          <div className="media">
            <div className="pull-left">
              <ChatContactImg users={[contact]}></ChatContactImg>
            </div>
            <div className="media-body">
              <h5>{contact.name}</h5>
              <small className="text-muted">{contact.online}</small>
            </div>
          </div>

        </div>
      </li>
    )
  }
}

ChatContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
  active: PropTypes.bool,
  onSelect: PropTypes.func
}

export default ChatContactItem
