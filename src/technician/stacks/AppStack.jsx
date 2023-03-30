// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Account } from '../screens/Account';
import { Activities } from '../screens/Activities';
import { Chat } from '../screens/Chat';
import { JobPosts } from '../screens/JobPosts';
import { MyJob } from '../screens/MyJobs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// import Icon from 'react-native-ionicons';
import SearchInput from '../../../components/SearchInput';
import JobContainer from '../container/JobContainer';
import ViewOffer from '../ViewOffer';
import SendOfferButton from '../SendOfferButton';
import { Profile } from '../screens/Profile';
import JobFull from '../screens/JobFull';
import { Login } from '../../login/Login'
import NotificationPage from '../../reusable screens/NotificationPage';
import NotificationBell from '../../reusable screens/NotificationBell';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
// import ImagePickerExample from '../screens/imageupload';
// import { CommonActions } from '@react-navigation/native';
import { SubChat } from '../screens/SubChat'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export const AppStack = () => {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="Tekk"
       
        component={TabStack}
        options={{ headerShown: false }}
       
      />
     <Stack.Screen name='Search' component={SearchInput}></Stack.Screen>
     <Stack.Screen name='JobContainer' component={JobContainer}></Stack.Screen>
     <Stack.Screen name='SendOffer' component={SendOfferButton}></Stack.Screen>
     <Stack.Screen name='ViewOffer' component={ViewOffer}></Stack.Screen>
     <Stack.Screen name='Profile' component={Profile}></Stack.Screen>
     <Stack.Screen name='JobFull' component={JobFull}></Stack.Screen>
     <Stack.Screen name='Notifications' component={NotificationPage}></Stack.Screen>
     {/* <Stack.Screen name='imageUpload' component={ImagePickerExample}></Stack.Screen> */}
     <Stack.Screen name='SubChat' component={SubChat}  ></Stack.Screen>

     {/* <Stack.Screen name='imageUpload' component={ImagePickerExample}></Stack.Screen> */}
     
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
        } else if (route.name === 'Activities') {
          return (
            <Feather name="activity"
              size={size}
              color={color}
            />
          );
        }
        else if (route.name === 'My Jobs') {
          return (
            <FontAwesome
              name={'wrench'}
              size={size}
              color={color}
            />
          );
        }
        else if (route.name === 'Chat') {
          return (
            <Ionicons
              name={'chatbox'}
              size={size}
              color={color}
            />
          );
        }
        else if (route.name === 'Account') {
          return (
            <Ionicons
              name={'person'}
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
      
      <Tab.Screen name="Job Posts" component={JobPosts}  options={{
          headerRight: () => <NotificationBell />, 
        }} />
      
      <Tab.Screen name="Activities" component={Activities} options={{
          headerRight: () => <NotificationBell />, 
        }} />
      
      <Tab.Screen name="My Jobs" component={MyJob} options={{
          headerRight: () => <NotificationBell />, 
        }} />

      <Tab.Screen name="Chat" component={Chat} options={{
          headerRight: () => <NotificationBell />, 
        }} />
      
      <Tab.Screen name="Account" component={Account} />

      
      {/* <Tab.Screen name="subs" component={SubChat} /> */}

      
    
    </Tab.Navigator>
  );
};
