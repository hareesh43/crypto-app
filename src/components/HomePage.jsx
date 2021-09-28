import React from "react";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";

const { Title } = Typography;

export default function HomePage() {
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Statastics
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total cryptocurrencies" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exachnage" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24 hr valume" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value="5" />
        </Col>
      </Row>
    </>
  );
}
