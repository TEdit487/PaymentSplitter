pragma solidity ^0.8.1;

contract Test {
    uint256 private value;
    uint256 private sum;
    uint256 private num_of_members;
    uint256 private sharesSum;
    uint256[] private shares;
    address payable[] private addresses;

    // Emitted when the stored value changes
    event SumChanged(uint256 newValue);

    struct Person {
        uint funds;
        address addr;
    }

    Person[] public persons;

    mapping(bytes32 => Person[]) personList;

    function setSum(uint256 Sum) public{
        sum = Sum;
        emit SumChanged(Sum);
    }

    function setShares(uint256[] memory _shares, address payable[] memory _addresses) public {
        num_of_members = _shares.length;
        shares = _shares;
        sharesSum = 0;
        for (uint i = 0; i < shares.length; i++) {
            sharesSum += shares[i];
        }
        require(
            sharesSum == 100,
            "share's summary is wrong!"
        );
        addresses = _addresses;
    }

    function split() public{
        for (uint i = 0; i < shares.length; i++) {
            addresses[i].transfer(shares[i]*sum/100);
        }
    }

    function getSum() public view returns (uint256) {
        return sum;
    }
}