import React, { useState } from "react";
import { View, Alert, StyleSheet, KeyboardAvoidingView, ScrollView, Text,Image } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import axios from "axios";



const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to validate user input
  const validateInputs = () => {
    if (!fullName || !email || !phone || !password) {
      Alert.alert("Error", "All fields are required!");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert("Error", "Invalid email format!");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      Alert.alert("Error", "Phone number must be 10 digits!");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters!");
      return false;
    }
    return true;
  };

  // Function to handle registration
  const handleRegister = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://192.168.40.192:3030/api/v1/users/delivery-partner", {
        fullName,
        email,
        phone,
        password,
      });

      if (response.status === 201) {
        Alert.alert("Success", "Registration successful! Please log in.");
        navigation.navigate("login");
      }
    } catch (error) {
      console.error("Registration Error:", error.response ? error.response.data : error.message);
      Alert.alert("Registration Failed", error.response?.data?.error || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style ={{position: "absolute", alignSelf:"center", top:75}}>
      
      <Image source={require("../assets/logo.png")}style={styles.logo}></Image>
      <Text style={styles.text}> Food Delivery </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
        <Title style={styles.title}>Register</Title>

        <TextInput
          label="Full Name"
          mode="outlined"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />

        <TextInput
          label="Email"
          mode="outlined"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          label="Phone"
          mode="outlined"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />

        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <Button mode="contained" onPress={handleRegister} loading={loading} disabled={loading} style={styles.button}>
          Register
        </Button>

        <Button mode="text" onPress={() => navigation.navigate("login")} style={styles.link}>
          Already have an account? Login
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  logo: {
    width: 50,  // Adjust size as needed
    height: 50,
    position:"absolute",
    top: 20,
    alignSelf: "center",
  },
  text:{
    color:"black",
    textAlign:"center",
    top:70,
    fontWeight:"bold"

  },
  link: {
    marginTop: 10,
    textAlign: "center",
  },

});

export default Register;
