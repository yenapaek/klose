import React from 'react';
import {View, Text, TextInput, TouchableOpacity,StyleSheet } from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import { Entypo } from '@expo/vector-icons';
import { AntDesign  } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

let source = axios.CancelToken.source();
export default class AddReminder extends React.Component{
  constructor(props){
    super(props);
    this.state={
      contacts: null,
      frequency: 'Weekly',
      frequencyOpts: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
      moreInfo: '',
      reminderTime: '09:00',
      selectedContact: '',
      submitted: null,
      timeOpts: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
      title: '',
    }
    source = axios.CancelToken.source();
  }

  componentDidMount(){
    this.fetchContacts();
    if(this.props.type === 'edit'){
      this.setState({
        frequency: this.props.existingText.frequency || 'Weekly',
        moreInfo: this.props.existingText.more_info || '',
        reminderTime:  this.props.existingText.reminder_time || '09:00',
        selectedContact: this.props.existingText.id,
        title: this.props.existingText.title,
      })
    }
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
      let selectedContact = this.props.type === 'new' ? res.data[0].id : this.props.existingText.id;
      this.setState({contacts: res.data, selectedContact});
    }).catch(err =>{
      console.log('Error!',err);
    })
  }
  
  /**
   * Insert text based on target name
   * @param {*} input 
   * @param {*} name 
   */
  handleTextInput = (input, name)=>{
    this.setState({[name]: input});
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
    formData.append('type', this.props.type);
    formData.append('reminderID', this.props.reminderID);

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
        <View style={styles.reminderItem}>
            <View style={{flexDirection: 'column'}}>
              <View style={styles.eachLabel}>
                <Text style={{fontFamily:'Rubik_700Bold', fontSize: '1.3rem'}}>Title</Text>
                <TextInput
                  onChangeText={(value)=>{this.handleTextInput(value, 'title')}}
                  defaultValue={this.state.title}
                  placeholder='Reminder title'
                  style={[styles.textStyle, styles.inputStyle]}
                />
              </View>

              <View style={styles.eachLabel}>
                <Text style={{fontFamily:'Rubik_700Bold', fontSize: '1.3rem'}}>Who</Text>
                <Picker
                  selectedValue={this.state.selectedContact}
                  style={styles.picker}
                  onValueChange={(value)=>{this.handleTextInput(value, 'selectedContact')}}
                  itemStyle={{fontFamily:'Rubik_400Regular', fontSize: '18px'}}
                >
                  {this.state.contacts !== null ?
                    this.state.contacts.map((contact, i)=>{
                      return (
                        <Picker.Item 
                          label={contact.contact_name} 
                          value={contact.id} 
                          key={`indivContact${i}`}
                          
                        />
                      )
                    }) : null
                  }
                </Picker>
              </View>

              <View style={styles.eachLabel}>
                <Text style={{fontFamily:'Rubik_700Bold', fontSize: '1.3rem'}}>How Often</Text>
                <Picker
                  selectedValue={this.state.frequency}
                  style={styles.picker}
                  onValueChange={(value)=>{this.handleTextInput(value, 'frequency')}}
                  itemStyle={{fontFamily:'Rubik_400Regular', fontSize: '18px'}}
                >
                  {this.state.frequencyOpts.map((option, i)=>{
                      return (
                        <Picker.Item 
                          label={option} 
                          value={option} 
                          key={`indivFreq${i}`}
                          style={{fontFamily:'Rubik_400Regular', fontSize: '18px'}}
                        />
                      )
                    })
                  }
                </Picker>
              </View>

              <View style={styles.eachLabel}>
                <Text style={{fontFamily:'Rubik_700Bold', fontSize: '1.3rem'}}>When</Text>
                <Picker
                  selectedValue={this.state.reminderTime}
                  style={styles.picker}
                  onValueChange={(value)=>{this.handleTextInput(value, 'reminderTime')}}
                  itemStyle={{fontFamily:'Rubik_400Regular', fontSize: '18px'}}
                >
                  {this.state.timeOpts.map((option, i)=>{
                      return (
                        <Picker.Item 
                          label={option} 
                          value={option} 
                          key={`indivTime${i}`}
                          style={{fontFamily:'Rubik_400Regular', fontSize: '18px'}}
                        />
                      )
                    })
                  }
                </Picker>
              </View>

              <View style={styles.eachLabel}>
                <Text style={{fontFamily:'Rubik_700Bold', fontSize: '1.3rem'}}>Note</Text>
                <TextInput
                  onChangeText={(value)=>{this.handleTextInput(value, 'moreInfo')}}
                  defaultValue={this.state.moreInfo}
                  placeholder='Add a note'
                  style={[styles.textStyle, styles.inputStyle]}
                  multiline
                  numberOfLines={3}
                />
              </View>

            </View>
        </View>

        <View style={styles.buttonRow}>
         
            <TouchableOpacity 
              onPress={this.addNewReminder} 
              style={[styles.customButton, {backgroundColor: '#e4bb79'}]}
            >
              
              {this.props.type === 'new' ? 
              <>
                <Entypo name="plus" size={24} color="#000" />
                <Text style={[styles.buttonText, {color: '#000'}]}>Add Reminder</Text>
              </> 
              :
              <>
                <Entypo name="save" size={24} color="#000" />
                <Text style={[styles.buttonText, {color: '#000'}]}>Save Changes</Text>
              </>}
            </TouchableOpacity>
           
          
        </View>

        <View style={styles.rightSideRow}>
          <TouchableOpacity 
            onPress={this.props.returnDash} 
            style={[styles.customButton, {backgroundColor: '#db644e'}]}
          >
            <FontAwesome name="times" size={24} color="#fff" />
            <Text style={[styles.buttonText, {color: '#fff'}]}>Cancel</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
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
  eachLabel: {
    width: '100%',
    textAlign: 'left',
    marginVertical: '0.5rem'
  },
  picker: {
    marginTop: 10,
    width: 300,
    padding: 10,
    backgroundColor: '#78b49b',
    color: '#fff',
    borderRadius: '0.25rem',
    borderWidth: 0,
    fontFamily:'Rubik_400Regular',
    fontSize: '18px'
  },
  rightSideRow:{
    padding: '1rem',
    flex: 1,
    alignItems: 'flex-end',
  },
  inputStyle: {
    border: '1px solid #b3cbcb',
    borderRadius: '0.25rem',
    paddingHorizontal: '0.3rem',
    paddingVertical: '0.2rem',
  }
});