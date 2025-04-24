# Graphite Token

## ABI

[LiquidityStorager](abi/LiquidityStorager.json)

[LiquidityStoragerNative](abi/LiquidityStoragerNative.json)

## Documentation

[LiquidityStorager doc](docs/LiquidityStorager.md)

## Error codes (LiquidityStorager)

### General error related

- `LS001` : `incorrect status of redeem`
- `LS002` : `incorrect royalty withdrawal amount`
- `LS003` : `incorrect royalty set amount`
- `LS004` : `incorrect liquidity withdrawal amount`


### Auth error related

- `LS101` : `only Watcher can call this function`
- `LS102` : `only Liquidity Provider can call this function`
- `LS103` : `only Bridge Owner can call this function`
- `LS104` : `transfer not permitted`


### Swap method related

- `LS201` : `value must me greater that 100`
- `LS202` : `value must me lesser that balance`
- `LS003` : `cannot swap to same chain id`
