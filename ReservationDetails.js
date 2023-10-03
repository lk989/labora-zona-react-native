import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import packages from "./Packages";
import axios from "axios";

const ReservationDetails = ({ route: {params}}) => {

    const hour = params['time'];
    const date = params['date'];
    const id = params['packageId'];
    const place = params['place'];
    const details = params['details'];
    const packageName = params['package'];

    const reservationDetails = () => {
        axios.post('http://localhost:8000/api/reservations', {
            customer_id: 1,
            package_id: id,
            date: date,
            time: hour
        })
        .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });


    }
    return ( 
        <View style={{backgroundColor: '#fff', height: '100%', padding: 20, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#36494f', fontWeight: '800', fontSize: 24, textAlign: 'center', paddingBottom: 12}}>Reservation Details:</Text>
            <View style={{backgroundColor: '#ebdfd5', padding: 20, marginTop: 20, borderRadius: 20, gap: 15}}>
                <Text style={{color: '#dc904e', fontWeight: '800', fontSize: 20, textAlign: 'center', paddingVertical: 16}}>{place}</Text>
                <Text style={styles.title}>Package Name:</Text>
                <Text style={styles.details}>{packageName}</Text>
                <Text style={styles.title}>Package Details:</Text>
                <Text style={styles.details}>{details}</Text>
                <Text style={styles.title}>Date:</Text>
                <Text style={styles.details}>{date}</Text>
                <Text style={styles.title}>Time:</Text>
                <Text style={styles.details}>{hour}</Text>
            </View>
            <TouchableOpacity style={{backgroundColor: '#dc904e', paddingVertical: 12, borderRadius: 24, paddingHorizontal: 28, marginTop: 28}} onPress={reservationDetails}>
                <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>Confirm</Text>
            </TouchableOpacity>
        </View>
     );
}

const styles = StyleSheet.create({
    title: {
        color: '#36494f',
        fontWeight: '600',
        fontSize: 16,
        fontStyle: 'italic'
    },
    details: {
        color: '#646464',
        fontWeight: '600',
        fontSize: 14,
    },
});
 
export default ReservationDetails;