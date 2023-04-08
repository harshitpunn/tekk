import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SubChat } from './SubChat';
import { useNavigation } from '@react-navigation/native';
import { getRooms } from '../../../services/api';
import AppContext from '../../../AppContext';
import { Box, Center, NativeBaseProvider } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { UserAuth } from "../../context/AuthContext";

// const connection_api = 'http://192.168.5.131:3000/connection';
// const message_api = 'http://192.168.5.131:3000/message';

export const Chat = ({navigation}) => {
  const { user } = UserAuth();


  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getJobs = async()=>{
      // await fetch("http://localhost:5001/api/v1/jobs")
      // await fetch("http://localhost:5001/api/v1/rooms")
      //    .then((resp) => resp.json())
      //    .then((json) => {
      //     console.log(json);
      //     setData1(json)
      //   })
      //    .catch((error) => console.error(error));

      const json = await getRooms()
      console.log("DATA NEEDED");
      console.log(json);
      console.log(user._id);
      const filteredArray = json.filter((item) => item.technician_id._id === user._id).sort((a, b) => new Date(b.room_created) - new Date(a.room_created));

      setData1(filteredArray)

       }
       getJobs()
  }, []);

  const navigateToNotification = (kindof_prop1, p2, roomid, job_id) => {
    console.log(kindof_prop1);
    navigation.navigate('SubChat', { propValue: kindof_prop1, p2, roomid, job_id });
  };

  const filteredData = data.filter((item) => {
    return (
      item.employer_id.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.job_id.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Box bg="white" height="100%">
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={24} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Chat"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.head}>Select Employer To Chat</Text>
        {/* AI button */}
        {/* <TouchableOpacity style={styles.postContainer}>
          <Image
            source={{ uri: 'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY' }}
            style={styles.image}
          />
          <Text style={styles.postDescription}>Ask AI</Text>
        </TouchableOpacity> */}
        <FlatList
          style={styles.list}
          data={filteredData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.postContainer}
              onPress={() => navigateToNotification(item._id, item.employer_id._id, item._id, item.job_id._id)}>
              <Image source={{ uri: item.job_id.images[0] }} style={styles.image} />
              <View>
                <Text style={styles.postDescription}>{item.job_id.title}</Text>
                <Text style={styles.employerName}>Employer: {item.employer_id.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Box>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin:10,
    borderWidth:0.5,
    borderColor:'#074A3F'
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  head: {
    fontSize: 30,
    marginVertical: 10,
  },
  list: {
    flex: 1,
  },
  postContainer: {
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  postDescription: {
    fontSize: 18,
  },
  employerName: {
    fontSize: 14,
    marginTop: 5,
  },
});

