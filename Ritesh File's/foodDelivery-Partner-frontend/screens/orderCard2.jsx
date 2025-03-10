










import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { Card, Button, IconButton, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const orders =
 [
  {
    id: "4545454",
    distance: "4 km",
    from: {
      name: "Babylonn Capital",
      address: "16832 Adiga Crescent",
    },
    to: {
      name: "John Doe",
      address: "7966 Bhaumik Loop",
    },
  },
  {
    id: "4786799",
    distance: "4 km",
    from: {
      name: "Babylonn Capital",
      address: "16832 Adiga Crescent",
    },
    to: {
      name: "John Doe",
      address: "7966 Bhaumik Loop",
    },
  },
];



const OrderList = ({ navigation }) => {
  const [orderList, setOrderList] = useState([]);
  const [lat, setLat] = useState(); // Store fetched latitude
  const [lon, setLon] = useState(); // Store fetched longitude
  const radius = 5000;


  // //  Function to fetch user location from database
  //  const fetchUserLocation = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("token"); // Retrieve token from storage
  //     if (!token) {
  //       Alert.alert("Error", "Authentication required! Please log in.");
  //       return;
  //     }

  //     // API call to get user's saved address (lat, lon) from database
  //     const response = await axios.get("http://localhost:3030/api/v1/users/address", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     if (response.data && response.data.latitude && response.data.longitude) {
  //       setLat(response.data.latitude);
  //       setLon(response.data.longitude);
  //     } else {
  //       Alert.alert("Error", "Failed to retrieve location from the database.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching location: ", error);
  //     Alert.alert("Error", "Failed to fetch location.");
  //   }
  // };
  

  

  // const GetOrder = async () => {

  //   try {
  //     const token = await AsyncStorage.getItem("token"); // Retrieve token from storage
  //     // debugger
  //     console.log("Retrieved Token:", token);

  //     if (!token) {
  //       Alert.alert("Error", "Authentication required! Please log in.");
  //       return;
  //     }

  //     const response = await axios.get(`http://192.168.1.10:3030/api/v1/orders/delivery`
  //       , { params: { lat, lon, radius } }, {
  //         headers: { Authorization: `Bearer ${token}` }, // Include token in the request
  //     });

  //     setOrderList(response.data.data);
  //   } catch (error) {
  //     console.error("Error Fetching Data: ", error);
  //     Alert.alert("Error", "Failed to fetch orders. Please log in again.");
  //   }
  // };
  // useEffect(() => {
  //   GetOrder();
  // }, []);


  const Accepted = (order) => {


    // axios.post('http://192.168.1.10:3030/api/v1/orders/${orders.id}/accept-delivery')
    //   .then((result) => {
    //     if (result.data.affectedRows > 0) {
    //       Alert.alert("Success");
    //       GetData();
    //       props.navigation.navigate("orderDetails");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error placing order: ", error);
    //     Alert.alert("Failed", "Failed to place the order. Please try again.");
    //   });

          navigation.navigate("orderDetails")
  };

  const Cancel =()=>{

  }
  const UpdateProfile = () => {
    navigation.navigate("Profile")  
  }
  const Logout = () => {

    AsyncStorage.removeItem("token");
    navigation.navigate("login");
  }

  const OrderCard = ({ order}) => {
    return (

      <Card style={styles.card}>

        <Card.Content>
          <View style={styles.header}>
            <Text style={styles.orderId}>OrderId #{order.id}</Text>
            <Card.Actions style={styles.actions}>
              <TouchableOpacity style={styles.iconButton} onPress={Cancel}>
                <Icon name="cancel" size={30} color="red" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={Accepted}>
                <Icon name="check-circle" size={30} color="green" />
              </TouchableOpacity>
            </Card.Actions>
          </View>

          <View style={styles.distanceContainer}>
            <Text style={styles.distanceText}>{order.distance}</Text>
          </View>

          <Text style={styles.label}>From, <Text style={styles.highlight}>{order.from.name}</Text></Text>
          <Text style={styles.address}>{order.from.address}</Text>

          <Text style={styles.label}>To, <Text style={styles.highlight}>{order.to.name}</Text></Text>
          <Text style={styles.address}>{order.to.address}</Text>
        </Card.Content>


      </Card>
    );
  };

  return (

    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Avatar.Icon  size={40} icon="account" style={styles.avatar} />
      <Avatar.Icon  size={40} icon="logout"  onPress={Logout}style={styles.avatar} />

      </View>
      
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard order={item} navigation={navigation} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F8F9FA",
    flex: 1,
  },
  card: {
    top: 10,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  distanceContainer: {
    backgroundColor: "#E0F7E9",
    padding: 4,
    borderRadius: 5,
    marginVertical: 8,
    alignSelf: "flex-start",
  },
  distanceText: {
    color: "green",
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  highlight: {
    fontWeight: "bold",
    color: "#FF8C00",
  },
  avatar: {
    backgroundColor: "#FF9800",
    alignSelf:"flex-end"
  },
  address: {
    fontSize: 14,
    color: "#333",
  },
  actions: {
    justifyContent: "flex-end",
    padding: 8,
  },
  iconButton: {

    height: 50,
    width: 50,
  },
  icon: {
    alignSelf: "flex-end"
  }

});

export default OrderList;
