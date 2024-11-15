import CryptoJS from "crypto-js";

export function encryptPassword(password: string, salt: string) : string {
    return CryptoJS.AES.encrypt(password, salt).toString();
}

export function decryptPassword(password: string, salt: string) : string {
    return CryptoJS.AES.decrypt(password, salt).toString(CryptoJS.enc.Utf8);
}