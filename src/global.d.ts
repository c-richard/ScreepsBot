interface Game {
  spawn: any;
  rail: any;
  setupRails: any;
  stop: any;
  moveToStop: any;
  assignLoop: any;
}

interface Memory {
  rails: {
    [key: string]: boolean[][];
  };
  stops: {
    [stopName: string]: RoomPosition;
  };
}
