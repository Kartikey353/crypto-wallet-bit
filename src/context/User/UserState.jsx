import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { ethers } from "ethers";
const UserState = (props) => {
  const [signerAddr, setSignerAddr] = useState();
  const [currentSigner, setCurrentSigner] = useState();

  const getCall = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-goerli.g.alchemy.com/v2/L8dQ1bw-HR1holdrgdul1NE1OQ2K8raS"
    );
    const pvtKey = props.data;
    const wallet = new ethers.Wallet(pvtKey, provider);
    setSignerAddr(wallet.address);
    setCurrentSigner(wallet);
  };

  // const getCall = () => {
  //   const provider = new ethers.providers.JsonRpcProvider(
  //     "https://eth-goerli.g.alchemy.com/v2/L8dQ1bw-HR1holdrgdul1NE1OQ2K8raS"
  //   );
  //   const pvtKey = props.data;
  //   const wallet = new ethers.Wallet(pvtKey, provider);
  //   setSignerAddr(wallet.address);
  //   setCurrentSigner(wallet);
  // };

  return (
    <>
      <UserContext.Provider
        value={{
          signerAddr,
          currentSigner,
          getCall,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default UserState;
