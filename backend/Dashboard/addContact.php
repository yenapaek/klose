<?php 
  include('../allAccessHeaders.php');
  include('../databaseConnect.php');

  /**
   * Insert a new contact into the database
   * 
   */
  $userID = (!empty($_POST['userID'])) ? $_POST['userID'] : null;
  $contactName = (!empty($_POST['contactName'])) ? $_POST['contactName'] : null;

  try{
    $query = $db->prepare("CALL Dashboard_InsertContact(:thisUser, :thisContactName)");
    $query->execute(array(
      "thisUser"=> $userID,
      "thisContactName"=>$contactName,
      // "thisContactImg"=>$contactImg
    ));
    $row = $query->fetchAll(PDO::FETCH_OBJ);
    $query->closeCursor();

    echo json_encode($row);
      
  } catch(Throwable $e) { 
    die('Error: ' . $e->getMessage());  
    echo json_encode("Error! Cannot connect to server!");
  }

?>