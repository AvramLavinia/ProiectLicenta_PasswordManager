import React, { useState } from "react";
import "./settings.css";
import "../../../index.css";
import { useNavigate } from "react-router-dom";
import NewNameService from "../../../logic/services/newName.service";
import {
  UseAppDispatch,
  UseAppSelector,
} from "../../../logic/redux/redux-hooks";
import { setAlert } from "../../../logic/redux/slices/alert.slice";
import TextInput from "../../../components/inputs/TextInput";
import BasicButton from "../../../components/buttons/BasicButton";
import { selectUserValue } from "../../../logic/redux/slices/user.slice";

const Settings = () => {
  const navigation = useNavigate();
  const dispatch = UseAppDispatch();
  const user = UseAppSelector(selectUserValue);
  const { updateProfile, loading } = NewNameService();

  const [name, setName] = useState<string>("");

  const handleUpdateUser = async () => {
    if (name.length > 0) {
      updateProfile({
        name,
        id: user.id as string,
        email: user.email as string,
      }).then(() => {
        setName("");
      });
    } else {
      dispatch(setAlert({ description: "All fields must be field" }));
    }
  };

  return (
    <div id="page">
      <div className="containerSet">
        <h1 className="titlu1">Settings</h1>

        <div className="contSet">
          <h2 className="t1">Change Name</h2>
          <TextInput
            type={"email"}
            defaultLabel={"Your actual email"}
            onChangeText={(text) => {}}
            value={user.email as string}
            disable={true}
          />
          <TextInput
            type={"text"}
            defaultLabel={"Your actual name"}
            onChangeText={(text) => {}}
            value={user.name as string}
            disable={true}
          />
          <TextInput
            type={"text"}
            defaultLabel={"Your new name"}
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <BasicButton
            title={"Update profile"}
            onClick={async () => await handleUpdateUser()}
            loading={loading}
          />
        </div>
        <div className="contSet1" style={{ marginTop: 40 }}>
          <h2 className="t1">Change Password</h2>
          <BasicButton
            title={"Change Password"}
            onClick={() => {
              navigation("/NewPassword");
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Settings;
