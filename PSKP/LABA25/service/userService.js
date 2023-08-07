import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const users = await prisma.users.findMany();
export const checkUser = (login, password) => {
    return users.some(user => user.username === login && user.password === password);
};
export const getUser = (login) => {
    return users.find(user => user.username === login);
};
export const getUsers = () => {
    return users;
};
export const getUserById = (id) => {
    return users.find(user => user.id === id);
};
export const createUser = async (login, password, role, email) => {
    const userToAdd = {
        username: login,
        password: password,
        role: role,
        email: email
    };
    let user = await prisma.users.create({
        data: userToAdd
    });
    users.push(user);
};
//# sourceMappingURL=userService.js.map