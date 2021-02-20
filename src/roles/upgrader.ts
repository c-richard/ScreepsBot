export const UPGRADE_ROLE: "u" = "u";

export interface UpgraderMemory {
  role: typeof UPGRADE_ROLE;
  point: Point;
}

export interface UpgraderOptions {}

function init(creep: Creep) {
  const upgraderMemory = creep.memory.roleMemory as UpgraderMemory;

  creep.room.assignNode(upgraderMemory.point, creep);
  const path = creep.pos.findPathToNode(upgraderMemory.point);

  if (path) {
    creep.setPath(path);
    creep.consumeStep();
  }
}

function update(creep: Creep) {
  const controller = creep.room.controller;

  if (controller) {
    creep.upgradeController(controller);
  }
}

export default {
  role: UPGRADE_ROLE,
  init,
  update,
  getBody: () => [MOVE, CARRY, WORK],
  getMemory: (options: { point: Point }) => ({
    role: UPGRADE_ROLE,
    ...options,
  }),
};
