//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {ConstantPasskeyVerifier} from "../src/ConstantPasskeyVerifier.sol";

contract AccountFactoryScript is Script{
    function setup() public {
        
    }
    function run() public{
        vm.startBroadcast();
        new ConstantPasskeyVerifier();

        vm.stopBroadcast();
    }
}