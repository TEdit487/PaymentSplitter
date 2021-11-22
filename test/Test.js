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
      var amount = 2;
      await hardhatSplitter.setAmount({ value: amount });
      expect((await hardhatSplitter.getAmount()).toNumber()).to.equal(amount);
    });

  });

  describe("Transactions", function () {
    
    it("Should equals shares and addresses lengths", async function () {
      await hardhatSplitter.setShares([20, 60, 20], [addr1.address, addr2.address, addr3.address]);
      const membersNum = (await hardhatSplitter.getMembersNum()).toNumber();
      expect((await hardhatSplitter.getAddressesNum()).toNumber()).to.equal(membersNum);
    });
  });

});