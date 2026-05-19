
import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();


router.post('/', userController.creatUser);
router.get('/', auth(), userController.getAllUser);
router.get('/:id',userController.getSigleUser);
router.patch('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser)


export const UserRoute = router;
