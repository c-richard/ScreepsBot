import spawn from "./spawn";
import { rail, setupRails, drawRails } from "./rail";

console.log(".");

const loop = () => {
  Game.spawn = spawn;
  Game.setupRails = setupRails;
  Game.rail = rail;

  drawRails();
};

export { loop };
