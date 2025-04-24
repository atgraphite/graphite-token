import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from "chai";

import { LiquidityStoragerNative } from '../typechain-types'

import { weiToEther } from './utils';


describe('LiquidityStoragerNative tests', () => {
  let owner: SignerWithAddress
  let user: SignerWithAddress
  let user2: SignerWithAddress
  let provider: SignerWithAddress
  let storager: LiquidityStoragerNative

  const amount = weiToEther(100)
  const amountIncreased = weiToEther(198)
  const amountDoubled = weiToEther(200)
  const randomChainId = 123
  const exceptionAmount = 99
  const redeemAmountExpected = weiToEther(99)
  const royaltyAmountExpected = weiToEther(1)

  const unearnedAmount = weiToEther(101)

  beforeEach(async () => {
    [owner, user, user2, provider] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory('LiquidityStoragerNative');
    storager = await Contract.deploy(provider.address, owner.address, "test", "test", "0x0000000000000000000000000000000000000000", {value: amount})
  })

  it("Test constructor payable", async() => {
    expect(await storager.getLiquidityProviderBalance()).to.be.equal(amount)
    expect(await storager.getOwnerBalance()).to.be.equal(0)
  })

  it("Test receive: non provider fail", async() => {
    await expect(user.sendTransaction({
      to: await storager.getAddress(),
      value: amount
    })).to.be.revertedWith("LS102")
    expect(await storager.getLiquidityProviderBalance()).to.be.equal(amount)
  })


  it("Test receive: only provider", async() => {
    await provider.sendTransaction({
      to: await storager.getAddress(),
      value: amount
    })
    expect(await storager.getLiquidityProviderBalance()).to.be.equal(amountDoubled)
  })

  it("Test swaps: amount less then 100", async ()=>{
    await expect(storager.connect(user).swap(user.address, randomChainId, {value: exceptionAmount})).to.be.revertedWith("LS201")
  })

  it("Test swaps: cannot swap to same chainid", async ()=>{
    await expect(storager.connect(user).swap(user.address, (await ethers.provider.getNetwork()).chainId, {value: amount})).to.be.revertedWith("LS203")
  })

  it("Test swaps: user balance should be reduced", async ()=>{
    await expect(storager.connect(user).swap(user.address, randomChainId, {value: amount})).not.to.be.reverted
  })

  it("Test swaps: owner balance updated", async ()=>{
    await expect(storager.connect(user).swap(user.address, randomChainId, {value: amount})).not.to.be.reverted
  })

  it("Test swaps: owner liquidity balance updated", async ()=>{
    expect(await storager.getLiquidityProviderBalance()).to.be.equal(amount)
    await expect(storager.connect(user).swap(user.address, randomChainId, {value: amount})).not.to.be.reverted
    expect(await storager.getLiquidityProviderBalance()).to.be.equal(amountIncreased)

  })

  it("Test royalty withdrawal: owner can't withdraw more than earned", async ()=>{
    await expect(storager.connect(user).swap(user.address, randomChainId, {value: amount})).not.to.be.reverted

    await expect(storager.withdrawRoyalty(unearnedAmount)).to.be.revertedWith("LS002")
    expect(await storager.getOwnerBalance()).to.be.equal(royaltyAmountExpected)
  })

  it("Test royalty withdrawal: owner balance updated", async ()=>{
    await expect(storager.connect(user).swap(user.address, randomChainId, {value: amount})).not.to.be.reverted
    expect(await storager.getOwnerBalance()).to.be.equal(royaltyAmountExpected)
    await storager.withdrawRoyalty(0)
  })

  it("Test liquidity withdrawal: provider can't withdraw more than possible", async ()=>{
    await expect(storager.connect(provider).withdrawLiquidity(unearnedAmount)).to.be.revertedWith("LS004")
    expect(await storager.getLiquidityProviderBalance()).to.be.equal(amount)
  })

  it("Test liquidity withdrawal: provider balance updated", async ()=>{
    expect(await storager.getLiquidityProviderBalance()).to.be.equal(amount)
    await storager.connect(provider).withdrawLiquidity(0)
    expect(await storager.getLiquidityProviderBalance()).to.be.equal(0)
  })

  it("Test set exchange amount", async() => {
    await expect(storager.setExchangeRoyalty(101)).to.be.rejectedWith("LS003")
    await expect(storager.connect(user).setExchangeRoyalty(2)).to.be.rejectedWith("LS103")
    await expect(storager.setExchangeRoyalty(2)).not.to.be.reverted
  })

  it("Test redeem: only owner can redeem", async()=> {
    await expect(storager.connect(user2).redeem(user2.address, redeemAmountExpected, "0x00")).to.be.revertedWith("LS103")
    await expect(storager.redeem(user2.address, redeemAmountExpected, "0x00")).not.to.be.reverted
  })

  it("Test redeem: can't redeem", async()=> {
    await expect(storager.redeem(user2.address, redeemAmountExpected, "0x00")).not.to.be.reverted
    await expect(storager.redeem(user2.address, redeemAmountExpected, "0x00")).to.be.revertedWith("LS001")
  })

  it("deposit", async() => {
    expect(await storager.balanceOf(owner.address)).to.be.equal(0)
    await storager.deposit({value: 10000})
    expect(await storager.balanceOf(owner.address)).to.be.equal(10000)
})

it("withdraw", async() => {
    expect(await storager.balanceOf(owner.address)).to.be.equal(0)
    await storager.deposit({value: 10000})
    expect(await storager.balanceOf(owner.address)).to.be.equal(10000)
    await storager.withdraw(10000)
    expect(await storager.balanceOf(owner.address)).to.be.equal(0)
})
})
