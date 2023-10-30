import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
 return (
   <NavigationContainer>
     <Tab.Navigator>
       <Tab.Screen
         name="Home"
         component={Home}
         options={{
           tabBarLabel: 'Home',
           tabBarIcon: ({ color, size }) => (
             <Icon name="home" color={color} size={size} />
           ),
         }}
       />
       <Tab.Screen
         name="Search"
         component={Search}
         options={{
           tabBarLabel: 'Search',
           tabBarIcon: ({ color, size }) => (
             <Icon name="search" color={color} size={size} />
           ),
         }}
       />
       <Tab.Screen
         name="Profile"
         component={Profile}
         options={{
           tabBarLabel: 'Profile',
           tabBarIcon: ({ color, size }) => (
             <Icon name="user" color={color} size={size} />
           ),
         }}
       />
     </Tab.Navigator>
   </NavigationContainer>
 );
}

export default BottomNavigator;