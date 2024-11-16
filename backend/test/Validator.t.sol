// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {PasskeyVerifier} from "../src/PasskeyValidator.sol";

contract CounterTest is Test {
    PasskeyVerifier public verifier;

    function setUp() public {
        verifier = new PasskeyVerifier();
    }

    function test_Increment() public {
        verifier.validateSignature()
    }
}
