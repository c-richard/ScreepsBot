import { Harvester, Postman, Upgrader } from "../../roles";

declare global {
  interface StructureSpawn {
    spawnRole(
      role: typeof Harvester.HARVESTER_ROLE,
      opt: Harvester.HarvesterMemory
    ): void;
    spawnRole(
      role: typeof Upgrader.UPGRADE_ROLE,
      opt: Upgrader.UpgraderMemory
    ): void;
    spawnRole(name: string, role: typeof Postman.POSTMAN_ROLE): void;
  }
}

export {};
