import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function ToDo() {
    const [data,setdata] = useState([])
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <View>
            <View>
                <Text>hello</Text>
                </View>
        </View>
    )
}