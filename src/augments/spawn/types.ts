import { RoleKey } from "../../roles";

declare global {
  interface StructureSpawn {
    spawnRole: (name: string, role: RoleKey, options: any) => void;
  }
}

export {};
