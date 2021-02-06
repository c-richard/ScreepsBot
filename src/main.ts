import spawn from "./spawn";
import {
  rail,
  setupRails,
  drawRails,
  stop,
  moveToStop,
  updateCreep,
} from "./rail";

console.log(".");

const loop = () => {
  Game.spawn = spawn;
  Game.setupRails = setupRails;
  Game.rail = rail;
  Game.stop = stop;
  Game.moveToStop = moveToStop;

  drawRails();

  Object.entries(Game.creeps).map(([creepName, creep]) => {
    updateCreep(creep);
  });
};

export { loop };
