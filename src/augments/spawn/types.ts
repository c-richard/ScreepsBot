import Harvester from "../../roles/harvester";
import Postman from "../../roles/postman";
import Upgrader from "../../roles/upgrader";

declare global {
  interface StructureSpawn {
    spawnRole(
      role: typeof Harvester.role,
      opt: FirstArgument<typeof Harvester.getMemory>
    ): void;
    spawnRole(
      role: typeof Upgrader.role,
      opt: FirstArgument<typeof Upgrader.getMemory>
    ): void;
    spawnRole(name: string, role: typeof Postman.role): void;
  }
}

export {};
