<?php

Route::group(['middleware' => 'web'], function () {
    Route::auth();

    Route::get('/', function () {
    return view('welcome');
	});

    Route::get('/home', 'HomeController@index');
});
