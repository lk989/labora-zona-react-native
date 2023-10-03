import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import axios, * as others from 'axios';
import { useNavigation } from "@react-navigation/native";

const Packages = ({ route: { params }}) => {

    const navigation = useNavigation();
    const id = params['placeId'];
    const name = params['placeName'];
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/packages/${id}`)
          .then(function (response) {
              setPackages(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
      }, []);
    
      const Item = ({ id, title, details, price, place }) => (
      
        <TouchableOpacity>
          <View style={{backgroundColor: '#ebdfd5', marginTop: 20, padding: 20, borderRadius: 40, minWidth: '90%', flex: 1, gap: 15,}}>
            <Text style={{textAlign: 'center', fontWeight: '800', color: '#36494f', fontSize: '20'}}>{title}</Text>
            <Text style={{fontWeight: '400', color: '#636363', fontSize: '15'}}>{details}</Text>
            <Text style={{textAlign: 'center', fontWeight: '800', color: '#36494f', fontSize: '20'}}>{price} SAR</Text>
            <TouchableOpacity style={{backgroundColor: '#dc904e', borderRadius: 50, width: '35%', alignSelf: 'center'}} onPress={() => navigation.navigate('ReservationDate', {packageId: id, packageName: title, placeName: name, details: details})} underlayColor='#fff'>
                <Text style={{color: '#fff', fontWeight:'600', fontSize: '14', textAlign: 'center', padding: 8}}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        );
  
        const renderItem = ({ item }) => (
          <Item id={item.id} title={item.title} details={item.details} price={item.price} place={item.place}/>
        );
    
    return (
      <View style={{backgroundColor: '#fff', padding: 20}}>
          <FlatList
            data={packages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
      </View>
    );
  };
 
export default Packages;