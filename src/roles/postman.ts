const Postman = {
  role: "p" as "p",
  init: (creep: Creep) => {},
  deliver: (creep: Creep) => {
    const closestFlagWithCapacity = creep.pos.findClosestByPath(
      Object.values(Game.flags)
        .filter((flag) => flag.hasEnergyCapacity())
        .map((flag) => flag)
    );

    if (closestFlagWithCapacity) {
      if (creep.pos.isNearTo(closestFlagWithCapacity.pos)) {
        const structures = creep.pos.findInRange(FIND_MY_STRUCTURES, 1);

        const structuresNeedingEnergy = structures.filter((structure) => {
          switch (structure.structureType) {
            case STRUCTURE_SPAWN:
              return structure.store.getCapacity(RESOURCE_ENERGY) > 0;
            case STRUCTURE_CONTROLLER:
              return true;
            default:
              return false;
          }
        });

        if (structuresNeedingEnergy.length > 0) {
          creep.transfer(structuresNeedingEnergy[0], RESOURCE_ENERGY);
        }
      } else {
        creep.moveToFlag(closestFlagWithCapacity.name);
      }
    }
  },
  pickup: (creep: Creep) => {
    const closestFlagWithEnergy = creep.pos.findClosestByPath(
      Object.values(Game.flags)
        .filter((flag) => flag.hasEnergy())
        .map((flag) => flag)
    );

    if (closestFlagWithEnergy) {
      if (creep.pos.isNearTo(closestFlagWithEnergy.pos)) {
        const droppedEnergy = creep.pos
          .findInRange(FIND_DROPPED_RESOURCES, 1)
          .filter((resource) => resource.resourceType === RESOURCE_ENERGY);

        if (droppedEnergy.length > 0) {
          creep.pickup(droppedEnergy[0]);
        }
      } else {
        creep.moveToFlag(closestFlagWithEnergy.name);
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
