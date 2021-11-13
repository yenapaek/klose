<?php 
  // Call the database
  $user    = 'u601947865_root';
  $pass    = 'zCyLsJA9DRk6ySd'; 
  $host    = '109.106.254.51'; 
  $dbName      = 'u601947865_klose';
  $charset = 'utf8';

  try {
    $db = new PDO("mysql:host=$host; dbname=$dbName; charset=$charset", $user, $pass, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

  } catch(Exception $e) { 
    die('Error: ' . $e->getMessage()); 
  }

?>