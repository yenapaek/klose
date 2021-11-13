import React from 'react';
import {View, Text, TextInput, Picker, Button, } from 'react-native';
import axios from 'axios';

let source = axios.CancelToken.source();
export default class AddReminder extends React.Component{
  constructor(props){
    super(props);
    this.state={
      contacts: null,
      frequency: '',
      frequencyOpts: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
      moreInfo: '',
      reminderTime: '',
      selectedContact: '',
      submitted: null,
      timeOpts: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
      title: '',
    }
    source = axios.CancelToken.source();
  }

  componentDidMount(){
    this.fetchContacts();
  }

  componentWillUnmount(){
    /**
     * Cancel any requests if the component is unmounted
     */
    if(source){
      source.cancel("AddReminder request was cancelled.");
    }
  }

  /**
   * Fetch all the contacts for this user
   */
  fetchContacts = ()=>{ 
    const formData = new FormData();
    formData.append('userID', `josie1`); 
    axios.post('https://kiipgrammar.com/klose/Dashboard/fetchContacts.php', formData, {cancelToken: source.token})
    .then(res=>{
        this.setState({contacts: res.data});
    }).catch(err =>{
      console.log('Error!',err);
    })
  }
  
  handleTextInput = (input, name)=>{
    this.setState({[name]: input})
  }

  /**
   * Insert a new reminder into the database
   */
  addNewReminder = () =>{ 
    this.setState({submitted: false});

    const formData = new FormData();
    formData.append('userID', `josie1`);
    formData.append('title', this.state.title);
    formData.append('contactID', this.state.selectedContact);
    formData.append('moreInfo', this.state.moreInfo);
    formData.append('frequency', this.state.frequency);
    formData.append('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    formData.append('reminderTime', this.state.reminderTime);


    axios.post('https://kiipgrammar.com/klose/Dashboard/addReminder.php', formData, {cancelToken: source.token})
    .then(res=>{
        this.setState({submitted: true});
    }).catch(err =>{
      console.log('Error!',err);
    })
  }

  render(){
    return(
      <View>
        
        <Text>New Reminder!</Text>

        <TextInput
          onChangeText={(value)=>{this.handleTextInput(value, 'title')}}
          defaultValue={this.state.title}
          placeholder='Reminder Title'
        />
        <Picker
          selectedValue={this.state.selectedContact}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => this.setState({selectedContact: itemValue})}
        >
          {this.state.contacts !== null ?
            this.state.contacts.map((contact, i)=>{
              return (
                <Picker.Item label={contact.contact_name} value={contact.id} key={`indivContact${i}`}/>
              )
            }) : null
          }
          
        </Picker>

        <Picker
          selectedValue={this.state.frequency}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => this.setState({frequency: itemValue})}
        >
          {this.state.frequencyOpts.map((option, i)=>{
              return (
                <Picker.Item label={option} value={option} key={`indivFreq${i}`}/>
              )
            })
          }
        </Picker>

        <Picker
          selectedValue={this.state.reminderTime}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => this.setState({reminderTime: itemValue})}
        >
          {this.state.timeOpts.map((option, i)=>{
              return (
                <Picker.Item label={option} value={option} key={`indivTime${i}`}/>
              )
            })
          }
        </Picker>

        <TextInput
          onChangeText={(value)=>{this.handleTextInput(value, 'moreInfo')}}
          defaultValue={this.state.moreInfo}
          placeholder='Add a note'
        />

        <Button 
          onPress={this.addNewReminder}
          title='Add Reminder'
        />

        {this.state.submitted ? <Text>Reminder added!!</Text> : null}

      </View>
    )
  }
}