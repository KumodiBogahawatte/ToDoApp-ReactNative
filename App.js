import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import Task from './components/task'
import { useState } from 'react';

export default function App() {

  const [task,setTask] = useState();
  const [taskItems,setTaskItems] = useState([]);

  const handleAddTask = ()=> {
    Keyboard.dismiss();
    setTaskItems([...taskItems,task]);
    setTask(null);
  }

  const completeTask = (index) =>{
    let itemCopy = [...taskItems];
    itemCopy.splice(index, 1);
    setTaskItems(itemCopy);
  }

  return (
    <View style={styles.container}>
      {/* today's tasks */}
      <View style={styles.taskWrapper}>
        <Text style={styles.taskTitle}>Today's Tasks</Text>

        <View style={styles.items}>
          {/* This is where the tasks go */}
          {
            taskItems.map((item,index) => {
              return(
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item}></Task>
              </TouchableOpacity>
              ) 
            })
          }
        </View>
      </View>
      
      {/* Write a task */}
      <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : 'height'} style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text =>setTask(text)}></TextInput>

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED'
  },
  taskWrapper:{
    paddingTop:80,
    paddingHorizontal:20,
  },
  taskTitle:{
    fontSize:24,
    fontWeight:'bold'
  },
  items:{
    marginTop:30
  },
  writeTaskWrapper:{
    position:'absolute',
    bottom:60,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  input:{
    paddingVertical:15,
    width:250,
    paddingHorizontal:15,
    borderColor:'#C0C0C0',
    borderRadius:60,
    borderWidth:1,
    backgroundColor:'#fff'
  },
  addWrapper:{
    width:60,
    height:60,
    borderRadius:60,
    borderColor:'#C0C0C0',
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    
  },
  addText:{

  },
});
