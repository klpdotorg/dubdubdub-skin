<?php

require_once("inc/header.inc.php");

$page = array(
	'page_title' => 'Required for Library',
	'logged_in' => false
);

if(isset($_POST['submit'])){
	$page['logged_in'] = true;
}

page_render('donate-required-for-library.html', $page);


