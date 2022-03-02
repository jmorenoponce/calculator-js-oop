<?php

if (isset($_REQUEST['action'])) {

	if (file_exists(__DIR__ . '/../responses/' . $_REQUEST['action'] . '.php')) {
		require __DIR__ . '/../responses/' . $_REQUEST['action'] . '.php';
		exit();
	}
}

header('x-server-custom: dgfkljkljdgfsdgfsjdgfskj');

if (isset($_GET['getUsers'])) {

    echo json_encode([
		[
			'name' => 'Nahuel',
			'lastName' => 'Npi'
		],
		[
			'name' => 'Jose',
			'lastName' => 'Moreno'
		]
    ]);

} else {

	echo json_encode([
		'say' => 'hello',
		'post' => $_POST,
		'get' => $_GET,
		'server' => $_SERVER,
	]);
}