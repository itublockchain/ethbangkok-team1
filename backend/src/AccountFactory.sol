//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;    

import "./Account.sol";  
contract AccountFactory {
    
    mapping(bytes32 => address) private publicKeyToAccount;
    address[] private accounts;

    function createAccount(
        address _verifier,
        bytes32 _signedHash,
        bytes memory _signature,
        bytes32[2] memory _publicKey
    ) public returns (Account) {
        require(
            IR1Validator(_verifier).validateSignature(
                _signedHash,
                _signature,
                _publicKey
            ),
            "AccountFactory: Cannot validate signature"
        );

        Account newAccount = new Account(_publicKey);
        accounts.push(address(newAccount));
        publicKeyToAccount[hashPublicKey(_publicKey)] = address(newAccount);
        return newAccount;
    }

    function hashPublicKey(
        bytes32[2] memory _publicKey
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_publicKey));
    }

    function getAccountAddress(
        bytes32[2] memory _publicKey
    ) public view returns (address) {
        return publicKeyToAccount[hashPublicKey(_publicKey)];
    }
}