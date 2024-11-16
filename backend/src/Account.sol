// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {IR1Validator} from "./interfaces/IValidator.sol";


contract Account is IR1Validator {
    // Constant public keys for the account
    bytes32[2] private publicKey;
    // Array for passwords
    string[] private passwords;
    // Array for all the names
    string[] private names;

    string[] private urls;

    // Mapping to check existence of a password to optimize deletion
    mapping(string => bool) private passwordExists;

    mapping(string=>string) private nameToUrl;

    // Mapping for the names to passwords
    mapping(string => string) private nameToPassword;

    // Mapping to chech existence of an names
    mapping(string => bool) private nameExists;


    constructor(bytes32[2] memory _publicKey) {
        publicKey = _publicKey;
    }

    function addPassword(
        address _validator,
        bytes32 _signedHash,
        bytes memory _signature,
        string memory _password,
        string memory _name,
        string memory _url
    ) public {
        require(
            IR1Validator(_validator).validateSignature(
                _signedHash,
                _signature,
                publicKey
            ),
            "Account: Cannot validate signature"
        );
        require(
            keccak256(bytes(nameToPassword[_name])) == keccak256(bytes("")), // Adjusted check
            "Account: Password already exists"
        );
        require(bytes(_name).length > 0, "Account: Name cannot be empty");

        passwords.push(_password);
        urls.push(_url);
        nameToPassword[_name] = _password;
        nameToUrl[_name] = _url;
        names.push(_name);
        passwordExists[_password] = true; // Adjusted to use string
        nameExists[_name] = true;
    }

    function addPasswords(
        address _validator,
        bytes32 _signedHash,
        bytes memory _signature,
        string[] memory _passwords, // Change to string[]
        string[] memory _names
    ) public {
        require(
            IR1Validator(_validator).validateSignature(
                _signedHash,
                _signature,
                publicKey
            ),
            "Account: Cannot validate signature"
        );
        require(
            _passwords.length == _names.length,
            "Account: Passwords and names length mismatch"
        );

        for (uint i = 0; i < _passwords.length; i++) {
            require(
                keccak256(bytes(nameToPassword[_names[i]])) ==
                    keccak256(bytes("")), // Adjusted check
                "Account: Password already exists"
            );
            require(
                bytes(_names[i]).length > 0,
                "Account: Name cannot be empty"
            );

            passwords.push(_passwords[i]);
            nameToPassword[_names[i]] = _passwords[i];
            names.push(_names[i]);
            passwordExists[_passwords[i]] = true; // Adjusted to use string
            nameExists[_names[i]] = true;
        }
    }

    function getPassword(
        address _validator,
        bytes32 _signedHash,
        bytes memory _signature,
        string memory _name
    ) public view returns (string memory) {
        require(
            IR1Validator(_validator).validateSignature(
                _signedHash,
                _signature,
                publicKey
            ),
            "Account: Cannot validate signature"
        );
        require(bytes(_name).length > 0, "Account: Name cannot be empty");

        return nameToPassword[_name];
    }

    function deletePassword(
        address _validator,
        bytes32 _signedHash,
        bytes memory _signature,
        string memory _name
    ) public {
        require(
            IR1Validator(_validator).validateSignature(
                _signedHash,
                _signature,
                publicKey
            ),
            "Account: Cannot validate signature"
        );
        require(
            keccak256(bytes(nameToPassword[_name])) != keccak256(bytes("")),
            "Account: Password does not exist"
        );

        // Remove the password from the array if it exists
        string memory toDelete = nameToPassword[_name];
        require(
            passwordExists[toDelete],
            "Account: Password does not exist in array"
        );

        for (uint256 i = 0; i < passwords.length; i++) {
            if (keccak256(bytes(passwords[i])) == keccak256(bytes(toDelete))) {
                passwords[i] = passwords[passwords.length - 1]; // Replace with last element
                passwords.pop(); // Remove last element
                break;
            }
        }

        delete nameToPassword[_name];
        passwordExists[toDelete] = false;

        string memory toDeleteName = _name;
        require(
            nameExists[toDeleteName],
            "Account: Name does not exist in array"
        );
        for (uint256 i = 0; i < names.length; i++) {
            if (keccak256(bytes(names[i])) == keccak256(bytes(toDeleteName))) {
                names[i] = names[names.length - 1]; // Replace with last element
                names.pop(); // Remove last element
                break;
            }
        }
        nameExists[toDeleteName] = false;
    }

    function getPasswords(
        address _validator,
        bytes32 _signedHash,
        bytes memory _signature
    ) public view returns (string[] memory) {
        require(
            IR1Validator(_validator).validateSignature(
                _signedHash,
                _signature,
                publicKey
            ),
            "Account: Cannot validate signature"
        );
        return passwords;
    }

    function getUrls(
        address _validator,
        bytes32 _signedHash,
        bytes memory _signature
    ) public view returns (string[] memory) {
        require(
            IR1Validator(_validator).validateSignature(
                _signedHash,
                _signature,
                publicKey
            ),
            "Account: Cannot validate signature"
        );
        return urls;
    }

    function getNames() public view returns (string[] memory) {
        return names;
    }

  

    function supportsInterface(
        bytes4 interfaceId
    ) external view override returns (bool) {}

    function validateSignature(
        bytes32 signedHash,
        bytes calldata signature,
        bytes32[2] calldata pubKey
    ) external view override returns (bool valid) {}
}