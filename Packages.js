import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Packages = ({ route: { params } }) => {
  const place = params["chosenPlace"];
  const navigation = useNavigation();
  const [packages, setPackages] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/packages/${place.id}`)
      .then(function (response) {
        setPackages(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.details}>{item.details}</Text>
        <Text style={styles.price}>{item.price} SAR</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("ReservationDate", {chosenPackage: item, chosenPlace: place});
          }}
          underlayColor="#fff"
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.background}>
      <FlatList
        data={packages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#fff",
    padding: 20,
    height: '100%',
  },
  container: {
    backgroundColor: "#ebdfd5",
    marginTop: 20,
    padding: 20,
    borderRadius: 40,
    minWidth: "90%",
    gap: 15,
  },
  title: {
    textAlign: "center",
    fontWeight: "800",
    color: "#36494f",
    fontSize: "20",
  },
  details: {
    fontWeight: "400",
    color: "#636363",
    fontSize: "15",
  },
  price: {
    textAlign: "center",
    fontWeight: "800",
    color: "#36494f",
    fontSize: "20",
  },
  button: {
    backgroundColor: "#dc904e",
    borderRadius: 50,
    width: "35%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: "14",
    textAlign: "center",
    padding: 8,
  },
});

export default Packages;
