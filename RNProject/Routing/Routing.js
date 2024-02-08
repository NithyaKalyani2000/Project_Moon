// AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Components/Login';
import ToDo from '../Components/ToDo';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Routing = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ToDo">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="ToDo" component={ToDo} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routing;
