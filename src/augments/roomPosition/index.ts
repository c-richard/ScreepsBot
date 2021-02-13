RoomPosition.prototype.findClosestAlongRoute = function (type: any, opts: any) {
  return this.findClosestByPath(type, {
    ...opts,
    costCallback: function (roomName, costMatrix) {
      for (let x = 0; x < 50; x++) {
        for (let y = 0; y < 50; y++) {
          costMatrix.set(x, y, Game.rooms[roomName].memory.paths[x][y]);
        }
      }

      if (opts.distanceTolerance) {
        let blurSteps = opts.distanceTolerance + 1;

        while (blurSteps > 0) {
          blurSteps -= 1;
          for (let x = 0; x < 50; x++) {
            for (let y = 0; y < 50; y++) {
              if (costMatrix.get(x, y) === 1) {
                // blur the region
                for (let bx = -1; bx <= 1; bx++) {
                  for (let by = -1; by <= 1; by++) {
                    costMatrix.set(bx, by, 1);
                  }
                }
              }
            }
          }
        }
      }
    },
  });
};
