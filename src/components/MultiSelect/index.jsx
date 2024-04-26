import React, { useState, useEffect } from "react";

const MultiSelect = ({ options, selectedItems, setSelectedItems }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState({});

  const toggleDropdownBtn = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const onSelectItemBtn = (ev, item) => {
    setDisabledBtn({ ...disabledBtn, [item]: true });
    setSelectedItems((prevState) => [...prevState, item]);
  };

  const onRemoveSelectedItem = (ev, item) => {
    setDisabledBtn({ ...disabledBtn, [item]: false });
    const data_list = selectedItems;
    const new_data_list = data_list.filter((i) => i !== item);
    setSelectedItems(new_data_list);
  };

  useEffect(() => {}, [options, selectedItems]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap p-2 max-w-full">
        {selectedItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-indigo-800 bg-indigo-100 border border-indigo-300"
          >
            <div className="text-xs font-normal leading-none max-w-full flex-initial">
              {item}
            </div>
            <div className="flex flex-auto flex-row-reverse">
              <button onClick={(ev) => onRemoveSelectedItem(ev, item)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x hover:text-indigo-300 rounded-full w-4 h-4 ml-2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full h-12 flex flex-col items-center mx-auto">
        <div className="w-full h-full">
          <div className="flex flex-col items-center relative">
            <button onClick={toggleDropdownBtn} className="w-full">
              <div className="my-2 p-1 flex border border-gray-200 bg-white rounded">
                <div className="flex-1">
                  <input
                    disabled
                    placeholder="Exchanges"
                    className="bg-transparent text-indigo-900 font-sans p-1 px-2 appearance-none outline-none h-full w-full"
                  />
                </div>
                <div className="text-indigo-400 px-1 border-l flex items-center border-indigo-900">
                  <div className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 transition-transform ${
                        toggleDropdown ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
            <div
              className={`${
                toggleDropdown ? "" : "hidden"
              } h-40 w-full shadow top-100 bg-white z-40 lef-0 rounded max-h-select overflow-y-auto`}
            >
              <div className="flex flex-col w-full">
                {options.map((item, index) => (
                  <button
                    key={index}
                    onClick={(ev) => onSelectItemBtn(ev, item)}
                    disabled={disabledBtn[item]}
                    className={`w-full border-gray-100 rounded-t border-b border-white hover:bg-indigo-300 ${
                      disabledBtn[item] ? "bg-indigo-200" : ""
                    }`}
                  >
                    <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative">
                      <div className="w-full items-center flex">
                        <div className="mx-2 leading-6">{item}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
