import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./login";
import OrderCard from "./orderCard";
import OrderDetails from "./orderDetails";
import Register from "./register";
import OrderPayment from "./orderPayment";
function Launcher() {
    var Stack = createNativeStackNavigator()
    return ( <NavigationContainer>
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name = "login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name = "orderCard" component={OrderCard}/>
            <Stack.Screen name ="orderDetails" component={OrderDetails}/>
            <Stack.Screen name ="Profile" component={Register}  options={{headerShown:false}}/>
            <Stack.Screen name="orderPayment" component={OrderPayment}/>
            
        </Stack.Navigator>
    </NavigationContainer> );
}

export default Launcher;