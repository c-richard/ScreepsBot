import { Graph, Node, Dijkstra } from "dijkstra-pathfinder";

RoomPosition.prototype._graphFromNodes = function () {
  const roomMemory = Game.rooms[this.roomName].memory;
  const graph = new Graph();
  const graphNodes: { [key: string]: Node } = {};

  Object.entries(roomMemory.nodeById).forEach(([id, node]) => {
    graphNodes[id] = new Node(id);
  });

  Object.entries(roomMemory.nodeById).forEach(([id, node]) => {
    node.adjacency.forEach((adjacencyId) => {
      graph.addArc(
        graphNodes[id],
        graphNodes[adjacencyId],
        node.paths[adjacencyId].length
      );
    });
  });

  return [graph, graphNodes];
};

RoomPosition.prototype._nodeIdPathToDirections = function (
  nodeIdPath: string[]
): DirectionConstant[] {
  const directions: DirectionConstant[] = [];
  for (let i = 0; i < nodeIdPath.length - 1; i++) {
    const A = Game.rooms[this.roomName].memory.nodeById[nodeIdPath[i]];
    const bId = Game.rooms[this.roomName].memory.nodeById[nodeIdPath[i + 1]].id;

    A.paths[bId].forEach((d) => {
      directions.push(d);
    });
  }

  return directions;
};

RoomPosition.prototype.findPathToNode = function ([x, y]: Point) {
  const [graph, graphNodes] = this._graphFromNodes();

  // Find shortes path to point
  const dijkstra = new Dijkstra(
    graph,
    graphNodes[Game.rooms[this.roomName].memory.idByPoint[this.x][this.y]]
  );
  dijkstra.calculate();
  const pathToDestination = dijkstra.getPathTo(
    graphNodes[Game.rooms[this.roomName].memory.idByPoint[x][y]]
  );

  if (pathToDestination != null) {
    return this._nodeIdPathToDirections(
      pathToDestination.map((node) => node.payload)
    );
  }

  return null;
};

RoomPosition.prototype.findClosestNodeByPath = function (
  type,
  filter = () => true
) {
  const [graph, graphNodes] = this._graphFromNodes();

  // calculate dijkstra from this point
  const dijkstra = new Dijkstra(
    graph,
    graphNodes[Game.rooms[this.roomName].memory.idByPoint[this.x][this.y]]
  );
  dijkstra.calculate();

  // get a list of nodes of type and valid wrt. filter
  const validNodes = Object.entries(Game.rooms[this.roomName].memory.nodeById)
    .filter(([_, node]) => node.actions.includes(type) && filter(node))
    .map(([nodeId, _]) => nodeId);

  if (validNodes.length > 0) {
    // find shortest path amongst valid nodes
    let shortestPath: string[] | null = null;
    let closestNode: string | null = null;

    validNodes.forEach((nodeId) => {
      const path = dijkstra.getPathTo(graphNodes[nodeId]);
      if (
        path != null &&
        (shortestPath == null || path.length < shortestPath.length)
      ) {
        shortestPath = path.map((p) => p.payload);
        closestNode = nodeId;
      }
    });

    if (shortestPath != null && closestNode != null) {
      return [
        Game.rooms[this.roomName].memory.nodeById[closestNode],
        this._nodeIdPathToDirections(shortestPath),
      ];
    }
  }

  return [null, null];
};
