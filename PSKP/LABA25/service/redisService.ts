import client from './ConnectToRadis.js'


export const AddTokenToBlackList = async (token: string) => {
     await client.set(token, 'true');
}

export const IsTokenInBlackList = async (token: string) => {
    const result = await client.get(token);
    return result === 'true';
}




