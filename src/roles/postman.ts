export interface PostmanMemory {
  role: typeof Postman.ROLE;
  pickingUp: boolean;
}

export interface PostmanOptions {
  capacity: number;
}

class Postman {
  static ROLE: "p" = "p";

  static init() {}

  static update(creep: Creep) {}

  static getBody() {
    return [MOVE, CARRY, CARRY];
  }

  static getMemory(options?: PostmanOptions): PostmanMemory {
    return {
      role: Postman.ROLE,
      pickingUp: false,
    };
  }
}

export default Postman;
