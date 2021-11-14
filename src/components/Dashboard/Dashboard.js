import React from 'react';
import {View, Button, TouchableOpacity, Text, StyleSheet} from 'react-native';
import ReminderDetail from '../Reminder/ReminderDetail';
import AddReminder from './AddReminder';
import LandingView from './LandingView';
import ReminderList from './ReminderList';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      display: false,
      selectedItemID: null,
    }
  }

  selectedItem = (id)=>{
    this.setState({display: 'detailView', selectedItemID: id})
  }

  render(){
     if(this.state.display === 'addView'){
      return (
        <View>
          <TouchableOpacity
            onPress={()=>{this.setState({display: false})}}
            style={styles.topNav}
          >
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <AntDesign name="arrowleft" size={24} color="#fff" />
              <Text style={{color: '#fff', fontSize: 24, paddingLeft: 10}}>Dashboard</Text>
            </View>
            <Text style={styles.logoText}>Klose</Text>
          </TouchableOpacity>
          <AddReminder 
            returnDash={()=>{this.setState({display: false})}}
            type="new"
          />
      </View>
      )
    } else if(this.state.display === 'detailView'){
      return (
        <View style={{backgroundColor: '#e9e1d7'}}>
          <TouchableOpacity
            onPress={()=>{this.setState({display: false})}}
            style={styles.topNav}
          >
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <AntDesign name="arrowleft" size={24} color="#fff" />
              <Text style={{color: '#fff', fontSize: 24, paddingLeft: 10}}>Dashboard</Text>
            </View>
            <Text style={styles.logoText}>Klose</Text>
          </TouchableOpacity>
          <ReminderDetail 
            selectedItemID={this.state.selectedItemID} 
            returnDash={()=>{this.setState({display: false})}}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.dash}>
          {/* <LandingView /> */}
          <TouchableOpacity
            onPress={()=>{this.setState({display: 'addView'})}} 
            style={styles.topNav}
          >
            <Text style={styles.logoText}>Klose</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#fff', fontSize: 24, paddingRight: 10}}>Add</Text>
              <AntDesign name="arrowright" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
          <ReminderList selectedItem={(e)=>{this.selectedItem(e)}}/>
        </View>
      )
    } 
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  topNav: {
    backgroundColor: '#78b49b',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
  },
  logoText: {
    fontFamily: 'FredokaOne_400Regular', 
    color: '#fff', 
    fontSize: 30
  }
})
