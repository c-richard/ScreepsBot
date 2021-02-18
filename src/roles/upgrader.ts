const Upgrader = {
  role: "u" as "u",
  init: (creep: Creep) => {
    const upgraderMemory = creep.memory.roleMemory as ReturnType<
      typeof Upgrader.getMemory
    >;

    creep.room.assignNode(upgraderMemory.upgradePoint, creep);
    const path = creep.pos.findPathToNode(upgraderMemory.upgradePoint);

    if (path) {
      creep.setPath(path);
      creep.consumeStep();
    }
  },
  update: (creep: Creep) => {
    const controller = creep.room.controller;

    if (controller) {
      creep.upgradeController(controller);
    }
  },
  getBody: () => [MOVE, WORK, WORK],
  getMemory: (options: { upgradePoint: Point }) => ({
    role: Upgrader.role,
    upgradePoint: options.upgradePoint,
  }),
};

export default Upgrader;
