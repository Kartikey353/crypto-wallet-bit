import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { ethers } from "ethers";
const UserState = (props) => {
  const [signerAddr, setSignerAddr] = useState();
  const [currentSigner, setCurrentSigner] = useState();
  // const [initialRender, setInitialRender] = useState(false);
  const apiKey = process.env.REACT_APP_ALCHEMYKEY;
  useEffect(() => {
    const getSignerAddr = async () => {
      const { ethereum } = window;
      ethereum
        .request({
          method: "eth_requestAccounts",
          param: [1],
        })
        .then((res) => {
          setSignerAddr(res);
        });
    };
    getSignerAddr();
  }, [signerAddr]);

  const getCall = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-goerli.g.alchemy.com/v2/L8dQ1bw-HR1holdrgdul1NE1OQ2K8raS"
    );
    //Get the pvt key
    const pvtKey =
      "0x1ff779889908779bec0ff3936b6151a4232e451724bbc2a3e6ac50ea771b5501";
    //Wrap both the things in the wallet instance and then proceed
    const wallet = new ethers.Wallet(pvtKey, provider);
    const signer = await wallet.provider.getSigner();
    setCurrentSigner(signer);
    const addr = await wallet.getAddress();
    setSignerAddr(addr);
  };

  useEffect(() => {
    const getSigner = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        `https://eth-goerli.g.alchemy.com/v2/L8dQ1bw-HR1holdrgdul1NE1OQ2K8raS`
      );
      const signer = provider.getSigner();
      console.log(provider);
      console.log(signer);
      console.log(signerAddr);
      // setCurrentSigner(signer);
    };

    getSigner();
  }, [signerAddr]);

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
