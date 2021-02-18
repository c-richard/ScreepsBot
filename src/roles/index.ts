import Harvester from "./harvester";
import Postman from "./postman";
import Upgrader from "./upgrader";

type RoleKey =
  | typeof Postman.role
  | typeof Harvester.role
  | typeof Upgrader.role;

export default function getRole(role: RoleKey) {
  switch (role) {
    case Harvester.role:
      return Harvester;
    case Postman.role:
      return Postman;
    case Upgrader.role:
      return Upgrader;
  }
}
