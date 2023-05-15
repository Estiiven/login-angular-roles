import { Router } from 'express';
import AuthController from '../controller/AuthController';
import { checkToken } from '../middlewares/jwt'

const router = Router();

//AUTORIZACION DE USUARIOS QUE NO SON ADMINISTRADORES 
//login
router.post('/login', AuthController.login);

//cambiar contraseña 
router.post('/cambio-contrase', [checkToken], AuthController.cambiarContraseña);

export default router;