import { FETCH_PROFILE, FETCH_CONTACTS, FETCH_DIALOGS, USER_CONNECT,
NEW_DIALOG, ACTIVATE_DIALOG, ADD_DIALOG_MEMBER, SEND_MESSAGE, RECIEVE_MESSAGE } from '../constants/ActionTypes'

const initialState = {
  me: null,
  activeDialogId: null,
  dialogs: [],
  contacts: []
}

export default function chat(state = initialState, action) {
  switch (action.type) {
    case USER_CONNECT:
      return Object.assign({}, state, {})

    case FETCH_PROFILE:
      return Object.assign({}, state, {
        me: action.profile
      })

    case FETCH_CONTACTS:
      return Object.assign({}, state, {
        contacts: action.contacts
      })

    case FETCH_DIALOGS:
      return Object.assign({}, state, {
        dialogs: action.dialogs
      })

    case NEW_DIALOG:
      action.dialog.members = action.dialog.members.filter(member => member.user_id != state.me.id)
      return Object.assign({}, state, {
        activeDialogId: action.dialog.id,
        dialogs: [
          ...state.dialogs,
          action.dialog
        ]
      })

    case ACTIVATE_DIALOG: {
      let activeDialogId = action.dialogId
      let messages = action.messages
      let lastMessage = messages[messages.length-1]
      let dialogs  = state.dialogs.map(t => {
        if (t.id === activeDialogId) {
          t = Object.assign({}, t, {messages, last_read: lastMessage ? lastMessage.id : null})
        }

        return t
      })

      return Object.assign({}, state, {activeDialogId, dialogs})
    }

    case ADD_DIALOG_MEMBER: {
      let dialogs = state.dialogs.map(t => {
        if (t.id === action.dialogId) {
          t = Object.assign({}, t, {
            members: [...t.members, {user_id: action.userId}]
          })
        }

        return t
      })

      return Object.assign({}, state, {dialogs})
    }

    case SEND_MESSAGE:
      let dialogs = state.dialogs.map(dialog => {
        if (dialog.id == action.message.dialog_id) {
          dialog = Object.assign({}, dialog, {
            messages: [
              ...dialog.messages,
              action.message
            ]
          })
        }

        return dialog
      })

      return Object.assign({}, state, {dialogs})

    case RECIEVE_MESSAGE: {
      let dialogs = state.dialogs.map(dialog => {
        if (dialog.id == action.message.dialog_id) {
          dialog = Object.assign({}, dialog, {
            messages: [
              ...dialog.messages,
              action.message
            ]
          })
        }

        return dialog
      })

      return Object.assign({}, state, {dialogs})
    }

    default:
      return state
  }
}
