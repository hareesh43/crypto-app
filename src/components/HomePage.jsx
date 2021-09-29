import React from "react";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import { News } from ".";

const { Title } = Typography;

export default function HomePage() {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return "Loading ...";
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Statastics
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total cryptocurrencies" value={globalStats?.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exachnage"
            value={millify(globalStats?.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats?.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24 hr volume"
            value={millify(globalStats?.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats?.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 cryptocurrencies
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest crypto news
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show more</Link>
        </Title>
      </div>

      <News simplified />
    </>
  );
}
