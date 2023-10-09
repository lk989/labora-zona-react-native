import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { now } from "moment";

const ReservationDate = ({ route: { params } }) => {
  const navigation = useNavigation();
  const name = params['packageName'];
  const place = params['placeName'];
  const details = params['details'];
  const id = params["packageId"];
  const [date, setDate] = useState(new Date(now).toLocaleDateString("es-CL"));
  const time = [
    { id: 1, time: "09:00" }, { id: 2, time: "10:00" }, { id: 3, time: "11:00" },
    { id: 4, time: "12:00" }, { id: 5, time: "13:00" }, { id: 6, time: "14:00" },
    { id: 7, time: "15:00" }, { id: 8, time: "16:00" }, { id: 9, time: "17:00" },
    { id: 10, time: "18:00" }, { id: 11, time: "19:00" }, { id: 12, time: "20:00" },
    { id: 13, time: "21:00" }, { id: 14, time: "22:00" }, { id: 15, time: "23:00" },
  ];

  const onDateChangeHandler= (date) => {
    let newDate = date.toDate().toLocaleDateString("es-CL");
    setDate(newDate);
  }
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ReservationDetails', {time: item.time, package: name, date: date, place: place, details: details, packageId: id})}>
      <View style={styles.time}>
        <Text style={styles.hour}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a date:</Text>
      <View style={styles.calender}>
        <CalendarPicker
          minDate={new Date()}
          maxDate={maxDate}
          previousTitle="<"
          nextTitle=">"
          todayBackgroundColor="#ebdfd5"
          todayTextStyle={{ color: "#36494f" }}
          selectedDayColor="#dc904e"
          selectedDayTextColor="#fff"
          textStyle={{ color: "#36494f", fontWeight: "500", fontSize: 14,}}
          width={320}
          onDateChange={onDateChangeHandler}
        />
      </View>
      <Text style={styles.title}>Choose time:</Text>
      <View>
        <FlatList numColumns={4} data={time} renderItem={renderItem} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "900",
    color: "#dc904e",
    fontSize: 20,
    paddingVertical: 40,
  },
  container: {
    backgroundColor: "#fff",
    height: "100%",
    paddingHorizontal: 20
  },
  calender: {
    borderColor: "#36494f",
   borderWidth: 2,
   borderRadius: 20,
   padding: 20,
   backgroundColor: "#f4f4f4",
  },
  time: {
    backgroundColor: "#ebdfd5",
    marginTop: 6,
    padding: 10,
    borderRadius: 10,
    minWidth: "23%",
    flex: 1,
    gap: 10,
    marginHorizontal: 4,
  },
  hour: {
    textAlign: "center",
    fontWeight: "700",
    color: "#36494f",
    fontSize: "14",
  }
});
export default ReservationDate;
