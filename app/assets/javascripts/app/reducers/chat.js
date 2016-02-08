import { FETCH_CONTACTS, FETCH_DIALOGS, USER_CONNECT, NEW_DIALOG, ACTIVATE_DIALOG, ADD_DIALOG_MEMBER, SEND_MESSAGE } from '../constants/ActionTypes'

const me = {id: 0, name: 'Me', online: true};

const contacts = [];

const dialogs = [
  {
    id: 1,
    members: contacts.slice(0, 2),
    messages: [
      {id: 1, dialogId: 1, user: contacts[0], text: "Привет всем в этом чате!", date: 1454775280529},
      {id: 2, dialogId: 1, user: contacts[1], text: "Привет привет!", date: 1454775258936}
    ]
  }
];

let newDialog = (state, userId) => {
  return {
    id: state.dialogs.length+1,
    members: [state.contacts.find(u => u.id === userId)],
    messages: []
  }
}

const initialState = {
  activeDialogId: null,
  dialogs: dialogs,
  contacts: contacts
}

export default function chat(state = initialState, action) {
  switch (action.type) {
    case USER_CONNECT:
      return Object.assign({}, state, {})

    case FETCH_CONTACTS:
      return Object.assign({}, state, {
        contacts: action.contacts
      })

    case FETCH_DIALOGS:
      return Object.assign({}, state, {
        dialogs: action.dialogs
      })

    case NEW_DIALOG:
      let dialog = newDialog(state, action.userId)
      return Object.assign({}, state, {
        activeDialogId: dialog.id,
        dialogs: [
          ...state.dialogs,
          dialog
        ]
      })

    case ACTIVATE_DIALOG:
      let activeDialogId = action.dialogId
      return Object.assign({}, state, {activeDialogId})

    case ADD_DIALOG_MEMBER: {
      let user = state.contacts.find(u => u.id === action.userId)
      let dialog = state.dialogs.find(t => t.id === action.dialogId)

      let dialogs = state.dialogs.map(t => {
        if (t.id === dialog.id) {
          t = Object.assign({}, t, {
            members: [...t.members, user]
          })
        }

        return t;
      })

      return Object.assign({}, state, {dialogs})
    }

    case SEND_MESSAGE:
      let dialogs = state.dialogs.map(dialog => {
        if (dialog.id == action.message.dialogId) {
          dialog = Object.assign({}, dialog, {
            messages: [
              ...dialog.messages,
              Object.assign({id: dialog.messages.length+1, user: me, date: +(new Date())}, action.message)
            ]
          })
        }

        return dialog;
      })


      return Object.assign({}, state, {dialogs})

    default:
      return state
  }
}
