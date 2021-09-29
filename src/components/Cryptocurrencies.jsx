import React, { useEffect, useState } from "react";
import { Card, Row, Col, Input } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";

import { useGetCryptosQuery } from "../services/cryptoApi";

export default function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    const filtereddata = cryptoList?.data?.coins?.filter((coin) =>
      coin.name.toLowerCase().includes(searchParams.toLowerCase())
    );
    setCryptos(filtereddata);
  }, [cryptoList, searchParams]);

  if (isFetching) return "Loading ...";

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="search crypto"
            onChange={(e) => setSearchParams(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((crypto) => (
          <Col xs={24} sm={12} lg={8} className="crypto-card" key={crypto.id}>
            <Link to={`/crypto/${crypto.id}`}>
              <Card
                title={`${crypto.rank}.${crypto.name}`}
                extra={
                  <img
                    src={crypto.iconUrl}
                    className="crypto-image"
                    alt={crypto.name}
                  />
                }
                hoverable
              >
                <p>Price : {millify(crypto.price)}</p>
                <p>Market Cap : {millify(crypto.marketCap)}</p>
                <p>Volume Exchange : {millify(crypto.change)} %</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
