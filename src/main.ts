import spawn from "./spawn";

console.log(".");

const loop = () => {
  Game.spawn = spawn;
};

export { loop };
