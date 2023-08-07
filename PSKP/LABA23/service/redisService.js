import client from './ConnectToRadis.js';
export const AddTokenToBlackList = async (token) => {
    await client.set(token, 'true');
};
export const IsTokenInBlackList = async (token) => {
    const result = await client.get(token);
    return result === 'true';
};
//# sourceMappingURL=redisService.js.map