import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, Button } from "react-native";
import axios, * as others from 'axios';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
  
  const navigation = useNavigation();
  
  const [places, setPlaces] = useState([]);

  // Make a request for a user with a given ID
  useEffect(() => {
    axios.get('http://localhost:8000/api/places')
      .then(function (response) {
        setPlaces(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  

    const Item = ({ id, name, logo, address, open, close }) => (
      
      <TouchableOpacity onPress={() => navigation.navigate('Packages', {placeId: id, placeName: name})}>
        <View style={styles.placeContainer}>

            {/* <Image source={{ uri: `asset:${logo}` }}  onError={(error) => console.error('Image load error:', error)}/> */}
            {/* <Image source={require(`./assets${logo}`)} style={styles.logo} /> */}
          <Text style={styles.placeName}>{name}</Text>
          <View style={styles.placeDetails}>
            <Image source={require('./assets/images/icons/location.png')} style={{width: 20, height: 20}}/>
            <Text style={styles.detailsText}>{address}</Text>
          </View>
          <View style={styles.placeDetails}>
            <Image source={require('./assets/images/icons/time.png')} style={{width: 20, height: 20}}/>
            <Text style={styles.detailsText}>{`${open} to ${close}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
      );

      const renderItem = ({ item }) => (
        <Item id={item.id} name={item.name} logo={item.logo} address={item.address} open={item.open} close={item.close}/>
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
    backgroundColor: '#f1f1f1',
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    minWidth: '90%',
    flex: 1,
    gap: 15,
  },
  placeName:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#636363',
    paddingBottom: 10,
  },
  placeDetails:{
    flex: 1,
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText:{
    color: '#434343',
    fontWeight: '500'
  }
});

export default Home;
