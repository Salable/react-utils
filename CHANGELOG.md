# [4.0.0](https://github.com/Salable/react-utils/compare/v3.0.0...v4.0.0) (2023-11-13)


### Features

* add 'state' value to useUser return ([0db3eab](https://github.com/Salable/react-utils/commit/0db3eab8061ec061a72798bbd23ee2dd3adb0edd))
* allow updating of granteeId via context hook ([0ac4e56](https://github.com/Salable/react-utils/commit/0ac4e565ee485fcef4700f6a32d9768d3d9a5820))


### BREAKING CHANGES

* user no longer returns null, instead it returns a 'state' value of 'success' | 'loading' | 'error'.

This will massively simplify usage of the hook, especially when it comes to handling both loading states and errors.

# [3.0.0](https://github.com/Salable/react-utils/compare/v2.0.2...v3.0.0) (2023-11-13)


### Code Refactoring

* make useProduct a named export ([5c116e8](https://github.com/Salable/react-utils/commit/5c116e83a58e1c9ea46cd4b3239701b58aafb43e))


### BREAKING CHANGES

* useProduct was previously a default export but is now only a named export

## [2.0.2](https://github.com/Salable/react-utils/compare/v2.0.1...v2.0.2) (2023-11-10)


### Bug Fixes

* pass apiKey into all SWR fetcher functions ([5ab6144](https://github.com/Salable/react-utils/commit/5ab614406f9881273bc9a87c281ab276eb971a7e))

## [2.0.1](https://github.com/Salable/react-utils/compare/v2.0.0...v2.0.1) (2023-11-10)


### Bug Fixes

* export all hooks ([f04eb8c](https://github.com/Salable/react-utils/commit/f04eb8cb4b8ba515f0b095fa921665eea80e6691))

# [2.0.0](https://github.com/Salable/react-utils/compare/v1.1.0...v2.0.0) (2023-11-09)


### Code Refactoring

* change useProduct to take an options obj ([8d7a19e](https://github.com/Salable/react-utils/commit/8d7a19e8c9c1e97f03b3641bacdbb938e1efbab5))


### BREAKING CHANGES

* rather than a single boolean being passed in, an object containing a `withDeprecated` key is now required.

# [1.1.0](https://github.com/Salable/react-utils/compare/v1.0.1...v1.1.0) (2023-11-08)


### Features

* Add useProduct and useUser hooks ([bbe92d7](https://github.com/Salable/react-utils/commit/bbe92d795952ef45401d28768d335ee4f9d7e278))

## [1.0.1](https://github.com/Salable/react-utils/compare/v1.0.0...v1.0.1) (2023-10-30)


### Bug Fixes

* add preversion script ([5593866](https://github.com/Salable/react-utils/commit/5593866264303ccf2f7aab93ca5403587ee4aafc))

# 1.0.0 (2023-10-30)


### Features

* add SalableContext with Provider and Hook ([ac5e2da](https://github.com/Salable/react-utils/commit/ac5e2dae100a77f3da6529abee80196e52282550))
