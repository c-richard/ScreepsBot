interface Game {
  spawn: any;
  rail: any;
  setupRails: any;
}

interface Memory {
  rails: {
    [key: string]: boolean[][];
  };
}
