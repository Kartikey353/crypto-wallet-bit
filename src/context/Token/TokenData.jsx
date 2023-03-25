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

  // const [onclick, setOnclick] = useState(false);
  const [eventListeners, setEventListeners] = useState([]);
  const [balance, setBalance] = useState(0);

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
          console.log(bal);
        } catch (error) {
          console.log(`Error occured ${error}`);
        }
      };
      getData();
    }
    //Code to subscribe to the event and get updated the userBal whenever wallet get recieved tokens and console the event data
    else {
      setInitialRenderBal(true);
    }
  }, [contractAddress]);

  //Code to update the token balance by subscribing to events
  // useEffect(() => {
  //   if (initialRenderUpdate) {
  //     const getEvent = () => {
  //       getAll().then((res) => {
  //         for (let i = 0; i < res.length; i++) {
  //           const contract = new ethers.Contract(
  //             res[i].tokenAddress,
  //             ercABI,
  //             user.currentSigner
  //           );
  //           try {
  //             contract.on("Transfer", (from, to, value, event) => {
  //               if (res[i].tokenAddress == event.address) {
  //                 const bal = event.args.value.toString();
  //                 console.log(bal);
  //               }
  //             });
  //           } catch (error) {
  //             console.log(`Error occured ${error}`);
  //           }
  //         }
  //       });
  //     };
  //     getEvent();
  //   } else {
  //     setInitialRenderUpdate(true);
  //   }
  // }, [onclick]);

  //NEW CODE working

  const getEvent = async () => {
    getAll().then((res) => {
      console.log(res);
    });
  };

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
  }, [contractAddress]);

  const getEventVal = async () => {
    // const contract = new ethers.Contract(
    //   contractAddress,
    //   ercABI,
    //   user.currentSigner
    // );

    try {
      // const bal = await contract.balanceOf(user.signerAddr);
      // console.log(bal);
      // await user.getCall();
      console.log(balance);
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
        getEvent,
        balance,
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
};

export default TokenData;
