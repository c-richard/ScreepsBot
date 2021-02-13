import "augments/room";
import "augments/spawn";
import "augments/creep";
import "augments/flag";
import "augments/roomPosition";

const loop = () => {
  Object.values(Game.rooms).map((r) => {
    r.visualise();
  });

  Object.values(Game.creeps).map((c) => {
    c.visualise();
    c.update();
  });
};

export { loop };
