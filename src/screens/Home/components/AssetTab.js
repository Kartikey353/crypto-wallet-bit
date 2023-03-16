import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { BASECOVALENT } from "../../../utils";
import { formatFromWei } from "../../../web3";
import { useSelector } from "react-redux";
import TokenContext from "../../../context/TokenContext";
import TokenTable from "./tokenTable";
import { NETWORKS } from "../../../utils";
import { current } from "@reduxjs/toolkit";
const AssetTab = () => {
  const { balance } = useSelector((state) => state.wallet);

  const [isImportClick, setIsImportClick] = useState(false);
  const [tokenDetails, setTokenDetails] = useState({
    symbol: "",
    balance: "",
    decimals: "",
  });
  const [tokenArray, setTokenArray] = useState([]);
  const { account, currentNetwork } = useSelector((state) => state.wallet);
  const token = useContext(TokenContext);

  const handleImportClick = () => {
    setIsImportClick((prev) => {
      {
        return !prev;
      }
    });
  };

  const handleChange = async ({ target: { value } }) => {
    if (value.length === 42) {
      await token.setContractAddress(value);
      const data = token.getTokenDet();
    }
    return true;
  };

  const handlegetTokenBal = async (e) => {
    {
      token.contractAddress.length == 42 && (await token.getTokenBal());
    }
    token.setSymbol("");
    token.setDecimal("");
    token.setContractAddress("");
    setIsImportClick(false);
  };

  return (
    <>
      <div className="flex items-center flex-col">
        <div className="tokenDet mb-7">
          <table className="table-auto w-full text-black bg-opacity-50 bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-white bg-[#1072cc]">
                  Token Symbol
                </th>
                <th className="px-4 py-2 text-white bg-[#1072cc]">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-700 text-white">
                {currentNetwork?.chain == 5 || currentNetwork?.chain == 1 ? (
                  <TokenTable symb="ETH" value={balance} />
                ) : (
                  <TokenTable symb="MATIC" value={balance} />
                )}
              </tr>
            </tbody>
          </table>
        </div>

        <p>Don't see your tokens?</p>
        {isImportClick ? (
          <div className="inpCont flex">
            <div className="inpField flex items-center flex-col">
              <input
                name="address"
                type="text"
                placeholder="Contract Address"
                className="text-black p-3"
                onChange={handleChange}
                maxLength={42}
                minLength={42}
                required
              />
              <input
                name="symbol"
                type="text"
                placeholder="Symbol"
                className="text-black p-3"
                value={token.symbol}
              />
              <input
                name="decimal"
                type="text"
                placeholder="Decimal"
                className="text-black p-3"
                value={token.decimal}
              />
              <button
                type="submit"
                className="bg-blue-500 p-3 px-20"
                onClick={handlegetTokenBal}
              >
                Submit
              </button>
            </div>
            <button
              className="border border-white p-2 "
              onClick={handleImportClick}
            >
              X
            </button>
          </div>
        ) : (
          <button onClick={handleImportClick} className="text-sky-500">
            Import Tokens
          </button>
        )}
      </div>
    </>
  );
};

export default AssetTab;
