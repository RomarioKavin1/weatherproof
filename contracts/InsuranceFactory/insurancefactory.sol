// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract InsuranceFactory is Ownable(msg.sender) {
  // GAL token address on Galadriel Devnet (replace with actual address)
  address public GALToken = 0x0c44cFecaFE4da904Ee24984FD74c91C2bE431B7; // Replace with actual GAL token address

  mapping(address => address) public insuranceContracts; // Maps user to their insurance contract address

  event InsuranceContractDeployed(address indexed insuranceContract, address indexed owner, string cid, uint premiumAmount);

  constructor() {} // Empty constructor

  function deployInsuranceContract(uint _premiumAmount, string memory cid) external {
    require(insuranceContracts[msg.sender] == address(0), "User already has an insurance contract");

    // Calculate the actual transfer amount (0.1 times the passed _premiumAmount)
    uint transferAmount = _premiumAmount * 10 / 100; // 10% of the _premiumAmount

    // Transfer the calculated amount from user to factory (using GAL)
    IERC20(GALToken).transferFrom(msg.sender, address(this), transferAmount);

    // Create a new Insurance contract (passing the original _premiumAmount)
    Insurance newInsurance = new Insurance(GALToken, _premiumAmount, cid);

    // Map user to their insurance contract address
    insuranceContracts[msg.sender] = address(newInsurance);

    emit InsuranceContractDeployed(address(newInsurance), msg.sender, cid, _premiumAmount);
  }

  function claimInsurance(address beneficiary) external {
    // Get user's insurance contract address
    address insuranceContract = insuranceContracts[msg.sender];

    // Check if user has a deployed insurance contract
    require(insuranceContract != address(0), "User has no deployed insurance contract");

    // Call claimPayout function on the user's insurance contract
    Insurance(insuranceContract).claimPayout(beneficiary);
  }

  function readInsuranceDetails(address user) public view returns (address galToken, uint premium, string memory cid) {
    address insuranceContract = insuranceContracts[user];
    require(insuranceContract != address(0), "User has no deployed insurance contract");

    // Read details from the user's insurance contract
    Insurance insurance = Insurance(insuranceContract);
    galToken = insurance.GALToken();
    premium = insurance.premiumAmount();
    cid = insurance.cid();
  }
}

contract Insurance {
  address public GALToken;
  uint public premiumAmount; // Store the original passed premium amount
  string public cid;

  mapping(address => uint) public insuredAmounts;

  constructor(address _GALToken, uint _premiumAmount, string memory _cid) {
    GALToken = _GALToken;
    premiumAmount = _premiumAmount;
    cid = _cid;
  }

  function claimPayout(address beneficiary) external {
    uint payoutAmount = insuredAmounts[beneficiary];
    require(payoutAmount > 0, "No payout available for the beneficiary");

    insuredAmounts[beneficiary] = 0;
    IERC20(GALToken).transfer(beneficiary, payoutAmount);
  }
}
