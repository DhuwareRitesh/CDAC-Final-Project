import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Avatar, Button, Card } from "react-native-paper";

const OrderDetails = (props) => {
  const order = {
    id: "4545454",
    pickup: "Babylonn Capital, Hinjewadi Phase 1",
    dropoff: "Phoenix Mall of the Millennium, Wakad",
    status: "Out for Delivery",
  };

  const Payment =()=>{
    props.navigation.navigate("orderPayment");
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Babylonn Capital</Text>
          <Text style={styles.subtitle}>Hinjewadi Phase 1</Text>
        </View>
        <Avatar.Icon size={40} icon="account" style={styles.avatar} />
      </View>

      {/* Map View */}
      <Card style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 18.5913,
            longitude: 73.7389,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{ latitude: 18.5913, longitude: 73.7389 }}
            title="Babylonn Capital"
          />
        </MapView>
      </Card>

      {/* Order Details Section */}
      <Text style={styles.sectionTitle}>Order Details</Text>
      <Card style={styles.orderCard}>
        <Text style={styles.orderText}>
          <Text style={styles.bold}>Order ID:</Text> {order.id}
        </Text>
        <Text style={styles.orderText}>
          <Text style={styles.bold}>Pickup:</Text> {order.pickup}
        </Text>
        <Text style={styles.orderText}>
          <Text style={styles.bold}>Dropoff:</Text> {order.dropoff}
        </Text>
        <Text style={styles.orderText}>
          <Text style={styles.bold}>Status:</Text> {order.status}
        </Text>
      </Card>

      <Button onPress={Payment} style={styles.gradient}><Text style={styles.buttonText}>Order Complete</Text></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF9800",
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
  },
  avatar: {
    backgroundColor: "#FF9800",
  },
  mapContainer: {
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "blue",
  },
  map: {
    width: "100%",
    height: 350,
  },
  button: {
    borderRadius: 8,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  orderCard: {
    marginBottom:25,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
  },
  orderText: {
    fontSize: 14,
    marginVertical: 5,
  },
  bold: {
    fontWeight: "bold",
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
});

export default OrderDetails;
