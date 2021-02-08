import { getRole } from "../../roles";

Spawn.prototype.spawnRole = function (name, role, options) {
  return this.spawnCreep(getRole(role).getBody(), name, {
    memory: {
      path: [],
      initialised: false,
      role,
      roleMemory: getRole(role).getMemory(options),
    },
  });
};
