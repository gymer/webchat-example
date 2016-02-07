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
    let activeThread = this.props.activeThread
    return contacts.map(contact => {
      let active = activeThread && (activeThread.members.length === 1) && (activeThread.members[0].id === contact.id)
      return <ChatContactItem key={contact.id} active={active} contact={contact} onSelect={this.contactSelect.bind(this)}></ChatContactItem>
    })
  }

  renderDialogs(dialogs) {
    let activeThread = this.props.activeThread
    return dialogs.map(thread => {
      let active = activeThread && activeThread.id === thread.id;
      return <ChatDialogItem key={thread.id} active={active} thread={thread} onSelect={this.props.onSelect}></ChatDialogItem>
    })
  }

  contactSelect(user) {
    const { dialogs, onSelect, onNewThread } = this.props
    let existThread = dialogs.find(d => d.members.length === 1 && d.members[0].id === user.id)

    if (existThread) {
      onSelect(existThread.id)
    } else {
      onNewThread(user.id)
    }
  }

  tabSelect(name, e) {
    e.preventDefault();
    this.setState({tab: name});
  }

  render() {
    const { contacts, dialogs } = this.props
    let listItems

    if (this.state.tab == 'contacts') {
      listItems = this.renderContacts(contacts)
    } else {
      listItems = this.renderDialogs(dialogs)
    }

    return (
      <div className="panel with-nav-tabs panel-default">
        <div className="panel-heading">
          <ul className="nav nav-tabs">
            <li className={classnames({active: this.state.tab == 'contacts'})}><a href="#" onClick={this.tabSelect.bind(this, 'contacts')}>Contacts</a></li>
            <li className={classnames({active: this.state.tab == 'dialogs'})}><a href="#" onClick={this.tabSelect.bind(this, 'dialogs')}>Dialogs</a></li>
          </ul>
        </div>
        <div className="panel-body">
          <ul className="media-list">
            {listItems}
          </ul>
        </div>
      </div>
    )
  }
}

ChatContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  dialogs: PropTypes.arrayOf(PropTypes.object),
  activeThread: PropTypes.object,
  onSelect: PropTypes.func,
  onNewThread: PropTypes.func
}

export default ChatContactList
