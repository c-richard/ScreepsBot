import Harvester, { HarvesterOptions } from "../../roles/harvester";
import Postman, { PostmanOptions } from "../../roles/postman";

declare global {
  interface StructureSpawn {
    spawnRole(
      name: string,
      role: typeof Harvester.ROLE,
      options?: HarvesterOptions
    ): void;
    spawnRole(
      name: string,
      role: typeof Postman.ROLE,
      options?: PostmanOptions
    ): void;
  }
}

export {};
