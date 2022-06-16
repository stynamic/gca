# gca (Genuine Charity App)
Genuine Charity App is a decentralized application build over Ethereum blockchain.

----
STEP 1:  
Grab the repository and install packages
* clone the repository  
`$ git clone https://github.com/stynamic/gca.git`  
`$ cd gca`
* install dependency packages    
`$ npm install`

STEP 2:  
Compile and Deploy
* compile `npm run compile`
* deploy `npm run deploy`  
(copy the address of deployed contract from console)

STEP 3:  
Edit `gca/ethereum/keys.js` file and assign the variables
* account mnemonic  
`const PHRASE = 'PASTE_HERE';`
* provider url from infura or local RPC url  
`const PROVIDER_URL = 'PASTE_HERE';`
* contract address from deployement process (STEP 2)  
`const CONTRACT_ADDRESS = 'PASTE_HERE';`

STEP 4:  
Ready to compile and run the DAPP
* run `npm run dev`
