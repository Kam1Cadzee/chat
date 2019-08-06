function Chat() {
  const socket = useRef<SocketIOClient.Socket>();
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    socket.current = io.connect(urlChat);
  }, []);

  const handleGetAllRooms = () => {
    if (!socket.current) return;

    socket.current.emit("chatrooms", (err: any, rooms: any) => {
      setRooms(rooms);
    });
  };
  const handleGetAllUsers = () => {
    if (!socket.current) return;

    debugger;
    socket.current.emit("availableUsers", (err: any, users: any) => {
      setUsers(users);
    });
  };

  return (
    <div>
      <h1>Chat</h1>
      <button onClick={handleGetAllRooms}>Get rooms</button>
      {rooms.map(room => {
        return <p>{room.name}</p>;
      })}
      <button onClick={handleGetAllUsers}>Get Users</button>
      {users.map(user => {
        return <p>{`Name: ${user.name}, Last name: ${user.lastName}`}</p>;
      })}
    </div>
  );
}
