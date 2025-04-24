# LiquidityStorager



> LiquidityStorager smart-contract

Smart-contract stores liquidity for exchange crypto from one (source) chain to another one (destination chain). When you need to exchange chain A native currency from chain A to chain B currency to chain B you only need to call `swap` function with appropriate parameters (check description of `swap` function for more details). Our backend is listening for `SwapInitialized` event and if one has been emitted, they will call `redeem` function on the destination chain with appropriate parameters (check description of `redeem` function for more details).



## Methods

### exchangeRoyalty

```solidity
function exchangeRoyalty() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getLiquidityProviderBalance

```solidity
function getLiquidityProviderBalance() external view returns (uint256)
```

VIEWS FUNCTIONS




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getOwnerBalance

```solidity
function getOwnerBalance() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### owner

```solidity
function owner() external view returns (address)
```



*Returns the address of the current owner.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### redeem

```solidity
function redeem(address to, uint256 value, bytes32 redeemUID) external nonpayable
```

This function called by watcher in the destination network when they got `SwapInitialized` event. if `signatures` are correct and if such message wasn&#39;t handled before, `to` address gets `value.



#### Parameters

| Name | Type | Description |
|---|---|---|
| to | address | address from dest chain to which one value will be sent |
| value | uint256 | value of currency that contract must send |
| redeemUID | bytes32 | undefined |

### redeemPendingRedeem

```solidity
function redeemPendingRedeem(address to, uint256 value, bytes32 redeemUID) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| to | address | undefined |
| value | uint256 | undefined |
| redeemUID | bytes32 | undefined |

### redeems

```solidity
function redeems(bytes32) external view returns (enum LiquidityStorager.RedeemStatus)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | enum LiquidityStorager.RedeemStatus | undefined |

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.*


### swap

```solidity
function swap(address to, uint256 destChainId) external payable
```

Allows you to start &quot;swap&quot; process from one chain to dest chain. You need to call this function with value



#### Parameters

| Name | Type | Description |
|---|---|---|
| to | address | address from dest chain to which one value will be sent |
| destChainId | uint256 | id of the dest chain |

### transferOwnership

```solidity
function transferOwnership(address newOwner) external nonpayable
```



*Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newOwner | address | undefined |

### withdrawLiquidity

```solidity
function withdrawLiquidity(uint256 amount) external nonpayable
```

Allows the Liquidity Provider to withdraw all liquidity or only some part (check amount desc)



#### Parameters

| Name | Type | Description |
|---|---|---|
| amount | uint256 | amount of liquidity that need to withdraw. If amount is equal to zero, then all available balance will be withdraw |

### withdrawRoyalty

```solidity
function withdrawRoyalty(uint256 amount) external nonpayable
```

Allows the Watcher to withdraw all liquidity or only some part (check amount desc)



#### Parameters

| Name | Type | Description |
|---|---|---|
| amount | uint256 | amount of liquidity that need to withdraw. If amount is equal to zero, then all available balance will be withdraw |



## Events

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| previousOwner `indexed` | address | undefined |
| newOwner `indexed` | address | undefined |

### Redeemed

```solidity
event Redeemed(address to, uint256 value, enum LiquidityStorager.RedeemStatus status)
```

emitted from `redeem` function



#### Parameters

| Name | Type | Description |
|---|---|---|
| to  | address | undefined |
| value  | uint256 | undefined |
| status  | enum LiquidityStorager.RedeemStatus | undefined |

### SwapInitialized

```solidity
event SwapInitialized(address to, uint256 chainId, uint256 value)
```

emitted from `swap` function



#### Parameters

| Name | Type | Description |
|---|---|---|
| to  | address | undefined |
| chainId  | uint256 | undefined |
| value  | uint256 | undefined |



