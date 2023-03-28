import React, { useEffect, useState } from 'react'
import { FaTimes } from "react-icons/fa";
import ethereum from "../assets/ethereum.svg"
const AddNetworks = (props) => {
    const [selectoption, setselectoption] = useState(2);
    return (
        <>
            <div className={`${props.value === true ? "p-3 absolute z-20 w-full h-[100vh] top-[-100%] bg-[#1b1b1b]":"hidden"}`}>
                <div className="flex justify-between mt-3">
                    <h1 className="text-xl">Networks</h1>
                    <FaTimes onClick={()=>{
                       props.function(false)
                    }} className="my-auto text-2xl text-red-500" />
                </div>
                <div className="flex justify-between mt-14 text-sm">
                    <div className="w-[50%]">
                        <button
                            onClick={() => {
                                setselectoption(1);
                            }} className={`uppercase mx-auto flex ${selectoption === 1 ? "border-b-2 border-b-blue-500" : ""}`}>Popular</button>
                    </div>
                    <div className="w-[50%]">
                        <button onClick={() => {
                            setselectoption(2);
                        }} className={`uppercase text-right mx-auto flex ${selectoption === 2 ? "border-b-2 border-b-blue-500" : ""}`}>Custom networks</button>
                    </div>
                </div>
                {
                    selectoption === 1 ?
                        <div className="mt-10 pl-3 pr-3 space-y-3">
                            <div className="flex justify-between">
                                <div className="networkname flex space-x-3">
                                    <div className="networkimg">
                                        <img src={ethereum} alt="" className="w-4" />
                                    </div>
                                    <div className="networknameee">
                                        Ethereum
                                    </div>
                                </div>
                                <div className="text-blue-500 hover:cursor-pointer">
                                    Add+
                                </div>
                            </div>
                        </div>
                        :
                        <div className="mt-10">
                            <div
                                className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                                role="alert"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="sr-only">Alert</span>
                                <div>
                                    <span className="font-medium">Malicious network!</span> provider can lie about the state of the blockchain and record your network activity.Only add custom networks you trust.
                                </div>
                            </div>
                            <form>
                                <div className="mb-6">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Network Name
                                    </label>
                                    <input
                                        type="text"

                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        placeholder="Network Name"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        RPC Url
                                    </label>
                                    <input
                                        type="url"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        required=""
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Chain Id
                                    </label>
                                    <input
                                        type="number"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        required=""
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Symbol
                                    </label>
                                    <input
                                        type="text"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Block Explorer Url
                                    </label>
                                    <input
                                        type="url"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        required=""
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Add
                                </button>
                            </form>
                        </div>

                }
                {/* <div className="mt-10 pl-3 pr-3 space-y-3">
                    <div className="flex justify-between">
                        <div className="networkname flex space-x-3">
                            <div className="networkimg">
                              <img src={ethereum} alt="" className="w-4" />
                            </div>
                            <div className="networknameee">
                              Ethereum
                            </div>
                        </div> 
                        <div className="text-blue-500 hover:cursor-pointer">
                            Add+
                        </div>
                    </div> 
                </div> */}
                {/* <div className="mt-10">
                    <div
                        className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                        role="alert"
                    >
                        <svg
                            aria-hidden="true"
                            className="flex-shrink-0 inline w-5 h-5 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="sr-only">Alert</span>
                        <div>
                            <span className="font-medium">Malicious network!</span> provider can lie about the state of the blockchain and record your neteork activity.Only add custom networks you trust.
                        </div>
                    </div>
                    <form>
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Network Name
                            </label>
                            <input
                                type="text"

                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="Network Name"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                RPC Url
                            </label>
                            <input
                                type="url"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Chain Id
                            </label>
                            <input
                                type="number"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Symbol
                            </label>
                            <input
                                type="text"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Block Explorer Url
                            </label>
                            <input
                                type="url"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                            />
                        </div>
                        <button
                            type="button" 
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Add
                        </button>
                    </form>
                </div> */}
            </div>
        </>
    )
}

export default AddNetworks