import { Router } from "express";
import { validateAll } from "@/middlewares/validateAll";
import { userListController, userDeleteController } from "./users.controller";
import { user_delete_dto, user_list_dto } from "./users.schema";
import { authGuard } from "@/middlewares/authGuard";
import { roleGuard } from "@/middlewares/roleGuard";
import { UserRole } from "@prisma/client";

const router = Router();

// Get /users/userList
router.get(
  "/userList",
  authGuard,
  roleGuard(UserRole.ADMIN),
  validateAll({ query: user_list_dto }),
  userListController
);

router.post(
  "/delete",
  authGuard,
  roleGuard(UserRole.ADMIN),
  validateAll({ body: user_delete_dto }),
  userDeleteController
);

export default router;
