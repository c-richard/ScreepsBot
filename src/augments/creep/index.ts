import getRole from "../../roles";

Creep.prototype.setPath = function (path: DirectionConstant[]) {
  this.memory.path = path;
};

Creep.prototype.update = function () {
  if (this.memory.path.length > 0) {
    const nextPath = this.memory.path[0];
    const hasMoved = this.move(nextPath);

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

Creep.prototype.visualise = function () {};

Creep.prototype.getMemory = function () {
  return {
    path: [],
    initialised: false,
    occupying: null,
  };
};
