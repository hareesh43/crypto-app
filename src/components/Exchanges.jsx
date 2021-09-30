import React from "react";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import millify from "millify";
import HTMLReactParser from "html-react-parser";

import { useGetExchangesDataQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Panel } = Collapse;
const {  Text } = Typography;

export default function Exchanges() {
  const { data, isFetching } = useGetExchangesDataQuery();
 
  const exchnageData = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <>
      <Row className="exchnage-title">
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24hr Trade Volume</Col>
        <Col span={6}>Market</Col>
        <Col span={6}>Chage</Col>
      </Row>
      {exchnageData?.map((data, i) => (
        <Col span={24} key={i}>
          <Collapse>
            <Panel
              key={data.id}
              showArrow={false}
              header={
                <Row>
                  <Col span={6}>
                    <Text>
                      {" "}
                      {data.rank}.
                      <Avatar src={data.iconUrl} />
                    </Text>
                    <Text>
                      {" "}
                      <strong> {data.name}</strong>
                    </Text>
                  </Col>
                  <Col span={6}>{millify(data.volume)}</Col>
                  <Col span={6}>{data.numberOfMarkets}</Col>
                  <Col span={6}>{millify(data.marketShare)}</Col>
                </Row>
              }
              className="site-collapse-custom-panel"
            >
              <p>{HTMLReactParser(data?.description || "")}</p>
            </Panel>
          </Collapse>
        </Col>
      ))}
    </>
  );
}
