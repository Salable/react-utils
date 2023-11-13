# Salable React Utils

A set of hooks, contexts and utilities that will come in handy when building
React applications with [Salable](https://salable.app/).

Each function/hook/util in this library has detailed docblocks - hover over any
of them in your code editor to learn more.

## SalableContextProvider

In order to make use of any of the hooks in this package, you will need to
render a `SalableContextProvider` in your application. Once this is rendered,
all `children` of that component will be able to utilise the provided hooks. For
simplicity's sake, we recommend rendering this at the top level of your
application.

Both `apiKey` and `productUuid` are required when rendering the provider.

### Example

```tsx
import { SalableContextProvider } from '@salable/react-utils';

function MyApp({ children }) {
  return (
    <SalableContextProvider
      value={{
        apiKey: 'YOUR_API_KEY',
        productUuid: 'YOUR_PRODUCT_UUID',
        granteeId: 'OPTIONAL_GRANTEE_ID',
      }}
    >
      {children}
    </SalableContextProvider>
  );
}
```

## `useSalableContext`

Fetches the `SalableContext` data. This is mostly used by the other hooks in
this package, but is exposed in-case you want access to the underlying values.

### Example

```tsx
import { useSalableContext } from '@salable/react-utils';

function MyComponent() {
  const contextData = useSalableContext();
  return <></>;
}
```

You can also use `useSalableContext` to update the underlying `granteeId` value
relied on by other hooks in this package.

### Example

```tsx
import { useSalableContext } from '@salable/react-utils';

function MyComponent() {
  const contextData = useSalableContext();

  function clickHandler() {
    contextData.setGranteeId('the-new-grantee-id');
  }

  return <button onClick={clickHandler}>Change user</button>;
}
```

## `useUser`

Returns useful data scoped both to the provided user (determined by the
`granteeId` from the `SalableContext`) AND the provided product.

Also returns a `hasCapability` function which allows for simple checking of the
provided user's capabilities.

## Example

```tsx
import { useUser } from '@salable/react-utils'

function ActionButtons() {
  const user = useUser();

  if (user.state === 'loading') return <LoadingSpinner />
  if (user.state === 'error') {
    // Handle errors here...
  }

  /**
   * If you only want to check a single capability, pass in a string rather than
   * an array.
   *
   * hasCapability('test') => Boolean
   */
  const { edit, delete } = user.hasCapability(['edit', 'delete'])

  return (
    <div>
      <button>Cancel</button>
      {edit ? <button>Edit</button> : null}
      {delete ? <button>Delete</button> : null}
    </div>
  )
}
```

## `useProduct`

Returns useful data about the current product. Can be used for many things
including the creation of custom pricing tables.

By default, plans and features that are marked as `DEPRECATED` will be excluded
from the response. If you would like these returned, you can pass in an optional
options object with `{ withDeprecated: true }`.

### Example

```tsx
import { useProduct } from '@salable/react-utils';

function MyComponent() {
  const { name } = useProduct();
  return <h1>This product is called {name}</h1>;
}
```
