import React from 'react';
import {View, Text, Image} from 'react-native';
import axios from 'axios';


let source = axios.CancelToken.source();
export default class ReminderDetail extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      reminder: {
        title: '',
        contact_name: '',
        contact_img: '',
        more_info: '',
        frequency: '',
        reminder_time: '',
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
 * Fetch Reminder Item
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

  render(){
    return(
      <View>
        <Text>Title: {this.state.reminder.title}</Text>
        <Text>Contact: {this.state.reminder.contact_name}</Text>
        <Text>Reminder Frequency: {this.state.reminder.frequency}</Text>
        <Text>Reminder Time: {this.state.reminder.reminder_time}</Text>
        <Image
          source={{uri: this.state.reminder.contact_img}}
          style={{width: 130, height:110}}
        />
        <Text>More Info: {this.state.reminder.more_info}</Text>
      </View>
    )
  }
}