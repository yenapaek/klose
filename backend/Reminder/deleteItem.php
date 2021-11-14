<?php 
  include('../allAccessHeaders.php');
  include('../databaseConnect.php');

  /**
   * Delete a single reminder
   * 
   */
  try {
    $userID = (!empty($_POST['userID'])) ? $_POST['userID'] : null;
    $ID = (!empty($_POST['id'])) ? $_POST['id'] : null;

    $query = $db->prepare("CALL Reminder_DeleteReminder(:thisUser, :thisID)");
    $query->execute(array(
      "thisUser"=> $userID,
      "thisID"=>$ID
    ));
    $query->closeCursor();
      
  } catch(Throwable $e) { 
    die('Error: ' . $e->getMessage());  
    echo json_encode("Error! Cannot connect to server!");
  }

?>