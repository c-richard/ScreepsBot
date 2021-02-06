export const MOVE_TO_STOP = "MOVE_TO_STOP";
export const HARVEST = "HARVEST";
export const PICKUP = "PICKUP";
export const FUEL = "FUEL";

interface MoveToStopStep {
  type: typeof MOVE_TO_STOP;
  stop: string;
}

export type Step = MoveToStopStep;

declare global {
  interface CreepMemory {
    path: RoomPosition[];
    currentStep: number;
    loop: Step[];
  }
}
