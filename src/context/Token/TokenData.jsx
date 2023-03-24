import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import TokenContext from "./TokenContext";
import UserContext from "../User/UserContext";
import { Network, Alchemy } from "alchemy-sdk";
// import { Network, Alchemy } from "alchemy-sdk";
import { useSelector } from "react-redux";
import ercABI from "../../utils/common";
import { ethers } from "ethers";
const TokenData = (props) => {
  const [contractAddress, setContractAddress] = useState();
  const [symbol, setSymbol] = useState();
  const [decimal, setDecimal] = useState();
  const [userBal, setUserBal] = useState();
  const { account, currentNetwork } = useSelector((state) => state.wallet);
  const [initialRenderDet, setInitialRenderDet] = useState(false);
  const [initialRenderBal, setInitialRenderBal] = useState(false);

  //context called here
  const user = useContext(UserContext);
  useEffect(() => {
    if (initialRenderBal) {
      const getTokenBal = async () => {
        // const apiKey = "LcFoRvsufwg2oB5KhWnEur-ZilkAq2Ev";
        let baseURL;
        const apiKey = process.env.REACT_APP_ALCHEMYKEY;
        if (currentNetwork.chain === 5) {
          baseURL = `https://eth-goerli.alchemyapi.io/v2/${apiKey}`;
        } else if (currentNetwork.chain === 80001) {
          baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`;
        } else if (currentNetwork.chain === 137) {
          baseURL = `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`;
        } else if (currentNetwork.chain === 1) {
          baseURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
        }
  

        // Replace with the wallet address you want to query:
        const ownerAddr = account?.address;
        // Replace with the token contract address you want to query:
        const tokenAddr = contractAddress;
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

              const result = JSON.stringify(parseInt(tokenBalance), null, 2);
              setUserBal(result);
              console.log(result);
            })
            .catch(function (error) {
              console.log(error.message);
              console.log(error.response.data);
            });
        } catch (error) {
          console.log(`Error Occured: ${error}`);
        }
      };
      getTokenBal();
    } else {
      if (contractAddress !== "") {
        setInitialRenderBal(true);
      }
    }
  }, [contractAddress, userBal]);

  useEffect(() => {
    if (initialRenderDet) {
      let settings;
      const getTokenDet = () => {
        if (currentNetwork.chain === 5) {
          settings = {
            apiKey: process.env.REACT_APP_ALCHEMYKEY,
            network: Network.ETH_GOERLI, // Replace with your network.
          };
        } else if (currentNetwork.chain === 1) {
          settings = {
            apiKey: process.env.REACT_APP_ALCHEMYKEY,
            network: Network.ETH_MAINNET, // Replace with your network.
          };
        } else if (currentNetwork.chain === 80001) {
          settings = {
            apiKey: process.env.REACT_APP_ALCHEMYKEY,
            network: Network.MATIC_MUMBAI, // Replace with your network.
          };
        } else if (currentNetwork.chain === 137) {
          settings = {
            apiKey: process.env.REACT_APP_ALCHEMYKEY,
            network: Network.MATIC_MAINNET, // Replace with your network.
          };
        }else if (currentNetwork.chain === 10) {
          settings = {
            apiKey: process.env.REACT_APP_ALCHEMYKEY,
            network: Network.OPT_MAINNET, // Replace with your network.
          };
        }
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

      getTokenDet();
    } else {
      if (contractAddress !== "") {
        setInitialRenderDet(true);
      }
    }
  }, [contractAddress, userBal]);

  const getEventVal = async () => {
    const contract = new ethers.Contract(
      "0x52fC46FE52e68D7afcC9490bDD7c823e3449BD3a",
      ercABI,
      user.currentSigner
    );

    try {
      const symb = await contract.symbol();
      console.log(symb);
    } catch (error) {
      console.log(`Error :${error}`);
    }
  };
  // getEventVal();
  // }, [userBal]);

  return (
    <TokenContext.Provider
      value={{
        contractAddress,
        setContractAddress,
        symbol,
        decimal,
        setSymbol,
        setDecimal,
        userBal,
        getEventVal,
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
};

export default TokenData;
