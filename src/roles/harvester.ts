export interface HarvesterMemory {
  role: typeof Harvester.ROLE;
  flag: string;
}

export interface HarvesterOptions {
  flag: string;
}

class Harvester {
  static ROLE: "h" = "h";

  static init(creep: Creep) {}

  static update() {}

  static getBody() {
    return [MOVE, WORK, WORK];
  }

  static getMemory(options: HarvesterOptions): HarvesterMemory {
    return {
      role: Harvester.ROLE,
      flag: options.flag,
    };
  }
}

export default Harvester;
