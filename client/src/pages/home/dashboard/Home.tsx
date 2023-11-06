import React, { useEffect, useRef, useState } from "react";

import "../../../index.css";

import PasswordAddRow from "../../../components/password/PasswordAddRow";
import PasswordRow from "../../../components/password/PasswordRow";
import TextInput from "../../../components/inputs/TextInput";
import { UseAppSelector } from "../../../logic/redux/redux-hooks";
import {
  PasswordState,
  selectPasswordValue,
} from "../../../logic/redux/slices/password.slice";

const Home = () => {
  const passwords = UseAppSelector(selectPasswordValue);
  const [finder, setFinder] = useState<string>("");

  const [list, setList] = useState<PasswordState[]>(passwords);

  useEffect(() => {
    if (finder !== "") {
      setList(
        passwords.filter((value) => value.platform.includes(finder) === true)
      );
    } else {
      setList(passwords);
    }
  }, [finder, passwords]);

  return (
    <div id="page">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          margin: "auto",
          borderRadius: 10,
          padding: 10,
          overflow: "scroll",
          maxHeight: "80%",
          minHeight: 600,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            margin: 5,
          }}
        >
          <h1
            style={{
              margin: 0,
            }}
          >
            Passwords
          </h1>
          <TextInput
            style={{ width: 200, backgroundColor: "#f5f5f5" }}
            type={"text"}
            defaultLabel={"Search"}
            onChangeText={(text) => setFinder(text)}
            value={finder}
          />
        </div>

        <PasswordAddRow />

        {passwords.length > 0 &&
          list.map((value) => {
            return (
              <PasswordRow
                key={value.id}
                id={value.id}
                email={value.email}
                platform={value.platform}
                password={value.password}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
