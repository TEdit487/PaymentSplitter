/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-ethers');


const { privateKey } = require('./secrets.json');
 
module.exports = {
  // latest Solidity version
  solidity: "0.8.1",

  networks: {
    localhost: {
    }
  }
};
