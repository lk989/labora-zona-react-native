import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Reservations = () => {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.thanks}>Thank you for choosing us.</Text>
      <Text style={styles.confirm}>
        Your reservation has been booked succesfully !
      </Text>
      <TouchableOpacity style={styles.button} onPress={pressHandler}>
        <Text style={styles.buttonText}>Go home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    gap: 40,
  },
  thanks: {
    color: "#36494f",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  confirm: {
    color: "#dc904e",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#dc904e",
    paddingVertical: 12,
    borderRadius: 24,
    paddingHorizontal: 28,
    marginTop: 28,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default Reservations;
