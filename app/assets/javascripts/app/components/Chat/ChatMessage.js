import Moment from 'moment'
import React, { Component, PropTypes } from 'react'
import ChatContactImg from './ChatContactImg'

class ChatMessage extends Component {
  render() {
    const { message } = this.props
    let moment = Moment(message.date)

    return (
      <li className="media">
        <div className="media-body">
          <div className="media">
            <a className="pull-left" href="#">
              <ChatContactImg users={[message.user]}></ChatContactImg>
            </a>
            <div className="media-body">
              <small className="text-muted pull-right">{moment.format('D MMM в HH:mm')}</small>
              <p className=""><strong>{message.user.name}</strong></p>
              {message.text}
              <hr />
            </div>
          </div>

        </div>
      </li>
    )
  }
}

ChatMessage.propTypes = {
  message: PropTypes.object.isRequired
}

export default ChatMessage
