// AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import ToDo from '../Screens/ToDo';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Routing = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="ToDo" component={ToDo} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routing;
