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
}
