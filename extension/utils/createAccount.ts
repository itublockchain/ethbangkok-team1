import { ethers } from 'ethers';
import { getFatSignature } from './authResponseOrganize';

import addressFactoryContract from '../../backend/out/AccountFactory.sol/AccountFactory.json';
const abi = addressFactoryContract.abi;
const address = "0x080c6A647300004Fec129cC1866E4f958aCd11E1";
const bundlerPrivateKey = "6a1ff0872527132ffd9269c1f90c8c05948282dd134d031aded75ab02e8bac82";

const provider = new ethers.providers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com")
const wallet = new ethers.Wallet(bundlerPrivateKey, provider);

const contract = new ethers.Contract(address, abi, wallet);
console.log(wallet.getAddress())

export async function createAccount (auth:any, publicKey:any) {
    const {signature, publicKeyBytes32, authenticatorData} =  getFatSignature(auth, publicKey);
    console.log(signature, publicKeyBytes32, authenticatorData);
    let account = await contract.createAccount("0xeA19B8e2421D2dE825c87D3A783F7A1d4E48f1d1", authenticatorData, signature, publicKeyBytes32);
    console.log(account);
    return account;
}

export async function takeAccount (publicKey:any) {
    let account = await contract.getAccountAddress(publicKey);
    console.log(account);
    return account;
}



takeAccount([
    '0x83262a4265009839fd27b751e7197e1e5c800344765d5e6c8104674865db2edf',
    '0xf10ab11d0f5215bef9324e6443d7acbda770b63b83d3674385fd9603d8981354'
  ])