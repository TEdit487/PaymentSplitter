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

  });

  describe("Transactions", function () {
    
    it("Should set the correct shares (sharesSum equal 100%)", async function () {
      let members = [{perc_big_part:19, perc_lil_part:20, addresses: addr1.address},
                     {perc_big_part:60, perc_lil_part:60, addresses: addr2.address}, 
                     {perc_big_part:20, perc_lil_part:20, addresses: addr3.address}];
      console.log(members);

      await hardhatSplitter.setShares(members);
    });
    var test_wrong_memory = false;
    
    it("Should set the correct shares (sharesSum NOT equal 100%)", async function () {
      if (test_wrong_memory){
        let wrong_members = [{perc_big_part:19, perc_lil_part:20, addresses: addr1.address},
                             {perc_big_part:61, perc_lil_part:60, addresses: addr2.address}, 
                             {perc_big_part:24, perc_lil_part:20, addresses: addr3.address}];
        console.log(wrong_members);

        await hardhatSplitter.setShares(wrong_members);
      }
    });

    it("Should process correct split", async function () {
      let correct_split_members = [{perc_big_part:14, perc_lil_part:31, addresses: addr1.address},
                                   {perc_big_part:40, perc_lil_part:33, addresses: addr2.address}, 
                                   {perc_big_part:24, perc_lil_part:14, addresses: addr3.address},
                                   {perc_big_part:21, perc_lil_part:22, addresses: addr4.address}];

      const amount = 40000;

      await hardhatSplitter.setShares(correct_split_members);
      await hardhatSplitter.split({ value: amount });
      console.log(amount + '\n');

      const member = await hardhatSplitter.getMembers(0);
      //console.log(member);

      const memb_len = Object.keys(correct_split_members).length;
      for (var i = 0; i < memb_len; i++) {
        const sharePath = await hardhatSplitter.getPath(i, amount);
        console.log(sharePath.toNumber());
        var processing_part = (correct_split_members[i].perc_big_part*100 + correct_split_members[i].perc_lil_part)*amount/10000;
        expect((await hardhatSplitter.getPath(i, amount)).toNumber()).to.equal(processing_part);
      }
      
    });
  });

});