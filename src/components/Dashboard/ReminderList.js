import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

let source = axios.CancelToken.source();
class ReminderList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      reminders: null
    }
    source = axios.CancelToken.source();
  }
  

  componentDidMount(){
    this.fetchReminders();
  }

  componentWillUnmount(){
    /**
     * Cancel fetchReminders request if the component is unmounted
     */
    if(source){
      source.cancel("Reminder List request was cancelled.");
    }
  }

  /**
   * Fetch Reminder Items
   * TO DO:
   * Add page limit, limit to 10 loading per time, 
   * Add fetch more on scroll
   */
   fetchReminders = () => {
    const formData = new FormData();
    formData.append('userID', `josie1`); //This would be the userID 
    axios.post('https://kiipgrammar.com/klose/Dashboard/fetchReminders.php', formData, {cancelToken: source.token})
    .then(res=>{
        this.setState({reminders: res.data});
    }).catch(err =>{
      console.log('Error!',err);
    })
  }
  
  render(){
    return (
      <View style={styles.reminderList}>
        <Text>Reminder List!</Text>

        {this.state.reminders === null ? null :
         this.state.reminders.map((reminder, i)=>{
          return (
            <View key={`eachReminder${i}`} style={styles.reminderItem}>
              <TouchableOpacity  onPress={()=>{this.props.selectedItem(reminder.id)}} style={styles.reminderItemSelect}>
                <Text>[{reminder.contact_name}] {reminder.title}</Text>
              </TouchableOpacity >
            </View>
          )
        })}
        
      </View>
      
    );
  }
 
}

export default ReminderList;

const styles = StyleSheet.create({
  reminderList: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid blue;'
  },
  reminderItem: {
    flex: 1,
    backgroundColor: '#fff',
    border: '1px solid red',
    width: '100%',
    padding: '1rem',
    margin: '1rem'
  },
  reminderItemSelect:{
    border: '1px solid green'
  }
});