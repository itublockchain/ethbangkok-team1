import { ethers } from 'ethers';
import { getFatSignature } from "./authResponseOrganize";

import { decryptPassword, encryptPassword } from './cryptography';
import { takeAccount } from './createAccount';

import { Storage } from "@plasmohq/storage";

const sessionStorage = new Storage({area: "session"})
const localStorage = new Storage({area: "local"})
const publicKey = localStorage.get("public_key");

const abi = addressContract.abi;
const bundlerPrivateKey = "6a1ff0872527132ffd9269c1f90c8c05948282dd134d031aded75ab02e8bac82";

const provider = new ethers.providers.JsonRpcProvider("https://rpc.sepolia.dev")
const wallet = new ethers.Wallet(bundlerPrivateKey, provider);

let address; (async () => {address = await takeAccount(publicKey)})();
const contract = new ethers.Contract(address, abi, wallet);

export async function addPassword (auth, password, name, url) {
    const salt = await sessionStorage.get("salt");
    const encryptedPassword = encryptPassword(password, salt);
    const {signature, publicKeyBytes32, authenticatorData} =  getFatSignature(auth, publicKey);
    await contract.addPassword(bundlerPrivateKey, authenticatorData, signature, password, name, url);
}

export async function getPasswords (auth, publicKey, name) {
    const salt = await sessionStorage.get("salt");
    const {signature, publicKeyBytes32, authenticatorData} =  getFatSignature(auth, publicKey);
    return decryptPassword(await contract.getPasswords(bundlerPrivateKey, authenticatorData, signature, name), salt);
}