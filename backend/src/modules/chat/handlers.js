const makeHandleEvent = (client, clientManager, chatRoomManager) => {
  const ensureUserSelected = clientId => {
    const user = clientManager.getUserByClientId(clientId);

    if(!user) {
      console.log('select user first');
      return false;
    }

    return user;
  }


  const ensureValidChatRoom = chatRoomName => {
    const chatRoom = chatRoomManager.getChatRoomByName(chatRoomName);

    if(!chatRoom) {
      console.log('invalid chatRoom name: ' + chatRoomName);
      return false;
    }

    return chatRoom;
  };

  const ensureValidChatRoomAndUserSelected = chatRoomName => {
    return new Promise((resolve, reject) => {
      const chatRoom = ensureValidChatRoom(chatRoomName);
      const user = ensureUserSelected(client.id);

      if(chatRoom && user) {
        resolve({chatRoom, user});
      }

      reject();
    })
  }

  const handleEvent = (chatRoomName, createEntry) => {
    return ensureValidChatRoomAndUserSelected(chatRoomName)
        .then(({chatRoom, user}) => {
          const massage = Object.assign({user}, createEntry());
          chatRoom.addEntry(message);
          const messageWithChat = Object.assign({chat: chatRoomName}, message);
          chatRoom.broadcastMessage(messageWithChat);
          return chatRoom;
        })
  }

  return handleEvent;
};

const getChatHandlers = (client, clientManager, chatRoomManager) => {
  const handleEvent = makeHandleEvent(client, clientManager, chatRoomManager);

  const handleRegister = (userName, respondToClient) => {
    if(!clientManager.isUserAvailable(userName)) {
      return respondToClient('user is not available');
    }
    const user = clientManager.getUserByName(userName);
    clientManager.registerClient(client, user);
    return respondToClient(null, user);
  }

  const handleJoin = (chatRoomName, respondToClient) => {
    const createEntry = () => ({event: `joined ${chatRoomName}`});

    handleEvent(chatRoomName, createEntry)
        .then(chatRoom => {
          chatRoom.addUser(client);
          respondToClient(null, chatRoom.getChatHistory());
        })
        .catch(respondToClient);
  };

  const handleLeave = (chatRoomName, respondToClient) => {
    const createEntry = () => ({
      event: `left ${chatRoomName}`
    });

    handleEvent(chatRoomName, createEntry)
        .then(chatRoom => {
          chatRoom.removeUser(client.id);
          respondToClient(null);
        })
        .catch(respondToClient);
  };

  const handleMessage = ({chatRoomName, message} = {}, respondToClient) => {
    const createEntry = () => ({message});

    handleEvent(chatRoomName, createEntry)
        .then(() => respondToClient(null))
        .catch(respondToClient);
  };

  const handleGetChatRooms = respondToClient => {
    return respondToClient(null, chatRoomManager.getAllChatRooms());
  };

  const handleGetAvailableUsers = respondToClient => {
    return respondToClient(null, clientManager.getAvailableUsers());
  };

  const handleDisconnect = () => {
    clientManager.removeClient(client);
    chatRoomManager.removeClient(client);
  };
  return {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatRooms,
    handleGetAvailableUsers,
    handleDisconnect,
  };
};

module.exports = getChatHandlers;
