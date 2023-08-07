import * as fs from "fs";

interface User {
    login: string;
    password: string;
}

const data =  fs.readFileSync("../users.json");
const users: User[] = JSON.parse(data.toString());

export const checkUser = (login: string, password: string): boolean => {
    return users.some(user => user.login === login && user.password === password);
}

export const getUser = (login: string): User | undefined => {
    return users.find(user => user.login === login);
}
