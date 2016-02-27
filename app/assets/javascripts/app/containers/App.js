import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GYMER } from 'env'
import ChatDialog from '../components/Chat/ChatDialog'
import ChatContactList from '../components/Chat/ChatContactList'
import * as ChatActions from '../actions'
import rest from '../services/Rest'

class App extends Component {
  constructor(props) {
    super(props);
    const { actions } = this.props

    rest({path: 'profile' })
      .then(res => actions.fetchProfile(res.entity))
      .then(this.subscribeToPushes.bind(this))
    rest({path: 'contacts' }).then(res => actions.fetchContacts(res.entity))
    rest({path: 'dialogs' }).then(res => actions.fetchDialogs(res.entity))
  }

  subscribeToPushes() {
    const { actions, chat } = this.props
    let gymmer = new Gymer(GYMER.CLIENT_ACCESS_TOKEN, {
      host: GYMER.HOST,
      auth: {
        url: "/pusher/auth",
        method: "POST",
        headers: {'X-CSRF-Token': "SOME_CSRF_TOKEN"}
      }
    });

    let public_channel  = gymmer.subscribe(`chat_${chat.me.id}`);
    // let private_channel = gymmer.subscribe('@messages');

    public_channel.on('new_message', actions.recieveMessage)
  }

  activateDialog(id) {
    rest({path: `dialogs/${id}/messages`}).then(res => {
      this.props.actions.activateDialog(id, res.entity)
    })
  }

  addDialogMember(dialogId, userId) {
    rest({
      path: `dialogs/${dialogId}/members`,
      entity: {
        user_id: userId
      }
    })
    .then(() => this.props.actions.addDialogMember(dialogId, userId))
    .catch(console.warn.bind(console))
  }

  messageSubmit(message) {
    const { actions } = this.props
    rest({
      path: `dialogs/${message.dialogId}/messages`,
      entity: {
        text: message.text
      }
    }).then(res => actions.sendMessage(res.entity))
  }

  newDialog(userId) {
    rest({
      path: 'dialogs',
      entity: {
        members_attributes: [{user_id: userId}]
      }
    }).then(res => this.props.actions.newDialog(res.entity))
  }

  render() {
    const { chat, actions } = this.props
    let activeDialog = chat.dialogs.find(t => t.id === chat.activeDialogId)
    let welcome = <div className="jumbotron">
      <p>На данный момент в чате {chat.contacts.length} человек.</p>
      <p>Начните общение прямо сейчас!</p>
    </div>

    return (
      <div className="row">
        <div className="col-sm-8">
          { activeDialog ? <ChatDialog
            me={chat.me}
            dialog={activeDialog}
            contacts={chat.contacts}
            onMessageSubmit={this.messageSubmit.bind(this)}
            onAddDialogMember={this.addDialogMember.bind(this)} /> : welcome}
        </div>
        <div className="col-sm-4">
          { chat.contacts.length ? <ChatContactList
            activeDialog={activeDialog}
            contacts={chat.contacts}
            dialogs={chat.dialogs}
            onSelect={this.activateDialog.bind(this)}
            onNewDialog={this.newDialog.bind(this)} /> : null }
        </div>
      </div>
    )
  }
}

App.propTypes = {
  chat: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    chat: state.chat
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChatActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
