const Harvester = {
  role: "h" as "h",
  init: (creep: Creep) => {
    const harvesterMemory = creep.memory.roleMemory as ReturnType<
      typeof Harvester.getMemory
    >;

    const [x, y] = harvesterMemory.harvestPoint;
    const nodeId = creep.room.memory.idByPoint[x][y];
    creep.room.memory.nodeById[nodeId].occupiedBy = creep.name;
    creep.memory.occupying = creep.room.memory.nodeById[nodeId];

    const path = creep.pos.findPathToNode(harvesterMemory.harvestPoint);

    if (path) {
      creep.setPath(path);
    }
  },
  update: (creep: Creep) => {
    const source = creep.pos.findClosestByRange(FIND_SOURCES);

    if (source) {
      creep.harvest(source);
    }
  },
  getBody: () => [MOVE, WORK, WORK],
  getMemory: (options: { harvestPoint: Point }) => ({
    role: Harvester.role,
    harvestPoint: options.harvestPoint,
  }),
};

export default Harvester;
