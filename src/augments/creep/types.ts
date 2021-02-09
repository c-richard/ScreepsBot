import { RoleMemory } from "roles";

declare global {
  interface CreepMemory {
    path: RoomPosition[];
    initialised: boolean;
    roleMemory: RoleMemory;
  }

  interface Creep {
    moveToFlag: (name: string) => void;
    update: () => void;
    visualise: () => void;
    getMemory: () => void;
  }
}

export {};
