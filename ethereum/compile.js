const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', 'Fundraiser.sol');
const sourceCode = fs.readFileSync(contractPath, 'utf8')

const input = {
    language: 'Solidity',
    sources: {
        'Fundraiser.sol': {
            content: sourceCode
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
}

const output = JSON.parse(solc.compile(JSON.stringify(input)));

fs.ensureDirSync(buildPath);

for (let contractName in output.contracts['Fundraiser.sol']) {
    fs.outputJSONSync(
        path.resolve(buildPath, contractName + '.json'),
        output.contracts['Fundraiser.sol'][contractName]
    );
}

console.log('Compiled successfully and now storing build.\nWait...')