import Harvester from "../../roles/harvester";
import Postman from "../../roles/postman";

type RoleMemory =
  | ReturnType<typeof Harvester.getMemory>
  | ReturnType<typeof Postman.getMemory>;

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
