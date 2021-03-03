import "augments/room";
import "augments/spawn";
import "augments/creep";
import "augments/roomPosition";
import "augments/global/index";

import { HARVESTER_ROLE } from "roles/harvester";
import { UPGRADE_ROLE } from "roles/upgrader";
import { POSTMAN_ROLE } from "roles/postman";

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

  const roleMemory = Memory.creeps[creepName].roleMemory;
  switch (roleMemory.role) {
    case HARVESTER_ROLE:
      Game.spawns.Spawn1.queueSpawnRole(HARVESTER_ROLE, {
        point: roleMemory.point,
      });
    case UPGRADE_ROLE:
      Game.spawns.Spawn1.queueSpawnRole(UPGRADE_ROLE, {
        point: roleMemory.point,
      });
    case POSTMAN_ROLE:
      Game.spawns.Spawn1.queueSpawnRole(POSTMAN_ROLE);
  }

  delete Memory.creeps[creepName];
}

const loop = () => {
  Object.values(Game.rooms).map((r) => {
    r.visualise();
  });

  Object.keys(Memory.spawns).map((spawnName) => {
    const spawn = Game.spawns[spawnName];
    spawn.update();
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
