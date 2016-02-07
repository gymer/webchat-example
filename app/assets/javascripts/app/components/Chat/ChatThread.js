import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import ChatContactItem from './ChatContactItem'
import ChatThreadMessage from './ChatThreadMessage'

class ChatThread extends Component {
  constructor(props) {
    super(props);
    this.state = {contactsOpen: false};
  }

  onSubmit(e) {
    e.preventDefault();
    let text = this.refs.message.value.trim();
    this.props.onMessageSubmit({threadId: this.props.thread.id, text: text});
    this.refs.message.value = null;
  }

  renderContacts(thread, contacts) {
    return contacts.filter(contact => thread.members.indexOf(contact) == -1).map(contact =>
      <ChatContactItem key={contact.id} contact={contact} onSelect={this.addMember.bind(this)}></ChatContactItem>
    )
  }

  addMember(user) {
    this.props.onAddThreadMember(this.props.thread.id, user.id)
    this.setState({contactsOpen: false})
  }

  toggleContacts() {
    this.setState({contactsOpen: !this.state.contactsOpen})
  }

  render() {
    const { contacts, thread, actions } = this.props
    return (
      <div className="panel panel-default b-chat-thread">
        <div className="panel-heading">
          <div className={classnames({'b-chat-thread__add pull-right': true, open: this.state.contactsOpen})}>
            <button type="button" className="btn btn-default btn-xs" onClick={this.toggleContacts.bind(this)}>Добавить участников</button>
            <ul className="dropdown-menu active">
              {this.renderContacts(thread, contacts)}
            </ul>
          </div>
          CHAT with
          {thread.members.map(user =>
            <span key={user.id} className="label label-primary">{user.name}</span>
          )}
        </div>
        <div className="panel-body">
          <ul className="media-list">
            {thread.messages.map(message =>
              <ChatThreadMessage key={message.id} message={message}></ChatThreadMessage>
            )}
          </ul>
        </div>
        <div className="panel-footer">
          <form onSubmit={this.onSubmit.bind(this)} className="input-group">
            <input type="text" ref="message" className="form-control" placeholder="Enter Message" />
            <span className="input-group-btn">
              <button className="btn btn-info" type="button">SEND</button>
            </span>
          </form>
        </div>
      </div>
    )
  }
}

ChatThread.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  thread: PropTypes.object.isRequired,
  onMessageSubmit: PropTypes.func,
  onAddThreadMember: PropTypes.func
}

export default ChatThread
