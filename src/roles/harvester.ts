export const HARVESTER_ROLE: "h" = "h";

export interface HarvesterMemory {
  role: typeof HARVESTER_ROLE;
  point: Point;
}

export interface HarvesterOptions {
  point: Point;
}

function init(creep: Creep) {
  const harvesterMemory = creep.memory.roleMemory as HarvesterMemory;

  creep.room.assignNode(harvesterMemory.point, creep);
  const path = creep.pos.findPathToNode(harvesterMemory.point);

  if (path) {
    creep.setPath(path);
    creep.consumeStep();
  }
}

function update(creep: Creep) {
  const source = creep.pos.findClosestByRange(FIND_SOURCES);

  if (source) {
    creep.harvest(source);
  }
}

export default {
  role: HARVESTER_ROLE,
  init,
  update,
  getBody: () => [MOVE, WORK, WORK],
  getMemory: (options: { point: Point }) => ({
    role: HARVESTER_ROLE,
    ...options,
  }),
};
