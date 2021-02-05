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

export const setupRails = () => {
  Memory.rails = {};
};

export const drawRails = () => {
  Object.entries(Memory.rails).map(([roomKey, rails]) => {
    const roomVisual = new RoomVisual(roomKey);

    rails.map((column, x) => {
      column &&
        column.map((isRail, y) => {
          if (isRail) roomVisual.circle(x, y);
        });
    });
  });
};
