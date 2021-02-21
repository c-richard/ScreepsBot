import "augments/room";
import "augments/spawn";
import "augments/creep";
import "augments/roomPosition";

function cleanupCreep(creepName: string) {
  const occupyingNodeId = Memory.creeps[creepName].occupying?.id;
  if (occupyingNodeId) {
    // de occupy node
    Object.values(Memory.rooms).forEach((r) => {
      if (r.nodeById[occupyingNodeId] != null) {
        r.nodeById[occupyingNodeId].occupiedBy = null;
      }
    });
  }

  // clear memory;
  delete Memory.creeps[creepName];
}

const loop = () => {
  Object.values(Game.rooms).map((r) => {
    r.visualise();
  });

  Object.keys(Memory.creeps).map((creepName) => {
    const creep = Game.creeps[creepName];

    if (creep != null) {
      creep.visualise();
      creep.update();
    } else {
      cleanupCreep(creepName);
    }
  });
};

export { loop };
