import Harvester from "../../roles/harvester";
import Postman from "../../roles/postman";

type FirstArgument<T> = T extends (a: infer U) => any ? U : never;

declare global {
  interface StructureSpawn {
    spawnRole(
      name: string,
      role: typeof Harvester.role,
      opt: FirstArgument<typeof Harvester.getMemory>
    ): void;
    spawnRole(name: string, role: typeof Postman.role): void;
  }
}

export {};
