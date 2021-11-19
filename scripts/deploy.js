// scripts/deploy.js
async function main() {
    // We get the contract to deploy
    const Test = await ethers.getContractFactory('Test');
    console.log('Deploying Test...');
 
    // Instantiating a new Test smart contract
    const test = await Test.deploy();
 
    // Waiting for the deployment to resolve
    await test.deployed();
    console.log('Test deployed to:', test.address);
 }
 
 main()
    .then(() => process.exit(0))
    .catch((error) => {
       console.error(error);
       process.exit(1);
    });