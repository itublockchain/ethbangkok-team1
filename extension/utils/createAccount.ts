import { ethers } from 'ethers';
import { getFatSignature } from './authResponseOrganize';

import addressFactoryContract from '../../backend/out/AccountFactory.sol/AccountFactory.json';
const abi = addressFactoryContract.abi;
const address = "0x080c6A647300004Fec129cC1866E4f958aCd11E1";
const bundlerPrivateKey = "6a1ff0872527132ffd9269c1f90c8c05948282dd134d031aded75ab02e8bac82";

const provider = new ethers.providers.JsonRpcProvider("https://rpc.sepolia.dev")
const wallet = new ethers.Wallet(bundlerPrivateKey, provider);

const contract = new ethers.Contract(address, abi, wallet);

export async function createAccount (auth, publicKey) {
    const {signature, publicKeyBytes32, authenticatorData} =  getFatSignature(auth, publicKey);
    let account = await contract.createAccount(bundlerPrivateKey, authenticatorData, signature, publicKeyBytes32);
    return account;
}

export async function takeAccount (publicKey) {
    let account = await contract.getAccountAddress(publicKey);
    return account;
}