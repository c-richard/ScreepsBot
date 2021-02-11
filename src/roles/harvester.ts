const Harvester = {
  role: "h" as "h",
  init: (creep: Creep) => {},
  update: (creep: Creep) => {
    creep.move(RIGHT);
  },
  getBody: () => [MOVE, WORK, WORK],
  getMemory: (options: { flag: string }) => ({
    role: Harvester.role,
    flag: options.flag,
  }),
};

export default Harvester;
