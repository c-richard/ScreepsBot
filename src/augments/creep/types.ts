import { RoleMemory } from "../../roles";

declare global {
  interface CreepMemory {
    path: DirectionConstant[];
    initialised: boolean;
    roleMemory: RoleMemory;
    occupying: RoomNode | null;
  }

  interface Creep {
    setPath: (path: DirectionConstant[]) => void;
    update: () => void;
    consumeStep: () => boolean;
    visualise: () => void;
    getMemory: () => void;
  }
}

export {};
