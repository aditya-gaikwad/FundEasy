const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const comipledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "allow patient fire legend already remain cage hand negative state entire orbit",
  // remember to change this to your own phrase!
  //"https://rinkeby.infura.io/v3/2a3fbc807dd34d5eb2621beb8eb3ed4e"
  "https://goerli.infura.io/v3/3c8276cb46844cb08f6a74b34c7b18ee"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(comipledFactory.interface))
    .deploy({ data:  comipledFactory.bytecode })
    .send({ gas: "1000000",gasPrice: '5000000000', from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};
deploy();
