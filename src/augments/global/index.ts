import { NodeType } from "augments/room/types";

globalThis.begin = function () {
  console.log("begin");

  const room = Game.rooms.sim;
  const spawn = Game.spawns.Spawn1;

  room.init();

  // Harvest duos
  room.addNode([34, 21], [NodeType.HARVEST]);
  room.addNode([33, 22], [NodeType.PICKUP]);
  room.addConnection([34, 21], [33, 22]);

  // Upgrade duos
  room.addNode([25, 18], [NodeType.UPGRADE]);
  room.addNode([25, 19], [NodeType.TRANSFER]);
  room.addConnection([25, 18], [25, 19]);

  // Spawn
  room.addNode([25, 24], [NodeType.WAYPOINT]);
  room.addNode([26, 25], [NodeType.TRANSFER]);
  room.addNode([26, 24], [NodeType.WAYPOINT]);
  room.addConnection([26, 24], [26, 25]);
  room.addConnection([26, 24], [25, 24]);

  // final highway connections
  room.addConnection([25, 19], [26, 24]);
  room.addConnection([26, 24], [33, 22]);

  spawn.init();

  spawn.queueSpawnRole("h", { point: [34, 21] });
  spawn.queueSpawnRole("p");
  spawn.queueSpawnRole("u", { point: [25, 18] });
};

export {};
