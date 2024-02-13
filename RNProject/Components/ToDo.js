import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';

export default function ToDo() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    // const [loadtask, setloadtask] = useState([])

    // useEffect(() => {
    //     axios.get("http://192.168.29.249:2000/api/TodoList")
    //         .then(res => {
    //             console.log(res, "res")
    //             setloadtask(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err, "err")
    //         })
    // }, [])

    const handleAddTask = () => {

        if (task) {
            if (editIndex !== -1) {
                const updatedTasks = [...tasks];
                updatedTasks[editIndex] = task;
                setTasks(updatedTasks);
                setEditIndex(-1);
            } else {
                setTasks([...tasks, task]);
            }
            setTask("");
        }
    };

    const handleEditTask = (index) => {
        const taskToEdit = tasks[index];
        setTask(taskToEdit);
        setEditIndex(index);
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.task}>
            <Text
                style={styles.itemList}>{item}</Text>
            <View
                style={styles.taskButtons}>
                <Button
                    onPress={() => handleEditTask(index)}
                    mode="contained"
                    icon={require("../Asset/writing.png")}
                />
                <Button
                style={{marginLeft:5}}
                    onPress={() => handleDeleteTask(index)}
                    mode="outlined"
                    width={10}
                    icon={require("../Asset/delete.png")}
                />
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: "white", height: 700 }}>
            <KeyboardAvoidingView style={{ flex: 1, alignItems: "center", justifyContent: "center" }} behavior='padding' >
                {/* <Text>Example of Summary</Text> */}

                {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <FlatList data={loadtask}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <Text>{item.summary}</Text>
                                </View>
                            )
                        }}
                    />
                </View> */}
                <View style={{ flex: 0.75, alignItems: "center", justifyContent: "center" }}>
                    <View>
                        <FlatList
                            data={tasks}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={{ position: "sticky", bottom: 0, flexDirection: "row", width: "100%", marginTop: 30, justifyContent: "space-around" }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter task"
                            value={task}
                            onChangeText={(text) => setTask(text)}
                        />
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={handleAddTask}>
                            <Text
                                style={styles.addButtonText}
                            >
                                {editIndex !== -1 ? <Button buttonColor='black' mode='contained' icon={require("../Asset/writing.png")} /> : <Button buttonColor='black' mode='contained' icon={require("../Asset/add.png")} />}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 7,
        color: "green",
    },
    input: {
        borderWidth: 3,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 18,
        width: "80%"
    },
    addButton: {
        borderRadius: 50,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    task: {
        backgroundColor:"#F0F0F0",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent:"center",
        marginBottom: 15,
        width: "97%",
        height:"auto",
        fontSize: 16,
        borderRadius:10
    },
    itemList: {
        fontSize: 19,
        paddingRight: 10,
        width:"40%"
    },
    taskButtons: {
        flexDirection: "row"
    },
    editButton: {
        marginRight: 10,
        color: "green",
        fontWeight: "bold",
        fontSize: 18,
    },
    deleteButton: {
        color: "red",
        fontWeight: "bold",
        fontSize: 18,
    },
});