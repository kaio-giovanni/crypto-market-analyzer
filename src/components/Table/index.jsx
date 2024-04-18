import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Table = ({ tableData, headers }) => {
  const [currentData, setCurrentData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [numElements] = useState(10);

  useEffect(() => {
    const indexOfLastPost = page * numElements;
    const indexOfFirstPost = indexOfLastPost - numElements;
    setCurrentData(tableData.slice(indexOfFirstPost, indexOfLastPost));

    const size = Math.ceil(tableData.length / numElements);
    setTotalPages(size);
    console.log({ size, page });
  }, [numElements, page, tableData]);

  const next = () => {
    if (page === totalPages) return;

    setPage(page + 1);
  };

  const prev = () => {
    if (page === 1) return;

    setPage(page - 1);
  };

  const firstPage = () => {
    if (page === 1) return;

    setPage(1);
  };

  const lastPage = () => {
    if (page === totalPages) return;

    setPage(totalPages);
  };

  return (
    <>
      <div className="bg-white relative overflow-x-auto shadow-md sm:rounded-lg m-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {headers.map(({ headerName }, index) => (
                <th scope="col" className="px-6 py-3" key={index}>
                  {headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                className="odd:bg-blue-gray-50 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-t dark:border-gray-700"
                key={index}
              >
                {headers.map(({ headerId }, index) => (
                  <td className="px-6 py-4" key={index}>
                    {item[headerId]}
                  </td>
                ))}
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr className="odd:bg-blue-gray-50 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-t dark:border-gray-700">
                {headers.map((item, index) => (
                  <td className="px-6 py-4" key={index}>
                    No data
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center">
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={firstPage}
          disabled={page === 1}
        >
          First
        </Button>
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={prev}
          disabled={page === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={next}
          disabled={page >= totalPages}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={lastPage}
          disabled={page >= totalPages}
        >
          Last
        </Button>
        <small className="mx-2 text-black">
          {page} of {totalPages} pages
        </small>
      </div>
    </>
  );
};

export default Table;
