//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {GaslessPaymaster} from "../src/GaslessPaymaster.sol";

contract GaslessPaymasterScript is Script{
    function setup() public {
        
    }
    function run() public{
        vm.startBroadcast();
        new GaslessPaymaster();

        vm.stopBroadcast();
    }
}