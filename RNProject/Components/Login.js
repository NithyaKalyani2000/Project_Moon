import React, { useState } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const Login = ({ navigation }) => {
    const [values, setValues] = useState([]);
    const isDarkMode = useColorScheme() === 'dark';

    const handleLogin = async () => {
        await AsyncStorage.setItem('userToken', 'dummy_token');
        navigation.navigate('ToDo');
    }
    return (

        <View style={styles.container}>
            <View>
                <Text>Username</Text>
                <TextInput style={styles.input} value={values.username} onChangeText={(name) => { setValues({ ...values, username: name }) }} />
            </View>
            <View>
                <Text>Password</Text>
                <TextInput style={styles.input} value={values.password} onChangeText={(pwd) => {
                    setValues({ ...values, password: pwd })
                }} />
            </View>
            <View>
                <Button title='Login'
                    onPress={() => {
                        console.log(values, "values");
                        handleLogin()
                    }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
      },
      input: {
        height: 40,
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
      },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default Login;