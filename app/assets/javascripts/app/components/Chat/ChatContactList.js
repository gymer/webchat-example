import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import ChatContactItem from './ChatContactItem'
import ChatDialogItem from './ChatDialogItem'

class ChatContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {tab: 'contacts'};
  }

  renderContacts(contacts) {
    let activeDialog = this.props.activeDialog
    return contacts.map(contact => {
      let active = activeDialog && (activeDialog.members.length === 1) && !!activeDialog.members.find(member => member.user_id === contact.id)
      return <ChatContactItem key={contact.id} active={active} contact={contact} onSelect={this.contactSelect.bind(this)}></ChatContactItem>
    })
  }

  renderDialogs(dialogs, contacts) {
    let activeDialog = this.props.activeDialog
    return dialogs.map(dialog => {
      let active = activeDialog && activeDialog.id === dialog.id;
      return <ChatDialogItem key={dialog.id} active={active} dialog={dialog} contacts={contacts} onSelect={this.props.onSelect}></ChatDialogItem>
    })
  }

  contactSelect(user) {
    const { dialogs, onSelect, onNewDialog } = this.props
    let existDialog = dialogs.find(dialog => dialog.members.length === 1 && dialog.members.find(member => member.user_id === user.id))

    if (existDialog) {
      onSelect(existDialog.id)
    } else {
      onNewDialog(user.id)
    }
  }

  tabSelect(name, e) {
    e.preventDefault();
    this.setState({tab: name});
  }

  render() {
    const { contacts, dialogs } = this.props
    let groupDialogs = dialogs.filter(dialog => dialog.members.length > 1)

    return (
      <div className="panel with-nav-tabs panel-default">
        <div className="panel-body">
          <p>Chats</p>
          <ul className="media-list">
            { this.renderDialogs(groupDialogs, contacts) }
          </ul>
          <p>Contacts</p>
          <ul className="media-list">
            { this.renderContacts(contacts) }
          </ul>
        </div>
      </div>
    )
  }
}

ChatContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  dialogs: PropTypes.arrayOf(PropTypes.object),
  activeDialog: PropTypes.object,
  onSelect: PropTypes.func,
  onNewDialog: PropTypes.func
}

export default ChatContactList
