import React from 'react';
import {View, Button} from 'react-native';
import ReminderDetail from '../Reminder/ReminderDetail';
import AddReminder from './AddReminder';
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
          title="<"
          onPress={()=>{
            this.setState({display: false})
          }}
          accessibilityLabel="Return to Dashboard"
        />
        <AddReminder />
      </View>
      )
    } else if(this.state.display === 'detailView'){
      return (
        <View>
          <Button
            title="<"
            onPress={()=>{
              this.setState({display: false})
            }}
            accessibilityLabel="Return to Dashboard"
          />
          <ReminderDetail selectedItemID={this.state.selectedItemID}/>
        </View>
      )
    } else {
      return (
        <View>
          <Button
            title="+"
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

export default Dashboard;