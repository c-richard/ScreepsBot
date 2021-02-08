class Postman {
  static ROLE: "p" = "p";

  static init() {}

  static update(creep: Creep) {}

  static getBody() {
    return [MOVE, CARRY, CARRY];
  }

  static getMemory() {
    return {
      pickingUp: false,
    };
  }
}

export default Postman;
