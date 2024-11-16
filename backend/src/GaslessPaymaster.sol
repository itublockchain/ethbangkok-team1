// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GaslessPaymaster {
    mapping(address => uint256) public sponsoredGas;

    event UserOperationValidated(address indexed user, uint256 gasSponsored);
    event GasRefunded(address indexed user, uint256 gasAmount);

    //validation function (ERC-4337 compatible)
    function validatePaymasterUserOp(
        bytes calldata userOp, 
        uint256 requiredPreFund // Required gas pre-fund
    ) external returns (bytes memory context) {
    
        address user = msg.sender; 
        sponsoredGas[user] += requiredPreFund; // Track sponsored gas
        emit UserOperationValidated(user, requiredPreFund);

        
        return abi.encode(user, requiredPreFund);
    }

    
    function postOp(
        bytes calldata context, 
        uint256 actualGasCost 
    ) external {
        (address user, uint256 preFund) = abi.decode(context, (address, uint256));

       
        require(preFund >= actualGasCost, "Insufficient pre-fund");

        uint256 gasRefunded = actualGasCost;
        sponsoredGas[user] -= gasRefunded;
        emit GasRefunded(user, gasRefunded);
    }

    
    function getSponsoredGas(address user) external view returns (uint256) {
        return sponsoredGas[user];
    }
}
