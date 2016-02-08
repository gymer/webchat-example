import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ChatDialog from '../components/Chat/ChatDialog'
import ChatContactList from '../components/Chat/ChatContactList'
import * as ChatActions from '../actions'
import rest from '../services/Rest'

class App extends Component {
  constructor(props) {
    super(props);
    const { actions } = this.props

    rest({path: 'contacts' }).then(res => actions.fetchContacts(res.entity))
    rest({path: 'dialogs' }).then(res => actions.fetchDialogs(res.entity))
  }

  activateDialog(id) {
    // actions.activateDialog
    rest({path: 'dialogs/' + id}).then(res => {
      console.log(res)
    })
    // this.props.actions.newDialog
  }

  newDialog(userId) {
    rest({path: 'dialogs', entity: {members_attributes: [{user_id: userId}]}}).then(res => {
      console.log(res)
    })
    // this.props.actions.newDialog
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
        <div className="col-md-8">
          { activeDialog ? <ChatDialog dialog={activeDialog} contacts={chat.contacts} onMessageSubmit={actions.sendMessage} onAddDialogMember={actions.addDialogMember} /> : welcome}
        </div>
        <div className="col-md-4">
          <ChatContactList activeDialog={activeDialog} contacts={chat.contacts} dialogs={chat.dialogs} onSelect={this.activateDialog.bind(this)} onNewDialog={this.newDialog.bind(this)} />
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
