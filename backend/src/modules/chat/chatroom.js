const createChatRoom = ({name, image}) => {
  const members = {};
  let chatHistory = [];

  const broadcastMessage = message => {
    console.log('Message got: ', message);

    const allRoomMembers = Object.values(members);

    allRoomMembers.forEach(member => {
      member.emit('message', message);
    });
  };

  const addEntry = entry => {
    chatHistory = chatHistory.concat(entry);
  };

  const getChatHistory = () => {
    return chatHistory.slice();
  }
  const addUser = user => {
    console.log('User added');
    members[user.id] = user;
  }
  const removeUser = user => {
    console.log('User removed');;

    delete members[user.id];
  };

  const getChatRoomInfo = () => ({
    name,
    image,
    numMembers: members.size,
  });

  return {
    broadcastMessage,
    addEntry,
    getChatHistory,
    addUser,
    removeUser,
    getChatHistory,
    getChatRoomInfo
  }
};

module.exports = createChatRoom;
