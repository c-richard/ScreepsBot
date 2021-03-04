import { RoleMemory } from "../../roles";

declare global {
  interface CreepMemory {
    path: DirectionConstant[];
    initialised: boolean;
    roleMemory: RoleMemory;
    occupying: RoomNode | null;
    lastPos: Point;
  }

  interface Creep {
    setPath: (path: DirectionConstant[]) => void;
    update: () => void;
    consumeStep: () => boolean;
    visualise: () => void;
  }
}

export {};
