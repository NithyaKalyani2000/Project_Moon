import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    ToastAndroid,
} from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ToDo() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [loadtask, setloadtask] = useState([]);
    const [Userid, setUserid] = useState("");

    useEffect(() => {
        getTheUserTasks();
    }, [])

    const getTheUserTasks = async () => {
        try {
            const value = await AsyncStorage.getItem('UserName');
            axios.get("http://192.168.29.190:2000/api/TodoLogin/GetLoginDetailsByUserName?UserName=" + value)
                .then(res => {
                    setUserid(res.data[0].loginId)
                    axios.get("http://192.168.29.190:2000/api/TodoList/GetByUserId?UserId=" + res.data[0].loginId)
                        .then(res => {
                            setloadtask(res.data)
                        })
                        .catch(err => {
                            console.log(err, "err")
                        })
                })
                .catch(err => console.log(err))
        } catch (e) {
            console.log(e)
        }
    }

    const handle_Add_n_Update_Task = () => {
        if (task) {
            let addTaskList = {
                userId: Userid,
                taskName: task,
                taskStatus: "Open"
            }
            let UpdateTaskList = {
                taskId: editIndex,
                userId: Userid,
                taskName: task,
                taskStatus: "Open"
            }
            if (editIndex !== -1) {
                axios.put("http://192.168.29.190:2000/api/TodoList/UpdateByTaskID", UpdateTaskList)
                    .then(res => {
                        showToast(res.data);
                        getTheUserTasks();
                        setEditIndex(-1);
                    })
                    .catch(err => {
                        showToast("error occured")
                    })
            } else {
                axios.post("http://192.168.29.190:2000/api/TodoList", addTaskList)
                    .then(res => {
                        showToast(res.data);
                        getTheUserTasks();
                    })
                    .catch(err => {
                        showToast("error occured")
                    })
                setTasks([...tasks, task]);
            }
            setTask("");
        }
    };

    const handleEditTask = (data) => {
        setTask(data.taskName);
        setEditIndex(data.taskId);
    };

    const handleDeleteTask = (TaskID) => {
        axios.delete("http://192.168.29.190:2000/api/TodoList/DeleteByTaskID?TaskId=" + TaskID)
            .then(res => {
                showToast(res.data);
                getTheUserTasks();
            })
            .catch(err => {
                showToast("error occured")
            })
    };

    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    const UpdateTaskStatus = (taskid, taskName) => {
        let UpdateTaskStatusList = {
            taskId: taskid,
            userId: Userid,
            taskName: taskName,
            taskStatus: "Completed"
        }
        axios.put("http://192.168.29.190:2000/api/TodoList/UpdateByTaskID", UpdateTaskStatusList)
            .then(res => {
                showToast(res.data);
                getTheUserTasks();
            })
            .catch(err => {
                showToast("error occured");
            })
    }

    const renderItem = ({ item }) => (
        <View style={styles.task}>
            <TouchableOpacity style={[styles.checkbox, { borderColor: item.taskStatus === "Completed" ? "green" : "grey", textDecorationLine: item.taskStatus === "Completed" ? 'line-through' : "none" }]} disabled={item.taskStatus === "Completed"} onPress={() => UpdateTaskStatus(item.taskId, item.taskName)}>{item.taskStatus === "Completed" ? <Text style={{ fontSize: 20 }}>✔</Text> : null}</TouchableOpacity>
            <Text style={styles.itemList}>{item.taskName}</Text>
            <View
                style={styles.taskButtons}>
                <Button
                    onPress={() => handleEditTask(item)}
                    style={{ width: 20 }}
                    icon={require("../Asset/writing.png")}
                />
                <Button
                    style={{ width: 20 }}
                    onPress={() => handleDeleteTask(item.taskId)}
                    width={10}
                    icon={require("../Asset/delete.png")}
                />
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, height: 700 }}>
            <KeyboardAvoidingView style={{ flex: 1, alignItems: "center", justifyContent: "center" }} behavior='padding' >
                <View style={{ flex: 0.75, alignItems: "center", justifyContent: "center" }}>
                    <View>
                        <FlatList
                            data={loadtask}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={{ position: "sticky", bottom: 0, flexDirection: "row", width: "100%", marginTop: 30, justifyContent: "space-around" }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Write a task"
                            value={task}
                            onChangeText={(text) => setTask(text)}
                        />
                        <TouchableOpacity
                            onPress={() => handle_Add_n_Update_Task()}>
                            <View style={styles.AddButtonContainer}>
                                {editIndex !== -1
                                    ?
                                    <Text style={styles.addButtonText}><Button icon={require("../Asset/writing.png")} /></Text>
                                    :
                                    <Text style={styles.addButtonText}> + </Text>
                                }
                            </View>
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
        borderRadius: 30,
        fontSize: 18,
        width: 280,
        backgroundColor: "white"
    },
    addButtonText: {
        color: "black",
        fontSize: 25,
        textAlign: "center",
    },
    task: {
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        marginBottom: 15,
        width: "98%",
        height: "auto",
        fontSize: 16,
        borderRadius: 10
    },
    itemList: {
        fontSize: 19,
        paddingRight: 10,
        width: "40%"
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
    AddButtonContainer: {
        width: 57,
        height: 57,
        backgroundColor: "white",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#C0C0C0",
        borderWidth: 2
    },
    checkbox: {
        width: 25,
        height: 25,
        borderWidth: 2,
    }
});