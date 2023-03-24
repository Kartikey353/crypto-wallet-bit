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

  //Balance will called here......
  useEffect(() => {
    if (initialRenderBal && contractAddress.length != "0") {
      const getData = async () => {
        const contract = new ethers.Contract(
          contractAddress,
          ercABI,
          user.currentSigner
        );
        try {
          const bal = await contract.balanceOf(user.signerAddr);
          console.log(bal);
          setUserBal(bal);
        } catch (error) {}
      };
      getData();
    } else {
      setInitialRenderBal(true);
    }
  }, [contractAddress]);

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
    // const contract = new ethers.Contract(
    //   contractAddress,
    //   ercABI,
    //   user.currentSigner
    // );

    try {
      // const bal = await contract.balanceOf(user.signerAddr);
      // console.log(bal);
    } catch (error) {
      console.log(`Error :${error}`);
    }
  };

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
