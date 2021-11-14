import axios from 'axios';

/* deleteReminder */
export function deleteReminder(userID, id){
  const formData = new FormData();
  formData.append('userID', userID);
  formData.append('id', id);

  axios.post('https://kiipgrammar.com/klose/Reminder/deleteItem.php', formData)
  .then(res=>{
      this.setState({reminders: res.data});
  }).catch(err =>{
    console.log('Error!',err);
  })
}