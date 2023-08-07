import * as fs from "fs";
const data = fs.readFileSync("../users.json");
const users = JSON.parse(data.toString());
export const checkUser = (login, password) => {
    return users.some(user => user.login === login && user.password === password);
};
export const getUser = (login) => {
    return users.find(user => user.login === login);
};
//# sourceMappingURL=userService.js.map