const Postman = {
  role: "p" as "p",
  init: (creep: Creep) => {},
  deliver: (creep: Creep) => {
    const closestStructureNeedingEnergy = creep.pos.findClosestByPath(
      FIND_MY_STRUCTURES,
      {
        filter: (structure) => {
          switch (structure.structureType) {
            case STRUCTURE_SPAWN:
              return structure.store.getCapacity(RESOURCE_ENERGY) > 0;
            default:
              return false;
          }
        },
        costCallback: function (roomName, costMatrix) {
          for (let x = 0; x < 50; x++) {
            for (let y = 0; y < 50; y++) {
              costMatrix.set(x, y, creep.room.memory.paths[x][y]);
            }
          }
        },
      }
    );

    if (closestStructureNeedingEnergy) {
      if (creep.pos.isNearTo(closestStructureNeedingEnergy.pos)) {
        creep.transfer(closestStructureNeedingEnergy, RESOURCE_ENERGY);
      } else {
        creep.moveByRoute(closestStructureNeedingEnergy.pos, 1);
      }
    }
  },
  pickup: (creep: Creep) => {
    const closestDroppedEnergy = creep.pos.findClosestByPath(
      FIND_DROPPED_RESOURCES,
      {
        filter: (resource) => resource.resourceType === RESOURCE_ENERGY,
        costCallback: function (roomName, costMatrix) {
          for (let x = 0; x < 50; x++) {
            for (let y = 0; y < 50; y++) {
              costMatrix.set(x, y, creep.room.memory.paths[x][y]);
            }
          }
        },
      }
    );

    if (closestDroppedEnergy) {
      if (creep.pos.isNearTo(closestDroppedEnergy.pos)) {
        creep.pickup(closestDroppedEnergy);
      } else {
        creep.moveByRoute(closestDroppedEnergy.pos, 1);
      }
    }
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

    if (creep.store.getFreeCapacity() === 0) {
      postmanMemory.delivering = true;
    }

    if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
      postmanMemory.delivering = false;
    }
  },
  getBody: () => [MOVE, CARRY, CARRY],
  getMemory: (options: {}) => ({
    role: Postman.role,
    delivering: false,
  }),
};

export default Postman;
