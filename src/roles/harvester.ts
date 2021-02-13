const Harvester = {
  role: "h" as "h",
  init: (creep: Creep) => {
    const harvesterMemory = creep.memory.roleMemory as FirstArgument<
      typeof Harvester.getMemory
    >;
    creep.moveByRoute(Game.flags[harvesterMemory.flag].pos, 1);
  },
  update: (creep: Creep) => {
    const source = creep.pos.findClosestByRange(FIND_SOURCES);

    if (source) {
      creep.harvest(source);
    }
  },
  getBody: () => [MOVE, WORK, WORK],
  getMemory: (options: { flag: string }) => ({
    role: Harvester.role,
    flag: options.flag,
  }),
};

export default Harvester;
