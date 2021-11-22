pragma solidity ^0.8.1;

contract PaymentSplitter {
    uint256 private value;
    uint256 private amount;
    uint256 num_of_members;
    uint256 num_of_addresses;
    uint256 private sharesSum;
    uint256[] private shares;
    address payable[] private addresses;
    address public owner;

    event amountChanged(uint256 newAmount);
    event sharesChanged(uint256[] newShares);

    constructor() {
        owner = msg.sender;
    }

    function setAmount() payable public{
        amount = msg.value;
        amount = 2;
        emit amountChanged(amount);
    }

    function setShares(uint256[] memory _shares,
                       address payable[] memory _addresses) public {
        num_of_members = _shares.length;
        num_of_addresses = _addresses.length;
        shares = _shares;
        sharesSum = 0;
        for (uint i = 0; i < shares.length; i++) {
            sharesSum += shares[i];
        }
        require(
            sharesSum == 100,
            "shares sum is wrong!"
        );
        emit sharesChanged(shares);
        addresses = _addresses;
    }

    function split() public{
        for (uint i = 0; i < shares.length; i++) {
            addresses[i].transfer(shares[i]*amount/100);
        }
    }

    function getAmount() public view returns (uint256) {
        return amount;
    }

    function getPath() public view returns (uint256) {   
        uint256 path = (shares[0]*amount/100);
        return path;
    }

    function getMembersNum() public view returns (uint256) {   
        return num_of_members;
    }
    function getAddressesNum() public view returns (uint256) {   
        return num_of_addresses;
    }

}