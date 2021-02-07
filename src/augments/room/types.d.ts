interface RoomMemory {
  initialised?: boolean;
  paths: number[][];
}

interface Room {
  _setPath: (p1: Point | string, value: number) => void;
  _setRoute: (p1: Point | string, p2: Point | string, value: number) => void;
  addPath: (p1: Point | string) => void;
  removePath: (p1: Point | string) => void;
  addRoute: (p1: Point | string, p2: Point | string) => void;
  removeRoute: (p1: Point | string, p2: Point | string) => void;
  visualise: () => void;
  init: () => void;
}
