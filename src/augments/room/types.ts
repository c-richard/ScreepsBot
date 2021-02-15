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
    occupiedBy: string | null;
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
    findAdjacentNodes(
      node: RoomNode,
      filter: (node: RoomNode) => boolean
    ): RoomNode[];
    isNodeAdjacentTo(
      node: RoomNode,
      filter: (node: RoomNode) => boolean
    ): boolean;
    removeNode: (p: Point) => void;
    addConnection: (p1: Point, p2: Point) => void;
    removeConnection: (p1: Point, p2: Point) => void;
    visualise: () => void;
    init: () => void;
  }
}
