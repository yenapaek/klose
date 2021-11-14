<?php 
  include('../allAccessHeaders.php');
  include('../databaseConnect.php');

  /**
   * Insert a new contact into the database
   * 
   */
  $userID = (!empty($_POST['userID'])) ? $_POST['userID'] : null;
  $contactName = (!empty($_POST['contactName'])) ? $_POST['contactName'] : null;


  /**
   * Insert image into FTP
   */
  try {
    $ftp_server = "109.106.254.56";
    $ftp_user_name = "u601947865.mainFTP";
    $ftp_user_pass = "zCyLsJA9DRk6ySd";
    $destination_file = "/klose/img";
    $source_file = $_FILES['file']['tmp_name']; 

    // set up basic connection
    $conn_id = ftp_connect($ftp_server);
    ftp_pasv($conn_id, true); 

    // login with username and password
    $login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass); 

    // check connection
    if ((!$conn_id) || (!$login_result)) { 
      echo "FTP connection has failed!";
      echo "Attempted to connect to $ftp_server for user $ftp_user_name"; 
      exit; 
    } else {
      echo "Connected to $ftp_server, for user $ftp_user_name";
    }

    // upload the file
    $upload = ftp_put($conn_id, $destination_file, $source_file, FTP_BINARY); 

    // check upload status
    if (!$upload) { 
    echo "<br/>FTP upload has failed!" . 'destination:' .$destination_file . 'source:' . $source_file ;
    } else {
    echo "<br/>Uploaded $source_file to $ftp_server as $destination_file";
    }

    // close the FTP stream 
    ftp_close($conn_id);
  } catch(Throwable $e) { 
    die('Error: ' . $e->getMessage());  
    echo json_encode("Error! Cannot connect to server!");
  }

  // try{
  //   $query = $db->prepare("CALL Dashboard_InsertContact(:thisUser, :thisContactName, :thisContactImg)");
  //   $query->execute(array(
  //     "thisUser"=> $userID,
  //     "thisContactName"=>$contactName,
  //     "thisContactImg"=>$contactImg
  //   ));
  //   $row = $query->fetchAll(PDO::FETCH_OBJ);
  //   $query->closeCursor();

  //   echo json_encode($row);
      
  // } catch(Throwable $e) { 
  //   die('Error: ' . $e->getMessage());  
  //   echo json_encode("Error! Cannot connect to server!");
  // }

?>