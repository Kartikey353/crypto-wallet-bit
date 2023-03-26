import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
const UserState = (props) => {
  const { account, currentNetwork } = useSelector((state) => state.wallet);
  const [signerAddr, setSignerAddr] = useState();
  const [currentSigner, setCurrentSigner] = useState();

  useEffect(() => {
    let provider;
    const getCall = async () => {
      if (currentNetwork.chain === 5) {
        provider = new ethers.providers.JsonRpcProvider(
          `https://eth-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`
        );
      } else if (currentNetwork.chain === 1) {
        provider = new ethers.providers.JsonRpcProvider(
          `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`
        );
      } else if (currentNetwork.chain === 80001) {
        provider = new ethers.providers.JsonRpcProvider(
          `https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`
        );
      } else if (currentNetwork.chain === 137) {
        provider = new ethers.providers.JsonRpcProvider(
          `https://polygon-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`
        );
      } else if (currentNetwork.chain === 10) {
        provider = new ethers.providers.JsonRpcProvider(
          `https://opt-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMYKEY}`
        );
      }

      const pvtKey = props.data;
      const wallet = new ethers.Wallet(pvtKey, provider);
      // console.log(pvtKey);
      setCurrentSigner(wallet);
      setSignerAddr(wallet.address);
    };
    getCall();
  }, [props.data, currentNetwork]);

  return (
    <>
      <UserContext.Provider
        value={{
          signerAddr,
          currentSigner,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default UserState;
