# Graphite Token

## ABI

[LiquidityStorager](abi/LiquidityStorager.json)

[LiquidityStoragerNative](abi/LiquidityStoragerNative.json)

## Documentation

[LiquidityStorager doc](docs/LiquidityStorager.md)

## Error codes (LiquidityStorager)

### General errors

- `LS001` : incorrect status of redeem (already processed)
- `LS002` : incorrect royalty withdrawal amount (more than available)
- `LS003` : invalid royalty percentage (should be between 0–100)

### Auth errors

- `LS103` : only Bridge Owner can call this function
- `LS104` : transfer not permitted by filter contract

### Swap-related errors

- `LS203` : cannot swap to the same chain ID
- `LS204` : value is less than minimal transfer amount
