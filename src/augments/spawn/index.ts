import { getRole } from "../../roles";

Spawn.prototype.spawnRole = function (name: string, role: any, options: any) {
  return this.spawnCreep(getRole(role).getBody(), name, {
    memory: {
      path: [],
      initialised: false,
      roleMemory: getRole(role).getMemory(options),
    },
  });
};
