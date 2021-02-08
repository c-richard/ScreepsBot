import Harvester from "./harvester";
import Postman from "./postman";

export type RoleKey = typeof Harvester.ROLE | typeof Postman.ROLE;

export function getRole(role: RoleKey) {
  switch (role) {
    case Harvester.ROLE:
      return Harvester;
    case Postman.ROLE:
      return Postman;
  }
}
