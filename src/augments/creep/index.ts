import getRole from "../../roles";

Creep.prototype.moveByRoute = function (pos: RoomPosition, distance: number) {
  const creepPostiion = this.pos;

  const result = PathFinder.search(creepPostiion, pos, {
    roomCallback: (_) => {
      const costs = new PathFinder.CostMatrix();

      for (let x = 0; x < 50; x++) {
        for (let y = 0; y < 50; y++) {
          costs.set(x, y, this.room.memory.paths[x][y]);
        }
      }

      return costs;
    },
  });

  if (result.incomplete) {
    let toChopOff = 0;
    let lastPath = result.path[result.path.length];
    while (lastPath.inRangeTo(pos, distance)) {
      toChopOff += 1;
      lastPath = result.path[result.path.length - toChopOff];
    }

    this.memory.path = result.path.slice(0, -toChopOff);
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
