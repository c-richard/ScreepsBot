import getRole from "../../roles";

Creep.prototype.setPath = function (path: DirectionConstant[]) {
  this.memory.path = path;
};

Creep.prototype.consumeStep = function () {
  if (this.memory.path.length > 0) {
    const [x, y] = this.memory.lastPos;

    if (this.pos.x !== x || this.pos.y !== y) {
      this.memory.lastPos = [this.pos.x, this.pos.y];
      this.memory.path.shift();
    }

    this.move(this.memory.path[0]);

    return true;
  }

  return false;
};

Creep.prototype.update = function () {
  if (!this.memory.initialised) {
    if (this.spawning) return;
    this.memory.lastPos = [this.pos.x, this.pos.y];
    getRole(this.memory.roleMemory.role).init(this);
    this.memory.initialised = true;
  } else {
    if (this.consumeStep()) return;
    getRole(this.memory.roleMemory.role).update(this);
  }
};

Creep.prototype.visualise = function () {};
