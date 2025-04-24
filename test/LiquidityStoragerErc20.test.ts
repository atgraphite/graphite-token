import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from "chai";

import { LiquidityStoragerERC20 } from '../typechain-types'

import { weiToEther } from './utils';


describe('LiquidityStoragerErc20 tests', () => {
  let owner: SignerWithAddress
  let user: SignerWithAddress
  let user2: SignerWithAddress
  let storager: LiquidityStoragerERC20

  const amount = weiToEther(100)
  const randomChainId = 123
  const exceptionAmount = 99
  const redeemAmountExpected = weiToEther(99)
  const royaltyAmountExpected = weiToEther(1)

  const unearnedAmount = weiToEther(101)

  beforeEach(async () => {
    [owner, user, user2] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory('LiquidityStoragerERC20');
    storager = await Contract.deploy(owner.address, "test", "test")

    await storager.mint(user.address, amount)
  })

  it("Test swaps: amount less then 100", async ()=>{
    await expect(storager.connect(user).swap(user.address, randomChainId, exceptionAmount)).to.be.revertedWith("LS201")
    expect(await storager.balanceOf(user.address)).to.be.equal(amount)
  })

  it("Test swaps: cannot swap to same chainid", async ()=>{
    await expect(storager.connect(user).swap(user.address, (await ethers.provider.getNetwork()).chainId, amount)).to.be.revertedWith("LS203")
    expect(await storager.balanceOf(user.address)).to.be.equal(amount)
  })

  it("Test swaps: user balance should be reduced", async ()=>{
    await expect(storager.connect(user).swap(user.address, randomChainId, amount)).not.to.be.reverted
    expect(await storager.balanceOf(user.address)).to.be.equal(0)
  })

  it("Test swaps: owner balance updated", async ()=>{
    await expect(storager.connect(user).swap(user.address, randomChainId, amount)).not.to.be.reverted
    expect(await storager.getOwnerBalance()).to.be.equal(royaltyAmountExpected)
  })

  it("Test royalty withdrawal: owner can't withdraw more than earned", async ()=>{
    await expect(storager.connect(user).swap(user.address, randomChainId, amount)).not.to.be.reverted

    await expect(storager.withdrawRoyalty(unearnedAmount)).to.be.revertedWith("LS002")
    expect(await storager.getOwnerBalance()).to.be.equal(royaltyAmountExpected)
    expect(await storager.balanceOf(owner.address)).to.be.equal(0)
  })

  it("Test royalty withdrawal: owner balance updated", async ()=>{
    await expect(storager.connect(user).swap(user.address, randomChainId, amount)).not.to.be.reverted
    expect(await storager.getOwnerBalance()).to.be.equal(royaltyAmountExpected)
    expect(await storager.balanceOf(owner.address)).to.be.equal(0)
    await storager.withdrawRoyalty(0)
    expect(await storager.balanceOf(owner.address)).to.be.equal(royaltyAmountExpected)
  })

  it("Test set exchange amount", async() => {
    await expect(storager.setExchangeRoyalty(101)).to.be.rejectedWith("LS003")
    await expect(storager.connect(user).setExchangeRoyalty(2)).to.be.rejectedWith("LS103")
    await expect(storager.setExchangeRoyalty(2)).not.to.be.reverted
  })

  it("Test redeem: only owner can redeem", async()=> {
    expect(await storager.balanceOf(user2.address)).is.equal(0)
    await expect(storager.connect(user2).redeem(user2.address, redeemAmountExpected, "0x00")).to.be.revertedWith("LS103")
    expect(await storager.balanceOf(user2.address)).is.equal(0)
    await expect(storager.redeem(user2.address, redeemAmountExpected, "0x00")).not.to.be.reverted
    expect(await storager.balanceOf(user2.address)).is.equal(redeemAmountExpected)
  })

  it("Test redeem: can't redeem twice", async()=> {
    expect(await storager.balanceOf(user2.address)).is.equal(0)
    await expect(storager.redeem(user2.address, redeemAmountExpected, "0x00")).not.to.be.reverted
    expect(await storager.balanceOf(user2.address)).is.equal(redeemAmountExpected)
    await expect(storager.redeem(user2.address, redeemAmountExpected, "0x00")).to.be.revertedWith("LS001")
    expect(await storager.balanceOf(user2.address)).is.equal(redeemAmountExpected)
  })
})
