import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Packages from "./Packages";
import ReservationDate from "./ReservationDate";
import ReservationDetails from "./ReservationDetails";
import Confirmation from "./Confirmation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Packages" component={Packages} />
        <Stack.Screen name="ReservationDate" component={ReservationDate} />
        <Stack.Screen name="ReservationDetails" component={ReservationDetails}/>
        <Stack.Screen name="Confirmation" component={Confirmation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}