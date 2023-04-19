import React, { useEffect, useState } from 'react'
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View } from "native-base";
import Moment from 'moment';
import { StyleSheet, TouchableOpacity,TextInput,Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { clockIn, clockOut } from '../../../services/api';
import Toast from 'react-native-toast-message';

const ClockInOut = (props) => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const[clockStatus,setClockStatus] = useState('start')
  const [searchTerm, setSearchTerm] = useState('');
  const [postStatus, setPostStatus] = useState('')
  
 
  let filteredData = []
 


const handleClick = async () =>{
   
        const offer = {
          id:props.emp_id ,
          job_id: props.job_id,
          offer_id: props.offer_id 

        };
        
       
        const json = await clockIn(props.emp_id, offer)
        setClockStatus('Clocked in')
        Toast.show({
          type: 'success',
          text1: 'Clock in successfully!',
          visibilityTime: 1000,
          position:'bottom',
          autoHide: true,
        });
}

const handleClick2 = async () =>{
   
    const offer = {
      id:props.emp_id      
    };

    const json = await clockOut(props.emp_id, offer)
    setClockStatus('Clocked out')
    Toast.show({
      type: 'success',
      text1: 'Clock out successfully!',
      visibilityTime: 1000,
      position:'bottom',
      autoHide: true,
    });
   
}

  return (

    <Box  >


      {clockStatus == 'start' || clockStatus == 'Clocked out'? 
      <Button mb={'5'} bgColor={'#0D937D'} width='300'
  onPress={() => {handleClick()}}
  >Clock in</Button> :<></>
      }

      {clockStatus == 'Clocked in' ? 
  <Button mb={'5'} bgColor={'#0D937D'} width='300'
  onPress={() => {handleClick2()}}>Clock out</Button>: <></> }


  

  {/* <Text>{clockStatus}</Text> */}
   <Toast ref={(ref) => Toast.setRef(ref)} /> 
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  filterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display:'flex',
    flexDirection:'row',
    gap:20,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 30, // Change the value to move the button further to the right
  },
});

export default ClockInOut;
