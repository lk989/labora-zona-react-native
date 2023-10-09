import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ReservationDetails = ({ route: { params } }) => {
  const navigation = useNavigation();
  const hour = params["time"];
  const date = params["date"];
  const id = params["packageId"];
  const place = params["place"];
  const details = params["details"];
  const packageName = params["package"];

  const reservationDetails = () => {
    const formattedDate = `${date.split("-")[2]}-${date.split("-")[1]}-${date.split("-")[0]}`;
    axios
      .post("http://localhost:8000/api/reservations", {
        customer_id: 1,
        package_id: id,
        date: formattedDate,
        time: hour,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    navigation.navigate("Confirmation");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reservation Details:</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.placeName}>{place}</Text>
        <Text style={styles.title}>Package Name:</Text>
        <Text style={styles.details}>{packageName}</Text>
        <Text style={styles.title}>Package Details:</Text>
        <Text style={styles.details}>{details}</Text>
        <Text style={styles.title}>Date:</Text>
        <Text style={styles.details}>{date}</Text>
        <Text style={styles.title}>Time:</Text>
        <Text style={styles.details}>{hour}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={reservationDetails}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    padding: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: "#36494f",
    fontWeight: "800",
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 12,
  },
  detailsContainer: {
    backgroundColor: "#ebdfd5",
    padding: 20,
    marginTop: 20,
    borderRadius: 20,
    gap: 15,
  },
  placeName: {
    color: "#dc904e",
    fontWeight: "800",
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 16,
  },
  title: {
    color: "#36494f",
    fontWeight: "600",
    fontSize: 16,
    fontStyle: "italic",
  },
  details: {
    color: "#646464",
    fontWeight: "600",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#dc904e",
    paddingVertical: 12,
    borderRadius: 24,
    paddingHorizontal: 28,
    marginTop: 28,
  },
});

export default ReservationDetails;
