import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

//AUTORIZACION
export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    console.log('REQ ->', req.headers);

    const token = <string>req.headers['autorizacion'];//obtenemos el token del header autorizacion
    let jwtPayLoad;

    try {//verify: recibe como parmametro el token y el password para desencriptar el token
        jwtPayLoad = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayLoad = jwtPayLoad; // objeto que contiene variables locales de respuesta con ámbito a la solicitud
    } catch (e) {
        return res.status(401).json({ message: 'usuario no autorizado!' });
    }

    const { userid, username } = jwtPayLoad; //extraemos userid y username de jwtpayload

    const newToken = jwt.sign({ userid, username }, config.jwtSecret, { expiresIn: '1h' });//se crea el token metiante el metodo sing del modulo jwt
    res.setHeader('token', newToken);//especificamos la cabecera con setHeader que recibe el nombre de la cabecera y su valor
    //call next
    next();//llama a ejecutar la funcion que le siga


}