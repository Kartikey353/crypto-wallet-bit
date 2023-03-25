import React from "react";

const TokenTable = (props) => {
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
    </>
  );
};

export default TokenTable;
