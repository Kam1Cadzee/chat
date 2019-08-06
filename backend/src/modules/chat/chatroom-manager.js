const createChatRoom = require('./chatroom');
const chatRoomTemplates = require('./templates/chatrooms');


const chatRooms = {};

chatRoomTemplates.forEach(chatRoom => {
  chatRooms[chatRoom.name] = createChatRoom(chatRoom);
});

const removeClient = client => {
  Object.values(chatRooms).forEach(c => c.removeUser(client));
};

const getChatRoomByName = chatroomName => {
  return chatRooms[chatroomName];
};

const getAllChatRooms = () => {
  return Object.values(chatRooms).map(c => c.getChatRoomInfo());
};

module.exports = {
  removeClient,
  getChatRoomByName,
  getAllChatRooms
};


