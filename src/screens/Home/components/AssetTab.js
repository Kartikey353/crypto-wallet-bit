import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { BASECOVALENT } from "../../../utils";
import { formatFromWei } from "../../../web3";
import { useSelector } from "react-redux";
import TokenContext from "../../../context/TokenContext";
const AssetTab = () => {
  const [isImportClick, setIsImportClick] = useState(false);
  const [tokenDetails, setTokenDetails] = useState([]);
  const { account, currentNetwork } = useSelector((state) => state.wallet);
  const token = useContext(TokenContext);

  const handleImportClick = () => {
    setIsImportClick((prev) => {
      {
        return !prev;
      }
    });
  };

  const handleChange = ({ target: { value } }) => {
    {
      value.length === 42 && token.setContractAddress(value);
      return true;
    }
  };

  const handleCallAPI = async (e) => {
    {
      token.contractAddress.length == 42 && (await token.callAPI());
    }
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
                <td className="border px-4 py-2">ETH</td>
                <td className="border px-4 py-2">2.0000</td>
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
              <button
                type="submit"
                className="bg-blue-500 p-3 px-20"
                onClick={handleCallAPI}
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
