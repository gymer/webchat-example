import { FETCH_CONTACTS, USER_CONNECT, NEW_THREAD, ACTIVATE_THREAD, ADD_THREAD_MEMBER, SEND_MESSAGE } from '../constants/ActionTypes'

const me = {id: 0, name: 'Me', online: true};

const contacts = [];

const threads = [
  {
    id: 1,
    members: contacts.slice(0, 2),
    messages: [
      {id: 1, threadId: 1, user: contacts[0], text: "Привет всем в этом чате!", date: 1454775280529},
      {id: 2, threadId: 1, user: contacts[1], text: "Привет привет!", date: 1454775258936}
    ]
  }
];

let newThread = (state, userId) => {
  return {
    id: state.threads.length+1,
    members: [state.contacts.find(u => u.id === userId)],
    messages: []
  }
}

const initialState = {
  activeThreadId: null,
  threads: threads,
  contacts: contacts
}

export default function chat(state = initialState, action) {
  switch (action.type) {
    case USER_CONNECT:
      return {
        thread: state.thread,
        contacts: [
          ...state.contacts,
          {
          }
        ]
      }

    case FETCH_CONTACTS:
      return Object.assign({}, state, {
        contacts: action.contacts
      })

    case NEW_THREAD:
      let thread = newThread(state, action.userId)
      return Object.assign({}, state, {
        activeThreadId: thread.id,
        threads: [
          ...state.threads,
          thread
        ]
      })

    case ACTIVATE_THREAD:
      let activeThreadId = action.threadId
      return Object.assign({}, state, {activeThreadId})

    case ADD_THREAD_MEMBER: {
      let user = state.contacts.find(u => u.id === action.userId)
      let thread = state.threads.find(t => t.id === action.threadId)

      let threads = state.threads.map(t => {
        if (t.id === thread.id) {
          t = Object.assign({}, t, {
            members: [...t.members, user]
          })
        }

        return t;
      })

      return Object.assign({}, state, {threads})
    }

    case SEND_MESSAGE:
      let threads = state.threads.map(thread => {
        if (thread.id == action.message.threadId) {
          thread = Object.assign({}, thread, {
            messages: [
              ...thread.messages,
              Object.assign({id: thread.messages.length+1, user: me, date: +(new Date())}, action.message)
            ]
          })
        }

        return thread;
      })


      return Object.assign({}, state, {threads})

    default:
      return state
  }
}
