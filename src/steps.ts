export const MOVE_TO_STOP = "MOVE_TO_STOP";
export const HARVEST_FOREVER = "HARVEST_FOREVER";
export const PICKUP = "PICKUP";
export const TRANSFER = "TRANSFER";

interface MoveToStopStep {
  type: typeof MOVE_TO_STOP;
  stop: string;
}

export interface HarvestForeverStep {
  type: typeof HARVEST_FOREVER;
  target: string;
}

export interface PickupStep {
  type: typeof PICKUP;
  targetLocation: RoomPosition;
}

interface TransferStep {
  type: typeof TRANSFER;
  targetLocation: RoomPosition;
}

export type Step =
  | MoveToStopStep
  | HarvestForeverStep
  | PickupStep
  | TransferStep;

declare global {
  interface CreepMemory {
    path: RoomPosition[];
    currentStep: number;
    loop: Step[];
  }
}
