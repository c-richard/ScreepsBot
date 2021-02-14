export enum NodeType {
  UPGRADE = "u",
  TRANSFER = "t",
  PICKUP = "p",
  HARVEST = "h",
}

declare global {
  interface RoomNode {
    id: string;
    adjacency: string[];
    paths: {
      [nodeId: string]: DirectionConstant[];
    };
    point: Point;
    actions: NodeType[];
  }

  interface RoomMemory {
    initialised?: boolean;
    nodeById: {
      [nodeId: string]: RoomNode;
    };
    idByPoint: {
      [x: number]: {
        [y: number]: string;
      };
    };
  }

  interface Room {
    addNode: (p: Point, actions: NodeType[]) => void;
    removeNode: (p: Point) => void;
    addConnection: (p1: Point, p2: Point) => void;
    removeConnection: (p1: Point, p2: Point) => void;
    visualise: () => void;
    init: () => void;
  }
}
