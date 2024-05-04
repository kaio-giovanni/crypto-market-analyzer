import React from "react";
import PropTypes from "prop-types";
import { Button, Typography } from "@material-tailwind/react";

const DefaultCard = ({
  coinIcon,
  coinName,
  fromExchange,
  toExchange,
  fromExPrice,
  toExPrice,
  spread,
  tax
}) => {
  return (
    <div className="w-full h-80 p-2 bg-white text-blue-gray-800 shadow-md rounded-xl duration-500 hover:shadow-2xl text-sm">
      <div className="h-full">
        <div className="flex flex-wrap">
          <img src={coinIcon} alt="coin" className="h-12 w-12 my-auto" />
          <span className="text-indigo-900 font-sans font-bold my-auto uppercase ">{coinName}</span>
        </div>
        <hr className="text-blue-gray-200" />
        <div className="grid grid-cols-3 w-full pt-2">
          <div className="block">
            <Typography variant="small" className="font-bold mr-2 text-blue-gray-300 text-left">
              Purchase
            </Typography>
            <div className="flex flex-wrap my-4">
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbGKEKKPP-L69AXrVhrM_ViJ3AhxFnZPxzNR7LbHrkvw&s"
                }
                width={40}
                height={40}
                alt="coin"
                className="mr-2"
              />
              <Typography
                variant="small"
                className="text-indigo-900 font-sans font-bold my-auto text-right"
              >
                {fromExchange}
              </Typography>
            </div>
            <div className="text-left my-2">
              <Typography variant="small" className="text-indigo-900 font-sans font-bold">
                ${fromExPrice}
              </Typography>
            </div>
          </div>
          <div className="text-center m-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
          <div className="block">
            <Typography variant="small" className="font-bold mr-2 text-blue-gray-300 text-right">
              Sell
            </Typography>
            <div className="flex flex-wrap my-4 text-right justify-end">
              <img
                src={"https://logos-world.net/wp-content/uploads/2021/02/Kraken-Logo.png"}
                width={40}
                height={40}
                alt="coin"
                className="mr-2"
              />
              <Typography
                variant="small"
                className="text-indigo-900 font-sans font-bold my-auto text-right"
              >
                {toExchange}
              </Typography>
            </div>
            <div className="text-right my-2">
              <Typography variant="small" className="text-indigo-900 font-sans font-bold">
                ${toExPrice}
              </Typography>
            </div>
          </div>
        </div>
        <hr className="text-blue-gray-200" />
        <div className="p-2">
          <div className="grid grid-cols-2 w-full mb-2">
            <div className="block">
              <Typography variant="small" className="font-bold text-blue-gray-300 text-left">
                SPREAD
              </Typography>
              <div className="flex flex-wrap">
                <Typography
                  variant="small"
                  className="text-green-800 font-sans font-bold my-auto text-left"
                >
                  {spread}%
                </Typography>
              </div>
            </div>
            <div className="block">
              <Typography variant="small" className="font-bold text-blue-gray-300 text-right">
                TAX
              </Typography>
              <div className="flex flex-wrap text-right justify-end">
                <Typography
                  variant="small"
                  className="text-red-700 font-sans font-bold my-auto text-right"
                >
                  {tax}%
                </Typography>
              </div>
            </div>
          </div>
          <Button
            variant="outlined"
            className="flex items-center justify-center gap-2 bg-indigo-900 w-full hover:bg-midnight text-white"
          >
            Order book
          </Button>
        </div>
      </div>
    </div>
  );
};

DefaultCard.propTypes = {
  coinIcon: PropTypes.string.isRequired,
  coinName: PropTypes.string.isRequired,
  fromExchange: PropTypes.string.isRequired,
  toExchange: PropTypes.string.isRequired,
  fromExPrice: PropTypes.string.isRequired,
  toExPrice: PropTypes.string.isRequired,
  spread: PropTypes.string.isRequired,
  tax: PropTypes.string.isRequired
};

export default DefaultCard;
