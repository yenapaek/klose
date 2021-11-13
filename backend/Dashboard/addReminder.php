<?php 
  include('../allAccessHeaders.php');
  include('../databaseConnect.php');

  /**
   * Insert new reminder
   * 
   */
  try {
    $userID = (!empty($_POST['userID'])) ? $_POST['userID'] : null;
    $title = (!empty($_POST['title'])) ? $_POST['title'] : null;
    $contactID = (!empty($_POST['contactID'])) ? $_POST['contactID'] : null;
    $moreInfo = (!empty($_POST['moreInfo'])) ? $_POST['moreInfo'] : null;
    $frequency = (!empty($_POST['frequency'])) ? $_POST['frequency'] : null;
    $timezone = (!empty($_POST['timezone'])) ? $_POST['timezone'] : null;
    $reminderTime = (!empty($_POST['reminderTime'])) ? $_POST['reminderTime'] : 0;

    /**
     * Set user timezone as default time/date
     */
    date_default_timezone_set($timezone);
    $nextReminder = new DateTime();

    /**
     * Set the reminder time
     */
    $parseReminderTime =substr($reminderTime,0,2);
    $nextReminder->setTime($parseReminderTime, 00);

    /**
     * Set the next reminder date by frequency
     */
    switch ($frequency) {
      case 'Daily':
        $nextReminder->add(new DateInterval('P1D'));
        break;
      case 'Weekly':
        $nextReminder->add(new DateInterval('P7D'));
        break;
      case 'Monthly':
        $nextReminder->add(new DateInterval('P1M'));
        break;
      case 'Yearly':
        $nextReminder->add(new DateInterval('P1Y'));
        break;
      
      default:
        $nextReminder->add(new DateInterval('P1D'));
        break;
    }


    // /**
    //  * Insert with stored procedure
    //  */
    $query = $db->prepare("CALL Dashboard_InsertReminder(:thisUser, :thisTitle, :thisContact, :thisMoreInfo, :thisFrequency, 
    :thisTimezone, :thisNextReminder, :thisStartDate, :thisReminderTime)");
    $query->execute(array(
      "thisUser"=> $userID,
      "thisTitle"=>$title,
      "thisContact"=>$contactID,
      "thisMoreInfo"=>$moreInfo,
      "thisFrequency"=>$frequency,
      "thisTimezone"=>$timezone,
      "thisNextReminder"=>$nextReminder->format('Y-m-d H:i:s'),
      "thisStartDate"=>date('Y-m-d'),
      "thisReminderTime"=>$reminderTime
    ));
    $query->closeCursor();

  } catch(Throwable $e) { 
    die('Error: ' . $e->getMessage());  
    echo json_encode("Error! Cannot connect to server!");
  }

?>