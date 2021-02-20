import { NodeType } from "augments/room/types";

const POSTMAN_ROLE = "p";

interface PostmanMemory {
  role: typeof POSTMAN_ROLE;
  delivering: boolean;
}

function moveToDeliveryPoint(creep: Creep): boolean {
  let [transferNode, path] = creep.pos.findClosestNodeByPath(
    NodeType.TRANSFER,
    (node) => {
      if (node.occupiedBy != null) return false;

      const [x, y] = node.point;
      const nodePosition = creep.room.getPositionAt(x, y) as RoomPosition;

      return (
        nodePosition.findInRange(FIND_MY_STRUCTURES, 1).filter((structure) => {
          switch (structure.structureType) {
            case STRUCTURE_EXTENSION:
              return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            case STRUCTURE_SPAWN:
              return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            default:
              return false;
          }
        }).length > 0
      );
    }
  );

  if (transferNode === null) {
    // if no buildings need energy, upgrade controller
    [transferNode, path] = creep.pos.findClosestNodeByPath(
      NodeType.TRANSFER,
      (node) => {
        if (node.occupiedBy != null) return false;
        return creep.room.isNodeAdjacentToNode(
          node,
          (adjNode) =>
            adjNode.actions.includes(NodeType.UPGRADE) &&
            adjNode.occupiedBy != null
        );
      }
    );
  }

  // assign and move towards
  if (transferNode && path) {
    transferNode.occupiedBy = creep.name;
    creep.room.assignNode(transferNode.point, creep);
    creep.setPath(path);
    creep.consumeStep();
    return true;
  }

  return false;
}

function deliver(creep: Creep): boolean {
  if (creep.memory.occupying !== null) {
    // transfer energy to structure
    const structureNeedingEnergy = creep.pos
      .findInRange(FIND_MY_STRUCTURES, 1)
      .filter((structure) => {
        switch (structure.structureType) {
          case STRUCTURE_EXTENSION:
            return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
          case STRUCTURE_SPAWN:
            return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
          default:
            return false;
        }
      });

    if (structureNeedingEnergy.length > 0) {
      return creep.transfer(structureNeedingEnergy[0], RESOURCE_ENERGY) === OK;
    }

    // transfer energy to creep
    const creepNeedingEnergy = creep.room.findAdjacentNodes(
      creep.memory.occupying,
      (adjNode) =>
        adjNode.actions.includes(NodeType.UPGRADE) && adjNode.occupiedBy != null
    );

    if (creepNeedingEnergy.length > 0) {
      const [x, y] = creepNeedingEnergy[0].point;
      const targetOfTransfer = creep.room.lookForAt(LOOK_CREEPS, x, y)[0];
      return creep.transfer(targetOfTransfer, RESOURCE_ENERGY) === OK;
    }
  }

  return false;
}

function moveToPickupPoint(creep: Creep): boolean {
  const [pickupNode, path] = creep.pos.findClosestNodeByPath(
    NodeType.PICKUP,
    (node) => {
      if (node.occupiedBy != null) return false;

      return creep.room.isNodeAdjacentToNode(
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
    creep.consumeStep();
    return true;
  }

  return false;
}

function pickup(creep: Creep): boolean {
  if (creep.memory.occupying !== null) {
    const adjacentHarvestPoint = creep.room.findAdjacentNodes(
      creep.memory.occupying,
      (adjNode) =>
        adjNode.actions.includes(NodeType.HARVEST) && adjNode.occupiedBy != null
    );

    if (adjacentHarvestPoint.length > 0) {
      const [x, y] = adjacentHarvestPoint[0].point;
      const droppedEnergy = creep.room.lookForAt(LOOK_ENERGY, x, y);
      if (droppedEnergy.length > 0) {
        return creep.pickup(droppedEnergy[0]) === OK;
      }
    }
  }

  return false;
}

function update(creep: Creep) {
  const postmanMemory = creep.memory.roleMemory as PostmanMemory;

  let success;

  // move and occupy a point
  if (creep.memory.occupying === null) {
    if (postmanMemory.delivering) {
      moveToDeliveryPoint(creep);
    } else {
      moveToPickupPoint(creep);
    }

    return;
  }

  // deliver or pickup
  if (postmanMemory.delivering) {
    success = deliver(creep);
  } else {
    success = pickup(creep);
  }

  // delivering -> picking up transition
  if (
    postmanMemory.delivering &&
    (success === false ||
      creep.store.getFreeCapacity() === creep.store.getCapacity())
  ) {
    postmanMemory.delivering = false;
    if (creep.memory.occupying)
      creep.room.unassignNode(creep.memory.occupying.point);
  }

  // picking up -> delivering transition
  if (
    !postmanMemory.delivering &&
    (success === false || creep.store.getFreeCapacity() === 0)
  ) {
    postmanMemory.delivering = true;
    if (creep.memory.occupying)
      creep.room.unassignNode(creep.memory.occupying.point);
  }
}

export default {
  role: POSTMAN_ROLE,
  init: () => null,
  update,
  getBody: () => [MOVE, CARRY, CARRY],
  getMemory: () => ({
    role: POSTMAN_ROLE,
    delivering: false,
  }),
};
