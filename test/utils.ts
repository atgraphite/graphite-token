import { ethers } from 'hardhat'

export function weiToEther(wei: number) {
  return ethers.parseEther(String(wei)).toString()
}
