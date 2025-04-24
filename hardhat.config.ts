import dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";  // https://www.npmjs.com/package/@nomicfoundation/hardhat-toolbox
import "hardhat-dependency-compiler";       // https://www.npmjs.com/package/hardhat-dependency-compiler
import "hardhat-storage-layout";            // https://www.npmjs.com/package/hardhat-storage-layout
import "hardhat-contract-sizer";            // https://www.npmjs.com/package/hardhat-contract-sizer
import "hardhat-abi-exporter";              // https://www.npmjs.com/package/hardhat-abi-exporter
// import "@nomiclabs/hardhat-ethers";
import '@primitivefi/hardhat-dodoc';        // https://npm.io/package/@primitivefi/hardhat-dodoc
import "hardhat-tracer";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
};

export default config;
