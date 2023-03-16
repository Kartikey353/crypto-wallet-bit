import React from "react";

const TokenTable = (props) => {
  return (
    <>
      {" "}
      <td className="border px-4 py-2 "> {props.symb} </td>{" "}
      <td className="border px-4 py-2 "> {props.value} </td>{" "}
    </>
  );
};

export default TokenTable;
