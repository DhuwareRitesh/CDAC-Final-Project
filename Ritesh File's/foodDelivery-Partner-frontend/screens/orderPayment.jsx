import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { RadioButton, Button, Card } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import OrderList from "./orderCard2";

const OrderPayment = (props) => {
    const [paymentMethod, setPaymentMethod] = useState("");
    const [showQR, setShowQR] = useState(false);

    const handlePayment = () => {
        if (paymentMethod === "UPI") {
            setShowQR(true);
        } else {
            alert("Payment Selected: Cash on Delivery");
        }
    };

    const homePage =()=>{
        props.navigation.navigate("orderCard");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Payment Method</Text>

            <Card style={styles.paymentCard}>
                <RadioButton.Group
                    onValueChange={(newValue) => setPaymentMethod(newValue)}
                    value={paymentMethod}
                >
                    <View style={styles.radioContainer}>
                        <RadioButton value="Cash" />
                        <Text style={styles.radioText}>Cash on Delivery</Text>
                    </View>

                    <View style={styles.radioContainer}>
                        <RadioButton value="UPI" />
                        <Text style={styles.radioText}>UPI Payment</Text>
                    </View>
                </RadioButton.Group>
            </Card>

            <Button
                mode="contained"
                style={styles.payButton}
                onPress={handlePayment}
                disabled={!paymentMethod}
            >
                Proceed to Pay
            </Button>

            {/* QR Code Modal */}
            <Modal visible={showQR} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <Card style={styles.qrCard}>
                        <Text style={styles.qrTitle}>Scan QR Code to Pay</Text>
                        <QRCode value="upi://pay?pa=your-upi-id@upi&pn=Merchant&mc=1234&tid=000000&tr=9876543210" size={200} />
                        <Button mode="contained" style={styles.closeButton} onPress={() => setShowQR(false)}>
                            Close
                        </Button>
                    </Card>
                </View>
            </Modal>
            <View style={{bottom:-400}}>

                <Button onPress={homePage} style={styles.gradient}><Text style={styles.buttonText}> Done </Text></Button>
            </View>
            
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F9F9F9"
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },

    paymentCard: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#FFF", elevation: 3
    },

    radioContainer: { 
        flexDirection: "row", 
        alignItems: "center", 
        marginVertical: 10 
    },

    radioText: { 
        fontSize: 16, 
        marginLeft: 10 
    },

    payButton: { 
        marginTop: 20, 
        backgroundColor: "#FF9800" 
    },

    modalContainer: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "rgba(0,0,0,0.5)" 
    },

    qrCard: { 
        padding: 20, 
        backgroundColor: "#FFF", 
        borderRadius: 10, 
        alignItems: "center" 
    },

    qrTitle: { 
        fontSize: 18, 
        fontWeight: "bold", 
        marginBottom: 10 
    },

    closeButton: { 
        marginTop: 15, 
        backgroundColor: "#FF5722" 
    },

    gradient: {
        backgroundColor:  "#5433FF",
        // paddingVertical: 8,
        alignItems: "center",
        bottom: 0,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        
      },
});

export default OrderPayment;
