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
    // const provider = new ethers.providers.JsonRpcProvider(
    //   `https://eth-goerli.g.alchemy.com/v2/L8dQ1bw-HR1holdrgdul1NE1OQ2K8raS`
    // );
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:3000"
    );
    const signer = provider.getSigner();
    // const addr = await signer.getAddress();
    console.log(provider);
    // const signer = provider.getSigner();
    console.log(signer);
  };

  useEffect(() => {
    const getSigner = () => {
      const provider = new ethers.providers.JsonRpcProvider(
        `https://eth-goerli.g.alchemy.com/v2/L8dQ1bw-HR1holdrgdul1NE1OQ2K8raS`
      );
      const signer = provider.getSigner();
      setCurrentSigner(signer);
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
