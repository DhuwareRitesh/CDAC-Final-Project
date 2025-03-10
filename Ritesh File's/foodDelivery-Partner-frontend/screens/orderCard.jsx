
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import { Card, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

// ✅ Initialize Google Geocoding API (Replace with your API Key)
Geocoder.init("AIzaSyBdEq-V7yWDo3L-NPIxcpCEQmTkVkDbm8s");

const OrderList = ({ navigation }) => {
    const [orderList, setOrderList] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [locationName, setLocationName] = useState("");
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [loading, setLoading] = useState(true);
    const [locationError, setLocationError] = useState("");

    // ✅ Fetch User Location
    const fetchUserLocation = async () => {
        setLoadingLocation(true);
        setLocationError("");

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            console.log("Permission Status:", status);
            if (status !== "granted") {
                setLocationError("Location permission denied");
                setLoadingLocation(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            const { latitude, longitude } = location.coords;
            setUserLocation({ latitude, longitude });

            console.log("User location:", latitude, longitude);

            // Reverse geocode to get address
            Geocoder.from(latitude, longitude)
                .then(json => {
                    const address = json.results[0]?.formatted_address || "Unknown location";
                    console.log("Address:", address);
                    setLocationName(address);
                })
                .catch(error => {
                    console.error("Geocoding error:", error);
                    setLocationError("Failed to get address");
                })
                .finally(() => setLoadingLocation(false));

        } catch (error) {
            console.error("Error fetching location:", error);
            setLocationError("Failed to fetch location");
            setLoading(false);
        }
    };

    // ✅ Haversine Formula for Distance Calculation
    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        if (!lat1 || !lon1 || !lat2 || !lon2) return 0; // Prevents errors if null values exist
        const R = 6371; // Radius of Earth in kilometers
        const toRad = (angle) => (angle * Math.PI) / 180;

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in kilometers
    };

    // ✅ Fetch Orders from API
    const GetOrder = async () => {
        if (!userLocation) return;
        // console.log("Fetching Orders...");

        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                Alert.alert("Error", "Authentication required! Please log in.");
                return;
            }

            const response = await axios.get(
                "http://192.168.222.192:3030/api/v1/delivery/ready-for-pickup",
                {
                    params: { lat: userLocation.latitude, lon: userLocation.longitude, radius: 10000000000 },
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("API Response:", response.data);

            const updatedOrders = await Promise.all(response.data.map(async (order) => {
                let restaurantDetails = {};
                let customerDetails = {};

                try {
                    // ✅ Fetch Restaurant Details
                    const restaurantResponse = await axios.get(`http://192.168.222.192:3030/api/v1/restaurants/${order.restaurantId}`,{headers: { Authorization: `Bearer ${token}` }});
                    restaurantDetails = restaurantResponse.data || {};
                } catch (error) {
                    console.error("Error Fetching Restaurant Details:", error);
                }

                try {
                    // ✅ Fetch Customer Details
                    const customerResponse = await axios.get(`http://192.168.222.192:3030/api/v1/users/${order.customerId}`,{headers: { Authorization: `Bearer ${token}` }});
                    customerDetails = customerResponse.data || {};
                } catch (error) {
                    console.error("Error Fetching Customer Details:", error);
                }

                return {
                    ...order,
                    restaurantName: restaurantDetails.name ?? "Unknown Restaurant",
                    restaurantAddress: restaurantDetails.addressLine1 ?? "No Address Available",
                    restaurantLatitude: restaurantDetails.latitude ?? 0,
                    restaurantLongitude: restaurantDetails.longitude ?? 0,
                    customerName: customerDetails.fullName ?? "Unknown Customer",
                    customerAddress: customerDetails.address ?? "No Address Available",
                    restaurantDistance: haversineDistance(
                        userLocation.latitude, userLocation.longitude,
                        restaurantDetails.latitude, restaurantDetails.longitude
                    ),
                };
            }));

            setOrderList(updatedOrders);
        } catch (error) {
            console.error("Error Fetching Orders:", error);
            Alert.alert("ErroR", "Failed to fetch orders. Please try again.");
        }
    };

    useEffect(() => {
        fetchUserLocation();
    }, []);

    useEffect(() => {
        if (userLocation) GetOrder();
    }, [userLocation]);

    // Location display component
    const LocationDisplay = () => {

        if (loadingLocation) {
            return (
                <View style={styles.locationContainer}>
                    <ActivityIndicator size="small" color="#FF8C00" />
                    <Text style={styles.locationText}>Fetching your location...</Text>
                </View>
            );
        }

        if (locationError) {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>⚠️ Location Error: {locationError}</Text>
                    <TouchableOpacity 
                        onPress={fetchUserLocation}
                        style={styles.retryButton}
                    >
                        <Text style={styles.retryText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
                <View style={styles.locationContainer}>
                     <Text style={styles.locationText}>📍 Your Location:</Text>
                     
                     <Text style={styles.addressText}>{locationName}</Text>
                </View>
              );
        }

        const Accept = async (orderId) => {
            try {
                const token = await AsyncStorage.getItem("token");
                if (!token) {
                    Alert.alert("Error", "Authentication required! Please log in.");
                    return;
                }
        
                const response = await axios.patch(
                    `http://192.168.222.192:3030/api/v1/delivery/${orderId}/accept-delivery`,
                    {},  // No body needed
                    { headers: { Authorization: `Bearer ${token}` } }
                );
        
                console.log("API Response:", response.data); // Debugging
        
                if (response.data.affectedRows > 0) {
                    Alert.alert("Success", "Order accepted successfully.");
                    GetOrder(); // Refresh orders list
                    navigation.navigate("orderDetails", { orderId });
                } else {
                    Alert.alert("Failed", "Order was not updated. Please try again.");
                }
            } catch (error) {
                console.error("Error accepting order: ", error.response ? error.response.data : error.message);
                Alert.alert("Failed", "Failed to accept the order. Please try again.");
            }
        };
        
        
    return (
        <View style={styles.container}>
            <LocationDisplay/>
            <FlatList
                data={orderList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.orderId}>OrderId #{item.id}</Text>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity style={styles.rejectButton}>
                                    <Icon name="cancel" size={30} color="red" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.acceptButton}>
                                    <Icon name="check-circle" size={30} color="green" onPress={()=>Accept(item.id)} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.distanceContainer}>
                            <Text style={styles.distanceText}>{item.restaurantDistance?.toFixed(1) ?? "N/A"} km</Text>
                        </View>

                        <View style={styles.detailsContainer}>
                            <Text style={styles.label}>From,</Text>
                            <Text style={styles.place}>{item.restaurantName}</Text>
                            <Text style={styles.address}>{item.restaurantAddress}</Text>

                            <Text style={styles.label}>To,</Text>
                            <Text style={styles.place}>{item.customerName}</Text>
                            <Text style={styles.address}>{item.customerAddress}</Text>
                        </View>
                    </Card>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: "#F8F9FA", flex: 1},
    distanceContainer: { backgroundColor: "#4CAF50", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, alignSelf: "flex-start", marginTop: 10 },
    distanceText: { color: "white", fontSize: 14, fontWeight: "bold" },
    place: { fontSize: 16, fontWeight: "bold", color: "#FF8C00" },
    address: { fontSize: 14, color: "#333", marginBottom: 8 },
    actionButtons: { flexDirection: "row", marginTop: 8 , justifyContent: "flex-end"},
    rejectButton: {    marginRight: 50 },
    acceptButton: {    marginRight: 10 },
    card: { backgroundColor: "#FFF", borderRadius: 10, padding: 16, marginBottom: 12, elevation: 2 },
});

export default OrderList;



