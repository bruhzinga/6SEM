import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const users = await prisma.user.findMany();
export const checkUser = (login, password) => {
    return users.some(user => user.username === login && user.password === password);
};
export const getUser = (login) => {
    return users.find(user => user.username === login);
};
export const createUser = async (login, password) => {
    const userToAdd = {
        username: login,
        password: password
    };
    let user = await prisma.user.create({
        data: userToAdd
    });
    users.push(user);
};
//# sourceMappingURL=userService.js.map