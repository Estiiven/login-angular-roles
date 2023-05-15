
import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';

class AuthController { 
    //METODO LOGIN
    static login = async (req: Request, res: Response) => {
        const { username, password } = req.body; // extrae username y password de lo que venga del front

        // en caso de no tener username ni password
        if (!(username && password)) {
            return res.status(401).json({ message: 'el nombre de usuario y la contraseña son necesarios' });
        }
        //vamos a la base de datos y recuperamos el usuario
        //getRepository: metodo de orm
        const userRepositoy = getRepository(User); // se obtiene el repositorio de la entidad user
        let user: User;

        //se utiliza try catch por el async await
        try {
            user = await userRepositoy.findOneOrFail({
                where: { username: username }// checkea que username sea el mismo recibido desde el front 
            });
        } catch (e) {// si no recuperamos el usuario
            return res.status(401).json({ message: ' el nombre de usuario es incorrecto !' })
        }
        //se checkea que la contrase no sea distinta a la recibida desde el front
        if (!user.checkPassword(password)) {
            return res.status(401).json({ message: 'la contraseña es incorrecta !' })
        }
        //res.json(user);
        //en caso de que todo este correcto devolvemos el usuario
        const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });

        // res.json({ message: 'OK', token: token });
        res.json({
            message: 'logeado!',
            token: token,
            userId: user.id, 
            role: user.role
          }); 

    };
    
    //METODO CAMBIAR CONTRASEÑA
    static cambiarContraseña = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayLoad; //destructuting
        const { oldPassword, newPassword } = req.body; //datos del front

        if (!(oldPassword && newPassword)) { // validamos que esten las propiedades
            res.status(401).json({ message: ' falta la contraseña antigua o la nueva, por favor ingrese las dos' })
        }
        //sigue el flujo si cumple la primera validacion 
        const userRepository = getRepository(User); //buscamos el usuario
        let user: User;

        try {
            user = await userRepository.findOneOrFail(userId); // recuperamos el usuario 
        } catch (e) {
            res.status(401).json({ message: 'Algo ha fallado en la solicitud' });
        }

        //valida que la contraseña actual sea correcta
        if (!user.checkPassword(oldPassword)) { 
            res.status(401).json({ message: ' la contraseña antigua es incorrecta' });
        }

        user.password = newPassword;
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate( user, validationOpt );

        if (errors.length > 0) {
            return res.status(401).json(errors);
        }
        //hashPassword
        user.hashPassword();
        userRepository.save(user);

        res.json({ message: 'contraseña cambiada exitosamente' }); 
    };
}
export default AuthController;