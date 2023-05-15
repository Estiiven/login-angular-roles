import { getRepository } from "typeorm"; //importamos metodo de typeorm
import { Request, Response } from "express";
import { User } from "../entity/User";
import { validate } from 'class-validator';

export class UserController {

    // METODO TRAER TODOS LOS USUARIOS
    static getAll = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        let users;

        try {
            users = await userRepository.find({ select: ['id', 'username', 'role'/*, 'password', 'createdAt', 'updateAt'*/] });// find() que devuelve todos los resultados que cumplan la condición
        } catch (e) {
            res.status(401).json({ message: 'algo anda mal' })
        }
        //se comprueba si existen usuarios
        if (users.length > 0) {
            res.send(users);
        }
        else {
            res.status(401).json({ message: 'no hay usuarios registrados' });
        }
    }

    // METODO TRAER USUARIO POR ID
    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User); // metodo getRepository tiene los metodos que acceden a la base de datos

        try {
            const user = await userRepository.findOneOrFail(id);
            //res.send(user);
            res.json({"id": user.id, "Nombre de usuario": user.username, "privilegio": user.role});
        } catch (e) {
            res.status(401).json({ message: ' no result' });
        }
    }

    //METODO CREAR USUARIO
    static newUser = async (req: Request, res: Response) => {
        const { username, password, role } = req.body;
        const user = new User();

        user.username = username;
        user.password = password;
        user.role = role;

        //validate
        const validateOpt = { validationError: {target: false, value: false, property: false}};
        const errors = await validate(user, validateOpt);

        if (errors.length > 0) {
            return res.status(401).json(errors);
        }


        //TODO: HASH PASSWORD

        const userRepository = getRepository(User);
        try {
            user.hashPassword();// llamamos el metodo para encriptar la contraseña
            await userRepository.save(user);
        } catch (e) {
            return res.status(401).json({ message: 'el usuario ya existe' })
        }
        //All ok
        res.send('usuario creado');
    }

    //METODO EDITAR USUARIO
    static editUser = async (req: Request, res: Response) => {
        let user;
        const { id } = req.params; //informacion de front
        const { username, role } = req.body; // informacion de front

        const userRepository = getRepository(User);
        //try get user
        try {
            user = await userRepository.findOneOrFail(id);
            // si se logra recuperar la id
            user.username = username; // sustituimos los valores de la base de datos por los que entran del front
            user.role = role;
        } catch (e) {
            return res.status(401).json({ message: 'el usuario no existe' })
        }
        //se comprueba si hay errores
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(user, validationOpt);// validate: para cumplir las reglas de la entity
        if (errors.length > 0) {
            return res.status(401).json(errors);
        }
        //try to save user
        try {
            await userRepository.save(user); // guardamos en la base de datos en usuario que se ha modificado
        } catch (e) {
            return res.status(401).json({ message: ' el usuario ya esta guardado' })
        }
        res.status(200).json({ message: 'usuario modificado' })
    }

    // METODO BORRAR USUARIO
    static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail(id); // recupera el id de la base de datos
        } catch (e) {
            return res.status(401).json({ message: 'usuario no encontrado' })
        }
        //si, si ha logrado recuperar el usuario
        userRepository.delete(id);
        res.status(200).json({ message: 'usuario eliminado' });
    }
}

export default UserController;
