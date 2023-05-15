import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm"; // importamos unique ...
import { MinLength, IsNotEmpty, IsEmail } from 'class-validator'; // importamos validaciones
import * as bcrypt from 'bcryptjs'; // importamos biclioteca para la encriptacio de la contraseña 

//decorators @ 
@Entity()
@Unique(['username']) // indicamos que el campo username sea unico
export class User {

    @PrimaryGeneratedColumn()
    id: number; // autogenerado 

    @Column()
    @MinLength(6) // minimo 6 caracteres
    @IsEmail() //validacion de email  
    @IsNotEmpty() // validacion de no vacio 
    username: string;

    @Column()
    @MinLength(6) // minimo 6 caracteres para la contraseña
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty() // no se permite que el campo rol sea vacio 
    role: string;

    @Column()
    @CreateDateColumn() // para saber cuando se creo el usuario
    createdAt: Date;

    @Column()
    @UpdateDateColumn() // para saber cuando se modifico 
    updateAt: Date;

    // metodo que encripta la contraseña creada
    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    // metodo que compara la contraseña logeada con la almacenada 
    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password); // si cohinciden devuelve true
    }
}
