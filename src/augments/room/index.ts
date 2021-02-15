import { NodeType } from "./types";

function insert2d<T>(
  object2d: { [key: string]: { [key: string]: T } },
  vecto2dIndex: [number | string, number | string],
  v: T
) {
  const [a, b] = vecto2dIndex;

  if (object2d[a]) {
    object2d[a][b] = v;
  } else {
    object2d[a] = { [b]: v };
  }
}

function delete2d(
  object2d: { [key: string]: { [key: string]: any } },
  vecto2dIndex: [number | string, number | string]
) {
  const [a, b] = vecto2dIndex;

  if (object2d[a] && object2d[a][b]) {
    delete object2d[a][b];
  }
}

Room.prototype.addNode = function (point: Point, actions: NodeType[]) {
  const node: RoomNode = {
    id: `${point[0]}-${point[1]}`,
    adjacency: [],
    paths: {},
    point,
    actions,
    occupiedBy: null,
  };

  this.memory.nodeById[node.id] = node;
  insert2d(this.memory.idByPoint, point, node.id);
};

Room.prototype.removeNode = function ([x, y]: Point) {
  const id = this.memory.idByPoint[x][y];
  const node = this.memory.nodeById[id];

  node.adjacency.forEach((nodeId) => {
    const connection = this.memory.nodeById[nodeId];

    // remove this node from its connections adjacency list
    connection.adjacency = connection.adjacency.filter(
      (nodeId) => nodeId !== id
    );

    // remove path to this node
    delete connection.paths[id];
  });

  // delete the node itself
  delete this.memory.nodeById[id];
  delete2d(this.memory.idByPoint, [x, y]);
};

Room.prototype.addConnection = function ([x1, y1]: Point, [x2, y2]: Point) {
  const aId = this.memory.idByPoint[x1][y1];
  const bId = this.memory.idByPoint[x2][y2];
  const aNode = this.memory.nodeById[aId];
  const bNode = this.memory.nodeById[bId];

  // Make respectively adjacent
  aNode.adjacency.push(bId);
  bNode.adjacency.push(aId);

  const foundPath = new RoomPosition(x1, y1, this.name).findPathTo(x2, y2);

  aNode.paths[bId] = foundPath.map((pathStep) => pathStep.direction);
  bNode.paths[aId] = foundPath
    .reverse()
    .map(
      (pathStep) => (((pathStep.direction + 3) % 8) + 1) as DirectionConstant
    );
};

Room.prototype.removeConnection = function ([x1, y1]: Point, [x2, y2]: Point) {
  const aId = this.memory.idByPoint[x1][y1];
  const bId = this.memory.idByPoint[x2][y2];
  const aNode = this.memory.nodeById[aId];
  const bNode = this.memory.nodeById[bId];

  aNode.adjacency = aNode.adjacency.filter((nodeId) => nodeId !== bId);
  bNode.adjacency = bNode.adjacency.filter((nodeId) => nodeId !== aId);

  delete aNode.paths[bId];
  delete bNode.paths[aId];
};

Room.prototype.visualise = function () {
  Object.values(this.memory.nodeById).map((node) => {
    Object.values(node.paths).forEach((directions) => {
      let [x, y] = node.point;

      directions.forEach((d) => {
        switch (d) {
          case TOP:
            y -= 1;
            break;
          case BOTTOM:
            y += 1;
            break;
          case LEFT:
            x -= 1;
            break;
          case RIGHT:
            x += 1;
            break;
          case TOP_LEFT:
            y -= 1;
            x -= 1;
            break;
          case TOP_RIGHT:
            y -= 1;
            x += 1;
            break;
          case BOTTOM_LEFT:
            y += 1;
            x -= 1;
            break;
          case BOTTOM_RIGHT:
            y += 1;
            x += 1;
            break;
        }

        this.visual.circle(x, y);
      });
    });

    const [x, y] = node.point;
    const actionIndex = Math.floor(Math.random() * node.actions.length);
    const action = node.actions[actionIndex];
    this.visual.text(action, x, y);
  });
};

Room.prototype.findAdjacentNodes = function (
  node: RoomNode,
  filter: (node: RoomNode) => boolean
): RoomNode[] {
  const nodesAdjacent = Object.entries(node.paths)
    .filter(([_, path]) => path.length === 1)
    .map(([nodeId, _]) => nodeId);

  const validAdjacentNode = nodesAdjacent.filter((nodeId) =>
    filter(this.memory.nodeById[nodeId])
  );

  return validAdjacentNode.map((nodeId) => this.memory.nodeById[nodeId]);
};

Room.prototype.isNodeAdjacentTo = function (
  node: RoomNode,
  filter: (node: RoomNode) => boolean
): boolean {
  return this.findAdjacentNodes(node, filter).length > 0;
};

Room.prototype.init = function () {
  this.memory.nodeById = {};
  this.memory.idByPoint = {};
  this.memory.initialised = true;
};

// Initialisation
Object.values(Game.rooms).forEach((room) => {
  if (!room.memory.initialised) {
    room.init();
  }
});
