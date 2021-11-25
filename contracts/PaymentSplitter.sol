pragma solidity ^0.8.1;

contract PaymentSplitter {
    uint256 private amount;
    uint256 num_of_members;
    uint256 private sharesSum;
    address public owner;
    //address payable send_addr;

    event amountChanged(uint256 newAmount);

    struct Member{

        uint256 perc_big_part;
        uint256 perc_lil_part;
        address payable addresses;

    }

    Member[] members;
    event membersChanged(Member[] members);

    constructor() {
        owner = msg.sender;
    }

    function setAmount() payable public{
        amount = msg.value;
        //amount = 20000;
        emit amountChanged(amount);
    }

    function setShares(Member[] memory _members) public {
        num_of_members = _members.length;
        sharesSum = 0;
        for (uint i = 0; i < num_of_members; i++) {
            sharesSum += _members[i].perc_big_part*100 + _members[i].perc_lil_part;
        }
        require(
            sharesSum == 10000,
            "shares sum is wrong!"
        );
        for (uint i = 0; i < num_of_members; i++) {
            members.push(_members[i]);
        }
        emit membersChanged(members);
    }

    function split() public{
        for (uint i = 0; i < num_of_members; i++) {
            members[i].addresses.transfer((members[i].perc_big_part*100 + members[i].perc_lil_part)*amount/10000);
        }
    }

    function getAmount() public view returns (uint256) {
        return amount;
    }

    function getPath(uint256 i) public view returns (uint256) {   
        uint256 path = (members[i].perc_big_part*100 + members[i].perc_lil_part)*amount/10000;
        return path;
    }

    function getMembersNum() public view returns (uint256) {
        return num_of_members;
    }

    function getMembers(uint256 i) public view returns (Member memory) {
        return members[i];
    }

}