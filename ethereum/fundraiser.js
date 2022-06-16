import web3 from './web3';
import { CONTRACT_ADDRESS } from './keys';
import fundraiser from './build/Fundraiser.json';

export default new web3.eth.Contract(fundraiser.abi, CONTRACT_ADDRESS);