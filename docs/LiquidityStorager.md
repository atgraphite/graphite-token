# LiquidityStorager Docs

> Smart contracts for managing Graphite Token cross-chain liquidity and Graphite token swaps.

---

## 🧱 Overview

This repository includes two main bridge contracts:

| Contract | Purpose |
|---------|--------|
| `LiquidityStoragerNative` | Manages native Graphite token on the Graphite blockchain |
| `LiquidityStoragerERC20` | Manages wrapped Graphite token on other EVM chains |

Both emit `Swap` events on the source chain and accept `redeem(...)` calls on the destination chain. A backend Watcher is responsible for listening and coordinating the flows.

---

## 🔹 Common Concepts

### Events

- `Swap(address to, uint256 chainId, uint256 value)`: emitted when a user initiates a bridge transfer.
- `Redeem(address to, uint256 value, RedeemStatus status)`: emitted when funds are redeemed on the destination chain.

### Enum

```solidity
enum RedeemStatus {
  UNKNOWN,
  HANDLED
}
```

---

## 🔷 LiquidityStoragerNative (native Graphite coin)


### 🔁 swap()

```solidity
function swap(address to, uint256 destChainId) external payable
```

- Use for sending native Graphite to the other chain.
- Emits `Swap` event minus a royalty fee.
- Must `msg.value >= minTransferAmount`.

---

### 🎯 redeem()

```solidity
function redeem(address to, uint256 value, bytes calldata redeemUID) external onlyOwner
```

- Called by the Watcher on the destination chain.
- Sends `value` in native currency to `to`.
- Ensures idempotency via `redeemUID`.

---

### 💸 withdrawRoyalty()

```solidity
function withdrawRoyalty(uint256 amount) external onlyOwner
```

- Allows owner to withdraw accumulated royalties in native currency.
- Pass `0` to withdraw full balance.

---

### 🔐 Admin functions

```solidity
function setExchangeRoyalty(uint256 amount) external onlyOwner
function setMinTransferAmount(uint256 amount) external onlyOwner
```

- Adjusts percentage-based royalty and minimal swap amount.

---

### 🔍 View functions

```solidity
function getOwnerBalance() public view returns (uint256)
function getMinTransferAmount() external view returns (uint256)
```

---

### 💰 exchangeRoyalty

```solidity
uint256 public exchangeRoyalty
```

- Defines the **percentage-based royalty fee** taken from each swap or token transfer.
- Expressed in whole numbers (e.g. `1` means 1%).
- Deducted during `swap()` or `swapToken()` and added to the contract owner’s internal balance (`ownerBalance`).
- Can be changed by the owner using:

```solidity
function setExchangeRoyalty(uint256 amount) external onlyOwner
```

---

## 🔷 LiquidityStoragerERC20 (Wrapped Graphite Token)

### 🔁 swapToken()

```solidity
function swapToken(address to, uint256 destChainId, uint256 amount) external
```

- Burns `amount` from sender.
- Emits `Swap(to, destChainId, amount - royalty)`.
- Ensures `amount >= minTransferAmount`.

---

### 🎯 redeem()

```solidity
function redeem(address to, uint256 value, bytes calldata redeemUID) external onlyOwner
```

- Mints `value` tokens to recipient.
- Ensures `redeemUID` is not reused.

---

### 💸 withdrawRoyalty()

```solidity
function withdrawRoyalty(uint256 amount) external onlyOwner
```

- Mints royalty amount back to owner address.
- `amount == 0` withdraws full royalty balance.

---

### 🔐 Admin functions

```solidity
function setExchangeRoyalty(uint256 amount) external onlyOwner
function setMinTransferAmount(uint256 amount) external onlyOwner
```

---

### 🔍 View functions

```solidity
function getOwnerBalance() public view returns (uint256)
function getMinTransferAmount() external view returns (uint256)
```

---

### 💰 exchangeRoyalty

```solidity
uint256 public exchangeRoyalty
```

- Defines the **percentage-based royalty fee** taken from each swap or token transfer.
- Expressed in whole numbers (e.g. `1` means 1%).
- Deducted during `swap()` or `swapToken()` and added to the contract owner’s internal balance (`ownerBalance`).
- Can be changed by the owner using:

```solidity
function setExchangeRoyalty(uint256 amount) external onlyOwner
```

---
