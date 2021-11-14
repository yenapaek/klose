import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';
import { AntDesign  } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {deleteReminder} from '../Hooks/usefulFunctions';
import AddReminder from '../Dashboard/AddReminder';

let source = axios.CancelToken.source();
export default class ReminderDetail extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      editing: false,
      reminder: {
        title: '',
        contact_name: '',
        contact_img: '',
        more_info: '',
        frequency: '',
        reminder_time: '',
        next_reminder: ''
      },
    }
    source = axios.CancelToken.source();
  }

  componentDidMount(){
    this.fetchReminder(this.props.selectedItemID);
  }

  componentWillUnmount(){
    /**
     * Cancel fetchReminder request if the component is unmounted
     */
    if(source){
      source.cancel("Reminder Item request was cancelled.");
    }
  }

  /**
 * Fetch this Reminder Item
 */
  fetchReminder = (id) => {
    const formData = new FormData();
    formData.append('userID', `josie1`); 
    formData.append('id', id);
    axios.post('https://kiipgrammar.com/klose/Reminder/fetchIndivReminder.php', formData, {cancelToken: source.token})
    .then(res=>{
        this.setState({reminder: res.data});
    }).catch(err =>{
      console.log('Error!',err);
    })
  }

  /**
   * Delete from database and return to Dashboard
   */
  deleteReminder = ()=>{
    deleteReminder(`josie1`, this.props.selectedItemID);
    this.props.returnDash();
  }

  render(){
    if(this.state.editing){
      return (
        <View>
          <AddReminder 
            returnDash={this.props.returnDash}
            type="edit"
            existingText={this.state.reminder}
            reminderID={this.props.selectedItemID}
          />
        </View>
      )
    } else {
      return(
        <View>
          <View style={styles.reminderItem}>
            <Image
              source={{uri: this.state.reminder.contact_img}}
              style={{width: 100, height:100, borderRadius: '0.45rem', marginRight: '1rem'}}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontFamily:'Rubik_700Bold', fontSize: '1.3rem'}}>{this.state.reminder.title}</Text>
              <Text style={styles.textStyle}>Who: {this.state.reminder.contact_name}</Text>
              <Text style={styles.textStyle}>When: {this.state.reminder.next_reminder.substring(0, 10)}</Text>
              <Text style={styles.textStyle}>How Often: {this.state.reminder.frequency}</Text>
            </View>
          </View>
          
          <View style={styles.reminderItem}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontFamily:'Rubik_700Bold', fontSize: '1.3rem'}}>Notes</Text>
              <Text style={styles.textStyle}>{this.state.reminder.more_info}</Text>
            </View>
          </View>
          
  
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              onPress={()=>{this.setState({editing: true})}} 
              style={[styles.customButton, {backgroundColor: '#e4bb79'}]}
            >
              <Entypo name="edit" size={24} color="#000" />
              <Text style={[styles.buttonText, {color: '#000'}]}>Edit</Text>
            </TouchableOpacity>
  
            <TouchableOpacity 
              onPress={this.deleteReminder} 
              style={[styles.customButton, {backgroundColor: '#db644e'}]}
            >
              <AntDesign name="delete" size={24} color="#fff" />
              <Text style={[styles.buttonText, {color: '#fff'}]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    
  }
}

const styles = StyleSheet.create({
  reminderItem: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: '1rem'
  },
  textStyle:{
    fontFamily:'Rubik_400Regular',
    marginTop: '0.4rem',
    fontSize: '18px'
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0.45rem',
    paddingHorizontal: '0.8rem',
  },
  buttonText: {
    fontFamily:'Rubik_500Medium',
    fontSize: '20px',
    padding: '0.3rem'
  },

});