<?php 
  include('../allAccessHeaders.php');
  include('../databaseConnect.php');

  /**
   * Fetch single reminder for ReminderDetail
   * 
   */
  try {
    $userID = (!empty($_POST['userID'])) ? $_POST['userID'] : null;
    $ID = (!empty($_POST['id'])) ? $_POST['id'] : null;

    $query = $db->prepare("CALL Reminder_FetchReminder(:thisUser, :thisID)");
    $query->execute(array(
      "thisUser"=> $userID,
      "thisID"=>$ID
    ));
    $row = $query->fetch(PDO::FETCH_OBJ);
    $query->closeCursor();

    echo json_encode($row);
      
  } catch(Throwable $e) { 
    die('Error: ' . $e->getMessage());  
    echo json_encode("Error! Cannot connect to server!");
  }

?>