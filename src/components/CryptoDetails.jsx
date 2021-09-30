import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Select } from "antd";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import HTMLReactParser from "html-react-parser";

import {
  useGetCryptoDetailsQuery,
  useGetCoinHistoryQuery,
} from "../services/cryptoApi";

import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

export default function CryptoDetails() {
  const { coinId } = useParams();
  const [timeStamp, setTimeStamp] = useState("7d");

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCoinHistoryQuery({coinId, timeStamp});
  const cryptoDetails = data?.data?.coin;
  
  if(isFetching) return 'Loadning ...'

  const time = [ "24h", "7d", "30d", "5y"];

  let stats = [];
  let genericStats = [];

  if (cryptoDetails) {
    stats = [
      {
        title: "Price to USD",
        value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
        icon: <DollarCircleOutlined />,
      },
      { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
      {
        title: "24h Volume",
        value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
        icon: <ThunderboltOutlined />,
      },
      {
        title: "Market Cap",
        value: `$ ${
          cryptoDetails.marketCap && millify(cryptoDetails.marketCap)
        }`,
        icon: <DollarCircleOutlined />,
      },
      {
        title: "All-time-high(daily avg.)",
        value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
        icon: <TrophyOutlined />,
      },
    ];
    genericStats = [
      {
        title: "Number Of Markets",
        value: cryptoDetails.numberOfMarkets,
        icon: <FundOutlined />,
      },
      {
        title: "Number Of Exchanges",
        value: cryptoDetails.numberOfExchanges,
        icon: <MoneyCollectOutlined />,
      },
      {
        title: "Aprroved Supply",
        value: cryptoDetails.approvedSupply ? (
          <CheckOutlined />
        ) : (
          <StopOutlined />
        ),
        icon: <ExclamationCircleOutlined />,
      },
      {
        title: "Total Supply",
        value: `$ ${millify(cryptoDetails.totalSupply)}`,
        icon: <ExclamationCircleOutlined />,
      },
      {
        title: "Circulating Supply",
        value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
        icon: <ExclamationCircleOutlined />,
      },
    ];
  }

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name} ({cryptoDetails?.slug}) Price
        </Title>
        <p>
          {cryptoDetails?.name} live price in US dollars, View value
          statastics,market cap and supply !
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="select time period"
        onChange={(value) => setTimeStamp(value)}
      >
        {time.map((date) => (
          <Option value={date} key={date}>
            {date}
          </Option>
        ))}
      </Select>

      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails?.price)}
        coinName={cryptoDetails?.name}
      />

      <Col className="stats-container">
        <Col className="coin-value-statastics">
          <Col className="coin-value-statastics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} Value Statastics
            </Title>
            <p>An overview of statastics of {cryptoDetails?.name}</p>
          </Col>
          {stats.map(({ title, value, icon }, i) => (
            <Col className="coin-stats" key={i}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value-statastics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statastics
            </Title>
            <p>An overview of statastics of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ title, value, icon }, i) => (
            <Col className="coin-stats" key={i}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className="coin-desc-link">
        <Row className="coin-desc-row">
          <Title className="coin-details-heading" level={2}>
            What is {cryptoDetails?.name} ?
            {cryptoDetails?.description
              ? HTMLReactParser(cryptoDetails?.description)
              : ""}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={3}>{cryptoDetails?.name} Links</Title>
          {cryptoDetails?.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5}>{link.type}</Title>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
}
