const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { PHRASE, PROVIDER_URL } = require('./keys');
const { abi, evm } = require('./build/Fundraiser.json');;

const provider = new HDWalletProvider({
    mnemonic: {
        phrase: PHRASE
    },
    providerOrUrl: PROVIDER_URL
});

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log(`Deploying from ${accounts[0]}`);

    try {
        const fundraiser = await new web3.eth.Contract(abi)
            .deploy({ data: evm.bytecode.object })
            .send({ from: accounts[0], gas: '10000000' });

        console.log(`Successfully deployed at ${fundraiser.options.address}`);

        provider.engine.stop();
    } catch (error) {
        console.log(error.message);
    }

}
deploy();