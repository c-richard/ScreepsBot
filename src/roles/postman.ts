import { NodeType } from "augments/room/types";

const Postman = {
  role: "p" as "p",
  init: () => {},
  deliver: (creep: Creep) => {
    // const closestStructureNeedingEnergy = creep.pos.findClosestAlongRoute(
    //   FIND_MY_STRUCTURES,
    //   {
    //     filter: (structure) => {
    //       switch (structure.structureType) {
    //         case STRUCTURE_SPAWN:
    //           return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    //         case STRUCTURE_EXTENSION:
    //           return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    //         default:
    //           return false;
    //       }
    //     },
    //     distanceTolerance: 1,
    //   }
    // );
    // if (closestStructureNeedingEnergy) {
    //   if (creep.pos.isNearTo(closestStructureNeedingEnergy.pos)) {
    //     creep.transfer(closestStructureNeedingEnergy, RESOURCE_ENERGY);
    //   } else {
    //     creep.moveByRoute(closestStructureNeedingEnergy.pos, 1);
    //   }
    // }
  },
  pickup: (creep: Creep) => {
    if (creep.memory.occupying == null) {
      // find a new node to occupy
      const [pickupNode, path] = creep.pos.findClosestNodeByPath(
        NodeType.PICKUP,
        (node) => {
          if (node.occupiedBy != null) return false;

          return creep.room.isNodeAdjacentTo(
            node,
            (adjNode) =>
              adjNode.actions.includes(NodeType.HARVEST) &&
              adjNode.occupiedBy != null
          );
        }
      );

      // assign and move towards
      if (pickupNode && path) {
        pickupNode.occupiedBy = creep.name;
        creep.room.assignNode(pickupNode.point, creep);
        creep.setPath(path);
      }

      return;
    }

    // find the adjacent harvest node
    const [x, y] = creep.room.findAdjacentNodes(
      creep.memory.occupying,
      (adjNode) =>
        adjNode.actions.includes(NodeType.HARVEST) && adjNode.occupiedBy != null
    )[0].point;

    // pickup the dropped energy there
    creep.pickup(creep.room.lookForAt(LOOK_ENERGY, x, y)[0]);
  },
  update: (creep: Creep) => {
    const postmanMemory = creep.memory.roleMemory as ReturnType<
      typeof Postman.getMemory
    >;

    if (postmanMemory.delivering) {
      Postman.deliver(creep);
    } else {
      Postman.pickup(creep);
    }

    if (!postmanMemory.delivering && creep.store.getFreeCapacity() === 0) {
      postmanMemory.delivering = true;
      if (creep.memory.occupying)
        creep.room.unassignNode(creep.memory.occupying.point);
    }

    if (
      postmanMemory.delivering &&
      creep.store.getFreeCapacity() === creep.store.getCapacity()
    ) {
      postmanMemory.delivering = false;
      if (creep.memory.occupying)
        creep.room.unassignNode(creep.memory.occupying.point);
    }
  },
  getBody: () => [MOVE, CARRY, CARRY],
  getMemory: (options: {}) => ({
    role: Postman.role,
    delivering: false,
  }),
};

export default Postman;
