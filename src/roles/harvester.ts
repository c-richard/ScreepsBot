class Harvester {
  static ROLE: "h" = "h";

  static init(creep: Creep) {}

  static update() {}

  static getBody() {
    return [MOVE, WORK, WORK];
  }

  static getMemory(options: { flag: string }) {
    return {
      flag: options.flag,
    };
  }
}

export default Harvester;
