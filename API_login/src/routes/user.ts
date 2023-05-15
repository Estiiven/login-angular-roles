import { checkToken } from './../middlewares/jwt'; //importamos el middleware
import { UserController } from './../controller/UserController';
import {Router} from 'express';
import { checkRole } from '../middlewares/role';


const router = Router();
//AUTORIZACION DE USUARIOS ADMINISTRADORES
//Get All users
router.get('/' ,[checkToken, checkRole(['admin'])], UserController.getAll); //chechToken : para proteger las rutas con el token
//
router.get('/:id',[checkToken, checkRole(['admin'])], UserController.getById);// con el metodo next se ejecuta el siguiente metodo de next
//
router.post('/',[checkToken, checkRole(['admin'])], UserController.newUser); //checkRole: para validar los permisos de ususario
//
router.patch('/:id',[checkToken, checkRole(['admin'])], UserController.editUser);
//
router.delete('/:id',[checkToken, checkRole(['admin'])], UserController.deleteUser);

export default router;
