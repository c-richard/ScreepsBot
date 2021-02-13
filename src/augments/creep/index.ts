import getRole from "../../roles";

Creep.prototype.moveByRoute = function (pos: RoomPosition, distance: number) {
  const creepPostiion = this.pos;

  const result = PathFinder.search(creepPostiion, pos, {
    roomCallback: (_) => {
      const costs = new PathFinder.CostMatrix();

      for (let x = 0; x < 50; x++) {
        for (let y = 0; y < 50; y++) {
          costs.set(x, y, this.room.memory.paths[x][y]);

          // todo replace with better traffic handling
          if (this.room.lookForAt(LOOK_CREEPS, x, y).length > 0) {
            costs.set(x, y, 0xff);
          }
        }
      }

      return costs;
    },
  });

  if (result.incomplete) {
    this.memory.path = result.path.filter(
      (p) => !pos.inRangeTo(p, distance - 1)
    );
  } else {
    this.memory.path = result.path.slice(0, -distance);
  }
};

Creep.prototype.update = function () {
  if (this.memory.path.length > 0) {
    const nextPath = this.memory.path[0];
    const hasMoved = this.moveTo(
      new RoomPosition(nextPath.x, nextPath.y, nextPath.roomName)
    );
    if (hasMoved === OK) {
      this.memory.path.shift();
    }
    return;
  }

  if (!this.memory.initialised) {
    if (this.spawning) return;
    getRole(this.memory.roleMemory.role).init(this);
    this.memory.initialised = true;
  } else {
    getRole(this.memory.roleMemory.role).update(this);
  }
};

Creep.prototype.visualise = function () {
  if (this.memory.path.length > 0) {
    this.memory.path.forEach((p) => {
      this.room.visual.circle(p.x, p.y, { fill: "red" });
    });
  }
};

Creep.prototype.getMemory = function () {
  return {
    path: [],
    initialised: false,
  };
};
