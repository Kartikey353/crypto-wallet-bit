import React from "react";

const TokenTable = (props) => {
  const handleSendClick = () => {
    console.log(props.tokenAddress);
  };
  return (
    <>
      {" "}
      {/* <td className="border px-4 py-2 " onClick={props.action}>
        {" "}
        {props.symb}{" "}
      </td>{" "}
      <td className="border px-4 py-2 " onClick={props.action}>
        {" "}
        {props.value}{" "}
      </td>{" "} */}
      {/* <div
        className="w-[100%]"
          onClick={() => {
          props.sendAction(props.tokenAddress, props.symb, props.decimals);
        }}
      > */}
      {/* {" "}
        Send Asset{" "} */}
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {props.symb}
      </th>
      <td className="px-6 py-4">{props.value}</td>
      {/* </div>{" "} */}
    </>
  );
};

export default TokenTable;
