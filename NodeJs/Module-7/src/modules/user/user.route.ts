import { Router, type Request, type Response } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/", userController.creatUser);

router.get('/', userController.getAllUser);

router.get('/:id',userController.getSigleUser);

router.patch('/:id',userController.updateUser);

router.delete('/:id',userController.deleteUser)

export const UserRoute = router;
