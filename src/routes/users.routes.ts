import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUsersController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUsersController.handle);
usersRoutes.patch("/avatar", ensureAuthentication, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export { usersRoutes };
