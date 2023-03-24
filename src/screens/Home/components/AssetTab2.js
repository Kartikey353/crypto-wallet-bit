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
          balance: token.userBal / 10 ** 18,
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
    // await user.getCall();
    await token.getEventVal();
  };
  const handleSigner = async () => {
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
                {currentNetwork.chain === 5 || currentNetwork.chain == 1 || currentNetwork.chain == 10? (
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
          <div className="inpCont flex p-3">
            <div className="inpField flex items-center flex-col border border-white p-3">
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
              <button
                type="submit"
                className="bg-blue-500 p-3 px-20  rounded-xl"
                onClick={handleSigner}
              >
                Get Signer
              </button>{" "}
            </div>{" "}
            <button
              className="border border-white p-2 w-fit h-fit text-red-600 font-extrabold"
              onClick={handleImportClick}
            >
              X{" "}
            </button>{" "}
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
