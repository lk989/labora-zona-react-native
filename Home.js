import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";


const Home = () => {
  //screen navigation object
  const navigation = useNavigation();

  //a state to store the places from db
  const [places, setPlaces] = useState([]);

  // Make a request for all the places
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/places`)
      .then(function (response) {
        setPlaces(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      navigation.navigate("Packages", {chosenPlace: item});
    }}>
      <View style={styles.placeContainer}>
        <Text style={styles.placeName}>{item.name}</Text>
        <View style={styles.placeDetails}>
          <Image
            source={require("./assets/images/icons/location.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={styles.detailsText}>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  placeContainer: {
    backgroundColor: "#f1f1f1",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    minWidth: "90%",
    flex: 1,
    gap: 15,
  },
  placeName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#636363",
    paddingBottom: 10,
  },
  placeDetails: {
    flex: 1,
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  detailsText: {
    color: "#434343",
    fontWeight: "500",
  },
});

export default Home;
