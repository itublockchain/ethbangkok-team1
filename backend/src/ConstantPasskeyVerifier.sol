
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Base64} from "./helpers/Base64.sol";
import {IR1Validator, IERC165} from "./interfaces/IValidator.sol";
import {VerifierCaller} from "./helpers/VerifierCaller.sol";

contract ConstantPasskeyVerifier is VerifierCaller, IR1Validator {
    // Base P256Verifier Contract Address, 
    address constant P256_VERIFIER = 0xc2b78104907F722DABAc4C69f826a522B2754De4; 
    // maximum value for 's' in a secp256r1 signature
    bytes32 constant lowSmax =
        0x7fffffff800000007fffffffffffffffde737d56d38bcf4279dce5617e3192a8;
    string constant ClIENT_DATA_PREFIX = '{"type":"webauthn.get","challenge":"';
    // user presence and user verification flags
    bytes1 constant AUTH_DATA_MASK = 0x05;

    /// @inheritdoc IR1Validator
    function validateSignature(
        bytes32 challenge,
        bytes calldata signature,
        bytes32[2] calldata pubKey
    ) external view returns (bool valid) {
        // valid = _validateFatSignature(challenge, signature, pubKey);
        return true;
    }

    /// @inheritdoc IERC165
    function supportsInterface(
        bytes4 interfaceId
    ) external pure override returns (bool) {
        return
            interfaceId == type(IR1Validator).interfaceId ||
            interfaceId == type(IERC165).interfaceId;
    }

    function _validateFatSignature(
        bytes32 challenge,
        bytes calldata fatSignature,
        bytes32[2] calldata pubKey
    ) private view returns (bool valid) {
        (
            bytes memory authenticatorData,
            string memory clientDataSuffix,
            bytes32[2] memory rs
        ) = _decodeFatSignature(fatSignature);

        // malleability check
        if (rs[1] > lowSmax) {
            return false;
        }

        // check if the flags are set
        if (authenticatorData[32] & AUTH_DATA_MASK != AUTH_DATA_MASK) {
            return false;
        }

        bytes memory challengeBase64 = bytes(
            Base64.encodeURL(bytes.concat(challenge))
        );
        bytes memory clientData = bytes.concat(
            bytes(ClIENT_DATA_PREFIX),
            challengeBase64,
            bytes(clientDataSuffix)
        );

        bytes32 message = _createMessage(authenticatorData, clientData);

        valid = callVerifier(P256_VERIFIER, message, rs, pubKey);
    }

    function _createMessage(
        bytes memory authenticatorData,
        bytes memory clientData
    ) private pure returns (bytes32 message) {
        bytes32 clientDataHash = sha256(clientData);
        message = sha256(bytes.concat(authenticatorData, clientDataHash));
    }

    function _decodeFatSignature(
        bytes memory fatSignature
    )
        private
        pure
        returns (
            bytes memory authenticatorData,
            string memory clientDataSuffix,
            bytes32[2] memory rs
        )
    {
        (authenticatorData, clientDataSuffix, rs) = abi.decode(
            fatSignature,
            (bytes, string, bytes32[2])
        );
    }
}