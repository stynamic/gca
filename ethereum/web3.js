import Web3 from 'web3';
import { PROVIDER_URL } from './keys';

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
} else {
    const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
    web3 = new Web3(provider);
}

export default web3;