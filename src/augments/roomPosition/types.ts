declare global {
  interface RoomPosition {
    findClosestAlongRoute<K extends FindConstant>(
      type: K,
      opts?: FindPathOpts &
        Partial<FilterOptions<K>> & { distanceTolerance?: number }
    ): FindTypes[K] | null;
    findClosestAlongRoute<T extends Structure>(
      type: FIND_STRUCTURES | FIND_MY_STRUCTURES | FIND_HOSTILE_STRUCTURES,
      opts?: FindPathOpts &
        Partial<FilterOptions<FIND_STRUCTURES>> & { distanceTolerance?: number }
    ): T | null;
    findClosestAlongRoute<T extends _HasRoomPosition | RoomPosition>(
      objects: T[],
      opts?: FindPathOpts & {
        filter?: ((object: T) => boolean) | FilterObject | string;
        distanceTolerance?: number;
      }
    ): T | null;
  }
}

export {};
