import { MOVE_TO_STOP, Step } from "./steps";

const addPoint = (roomName: string, x: number, y: number) => {
  if (!Memory.rails[roomName][x]) {
    Memory.rails[roomName][x] = [];
  }

  Memory.rails[roomName][x][y] = true;
};

export const rail = (a: RoomPosition, b: RoomPosition) => {
  const path = a.findPathTo(b);

  if (!Memory.rails[a.roomName]) {
    Memory.rails[a.roomName] = [];
  }

  addPoint(a.roomName, a.x, a.y);
  path.forEach((p) => {
    addPoint(a.roomName, p.x, p.y);
  });
};

export const stop = (name: string, pos: RoomPosition) => {
  Memory.stops[name] = pos;
};

export const setupRails = () => {
  Memory.rails = {};
  Memory.stops = {};
};

export const drawRails = () => {
  Memory.rails &&
    Object.entries(Memory.rails).map(([roomKey, rails]) => {
      const roomVisual = new RoomVisual(roomKey);

      rails.map((column, x) => {
        column &&
          column.map((isRail, y) => {
            if (isRail) roomVisual.circle(x, y);
          });
      });
    });

  Memory.stops &&
    Object.entries(Memory.stops).map(([stopKey, stop]) => {
      const roomVisual = new RoomVisual(stop.roomName);
      roomVisual.circle(stop, { fill: "red" });
      roomVisual.text(stopKey, stop, { align: "left" });
    });
};

export const moveToStop = (creepName: string, stopName: string) => {
  const creepPostiion = Game.creeps[creepName].pos;
  const stationPosition = new RoomPosition(
    Memory.stops[stopName].x,
    Memory.stops[stopName].y,
    Memory.stops[stopName].roomName
  );

  const result = PathFinder.search(creepPostiion, stationPosition, {
    roomCallback: (roomName) => {
      const costs = new PathFinder.CostMatrix();
      const rails = Memory.rails[roomName];

      for (let x = 0; x < 50; x++) {
        for (let y = 0; y < 50; y++) {
          costs.set(x, y, 0xff);
        }
      }

      for (let x = 0; x < rails.length; x++) {
        if (rails[x] != null) {
          for (let y = 0; y < rails[x].length; y++) {
            if (rails[x][y]) {
              costs.set(x, y, 1);
            }
          }
        }
      }

      return costs;
    },
  });

  Game.creeps[creepName].memory.path = result.path;
};

const isStepDone = (creepName: string, step: Step) => {
  const creep = Game.creeps[creepName];

  switch (step.type) {
    case MOVE_TO_STOP:
      return creep.pos.isEqualTo(
        new RoomPosition(
          Memory.stops[step.stop].x,
          Memory.stops[step.stop].y,
          Memory.stops[step.stop].roomName
        )
      );
  }
};

const initialiseStep = (creepName: string, step: Step) => {
  switch (step.type) {
    case MOVE_TO_STOP:
      moveToStop(creepName, step.stop);
  }
};

const progressStep = (creepName: string, step: Step) => {
  const creep = Game.creeps[creepName];

  switch (step.type) {
    case MOVE_TO_STOP:
      if (creep.memory.path && creep.memory.path.length > 0) {
        const nextPath = creep.memory.path.shift() as RoomPosition;
        creep.moveTo(
          new RoomPosition(nextPath.x, nextPath.y, nextPath.roomName)
        );
      }
  }
};

export const assignLoop = (creepName: string, loop: Step[]) => {
  Game.creeps[creepName].memory.loop = loop;
  Game.creeps[creepName].memory.currentStep = 0;

  initialiseStep(
    creepName,
    Game.creeps[creepName].memory.loop[
      Game.creeps[creepName].memory.currentStep
    ]
  );
};

export const updateCreep = (creep: Creep) => {
  if (creep.memory.loop) {
    if (isStepDone(creep.name, creep.memory.loop[creep.memory.currentStep])) {
      creep.memory.currentStep =
        (creep.memory.currentStep + 1) % creep.memory.loop.length;
      initialiseStep(creep.name, creep.memory.loop[creep.memory.currentStep]);
    }

    progressStep(creep.name, creep.memory.loop[creep.memory.currentStep]);
  }
};
