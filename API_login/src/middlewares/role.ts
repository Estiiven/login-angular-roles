import { getRepository } from 'typeorm';
import { User } from './../entity/User';
import { Request, Response, NextFunction } from 'express';

//AUTORIZACION 
//metodo que resibe array de roles roles: pueden ser n
export const checkRole = (roles: Array<string>) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = res.locals.jwtPayLoad;
        const userRepository = getRepository(User);
        let user;

        try { // bloque try por el await 
            user = await userRepository.findOneOrFail(userId);//buscamos el usuario
        } catch (e) {
            return res.status(401).json({ message: 'usuario no autorizado' });
        }
        const { role } = user; // extraemos la propiedad role 
        // si el rol de nuestro usuario cohincide 
        if(roles.includes(role)){
            next();
        }else{
            res.status(401).json({message: ' usuario no autorizado'});
        }
    }
}
