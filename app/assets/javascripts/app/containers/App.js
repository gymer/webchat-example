import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ChatThread from '../components/Chat/ChatThread'
import ChatContactList from '../components/Chat/ChatContactList'
import * as ChatActions from '../actions'
import rest from '../services/Rest'

class App extends Component {
  constructor(props) {
    super(props);
    const { actions } = this.props

    rest({path: 'contacts' }).then(res => actions.fetchContacts(res.entity))
  }

  render() {
    const { chat, actions } = this.props
    let activeThread = chat.threads.find(t => t.id === chat.activeThreadId)
    let welcome = <div className="jumbotron">
      <p>На данный момент в чате {chat.contacts.length} человек.</p>
      <p>Начните общение прямо сейчас!</p>
    </div>

    return (
      <div className="row">
        <div className="col-md-8">
          { activeThread ? <ChatThread thread={activeThread} contacts={chat.contacts} onMessageSubmit={actions.sendMessage} onAddThreadMember={actions.addThreadMember} /> : welcome}
        </div>
        <div className="col-md-4">
          <ChatContactList activeThread={activeThread} contacts={chat.contacts} dialogs={chat.threads} onSelect={actions.activateThread} onNewThread={actions.newThread} />
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
