import { HARVESTER_ROLE } from "roles/harvester";
import { POSTMAN_ROLE } from "roles/postman";
import { UPGRADE_ROLE } from "roles/upgrader";
import getRole from "../../roles";

function generateName() {
  if (Memory.currentName == null) {
    Memory.currentName = 0;
  } else {
    Memory.currentName += 1;
  }

  return `${Memory.currentName}`;
}

Spawn.prototype.init = function () {
  this.memory = {
    queue: [],
  };
};

Spawn.prototype.update = function () {
  if (!this.spawning && this.memory.queue.length > 0) {
    const nextInQueue = this.memory.queue[0];

    let result;
    switch (nextInQueue.role) {
      case HARVESTER_ROLE:
        result = this.spawnRole(nextInQueue.role, nextInQueue.opt);
        break;
      case UPGRADE_ROLE:
        result = this.spawnRole(nextInQueue.role, nextInQueue.opt);
        break;
      case POSTMAN_ROLE:
        result = this.spawnRole(nextInQueue.role);
        break;
    }

    if (result === OK) this.memory.queue.shift();
  }
};

Spawn.prototype.spawnRole = function (role: any, options?: any) {
  return this.spawnCreep(getRole(role).getBody(), generateName(), {
    memory: {
      lastPos: [-1, -1],
      path: [],
      initialised: false,
      occupying: null,
      roleMemory: getRole(role).getMemory(options),
    },
  });
};

Spawn.prototype.queueSpawnRole = function (role: any, opt?: any) {
  this.memory.queue.push({ role, opt });
  return OK;
};
