Flag.prototype.hasEnergyCapacity = function () {
  const structures = this.pos.findInRange(FIND_MY_STRUCTURES, 1);

  const structuresNeedingEnergy = structures.filter((structure) => {
    switch (structure.structureType) {
      case STRUCTURE_SPAWN:
        return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      case STRUCTURE_CONTROLLER:
        return true;
      default:
        return false;
    }
  });

  return structuresNeedingEnergy.length > 0;
};

Flag.prototype.hasEnergy = function () {
  const energyResourcesNearby = this.pos
    .findInRange(FIND_DROPPED_RESOURCES, 1)
    .map((resource) => resource.resourceType === RESOURCE_ENERGY);
  return energyResourcesNearby.length > 0;
};
