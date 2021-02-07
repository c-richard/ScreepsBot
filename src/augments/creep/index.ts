Creep.prototype.moveToFlag = function (flagName) {
  const creepPostiion = this.pos;
  const flagPosition = Game.flags[flagName].pos;

  const result = PathFinder.search(creepPostiion, flagPosition, {
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

  this.memory.path = result.path;
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
  }
};

Creep.prototype.visualise = function () {
  if (this.memory.path.length > 0) {
    this.memory.path.forEach((p) => {
      this.room.visual.circle(p.x, p.y, { fill: "red" });
    });
  }
};

Creep.prototype.init = function () {
  this.memory.path = [];
  this.memory.initialised = true;
};

// Initialisation
Object.values(Game.creeps).forEach((creep) => {
  if (!creep.memory.initialised) {
    creep.init();
  }
});
