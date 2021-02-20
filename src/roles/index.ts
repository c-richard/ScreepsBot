import HarvesterManager, * as Harvester from "./harvester";
import PostmanManager, * as Postman from "./postman";
import UpgraderManager, * as Upgrader from "./upgrader";

type RoleKey =
  | typeof Harvester.HARVESTER_ROLE
  | typeof Postman.POSTMAN_ROLE
  | typeof Upgrader.UPGRADE_ROLE;

export type RoleMemory =
  | Harvester.HarvesterMemory
  | Postman.PostmanMemory
  | Upgrader.UpgraderMemory;

export {
  HarvesterManager,
  PostmanManager,
  UpgraderManager,
  Harvester,
  Postman,
  Upgrader,
};

export default function getRole(role: RoleKey) {
  switch (role) {
    case Harvester.HARVESTER_ROLE:
      return HarvesterManager;
    case Postman.POSTMAN_ROLE:
      return PostmanManager;
    case Upgrader.UPGRADE_ROLE:
      return UpgraderManager;
  }
}
