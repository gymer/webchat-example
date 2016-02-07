import * as types from '../constants/ActionTypes';

export function userConnect(id) {
  return { type: types.USER_CONNECT, id };
}

export function fetchContacts(contacts) {
  return { type: types.FETCH_CONTACTS, contacts };
}

export function newThread(userId) {
  return { type: types.NEW_THREAD, userId };
}

export function activateThread(threadId) {
  return { type: types.ACTIVATE_THREAD, threadId };
}

export function addThreadMember(threadId, userId) {
  return { type: types.ADD_THREAD_MEMBER, threadId, userId };
}

export function sendMessage(message) {
  return { type: types.SEND_MESSAGE, message: message};
}
