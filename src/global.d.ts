interface Game {
  spawn: any;
  rail: any;
  setupRails: any;
  stop: any;
}

interface Memory {
  rails: {
    [key: string]: boolean[][];
  };
  stops: {
    [stopName: string]: RoomPosition;
  };
}
