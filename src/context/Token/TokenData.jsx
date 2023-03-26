import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import TokenContext from "./TokenContext";
import UserContext from "../User/UserContext";
import { Network, Alchemy } from "alchemy-sdk";
// import { Network, Alchemy } from "alchemy-sdk";
import { useSelector } from "react-redux";
import ercABI from "../../utils/common";
import { ethers } from "ethers";
import { TOKENSTORE } from "../../utils/dbConfig";
import { useIndexedDB } from "react-indexed-db";

const TokenData = (props) => {
  const [contractAddress, setContractAddress] = useState();
  const [symbol, setSymbol] = useState();
  const [decimal, setDecimal] = useState();
  const [userBal, setUserBal] = useState();
  const { account, currentNetwork } = useSelector((state) => state.wallet);
  const [initialRenderDet, setInitialRenderDet] = useState(false);
  const [initialRenderBal, setInitialRenderBal] = useState(false);
  const [initialRenderUpdate, setInitialRenderUpdate] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isLoader, setIsLoader] = useState(false);

  //context called here
  const user = useContext(UserContext);
  const { getAll, getById, update } = useIndexedDB(TOKENSTORE);
  //Balance will called here......
  useEffect(() => {
    if (initialRenderBal && contractAddress && contractAddress.length === 42) {
      const getData = async () => {
        const contract = new ethers.Contract(
          contractAddress,
          ercABI,
          user.currentSigner
        );

        try {
          const balData = await contract.balanceOf(user.signerAddr);
          const bal = balData.toString() / 10 ** 18;
          setUserBal(bal);
          // console.log(bal);
          setIsLoader(false);
        } catch (error) {
          console.log(`Error occured ${error}`);
        }
      };
      getData();
    } else {
      setInitialRenderBal(true);
    }
  }, [contractAddress]);

  //Token Metadata
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
        } else if (currentNetwork.chain === 10) {
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
            // console.log(res);
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
  }, [contractAddress]);

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
        balance,
        isLoader,
        setIsLoader,
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
};

export default TokenData;
