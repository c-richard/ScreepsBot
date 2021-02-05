enum Role {
  Harvester = "harvester",
  Courier = "courier",
}

const spawn = (name: string, role: Role) => {
  let result;
  switch (role) {
    case Role.Harvester:
      result = Game.spawns["Spawn1"].spawnCreep([WORK, WORK, MOVE], name);
    case Role.Courier:
      result = Game.spawns["Spawn1"].spawnCreep([CARRY, CARRY, MOVE], name);
  }

  return result;
};

export default spawn;
