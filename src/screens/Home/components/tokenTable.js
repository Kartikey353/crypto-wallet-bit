import React from "react";

const TokenTable = (props) => {
  const handleSendClick = () => {
    console.log(props.tokenAddress);
  };
  return (
    <>
      {" "}
      <td className="border px-4 py-2 " onClick={props.action}>
        {" "}
        {props.symb}{" "}
      </td>{" "}
      <td className="border px-4 py-2 " onClick={props.action}>
        {" "}
        {props.value}{" "}
      </td>{" "}
      <button
        className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl"
        onClick={() => {
          props.sendAction(props.tokenAddress, props.symb, props.decimals);
        }}
      >
        {" "}
        Send Asset{" "}
      </button>{" "}
    </>
  );
};

export default TokenTable;
