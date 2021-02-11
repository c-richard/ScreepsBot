const Postman = {
  role: "p" as "p",
  init: (creep: Creep) => {},
  update: (creep: Creep) => {
    creep.move(LEFT);
  },
  getBody: () => [MOVE, CARRY, CARRY],
  getMemory: (options: {}) => ({
    role: Postman.role,
  }),
};

export default Postman;
