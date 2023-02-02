//import liraries
import React, { useState } from "react";
import { View, Text, Image, TextInput, Pressable } from "react-native";

const cred = {
  username: "username",
  password: "password",
};

function checkData(value, cb, err) {
  if (value.username === cred.username && value.password === cred.password) {
    cb();
    return;
  }
  err();
}

// create a component
const Login = ({ toggleAuth }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  function setDataFunction(value, name) {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 16,
      }}>
      <View style={{ width: "80%", paddingHorizontal: 16 }}>
        <Image
          source={{ uri: "https://i.imgur.com/O8RdgXg.png" }}
          style={{ width: "100%", height: 40 }}
        />
      </View>
      <View style={{ marginTop: 16, width: "80%" }}>
        {error && (
          <Text style={{ color: "red", textAlign: "center" }}>
            User/Password invalid
          </Text>
        )}
        <TextInput
          onFocus={() => setError(false)}
          onChangeText={(val) => setDataFunction(val, "username")}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            backgroundColor: "#f8f8f8",
            width: "100%",
            paddingVertical: 8,
            borderRadius: 8,
            paddingLeft: 4,
            marginTop: 4,
          }}
          placeholder="Enter the username"
        />
        <TextInput
          onFocus={() => setError(false)}
          onChangeText={(val) => setDataFunction(val, "password")}
          style={{
            borderWidth: 1,
            paddingLeft: 4,
            marginTop: 8,
            paddingVertical: 8,
            borderColor: "#ccc",
            backgroundColor: "#f8f8f8",
            width: "100%",
            borderRadius: 8,
          }}
          placeholder="Enter the password"
          secureTextEntry
        />
        <Pressable
          onPress={() =>
            checkData(
              data,
              () => toggleAuth(),
              () => setError(true)
            )
          }
          style={{
            width: "100%",
            paddingVertical: 16,
            backgroundColor: "#ff931e",
            marginTop: 8,
            borderRadius: 8,
          }}>
          <Text style={{ textAlign: "center" }}>Log In</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Logout = ({ toggleAuth }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 16,
      }}>
      <Text style={{ textAlign: "center" }}>You are logged in!</Text>
      <Pressable
        onPress={() => toggleAuth()}
        style={{
          width: "100%",
          paddingVertical: 16,
          backgroundColor: "#ff931e",
          marginTop: 8,
          borderRadius: 8,
        }}>
        <Text style={{ textAlign: "center" }}>Log Out</Text>
      </Pressable>
    </View>
  );
};

//make this component available to the app
export { Logout, Login };
