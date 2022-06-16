const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../ethereum/build/Fundraiser.json');

let accounts;
let fundraiser;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    fundraiser = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ from: accounts[0], gas: '10000000' });

    await fundraiser.methods.addVerifier(accounts[0]).send({ from: accounts[0] });
    await fundraiser.methods.raiseMeFund('Jack Coin', 'Money for shelter.', accounts[1], web3.utils.toWei('1', 'ether'))
        .send({ from: accounts[1], gas: '10000000' });
});

describe('Genuine Charity App', () => {
    it('deploys a contract', () => {
        console.log(fundraiser);
        assert.ok(fundraiser.options.address);
    });

    it('can add a verifier', async () => {
        const trueOrFalse = await fundraiser.methods.verifiers(accounts[0]).call();
        assert.equal(trueOrFalse, true);
    });

    it('raise a request', async () => {
        const request = await fundraiser.methods.requests(0).call();
        assert.equal(request.name, 'Jack Coin');
        assert.equal(request.recipient, accounts[1]);
    });

    it('verify a rquest', async () => {
        await fundraiser.methods.verifyRequest(0, true).send({ from: accounts[0] });
        const request = await fundraiser.methods.requests(0).call();
        assert.equal(request.legit, true);
    });

    it('fetch all requests', async () => {
        const requests = await fundraiser.methods.getAllRequests().call();
        assert.equal(requests.length, 1);
    });

    it('send help', async () => {
        await fundraiser.methods.sendHelp(0).send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        const balance = await web3.eth.getBalance(accounts[1]);
        assert(web3.utils.fromWei(balance, 'ether') > 1009);
    });

});