import { FETCH_PROFILE, FETCH_CONTACTS, FETCH_DIALOGS, USER_CONNECT, NEW_DIALOG, ACTIVATE_DIALOG, ADD_DIALOG_MEMBER, SEND_MESSAGE } from '../constants/ActionTypes'

const me = {id: 0, name: 'Me', online: true}

let newDialog = (state, userId) => {
  return {
    id: state.dialogs.length+1,
    members: [state.contacts.find(u => u.id === userId)],
    messages: []
  }
}

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
      let dialogs  = state.dialogs.map(t => {
        if (t.id === activeDialogId) {
          t = Object.assign({}, t, {messages})
        }

        return t
      })

      return Object.assign({}, state, {activeDialogId, dialogs})
    }

    case ADD_DIALOG_MEMBER: {
      let user = state.contacts.find(u => u.id === action.userId)
      let dialog = state.dialogs.find(t => t.id === action.dialogId)

      console.log(user, dialog)

      let dialogs = state.dialogs.map(t => {
        if (t.id === dialog.id) {
          t = Object.assign({}, t, {
            members: [...t.members, user]
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

    default:
      return state
  }
}
