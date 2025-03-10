import axios from "axios";
import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { Button, Text,TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
// import LinearGradient from "react-native-linear-gradient";

const Login = (props) => {


  // const [phoneNumber, setPhoneNumber] = useState("");
  const [credentials, setCredentilas] = useState({ email: "", password: "" });
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  var url = `http://192.168.222.192:3030/api/v1/auth/login`;

  const SignIn = async()=>{
    console.log("sending  credentials to node server");
   
    console.log(credentials);

    axios.post(url,credentials,  { headers: { "Content-Type": "application/json" }}).then(async (reply)=>{
      // console.log(reply.data)
      console.log(reply.data.token)
        if(reply.data.token){
            await AsyncStorage.setItem("token",reply.data.token);
            await AsyncStorage.setItem("loggedInUser",credentials.email);
            props.navigation.navigate("orderCard");
        }else{
          Alert.alert("Error", "User Invalid");
        }
    }).catch((error)=>{
            console.error("Login error:", error);
            Alert.alert("Error", "An error occurred during login");
    })
    
    }

  
  
   
 
   // props.navigation.navigate("orderList");

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require("../assets/background.png")} style={styles.backgroundImage} />
        
      {/* <View style= {styles.logoContainer}>
      <Image source={require("../assets/logo.png")} style={styles.logo}/>
      </View> */}
      <View style ={{position: "absolute", alignSelf:"center", top:75}}>
      
      <Image source={require("../assets/logo.png")}style={styles.logo}></Image>
      <Text style={styles.text}> Food Delivery </Text>
      </View>
      
      

      {/* Card Container */}
      <View style={styles.card}>
        <Text style={styles.title}>Delivery Partner Login</Text>
        <Text style={styles.subtitle}>Enter your Email & Password  to proceed</Text>

        {/* Phone Input */}
        <View style={styles.phoneInputContainer}>
          {/* <Text style={styles.countryCode}>+91</Text> */}
          
          <TextInput
            style={styles.input}
            label={"Email"}
            mode="outlined"
            name="email"
            keyboardType="email-address"
            value={credentials.email}
            onChangeText={(value) => {
              setCredentilas({ ...credentials, email: value })
          }}
          />
          

          <TextInput  
          style={styles.input} 
          label={"Password"}
          mode="outlined"
          secureTextEntry={secureTextEntry}
          right = { <TextInput.Icon icon={"eye"} 
                    onPress={()=>{setSecureTextEntry(!secureTextEntry)}}/>}
          textContentType="password" 
          value={credentials.password}
          name="password"
          onChangeText={(value) => {
            setCredentilas({ ...credentials, password: value })
        }} 
          />

      <View style={styles.spacer}/>
        </View>

        {/* Continue Button */}
        {/* <TouchableOpacity style={styles.button}>
          <LinearGradient colors={["#7B5FFF", "#5433FF"]} style={styles.gradient}>
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity> */}
        
          <Button onPress={SignIn} style={styles.gradient}>
            <Text style={styles.buttonText}>
              Log In
            </Text>
            </Button>


        {/* Terms & Conditions */}
        <Text style={styles.terms}>
        By clicking, I accept the{" "}
          <Text style={styles.link}>Terms & Conditions & Privacy Policy</Text>
        </Text>

        {/* Google Sign-in
        <GoogleSigninButton style={styles.googleButton} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} /> */}
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
   
  },
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    position: "absolute",
    top: "45%",
    width: "100%",
    
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  phoneInputContainer: {
    flexDirection: "column",

    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  
  countryCode: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10,
  },
  input: {
    
    width:250,
    height:50,
    fontSize: 15,
    margin:2,
    paddingVertical: 10,
  },
  
  gradient: {
    backgroundColor:  "#5433FF",
    paddingVertical: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    
  },
  terms: {
    textAlign: "center",
    fontSize: 12,
    color: "#666",
    marginVertical: 10,
  },
  link: {
    color: "#5433FF",
    fontWeight: "bold",
  },
  googleButton: {
    alignSelf: "center",
    marginTop: 10,
  },
 
  logoContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,  // Push content slightly down
  },
  logo: {
    width: 50,  // Adjust size as needed
    height: 50,
    position:"absolute",
    top: 20,
    alignSelf: "center",
  },
  text:{
    color:"white",
    textAlign:"center",
    top:70,
    fontWeight:"bold"

  },
});

export default Login;


// import { useState } from "react";
// import { View } from "react-native";
// import {Button, Text,TextInput} from "react-native-paper";

// function Login(props) 
// {
//     const SignIn = ()=>{
//         //Actual Login Code
//         //Assuming Login is Successfull
//         //Proceed to Menu
//         props.navigation.navigate("/orderList");
//     }
//     const RegisterHere = ()=>{
//         //Proceed to Register Page / UI
//           props.navigation.navigate("/register");
//     }
//     const [secureTextEntry, setSecureTextEntry] =  useState(true)
//     return (<View style={{flex: 1, margin: 5}}>
                
//                 <TextInput label={"User Name"} 
//                            mode="outlined" 
//                            style={{margin: 5}}/>

//                 <TextInput label={"Password"} 
//                            mode="outlined" 
//                            style={{margin: 5}}
//                            secureTextEntry={secureTextEntry}
//                            right ={<TextInput.Icon icon={"eye"} 
//                            onPress={()=>{setSecureTextEntry(!secureTextEntry)}}/>}
//                            />
//                 <Button onPress={SignIn}>Sign In</Button>
//                 <Button onPress={RegisterHere}>Register</Button>
//             </View>);
// }

// export default Login;