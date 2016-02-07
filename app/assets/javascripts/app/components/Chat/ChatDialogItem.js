import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import ChatContactImg from './ChatContactImg'

class ChatDialogItem extends Component {
  render() {
    const { thread, active, onSelect } = this.props
    return (
      <li className={classnames({'media b-contact-item b-contact-item_dialog': true, active: active})} onClick={() => onSelect(thread.id)}>
        <div className="media-body">
          <div className="media">
            <div className="pull-left">
              <ChatContactImg users={thread.members}></ChatContactImg>
            </div>
            <div className="media-body">
              <h5>{thread.members.map(m => m.name).join(', ')}</h5>
              <small className="text-muted">{thread.members.length} участников</small>
            </div>
          </div>

        </div>
      </li>
    )
  }
}

ChatDialogItem.propTypes = {
  thread: PropTypes.object.isRequired,
  active: PropTypes.bool,
  onSelect: PropTypes.func
}

export default ChatDialogItem
