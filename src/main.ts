import spawn from "./spawn";
import { rail, setupRails, drawRails, stop } from "./rail";

console.log(".");

const loop = () => {
  Game.spawn = spawn;
  Game.setupRails = setupRails;
  Game.rail = rail;
  Game.stop = stop;

  drawRails();
};

export { loop };
