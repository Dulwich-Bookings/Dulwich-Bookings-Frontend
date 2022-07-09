class Room {
  id: string;
  roomName: string;
  vacancy: boolean;
  bookmark: boolean;

  constructor(id: string, roomName: string, vacancy: boolean, bookmark: boolean) {
    this.id = id;
    this.roomName = roomName;
    this.vacancy = vacancy;
    this.bookmark = bookmark;
  }
}

export default Room;
