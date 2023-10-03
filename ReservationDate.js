import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import axios, * as others from 'axios';
import { now } from "moment";


const ReservationDate = ({ route: {params}}) => {

    const navigation = useNavigation();
    const id = params['packageId'];
    const name = params['packageName'];
    const place = params['placeName'];
    const details = params['details'];
    const [reservations, setReservations] = useState([]);
    const [date, setDate] = useState(new Date(now).toLocaleDateString("es-CL"));
    const [time, setTime] = useState([
        {id: '09:00:00',  hour: '9:00', booked: false},
        {id: '10:00:00', hour: '10:00', booked: false},
        {id: '11:00:00', hour: '11:00', booked: false},
        {id: '12:00:00', hour: '12:00', booked: false},
        {id: '13:00:00', hour: '13:00', booked: false},
        {id: '14:00:00', hour: '14:00', booked: false},
        {id: '15:00:00', hour: '15:00', booked: false},
        {id: '16:00:00', hour: '16:00', booked: false},
        {id: '17:00:00', hour: '17:00', booked: false},
        {id: '18:00:00', hour: '18:00', booked: false},
        {id: '19:00:00', hour: '19:00', booked: false},
        {id: '20:00:00', hour: '20:00', booked: false},
        {id: '21:00:00', hour: '21:00', booked: false},
        {id: '22:00:00', hour: '22:00', booked: false},
        {id: '23:00:00', hour: '23:00', booked: false},
    ]);

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);


    const onChangeHandler = (date) => {
          let newDate = new Date(date).toLocaleDateString("es-CL");
          axios.get(`http://localhost:8000/api/reservations/${id}/${newDate}`)
          .then(function (response) {
              setReservations(response.data);
              setDate(date.toDate().toLocaleDateString("es-CL"))
              reservations.forEach(reservation => {
                time.forEach(item => {
                    if(item['id'] == reservation['time']){
                        item['booked'] = true;
                    }
                    else
                        item['booked'] = false;
                })
              });
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
      };

      const Item = ({ hour, booked }) => (
      
        <TouchableOpacity onPress={() => navigation.navigate('ReservationDetails', {time: hour, package: name, date: date, place: place, details: details, packageId: id})}>
            <Text>{booked}</Text>
          <View style={[ !booked && styles.time, booked && styles.timeBooked]}>
            <Text style={{textAlign: 'center', fontWeight: '700', color: '#36494f', fontSize: '14'}}>{hour}</Text>
          </View>
        </TouchableOpacity>
        );
  
        const renderItem = ({ item }) => (
          <Item hour={item.hour} booked={item.booked}/>
        );

    return ( 
        <View style={{backgroundColor: '#fff', height: '100%', paddingHorizontal: 20}}>
            <Text style={{fontWeight: '900', color: '#dc904e', fontSize: 20, paddingVertical: 40}}>Choose a date:</Text>
            <View style={{borderColor: '#36494f', borderWidth: 2, borderRadius: 20, padding: 20, backgroundColor: '#f4f4f4',}}>
                <CalendarPicker
                minDate={new Date()}
                maxDate={maxDate}
                previousTitle="<"
                nextTitle=">"
                todayBackgroundColor="#ebdfd5"
                todayTextStyle={{color: '#36494f'}}
                selectedDayColor="#dc904e"
                selectedDayTextColor="#fff"
                textStyle={{
                    color: "#36494f", fontWeight: '500', fontSize: 14
                }}
                width={320}
                onDateChange={onChangeHandler}
                />
            </View>
            <Text style={{fontWeight: '900', color: '#dc904e', fontSize: 20, paddingTop: 40}}>Choose time:</Text>

        <View style={{backgroundColor: '#fff'}}>
          <FlatList
            numColumns={4}
            data={time}
            renderItem={renderItem}
          />
      </View>
      </View>
     );
}
 
const styles = StyleSheet.create({
    time: {
        backgroundColor: '#ebdfd5', marginTop: 6, padding: 10, borderRadius: 10, minWidth: '23%', flex: 1, gap: 10, marginHorizontal: 4
    },
    timeBooked: {
        backgroundColor: '#e6e6e6', marginTop: 6, padding: 10, borderRadius: 10, minWidth: '23%', flex: 1, gap: 10, marginHorizontal: 4,
    }
});
export default ReservationDate;