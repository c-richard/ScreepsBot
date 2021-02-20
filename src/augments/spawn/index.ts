import getRole from "../../roles";

const generateName = () => Math.floor(Math.random() * 9999).toString();

Spawn.prototype.spawnRole = function (role: any, options?: any) {
  return this.spawnCreep(getRole(role).getBody(), generateName(), {
    memory: {
      path: [],
      initialised: false,
      occupying: null,
      roleMemory: getRole(role).getMemory(options),
    },
  });
};
