import React from 'react';
import {View, Button, Pressable, StyleSheet} from 'react-native';
import ReminderDetail from '../Reminder/ReminderDetail';
import AddReminder from './AddReminder';
import LandingView from './LandingView';
import ReminderList from './ReminderList';

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
        <Button
          title="< New Reminder"
          onPress={()=>{this.setState({display: false})}}
          accessibilityLabel="Return to Dashboard"
        />
        <AddReminder 
          returnDash={()=>{this.setState({display: false})}}
          type="new"
        />
      </View>
      )
    } else if(this.state.display === 'detailView'){
      return (
        <View>
          <Button
            title="< Reminder Detail"
            onPress={()=>{this.setState({display: false})}}
            accessibilityLabel="Return to Dashboard"
          />
          <ReminderDetail 
            selectedItemID={this.state.selectedItemID} 
            returnDash={()=>{this.setState({display: false})}}
          />
        </View>
      )
    } else {
      return (
        <View>
          <LandingView />
          <Pressable
            style={styles.btn}
            title="+ Add Reminder"
            onPress={()=>{
              this.setState({display: 'addView'})
            }}
            accessibilityLabel="Add a new reminder"
          />
          <ReminderList selectedItem={(e)=>{this.selectedItem(e)}}/>
        </View>
      )
    } 
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#78b49b",
    alignItems: "center",
  },
})

export default Dashboard;