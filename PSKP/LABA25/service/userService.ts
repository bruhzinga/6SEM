import * as fs from "fs";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()





export const  users = await prisma.users.findMany();

export const checkUser = (login: string, password: string): boolean => {
    return users.some(user => user.username === login && user.password === password);
}

export const getUser = (login: string) => {
    return users.find(user => user.username === login);
}

export const getUsers = () => {
    return users;
}

export const getUserById = (id: number) => {
    return users.find(user => user.id === id);
}

interface User {
    username: string;
    password: string;
    role: 'admin' | 'user',

}


export const createUser = async (login: string, password: string,role: User["role"],email:string) => {
    const userToAdd = {
        username: login,
        password: password,
        role:role,
        email:email
    };
    let user =  await prisma.users.create({
        data: userToAdd
    })
    users.push(user);
}

