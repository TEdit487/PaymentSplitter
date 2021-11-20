# PaymentSplitter

# For starting smart-contract on localhost:
1. open terminal window and launch commands:

    1.1 cd path-to-your-project    
    1.2 npx hardhat node    
    1.3 if you get error like Error HH604: Error running JSON-RPC server: error:0308010C:digital envelope routines::unsupported then launch command: export NODE_OPTIONS=--openssl-legacy-provider
    
2. Open one more terminal window and launch commands:

    2.1 cd path-to-your-project  
    2.2 npx hardhat run --network localhost scripts/deploy.js (where deploy.js your js script name)

    now there're the key in console. save it.

    2.3 npx hardhat console --network localhost

    hardhat console open now.
    to close it press ctrl-c at twice.
    

3. Example for this case:
    
    3.1 const Test = await ethers.getContractFactory('Test');  
    3.2 const box = await Box.attach('key_obtained_in_2.2');  
    3.3 await test.any-smart-contract-function(args of this func)
