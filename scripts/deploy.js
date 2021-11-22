// scripts/deploy.js
async function main() {
    // We get the contract to deploy
    const PaymentSplitter = await ethers.getContractFactory('PaymentSplitter');
    console.log('Deploying PaymentSplitter...');
 
    // Instantiating a new PaymentSplitter smart contract
    const paymentSplitter = await PaymentSplitter.deploy();
 
    // Waiting for the deployment to resolve
    await paymentSplitter.deployed();
    console.log('PaymentSplitter deployed to:', paymentSplitter.address);
 }
 
 main()
    .then(() => process.exit(0))
    .catch((error) => {
       console.error(error);
       process.exit(1);
    });