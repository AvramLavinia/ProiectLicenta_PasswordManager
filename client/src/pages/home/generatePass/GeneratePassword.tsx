import React, { useState } from "react";
import "./generatePass.css";
import "../../../index.css";
import { FaFile } from "react-icons/fa";
import { numbers, lowerCase, upperCase, symbols } from "./characters";
import TextInput from "../../../components/inputs/TextInput";

const GeneratePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState<number>(20);
  const [includeUpr, setIncludeUpr] = useState(false);
  const [includeLwr, setIncludeLwr] = useState(false);
  const [includeNumbers, setNumbers] = useState(false);
  const [includeSymbols, setSymbols] = useState(false);
  const handleGeneratePassword = () => {
    let characterList = "";
    if (includeLwr) {
      characterList = characterList + lowerCase;
    }

    if (includeUpr) {
      characterList = characterList + upperCase;
    }

    if (includeNumbers) {
      characterList = characterList + numbers;
    }

    if (includeSymbols) {
      characterList = characterList + symbols;
    }
    setPassword(createPassword(characterList));
  };

  const createPassword = (characterList: any) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };

  const copyToClipboard = () => {
    const newText = document.createElement("textarea");
    newText.innerHTML = password;
    document.body.appendChild(newText);
    newText.select();
    document.execCommand("copy");
    newText.remove();
  };
  const handleCopy = () => {
    copyToClipboard();
  };
  return (
    <div id="page">
      <div className="container1">
        <div className="generator">
          <h2 className="generator-header"> Password Generator</h2>
          <div className="generator-pass">
            <h3>{password}</h3>
            <button onClick={handleCopy} className="copy_btn">
              <i>
                <FaFile />{" "}
              </i>
            </button>
          </div>
          <div className="form-grup">
            <label htmlFor="password-str"> Password Length</label>

            <TextInput
              type={"text"}
              defaultLabel={"Email"}
              onChangeText={(text) => setPasswordLength(Number(text))}
              value={passwordLength}
              style={{ width: 300 }}
            />
            {/* <input
              defaultValue={passwordLength}
              onChange={(e: any) => setPasswordLength(e.target.value)}
              type="number"
              id="password-str"
              name="password-str"
              max={20}
              min={10}
            ></input> */}
          </div>

          <div className="form-grup">
            <label htmlFor="upr-letter"> Include Uppercase Letters</label>
            <input
              checked={includeUpr}
              onChange={(e: any) => setIncludeUpr(e.target.value)}
              type="checkbox"
              id="upr-letter"
              name="upr-letter"
            ></input>
          </div>

          <div className="form-grup">
            <label htmlFor="low-letter"> Include Lowercase Letters</label>
            <input
              checked={includeLwr}
              onChange={(e: any) => setIncludeLwr(e.target.value)}
              type="checkbox"
              id="low-letter"
              name="low-letter"
            ></input>
          </div>

          <div className="form-grup">
            <label htmlFor="numbers"> Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e: any) => setNumbers(e.target.value)}
              type="checkbox"
              id="numbers"
              name="numbers"
            ></input>
          </div>

          <div className="form-grup">
            <label htmlFor="symbols"> Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e: any) => setSymbols(e.target.value)}
              type="checkbox"
              id="symbols"
              name="symbols"
            ></input>
          </div>

          <button onClick={handleGeneratePassword} className="generator_btn">
            {" "}
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
};
export default GeneratePassword;
