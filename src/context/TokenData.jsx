import axios from "axios";
import React, { useState, useEffect } from "react";
import TokenContext from "./TokenContext";
// import { Network, Alchemy } from "alchemy-sdk";
import { useSelector } from "react-redux";
const TokenData = (props) => {
  const [contractAddress, setContractAddress] = useState();
  const { account, currentNetwork } = useSelector((state) => state.wallet);

  // const callAPI = async () => {
  //   // const apiKey = "LcFoRvsufwg2oB5KhWnEur-ZilkAq2Ev";
  //   const apiKey = process.env.REACT_APP_ALCHEMYKEY;
  //   const baseURL = `https://eth-goerli.alchemyapi.io/v2/${apiKey}`;
  //   // Replace with the wallet address you want to query:
  //   const ownerAddr = account?.address;
  //   // Replace with the token contract address you want to query:
  //   const tokenAddr = contractAddress;
  //   let result;
  //   try {
  //     var data = JSON.stringify({
  //       jsonrpc: "2.0",
  //       method: "alchemy_getTokenBalances",
  //       params: [`${ownerAddr}`, [`${tokenAddr}`]],
  //       id: 42,
  //     });

  //     var config = {
  //       method: "post",
  //       url: baseURL,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: data,
  //     };

  //     axios(config)
  //       .then(function (response) {
  //         const {
  //           result: {
  //             tokenBalances: [{ tokenBalance }],
  //           },
  //         } = response.data;

  //         result = JSON.stringify(parseInt(tokenBalance), null, 2);
  //         console.log(result);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.log(`Error Occured: ${error}`);
  //   }
  //   return result;
  // };
  //need to export call api function and setContractAddress
  const callAPI = async () => {
    const apiKey = process.env.REACT_APP_ALCHEMYKEY;
    const baseURL = `https://eth-goerli.alchemyapi.io/v2/${apiKey}`;
    const ownerAddr = account?.address;
    const tokenAddr = contractAddress;

    try {
      const data = JSON.stringify({
        jsonrpc: "2.0",
        method: "alchemy_getTokenBalances",
        params: [`${ownerAddr}`, [`${tokenAddr}`]],
        id: 42,
      });

      const config = {
        method: "post",
        url: baseURL,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios(config);
      const {
        result: {
          tokenBalances: [{ tokenBalance, tokenInfo }],
        },
      } = response.data;
      console.log(tokenInfo);
      const result = {
        balance: parseInt(tokenBalance),
        // symbol: tokenInfo.symbol,
        // decimals: tokenInfo.decimals,
      };

      console.log(result);
      return result;
    } catch (error) {
      console.log(`Error Occured: ${error}`);
      return null;
    }
  };

  return (
    <TokenContext.Provider
      value={{ contractAddress, setContractAddress, callAPI }}
    >
      {props.children}
    </TokenContext.Provider>
  );
};

export default TokenData;
