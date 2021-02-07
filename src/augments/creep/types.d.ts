interface CreepMemory {
  path: RoomPosition[];
  initialised?: boolean;
}

interface Creep {
  moveToFlag: (name: string) => void;
  update: () => void;
  visualise: () => void;
  init: () => void;
}
