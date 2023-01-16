import type { NextPageWithLayout } from "./_app";
import React, { Fragment, ReactElement, useState } from "react";
import Layout from "../components/layout";
import Image from "next/image";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Tilt from "react-parallax-tilt";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

const roles = [
  { id: 1, department: 'MACHINE LEARNING', 
        subdep: [
            { id: 1, name: "ANALYST (RESEARCH)"}, 
            { id: 2, name: "ANALYST (PROJECT)"}, 
            { id: 3, name: "ANALYST (ALGO TRADING)"},
        ]
  },
  { id: 2, department: 'BLOCKCHAIN', 
        subdep: [
            { id: 1, name: "RESEARCH ANALYST"}, 
            { id: 2, name: "COMMUNITY MANAGER"}, 
            { id: 3, name: "BLOCKCHAIN DEVELOPER"},
        ]
  },  
  { id: 3, department: 'SOFTWARE DEVELOPMENT', 
        subdep: [
            { id: 1, name: "UIUX DESIGNER"}, 
            { id: 2, name: "SOFTWARE ENGINEER"}, 
        ]
  },  
  { id: 4, department: 'INTERNAL AFFAIRS', 
        subdep: [
            { id: 1, name: "PROJECT MANAGEMENT"}, 
            { id: 2, name: "TALENT MANAGEMENT"}, 
            { id: 3, name: "FINANCE"},
            { id: 4, name: "COMMUNITY DEVELOPMENT"},
            { id: 5, name: "PRODUCT MANAGER"},
        ]
  },  
  { id: 5, department: 'EXTERNAL RELATIONS', 
        subdep: [
            { id: 1, name: "PARTNERSHIP"}, 
            { id: 2, name: "MARKETING"}, 
        ]
  },    
]

const Mint: NextPageWithLayout = () => {
  const [name, setName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(roles[0]);
  const [selectedRole, setSelectedRole] = useState(selectedDepartment.subdep[0]);

  // Replace with actual contract address
  const { config } = usePrepareContractWrite({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: [],
      },
    ],
    functionName: 'mint',
  });

  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

	return (
        <div className="flex md:flex-row flex-col py-[5%] bg-primary">
            <div className="md:h-[70vh] h-auto md:w-[50vw] w-auto flex flex-col justify-center md:space-y-10 space-y-2 md:pt-[8%] px-[10%] align-middle text-white">
                <input onChange={(event) => setName(event.target.value)} placeholder="Name" className="w-full h-10 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md sm:text-sm text-black" />
                <div className="w-auto z-10 text-white">
                    <Listbox value={selectedDepartment} onChange={e => { setSelectedDepartment(e); setSelectedRole(e.subdep[0])}}>
                        <div className="relative mt-1">
                          <h1>Department: </h1>
                        <Listbox.Button className="relative w-full h-10 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate text-black">{selectedDepartment.department}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {roles.map((role, roleIdx) => (
                                <Listbox.Option
                                key={roleIdx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value={role}
                                >
                                {({ selected }) => (
                                    <>
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                        {role.department}
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </>
                                )}
                                </Listbox.Option>
                            ))}
                            </Listbox.Options>
                        </Transition>
                        </div>
                    </Listbox>
                </div>
                <div className="w-auto">
                <h1>Role: </h1>
                <Listbox value={selectedRole} onChange={setSelectedRole}>
                    <div className="relative mt-1">
                    <Listbox.Button className="relative w-full h-10 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate text-black">{selectedRole.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {selectedDepartment.subdep.map((role, nameIdx) => (
                            <Listbox.Option
                            key={nameIdx}
                            className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                            }
                            value={role}
                            >
                            {({ selected }) => (
                                <>
                                <span
                                    className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                    {role.name}
                                </span>
                                {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                ) : null}
                                </>
                            )}
                            </Listbox.Option>
                        ))}
                        </Listbox.Options>
                    </Transition>
                    </div>
                </Listbox>
                </div>
                <button disabled={!write} onClick={() => write?.()} className="flex justify-center bg-secondary rounded-[10px] font-bold w-full py-2 h-10 text-center transition duration-200 hover:bg-opacity-75">
                  Mint
                </button>
                {isSuccess && (
                  <div>
                    Successfully minted your NFT!
                    <div>
                      <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                    </div>
                  </div>
                )}
            </div>
            <Tilt className="flex items-center justify-center mx-auto w-[50%] md:w-auto md:py-28 py-10">
              <div>
                  <div className="shadow-xl shadow-black icon bg-black rounded-xl px-4 flex flex-col justify-around text-white md:w-[400px] md:h-[400px] w-[200px] h-[200px]">
                    <div className="font-serif align-top md:text-lg text-[10px]">
                      <h1> name: {name} </h1>
                      <h1> department: {selectedDepartment.department} </h1>
                      <h2> role: {selectedRole.name}</h2>
                    </div>
                      <Image
                        src="/fintechsoc-logo.webp"
                        alt="logo"
                        className="md:w-40 w-20 transition duration-200 hover:opacity-75 mx-auto"
                        width={160}
                        height={81.75}
                      />
                  </div>
              </div>
            </Tilt>
        </div>
        
	);
};

Mint.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Mint;
