import {Router} from 'express';

import auth from './auth';
import user from './user';

const router = Router();

//RUTAS PRINCIPALES 
router.use('/auth', auth);
router.use('/users', user);

export default router;  