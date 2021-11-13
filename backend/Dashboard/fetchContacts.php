<?php 
  include('../allAccessHeaders.php');
  include('../databaseConnect.php');

  /**
   * Fetch the user contacts for the add/edit reminder drop down options
   * 
   */
  try {
    $userID = (!empty($_POST['userID'])) ? $_POST['userID'] : null;

    $query = $db->prepare("CALL Dashboard_FetchContacts(:thisUser)");
    $query->execute(array(
      "thisUser"=> $userID,
    ));
    $row = $query->fetchAll(PDO::FETCH_OBJ);
    $query->closeCursor();

    echo json_encode($row);
      
  } catch(Throwable $e) { 
    die('Error: ' . $e->getMessage());  
    echo json_encode("Error! Cannot connect to server!");
  }

?>