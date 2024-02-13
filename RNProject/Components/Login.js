import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-paper';

const Login = ({ navigation }) => {
    const [values, setValues] = useState([]);

    const handleLogin = async () => {
        // await AsyncStorage.setItem('username', values.username);
        // await AsyncStorage.setItem('password', values.password);
        navigation.navigate('ToDo');
    }

    return (
        <SafeAreaView style={{backgroundColor:"#121212",height:700}}>
            <ScrollView>
                <View style={styles.loginimageContainer}>
                    <Image style={styles.loginImage} resizeMode='center' source={require("../Asset/TodoLogin_Image.png")} />
                </View>
                <View style={styles.container}>
                    <View>
                        <View style={styles.inputView}>
                            <TextInput style={styles.input} value={values.username} placeholder='Enter the Username'
                                onChangeText={(name) => { setValues({ ...values, username: name }) }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.inputView}>
                            <TextInput secureTextEntry={true} style={styles.input} value={values.password} placeholder='Enter the password'
                                onChangeText={(pwd) => {
                                    setValues({ ...values, password: pwd })
                                }} />
                        </View>
                    </View>
                    <View style={styles.button}>
                        <Button
                            mode="contained"
                            onPress={() => {
                                handleLogin()
                            }}
                            rippleColor='grey'
                            buttonColor='grey'
                        >
                            Login
                        </Button>
                    </View>
                    <View style={styles.forgotpassword}>
                        <Text style={{ color: "white", textDecorationLine: "underline" }}>Forgot Password</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loginimageContainer: {
        alignItems: 'center'
    },
    container: {
        padding: 30,
        alignItems: 'stretch',
    },
    input: {
        height: 40,
        padding: 10,
        color: "black",
        fontSize: 15,
    },
    inputView: {
        backgroundColor: "#D8D8D8",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    text: {
        color: "black",
        paddingLeft: "1%",
        fontSize: 14
    },
    button: {
        marginLeft: 50,
        width: '70%'
    },
    forgotpassword: {
        marginLeft: 100,
        marginTop: 20,
        width:130,
        height:30,
        alignItems:"center",
        justifyContent:"center"
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
    loginImage: {
        width: 400,
        height: 300,
    }
});

export default Login;