import Harvester from "../../roles/harvester";
import Postman from "../../roles/postman";

type RoleMemory =
  | ReturnType<typeof Harvester.getMemory>
  | ReturnType<typeof Postman.getMemory>;

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
