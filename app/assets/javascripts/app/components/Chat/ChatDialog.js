import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import ChatContactItem from './ChatContactItem'
import ChatMessage from './ChatMessage'

class ChatDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {contactsOpen: false};
  }

  componentDidUpdate() {
    this.refs.message.focus()
  }

  onSubmit(e) {
    e.preventDefault();
    let text = this.refs.message.value.trim();
    this.props.onMessageSubmit({dialogId: this.props.dialog.id, text: text});
    this.refs.message.value = null;
  }

  renderContacts(dialog, contacts) {
    return contacts.filter(contact => dialog.members.indexOf(contact) == -1).map(contact =>
      <ChatContactItem key={contact.id} contact={contact} onSelect={this.addMember.bind(this)}></ChatContactItem>
    )
  }

  addMember(user) {
    this.props.onAddDialogMember(this.props.dialog.id, user.id)
    this.setState({contactsOpen: false})
  }

  toggleContacts() {
    this.setState({contactsOpen: !this.state.contactsOpen})
  }

  render() {
    const { me, contacts, dialog, actions } = this.props
    let members = dialog.members.map(member => (member.user_id === me.id) ? me : contacts.find(u => u.id === member.user_id))
        members.push(me)

    let messages = dialog.messages.map(message => {
      message.user = members.find(member => member.id === message.user_id)
      return message
    })

    return (
      <div className="panel panel-default b-chat-thread">
        <div className="panel-heading">
          <div className={classnames({'b-chat-thread__add pull-right': true, open: this.state.contactsOpen})}>
            <button type="button" className="btn btn-default btn-xs" onClick={this.toggleContacts.bind(this)}>Добавить участников</button>
            <ul className="dropdown-menu active">
              {this.renderContacts(dialog, contacts)}
            </ul>
          </div>
          CHAT with
          {members.map(user =>
            (user.id != me.id) ? <span key={user.id} className="label label-primary">{user.name}</span> : null
          )}
        </div>
        <div className="panel-body">
          <ul className="media-list">
            {messages.length === 0 ? <p className="text-center">Напишите что-нибудь</p> : null}
            {messages.map(message =>
              <ChatMessage key={message.id} message={message}></ChatMessage>
            )}
          </ul>
        </div>
        <div className="panel-footer">
          <form onSubmit={this.onSubmit.bind(this)} className="input-group">
            <input type="text" autoFocus ref="message" className="form-control" placeholder="Enter Message" />
            <span className="input-group-btn">
              <button className="btn btn-info" type="button">SEND</button>
            </span>
          </form>
        </div>
      </div>
    )
  }
}

ChatDialog.propTypes = {
  me: PropTypes.object.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object),
  dialog: PropTypes.object.isRequired,
  onMessageSubmit: PropTypes.func,
  onAddDialogMember: PropTypes.func
}

export default ChatDialog
