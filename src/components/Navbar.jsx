import React, { useState, useEffect } from "react";
import { Typography, Button, Menu, Avatar } from "antd";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import icon from "../images/cryptocurrency.png";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setSreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setSreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="navbar-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Crypto-App</Link>
        </Typography.Title>
      </div>

      <Button
        className="menu-control-container"
        onClick={() => setActiveMenu(!activeMenu)}
      >
        <MenuOutlined />
      </Button>
      <br />
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>

          <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchnages</Link>
          </Menu.Item>

          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
}
