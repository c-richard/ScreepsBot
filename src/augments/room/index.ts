Room.prototype._setPath = function (p, v) {
  let origin: RoomPosition;

  if (typeof p === "string") {
    origin = Game.flags[p].pos;
  } else {
    const [x, y] = p;
    origin = this.getPositionAt(x, y) as RoomPosition;
  }

  this.memory.paths[origin.x][origin.y] = v;
};

Room.prototype._setRoute = function (p1, p2, v) {
  let origin: RoomPosition;
  let destination: RoomPosition;

  if (typeof p1 === "string") {
    origin = Game.flags[p1].pos;
  } else {
    const [x, y] = p1;
    origin = this.getPositionAt(x, y) as RoomPosition;
  }

  if (typeof p2 === "string") {
    destination = Game.flags[p2].pos;
  } else {
    const [x, y] = p2;
    destination = this.getPositionAt(x, y) as RoomPosition;
  }

  const path = origin.findPathTo(destination);

  this.memory.paths[origin.x][origin.y] = v;

  path.forEach((p) => {
    this.memory.paths[p.x][p.y] = v;
  });
};

Room.prototype.addPath = function (p) {
  this._setPath(p, 1);
};

Room.prototype.removePath = function (p) {
  this._setPath(p, 0xff);
};

Room.prototype.addRoute = function (p1, p2) {
  this._setRoute(p1, p2, 1);
};

Room.prototype.removeRoute = function (p1, p2) {
  this._setRoute(p1, p2, 0xff);
};

Room.prototype.visualise = function () {
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      if (this.memory.paths[x][y] === 1) {
        this.visual.circle(x, y);
      }
    }
  }
};

Room.prototype.init = function () {
  this.memory.paths = [];

  for (let x = 0; x < 50; x++) {
    this.memory.paths.push([]);
    for (let y = 0; y < 50; y++) {
      this.memory.paths[x].push(0xff);
    }
  }

  this.memory.initialised = true;
};

// Initialisation
Object.values(Game.rooms).forEach((room) => {
  if (!room.memory.initialised) {
    room.init();
  }
});
