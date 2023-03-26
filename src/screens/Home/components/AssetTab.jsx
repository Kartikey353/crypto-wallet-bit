import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { BASECOVALENT } from "../../../utils";
import { formatFromWei } from "../../../web3";
import { useSelector } from "react-redux";
import TokenContext from "../../../context/Token/TokenContext";
import UserContext from "../../../context/User/UserContext";
import TokenTable from "./tokenTable";
import { NETWORKS } from "../../../utils";
import { current } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { TOKENSTORE } from "../../../utils/dbConfig";
import { useIndexedDB } from "react-indexed-db";
import ercABI from "../../../utils/common";

const AssetTab = () => {
  const { balance } = useSelector((state) => state.wallet);
  const [isImportClick, setIsImportClick] = useState(false);
  const [updateChange, setUpdateChange] = useState(false);
  const [tokenArray, setTokenArray] = useState([]);
  const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);
  const { account, currentNetwork } = useSelector((state) => state.wallet);
  const [isSend, setIsSend] = useState({
    is: false,
    tokSymbol: "",
    address: "",
    tokDecimal: "",
  });
  const [sendParams, setSendParams] = useState({
    recpAddr: "",
    amount: "",
  });
  //Make another useState for update

  const token = useContext(TokenContext);
  const user = useContext(UserContext);
  const { getById, update, getAll, add, openCursor, clear } =
    useIndexedDB(TOKENSTORE);

  useEffect(() => {
    getAll().then((res) => {
      setTokenArray([]);
      res.map((item) => {
        setTokenArray((prev) => {
          return [
            ...prev,
            {
              symbol: item.tokenSymbol,
              balance: item.tokenBal,
              decimal: item.tokenDecimal,
              tokenAddress: item.tokenAddress,
            },
          ];
        });
      });
    });
  }, [isImportClick, updateChange]);

  const handleImportClick = () => {
    setIsImportClick((prev) => {
      {
        token.setContractAddress("");
        token.setSymbol("");
        token.setDecimal("");
        return !prev;
      }
    });
    setIsAlreadyAdded(false);
    token.setIsLoader(false);
  };

  const handleChange = async ({ target: { value } }) => {
    const res = await getAll();

    if (res.length === 0) {
      if (value.length === 42) {
        token.setIsLoader(true);
        await token.setContractAddress(value);
      } else {
        console.log("Invalid address length..");
      }
    } else if (res.length > 0) {
      let addressExists = false;
      for (let item of res) {
        if (value === item.tokenAddress) {
          setIsAlreadyAdded(true);
          addressExists = true;
          break;
        }
      }
      if (!addressExists) {
        if (value.length === 42) {
          token.setIsLoader(true);
          await token.setContractAddress(value);
        } else {
          console.log("Invalid Address");
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    if (token.contractAddress.length === 42) {
      add({
        tokenAddress: token.contractAddress,
        tokenSymbol: token.symbol,
        tokenDecimal: token.decimal,
        tokenBal: token.userBal,
      });
      token.setSymbol("");
      token.setDecimal("");
      token.setContractAddress("");
      setIsImportClick(false);
    } else {
      console.log("Invalid Contract Address");
    }
  };

  let store; //variable to store data
  const handleUpdate = async () => {
    const res = await getAll();
    store = res;
    try {
      const clearDB = await clear();
      store.map(async (item) => {
        // console.log(item);
        const contract = new ethers.Contract(
          item.tokenAddress,
          ercABI,
          user.currentSigner
        );
        try {
          const tokenBalHex = await contract.balanceOf(user.signerAddr);
          const balNum = Number(tokenBalHex) / 10 ** 18;
          try {
            item.tokenBal = balNum;
            try {
              add({
                tokenAddress: item.tokenAddress,
                tokenSymbol: item.tokenSymbol,
                tokenDecimal: item.tokenDecimal,
                tokenBal: item.tokenBal,
              });
            } catch (error) {
              console.log(`Error occured when storing in DB:${error}`);
            }
          } catch (error) {
            console.log(`Got error in assigning the value:${error}`);
          }
        } catch (error) {
          console.log(`Error occured:${error}`);
        }
      });
      // setUpdateChange((prev) => {
      //   return !prev;
      // });
    } catch (error) {
      console.log(`Error occured:${error}`);
    }
  };

  //Asset sending functionality started from here....
  const handleSend = async (tokenAddress, symbol, decimal) => {
    setIsSend({
      is: true,
      tokSymbol: symbol,
      address: tokenAddress,
      tokDecimal: decimal,
    });
  };
  //for input vals
  const handleSendParams = (e) => {
    const { name, value } = e.target;
    setSendParams((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  //for main sending functionality
  const sendToken = async () => {
    try {
      token.setIsLoader(true);
      const contract = new ethers.Contract(
        isSend.address,
        ercABI,
        user.currentSigner
      );
      try {
        const send = await contract.transfer(
          sendParams.recpAddr,
          (sendParams.amount * 10 ** isSend.tokDecimal).toString()
        );
        console.log(send);
        token.setIsLoader(false);
        // console.log(sendParams.amount * 10 ** isSend.tokDecimal);
      } catch (error) {
        console.log(`Error in sending tokens: ${error}`);
        token.setIsLoader(false);
      }
      console.log(isSend.address);
    } catch (error) {
      console.log(`Error occured in main:${error}`);
      token.setIsLoader(false);
    }
  };
  const handleEvent = async () => {
    console.log(isSend);
  };

  return (
    <>
      {isSend.is ? (
        <>
          <div className="parent flex ">
            <div className="inp-cont py-5 mr-3">
              <input
                name="recpAddr"
                type="text"
                onChange={handleSendParams}
                placeholder="0x... (Recipient Address)"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 mb-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-2xl placeholder:font-bold"
              />
              <input
                name="amount"
                type="text"
                onChange={handleSendParams}
                placeholder={isSend.tokSymbol}
                className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-2xl placeholder:font-bold"
              />
              {token.isLoader ? (
                <button
                  type="button"
                  class="flex items-center rounded-lg bg-gradient-to-br from-green-300 to-green-800-500 px-4 py-2 text-white"
                  disabled
                >
                  <svg
                    class="mr-3 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span class="font-medium"> Sending... </span>
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={sendToken}
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Send
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setIsSend(false);
              }}
              className="text-white h-fit bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              X{" "}
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center flex-col">
          <div className="tokenDet mb-7">
            <table className="table-auto w-full text-black bg-opacity-50 bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-white bg-[#1072cc]">
                    {" "}
                    Token Symbol{" "}
                  </th>{" "}
                  <th className="px-4 py-2 text-white bg-[#095ca9]">
                    {" "}
                    Balance{" "}
                  </th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody className="">
                <tr className="bg-gray-700 text-white">
                  {" "}
                  {currentNetwork.chain === 5 || currentNetwork.chain == 1 ? (
                    <>
                      <td className="border px-4 py-2 ">ETH</td>
                      <td className="border px-4 py-2 ">{balance}</td>
                    </>
                  ) : (
                    <>
                      <td className="border px-4 py-2 ">MATIC</td>
                      <td className="border px-4 py-2 ">{balance}</td>
                    </>
                  )}{" "}
                </tr>{" "}
                {tokenArray.map((item, index) => {
                  return (
                    <tr key={index} className="bg-gray-700 text-white">
                      <TokenTable
                        symb={item.symbol}
                        decimals={item.decimal}
                        value={item.balance}
                        id={index}
                        tokenAddress={item.tokenAddress}
                        sendAction={handleSend}
                      />{" "}
                    </tr>
                  );
                })}{" "}
              </tbody>{" "}
            </table>{" "}
            <button onClick={handleUpdate} className="text-sky-500 mt-5 ml-12">
              Refresh Token List{" "}
            </button>
          </div>{" "}
          <p> Don 't see your tokens?</p>{" "}
          {isImportClick ? (
            <div className="inpCont p-3 absolute z-10 top-0 w-full h-[100vh] bg-black">
              <div className="flex justify-between">
                <div className="head text-2xl font-bold"> Import Tokens </div>{" "}
                <button
                  type="button"
                  onClick={handleImportClick}
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  X{" "}
                </button>{" "}
              </div>{" "}
              <div className="form mt-10">
                <div className="mb-6">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contract Address{" "}
                  </label>{" "}
                  <input
                    id="ContractAddress"
                    name="address"
                    type="text"
                    onChange={handleChange}
                    maxLength={42}
                    minLength={42}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>{" "}
                <div className="mb-6">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Symbol{" "}
                  </label>{" "}
                  <input
                    name="symbol"
                    type="text"
                    value={token.symbol}
                    onChange={(e) => token.setSymbol(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>{" "}
                <div className="mb-6">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    decimal{" "}
                  </label>{" "}
                  <input
                    name="decimal"
                    type="text"
                    value={token.decimal}
                    onChange={(e) => token.setDecimal(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>{" "}
              </div>{" "}
              <button
                type="submit"
                onClick={handleEvent}
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Get Data{" "}
              </button>{" "}
              {token.isLoader ? (
                <button
                  type="button"
                  class="flex items-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-4 py-2 text-white"
                  disabled
                >
                  <svg
                    class="mr-3 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span class="font-medium"> Processing... </span>
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${
                    isAlreadyAdded
                      ? "bg-red-600 cursor-not-allowed"
                      : "bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  }`}
                  disabled={isAlreadyAdded}
                >
                  {isAlreadyAdded ? "Already Added !" : "Add"}
                </button>
              )}
            </div>
          ) : (
            <>
              <button onClick={handleImportClick} className="text-sky-500">
                Import Tokens{" "}
              </button>
            </>
          )}{" "}
        </div>
      )}
    </>
  );
};

export default AssetTab;
