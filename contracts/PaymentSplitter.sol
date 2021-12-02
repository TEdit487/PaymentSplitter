pragma solidity ^0.8.1;

contract PaymentSplitter {
    uint48 num_of_members;
    uint48 private sharesSum;
    address public owner;

    struct Member{

        uint48 perc_big_part;
        uint48 perc_lil_part;
        address payable addresses;

    }

    Member[] members;
    event membersChanged(Member[] members);

    constructor() {
        owner = msg.sender;
    }


    function setShares(Member[] memory _members) public {
        delete members;
        num_of_members = uint48(_members.length);
        sharesSum = 0;
        for (uint i = 0; i < num_of_members; i++) {
            sharesSum += uint48(_members[i].perc_big_part*100 + _members[i].perc_lil_part);
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

    function split() payable public{
        // uint256 amount
        for (uint i = 0; i < num_of_members; i++) {
            members[i].addresses.transfer(getPath(i, msg.value));
        }
    }

    function getPath(uint256 i, uint256 amount) public view returns (uint256) {   
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