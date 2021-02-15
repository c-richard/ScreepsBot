import { NodeType } from "augments/room/types";
import { Graph, Node } from "dijkstra-pathfinder";

declare global {
  interface RoomPosition {
    _graphFromNodes(): [Graph, { [key: string]: Node }];
    _nodeIdPathToDirections(nodeIdPath: string[]): DirectionConstant[];
    findPathToNode(point: Point): DirectionConstant[] | null;
    findClosestNodeByPath(
      type: NodeType,
      filter?: (node: RoomNode) => boolean
    ): [RoomNode, DirectionConstant[]] | [null, null];
  }
}

export {};
