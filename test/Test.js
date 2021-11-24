const { expect } = require("chai");

describe("PaymentSplitter contract", function () {

  let PaymentSplitter;
  let hardhatSplitter;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addr4;
  let addr5;
  let addr6;

  
  beforeEach(async function () {
    PaymentSplitter = await ethers.getContractFactory("PaymentSplitter");
    [owner, addr1, addr2, addr3, addr4, addr5, addr6] = await ethers.getSigners();

    hardhatSplitter = await PaymentSplitter.deploy();
  });


  describe("Deployment hardhatPaymentSplitter", function () {
    it("Should set the right owner", async function () {
      expect(await hardhatSplitter.owner()).to.equal(owner.address);
    });

    it("Should assign the amount", async function () {
      var amount = 30000;
      await hardhatSplitter.setAmount({ value: amount });
      expect((await hardhatSplitter.getAmount()).toNumber()).to.equal(amount);
    });

  });

  describe("Transactions", function () {
    
    it("Should equals shares and addresses lengths", async function () {
      let members = [{perc_big_part:19, perc_lil_part:20, addresses: addr1.address},
                     {perc_big_part:60, perc_lil_part:60, addresses: addr2.address}, 
                     {perc_big_part:20, perc_lil_part:20, addresses: addr3.address}];
      console.log(members);
      let wrong_members = [{perc_big_part:19, perc_lil_part:20, addresses: addr1.address},
                           {perc_big_part:61, perc_lil_part:60, addresses: addr2.address}, 
                           {perc_big_part:24, perc_lil_part:20, addresses: addr3.address}];
      await hardhatSplitter.setShares(members);
      // await hardhatSplitter.setShares(wrong_members);
    });
  });

});