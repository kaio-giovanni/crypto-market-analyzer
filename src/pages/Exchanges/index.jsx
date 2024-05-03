import React, { useEffect, useState } from "react";
import NavbarMenu from "../../components/NavbarMenu";
import Private from "../../components/Private";
import Table from "../../components/Table";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import { coinApi } from "../../services/http_requests";

const ExchangeTable = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const tableHeaders = [
    { headerName: "ID", headerId: "exchange_id" },
    { headerName: "Exchange", headerId: "exchange_id" },
    { headerName: "Website", headerId: "website" },
    { headerName: "N. Crypto", headerId: "data_symbols_count" },
    { headerName: "VOLUME USD DAY", headerId: "volume_1day_usd" }
  ];

  useEffect(() => {
    setLoading(true);
    coinApi
      .get("/v1/exchanges")
      .then((response) => {
        const data = response.data;
        setExchanges(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, []);

  return (
    <Private>
      <NavbarMenu />
      {loading ? (
        <Loading type="green-400" />
      ) : (
        <div className="min-h-screen">
          <Table tableData={exchanges} headers={tableHeaders} />
        </div>
      )}
      <Footer />
    </Private>
  );
};

export default ExchangeTable;
