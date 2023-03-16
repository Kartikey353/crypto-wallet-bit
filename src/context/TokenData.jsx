import axios from "axios";
import React, { useState, useEffect } from "react";
import TokenContext from "./TokenContext";
import { Network, Alchemy } from "alchemy-sdk";
// import { Network, Alchemy } from "alchemy-sdk";
import { useSelector } from "react-redux";
const TokenData = (props) => {
  const [contractAddress, setContractAddress] = useState();
  const [symbol, setSymbol] = useState();
  const [decimal, setDecimal] = useState();
  const { account, currentNetwork } = useSelector((state) => state.wallet);

  const getTokenBal = async () => {
    // const apiKey = "LcFoRvsufwg2oB5KhWnEur-ZilkAq2Ev";
    const apiKey = process.env.REACT_APP_ALCHEMYKEY;
    const baseURL = `https://eth-goerli.alchemyapi.io/v2/${apiKey}`;
    // Replace with the wallet address you want to query:
    const ownerAddr = account?.address;
    // Replace with the token contract address you want to query:
    const tokenAddr = contractAddress;
    let result;
    try {
      var data = JSON.stringify({
        jsonrpc: "2.0",
        method: "alchemy_getTokenBalances",
        params: [`${ownerAddr}`, [`${tokenAddr}`]],
        id: 42,
      });

      var config = {
        method: "post",
        url: baseURL,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          const {
            result: {
              tokenBalances: [{ tokenBalance }],
            },
          } = response.data;

          result = JSON.stringify(parseInt(tokenBalance), null, 2);
          console.log(result);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(`Error Occured: ${error}`);
    }
    return result;
  };

  const getTokenDet = () => {
    const settings = {
      apiKey: process.env.REACT_APP_ALCHEMYKEY, // Replace with your Alchemy API Key.
      network: Network.ETH_GOERLI, // Replace with your network.
    };
    const alchemy = new Alchemy(settings);
    try {
      const tokenAddress = contractAddress;
      alchemy.core.getTokenMetadata(tokenAddress).then((res) => {
        setSymbol(res.symbol);
        setDecimal(res.decimals);
        console.log(res);
      });
    } catch (error) {
      console.log(`Error occured:${error}`);
    }
  };

  return (
    <TokenContext.Provider
      value={{
        contractAddress,
        setContractAddress,
        getTokenBal,
        getTokenDet,
        symbol,
        decimal,
        setSymbol,
        setDecimal,
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
};

export default TokenData;
