import Harvester, { HarvesterMemory } from "./harvester";
import Postman, { PostmanMemory } from "./postman";

export type RoleKey = typeof Harvester.ROLE | typeof Postman.ROLE;
export type RoleMemory = HarvesterMemory | PostmanMemory;

export function getRole(role: RoleKey) {
  switch (role) {
    case Harvester.ROLE:
      return Harvester;
    case Postman.ROLE:
      return Postman;
  }
}
