import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AspectRatio,Box,Button,HStack,Image,Text,VStack} from 'native-base';
// import SearchFilter from '../../../components/SearchFilter';
import SearchInput from '../../../components/SearchInput';
import JobContainer from '../../technician/container/JobContainer';
import MyPosts from '../myPosts';
import Offers from '../Offers';

import {AllChats} from '../allChats';
//client account actually (pass a prop) (reusing technician screen)
import { Account } from '../../technician/screens/Account'
import AllOffers from '../AllOffers';
import CreatePost from '../CreatePost';
import PostDetails from '../PostDetails';
import TechnicianProfile  from '../TechnicianProfile';
import { Login } from '../../login/Login'
import NotificationPage from '../../reusable screens/NotificationPage';
import NotificationBell from '../../reusable screens/NotificationBell';

import  { SubChatClient } from '../SubChatClient'
// import NotificationBell from '../../reusable screens/NotificationBell';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export const AppStackClient = ({navigation}) => {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="Tekk"
       
        component={TabStack}
       
        options={{ headerShown: false }}
      />
     <Stack.Screen name='Search' component={SearchInput}></Stack.Screen>
     <Stack.Screen name='JobContainer' component={JobContainer}></Stack.Screen>
     <Stack.Screen name='AllOffers' component={AllOffers}></Stack.Screen>
     <Stack.Screen name='Create Post' component={CreatePost}></Stack.Screen>
     <Stack.Screen name='MyPosts' component={MyPosts}></Stack.Screen>
     <Stack.Screen name='PostDetails' component={PostDetails}></Stack.Screen>
     <Stack.Screen name='Profile' component={TechnicianProfile}></Stack.Screen>
     <Stack.Screen name='Notifications' component={NotificationPage}></Stack.Screen>
     <Stack.Screen name='SubChatClient' component={SubChatClient}  ></Stack.Screen>


     {/* <Stack.Screen name='Logout' component={Login}></Stack.Screen> */}

    </Stack.Navigator>
  );
};

export const TabStack = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Job Posts') {
          return (
            <Ionicons
              name={
                 'ios-home'
              }
              size={size}
              color={color}
            />
          );
        }
        else if (route.name === 'Chats') {
          return (
         
            <Ionicons
              name={'chatbox'}
              size={size}
              color={color}
              />
          )
        }
        else if (route.name === 'Account') {
          return (
            <Ionicons
              name={'person'}
              size={size}
              color={color}
            />
          );
        }else if (route.name === 'Offers') {
            return (
              <Ionicons
                name={'briefcase'}
                size={size}
                color={color}
              />
            );
          }
      },
      tabBarInactiveTintColor: 'gray',
      tabBarActiveTintColor: '#0D937D',
      
    })}
  >
      
      <Tab.Screen name="Job Posts" component={MyPosts} options={{
          headerRight: () => <NotificationBell />, 
        }} />
      
      <Tab.Screen name="Offers" component={Offers} options={{
          headerRight: () => <NotificationBell />, 
        }} />
      
      <Tab.Screen name="Chats" component={AllChats} options={{
          headerRight: () => <NotificationBell />, 
        }} />
      
      <Tab.Screen name="Account" component={Account} />
    
    </Tab.Navigator>
  );
};
