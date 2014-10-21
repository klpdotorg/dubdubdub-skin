<?php

require_once("inc/header.inc.php");

$page = array(
	'page_title' => 'Required for Library',
	'logged_in' => false
);

$page['user_details'] = array(
	'name' => 'Gautam Chaudhary',
	'email' => 'gkcgautam@gmail.com',
	'phone' => '9876543210',
	'address' => '#123, Random Street, Chandigarh',
);

if(isset($_POST['submit'])){
	$page['logged_in'] = true;
}

if(isset($_GET['logged_in'])){
	$page['logged_in'] = true;
}

page_render('donate-required-for-library.html', $page);


