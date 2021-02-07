export enum Role {
  Harvester = "h",
  Courier = "c",
}

declare global {
  interface StructureSpawn {
    spawnRole: (name: string, role: Role) => void;
  }
}

Spawn.prototype.spawnRole = function (name, role: Role) {
  let result;
  switch (role) {
    case Role.Harvester:
      result = this.spawnCreep([WORK, WORK, MOVE], name);
      break;
    case Role.Courier:
      result = this.spawnCreep([CARRY, CARRY, MOVE], name);
      break;
    default:
      throw Error("Unknown role");
  }

  return result;
};
