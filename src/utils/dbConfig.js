export const STORENAME = "accounts";
export const TOKENSTORE = "token";
export const DBConfig = {
  name: "Bitwallet",
  version: 1,
  objectStoresMeta: [
    {
      store: STORENAME,
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "wallet", keypath: "wallet", options: { unique: false } },
        {
          name: "jsonwallet",
          keypath: "jsonwallet",
          options: { unique: false },
        },
        {
          name: "active",
          keypath: "active",
          options: { unique: false },
        },
      ],
    },
    {
      store: TOKENSTORE,
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        {
          name: "tokenAddress",
          keypath: "tokenAddress",
          options: { unique: false },
        },
        {
          name: "tokenSymbol",
          keypath: "tokenSymbol",
          options: { unique: false },
        },
        {
          name: "tokenDecimal",
          keypath: "tokenDecimal",
          options: { unique: false },
        },
        {
          name: "tokenBal",
          keypath: "tokenBal",
          options: { unique: false },
        },
      ],
    },
  ],
};
