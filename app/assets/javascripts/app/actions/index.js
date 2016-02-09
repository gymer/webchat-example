import * as types from '../constants/ActionTypes';

export function userConnect(id) {
  return { type: types.USER_CONNECT, id };
}

export function fetchContacts(contacts) {
  return { type: types.FETCH_CONTACTS, contacts };
}

export function fetchDialogs(dialogs) {
  return { type: types.FETCH_DIALOGS, dialogs };
}

export function newDialog(userId) {
  return { type: types.NEW_DIALOG, userId };
}

export function activateDialog(dialogId, messages = []) {
  return { type: types.ACTIVATE_DIALOG, dialogId, messages };
}

export function addDialogMember(dialogId, userId) {
  return { type: types.ADD_DIALOG_MEMBER, dialogId, userId };
}

export function sendMessage(message) {
  return { type: types.SEND_MESSAGE, message: message};
}
