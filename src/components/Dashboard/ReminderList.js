import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView,Image } from 'react-native';
import axios from 'axios';
import ReminderItem from './ReminderItem';
import {deleteReminder} from '../Hooks/usefulFunctions';

let source = axios.CancelToken.source();
class ReminderList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      reminders: null,
      swiping: false
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

  /**
   * Delete items from list & hide in database
   */
  deleteItem = (id) => {
    const reminders = this.state.reminders.filter(item => {
      return item.id !== id;
    });
    this.setState({ reminders });
    deleteReminder(`josie1`, id);
  }

  render(){
    return (
      <View style={styles.reminderList}>
        <ScrollView
          scrollEnabled={!(this.state.swiping)}
          >
          {this.state.reminders === null ? null :
            this.state.reminders.map((reminder, i)=>{
              let nextReminder = reminder.next_reminder;
              let splitReminder = nextReminder.substring(0, 10);

              return (
                <ReminderItem 
                  key={`eachReminder${i}`}
                  deleteSwipe={(e)=>{this.deleteItem(e)}}
                  reminderID={reminder.id}
                >
                  <TouchableOpacity 
                    onPress={()=>{this.props.selectedItem(reminder.id)}} 
                    style={styles.reminderItem}
                  >
                    <Image
                      source={{uri: reminder.contact_img}}
                      style={{width: 75, height:75, borderRadius: '0.45rem', marginRight: '1rem'}}
                    />
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{fontFamily:'Rubik_700Bold', fontSize: '1.3rem'}}>{reminder.title}</Text>
                      <Text style={{fontFamily:'Rubik_400Regular'}}>{reminder.contact_name}</Text>
                      <Text style={{fontFamily:'Rubik_400Regular'}}>Next Reminder: {splitReminder}</Text>
                    </View>


                  </TouchableOpacity >
                </ReminderItem>
                
              )
            })
          }
        </ScrollView>
        
      </View>
      
    );
  }
 
}

export default ReminderList;

const styles = StyleSheet.create({
  reminderList: {
    backgroundColor: '#e9e1d7',
  },
  reminderItem: {
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  reminderItemSelect:{
    border: '1px solid green'
  }
});