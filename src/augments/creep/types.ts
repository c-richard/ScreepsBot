import { RoleKey } from "roles";

declare global {
  interface CreepMemory {
    path: RoomPosition[];
    initialised: boolean;
    role: RoleKey;
    roleMemory: any;
  }

  interface Creep {
    moveToFlag: (name: string) => void;
    update: () => void;
    visualise: () => void;
  }
}

export {};
