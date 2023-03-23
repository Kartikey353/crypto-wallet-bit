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
const AssetTab = () => {
  const { balance } = useSelector((state) => state.wallet);

  const [isImportClick, setIsImportClick] = useState(false);

  const [tokenArray, setTokenArray] = useState([]);
  const { account, currentNetwork } = useSelector((state) => state.wallet);
  const token = useContext(TokenContext);
  const user = useContext(UserContext);

  const handleImportClick = () => {
    setIsImportClick((prev) => {
      {
        token.setContractAddress("");
        token.setSymbol("");
        token.setDecimal("");
        return !prev;
      }
    });
  };

  const handleChange = async ({ target: { value } }) => {
    if (value.length === 42) {
      await token.setContractAddress(value);
    }
  };

  const handleSubmit = async (e) => {
    setTokenArray((prev) => {
      return [
        ...prev,
        {
          symbol: token.symbol,
          balance: token.userBal,
          decimal: token.decimal,
        },
      ];
    });
    token.setSymbol("");
    token.setDecimal("");
    token.setContractAddress("");
    setIsImportClick(false);
  };
  const handleEvent = async () => {
    await user.getCall();
  };

  return (
    <>
      <div className="flex items-center flex-col">
        <div className="tokenDet mb-7">
          <table className="table-auto w-full text-black bg-opacity-50 bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-white bg-[#1072cc]">
                  {" "}
                  Token Symbol{" "}
                </th>
                <th className="px-4 py-2 text-white bg-[#095ca9]"> Balance </th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="bg-gray-700 text-white">
                {currentNetwork.chain === 5 || currentNetwork.chain == 1 ? (
                  <TokenTable symb="ETH" value={balance} />
                ) : (
                  <TokenTable symb="MATIC" value={balance} />
                )}
              </tr>

              {tokenArray.map((item, index) => {
                return (
                  <tr key={index} className="bg-gray-700 text-white">
                    <TokenTable symb={item.symbol} value={item.balance} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p> Don 't see your tokens?</p>{" "}
        {isImportClick ? (
          <div className="inpCont p-3 absolute z-10 top-0 w-full h-[100vh] bg-black">
            <div className="flex justify-between">
              <div className="head text-2xl font-bold">
                Import Tokens
              </div>
              <button
                type="button"
                onClick={handleImportClick}
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                X
              </button>
            </div>
            <div className="form mt-10">
              <div className="mb-6">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contract Address
                </label>
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
              </div>
              <div className="mb-6">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Symbol
                </label>
                <input
                  name="symbol"
                  type="text"
                  value={token.symbol}
                  onChange={(e) => token.setSymbol(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  decimal
                </label>
                <input
                  name="decimal"
                  type="text"
                  value={token.decimal}
                  onChange={(e) => token.setDecimal(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            {/* <h1 className="">Import Tokens</h1>
            <div className="inpField flex items-center flex-col border border-white w-full p-3">
              <input
                name="address"
                type="text"
                placeholder="Contract Address"
                className="text-black p-3 rounded-xl mb-3"
                onChange={handleChange}
                maxLength={42}
                minLength={42}
                required
              />
              <input
                name="symbol"
                type="text"
                placeholder="Symbol"
                className="text-black p-3 rounded-xl mb-3"
                value={token.symbol}
                onChange={(e) => token.setSymbol(e.target.value)}
              />{" "}
              <input
                name="decimal"
                type="text"
                placeholder="Decimal"
                className="text-black p-3 rounded-xl mb-3"
                value={token.decimal}
                onChange={(e) => token.setDecimal(e.target.value)}
              />{" "}
              <button
                type="submit"
                className="bg-blue-500 p-3 px-20  rounded-xl"
                onClick={handleSubmit}
              >
                Submit{" "}
              </button>{" "}
              <button
                type="submit"
                className="bg-blue-500 p-3 px-20  rounded-xl"
                onClick={handleEvent}
              >
                Get Event
              </button>{" "}
            </div>{" "}
            <button
              className="border border-white p-2 w-fit h-fit text-red-600 font-extrabold"
              onClick={handleImportClick}
            >
              X{" "}
            </button>{" "}
          </div> */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Submit
            </button>
          </div>
        ) : (
          <button onClick={handleImportClick} className="text-sky-500">
            Import Tokens{" "}
          </button>
        )}{" "}
      </div>{" "}
    </>
  );
};

export default AssetTab;
