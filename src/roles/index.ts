import Harvester from "./harvester";
import Postman from "./postman";

type RoleKey = typeof Postman.role | typeof Harvester.role;

export default function getRole(role: RoleKey) {
  switch (role) {
    case Harvester.role:
      return Harvester;
    case Postman.role:
      return Postman;
  }
}
