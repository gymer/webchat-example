import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import ChatContactImg from './ChatContactImg'

class ChatDialogItem extends Component {
  render() {
    const { dialog, contacts, active, onSelect } = this.props
    let members = dialog.members.map(member => contacts.find(u => u.id === member.user_id))

    return (
      <li className={classnames({'media b-contact-item b-contact-item_dialog': true, active: active})} onClick={() => onSelect(dialog.id)}>
        <div className="media-body">
          <div className="media">
            <div className="pull-left">
              <ChatContactImg users={members}></ChatContactImg>
            </div>
            <div className="media-body">
              <h5>{members.map(m => m.name).join(', ')}</h5>
              <small className="text-muted">{members.length} участников</small>
            </div>
          </div>

        </div>
      </li>
    )
  }
}

ChatDialogItem.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  dialog: PropTypes.object.isRequired,
  active: PropTypes.bool,
  onSelect: PropTypes.func
}

export default ChatDialogItem
