import React, { useState } from "react";
import { logo } from "../../pages/images/images";
import "./menu.css";
import {
  FaDelicious,
  FaHeartbeat,
  FaKey,
  FaCog,
  FaFile,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoutService from "../../logic/services/logout.service";

const Menu = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState<number>(0);

  const { logout } = logoutService();

  const MenuElement = ({
    name,
    icon,
    id,
  }: {
    name: string;
    icon: JSX.Element;
    id: number;
  }) => {
    return (
      <li
        key={id}
        className={activePage === id ? "active" : ""}
        onClick={() => {
          setActivePage(id);
        }}
      >
        <div onClick={() => navigate("/" + name)}>{icon}</div>
      </li>
    );
  };

  return (
    <menu>
      <img src={logo} alt="" />
      <ul id="mainMenu">
        <MenuElement name="" icon={<FaDelicious />} id={0} />
        <MenuElement name="Notes" icon={<FaFile />} id={1} />
        <MenuElement name="GeneratePassword" icon={<FaKey />} id={2} />
        <MenuElement name="Health" icon={<FaHeartbeat />} id={3} />
        <MenuElement name="Settings" icon={<FaCog />} id={4} />
        <ul className="last" onClick={() => navigate("/")}>
          <li>
            <div>
              <FaSignOutAlt
                onClick={() => {
                  logout();
                }}
              />
            </div>
          </li>
        </ul>
      </ul>
    </menu>
  );
};

export default Menu;
