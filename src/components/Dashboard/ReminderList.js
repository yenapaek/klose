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
      swiping: false,
      filteredReminders: null,
      filter: false
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

  filterList = (type) =>{
    if(type ==='today'){
      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const filteredReminders = this.state.reminders.filter(item => {
        let itemDate = item.next_reminder.substring(0, 10);
        return itemDate === date;
      });

      this.setState({filteredReminders, filter: true})
    } else {
      this.setState({filteredReminders: null, filter: false})
    }
  }

  render(){
    let mode = this.state.filter ? this.state.filteredReminders : this.state.reminders;
    return (
      <View style={styles.reminderList}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: '1rem'}}>
          <TouchableOpacity 
            onPress={()=>{this.filterList('all')}} 
            style={this.state.filter ? { opacity: '0.5'} : null}
          >
            <Text style={{fontFamily:'Rubik_700Bold', fontSize: '1.3rem', color: '#db644e'}}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={()=>{this.filterList('today')}} 
            style={!this.state.filter ? { opacity: '0.5'} : null}
          >
            <Text style={{fontFamily:'Rubik_700Bold', fontSize: '1.3rem', color: '#78b49b'}}>Today</Text>
          </TouchableOpacity>
         
        </View>
       
        <ScrollView
          scrollEnabled={!(this.state.swiping)}
          >
          {this.state.reminders === null ? null :
            mode.map((reminder, i)=>{
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
    minHeight: '50vh'
  },
  reminderItem: {
    backgroundColor: 'transparent',
    flexDirection: 'row'
  }
});