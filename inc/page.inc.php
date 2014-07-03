<?php

require_once("lib/Twig/Autoloader.php");

Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem($config['template']);
$twig = new Twig_Environment($loader, array(
    'cache' => false,
));

function page_render($tpl='layout.html',$content=array() )
{
	global $twig;
	global $config;
	global $member;
	
	$twig->addGlobal('site_url', $config['site_url']);
	// $twig->addGlobal('self_url', selfURL());
		
	echo $twig->render($tpl, $content);
}