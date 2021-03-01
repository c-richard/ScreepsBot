import { Harvester, Postman, Upgrader } from "../../roles";

type QueuedRole =
  | {
      role: typeof Harvester.HARVESTER_ROLE;
      opt: Harvester.HarvesterOptions;
    }
  | {
      role: typeof Upgrader.UPGRADE_ROLE;
      opt: Upgrader.UpgraderOptions;
    }
  | {
      role: typeof Postman.POSTMAN_ROLE;
    };

declare global {
  interface SpawnMemory {
    queue: QueuedRole[];
  }

  interface StructureSpawn {
    init(): void;
    update(): void;
    spawnRole(
      role: typeof Harvester.HARVESTER_ROLE,
      opt: Harvester.HarvesterOptions
    ): void;
    spawnRole(
      role: typeof Upgrader.UPGRADE_ROLE,
      opt: Upgrader.UpgraderOptions
    ): ScreepsReturnCode;
    spawnRole(role: typeof Postman.POSTMAN_ROLE): void;
    queueSpawnRole: StructureSpawn["spawnRole"];
  }
}

export {};
