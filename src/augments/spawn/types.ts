import Harvester from "../../roles/harvester";
import Postman from "../../roles/postman";

declare global {
  interface StructureSpawn {
    spawnRole(
      role: typeof Harvester.role,
      opt: FirstArgument<typeof Harvester.getMemory>
    ): void;
    spawnRole(name: string, role: typeof Postman.role): void;
  }
}

export {};
