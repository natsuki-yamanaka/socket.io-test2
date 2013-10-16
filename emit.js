/*!
 * socket.io-test
 * Copyright(c) 2013 natsuki-yamanaka <natsukiyamanakafor@gmail.com>
 * MIT Licensed
 */
//---------------------------------------------------------------------------------//
/**
 * Module dependencies.
 */
var util = require('util');


//---------------------------------------------------------------------------------//
/**
 * param
 */
//---------------------------------------------------------------------------------//
var io = require('socket.io/node_modules/socket.io-client/lib/io');
var domain = 'localhost';
var port = '20082';
var event = 'login';
var data = {
	'time_interval':10000,
};

//this is client num.
var connect_count = 1;

//∞repeat
var limit = 86400;

//if use command line
if (process.argv.length>=3){
	if(process.argv[3]){
		domain = process.argv[3];
	}
	if(process.argv[4] && isFinite(process.argv[4])){
		port = process.argv[4];
	}
}

setConnect();

/**
 * create one socket.io-client
 */
function setConnect(){
	//force new connection-------------------------//
	socket = io.connect('http://'+domain+':'+port,{'force new connection':true});

	console.log(' setConnect ');



	socket.on('connect', function(){

		//--------------------------------------------------------------------------------------------//
		//on message from server

		socket.on('error',function(msg){
			console.log('\033[31m'+'eventOn error msg = '+util.inspect(msg,false,null)+'\033[39m');
		});
		socket.on('disconnect',function(msg){
			console.log('\033[31m'+'eventOn disconnect msg = '+util.inspect(msg,false,null)+'\033[39m');
		});
		socket.on('logined',function(msg){
			console.log('\033[31m'+'eventOn logined msg = '+util.inspect(msg,false,null)+'\033[39m');
			try{
				socket.disconnect();
			}catch(e){
				console.log('disconnect error : '+e);
			}
		});
		socket.emit(event, data);
	});
	
	
	
	//-------------------------------------------------------//
}



//-------------------------------------------------------//
/** 
 * YYYY-MM-DD HH:MM:SS
 */
function now(){
	var date = new Date();
	var month = (date.getMonth() + 1)<10 ? '0'+(date.getMonth() + 1) : (date.getMonth() + 1);
	var now_day = date.getDate()<10 ? '0'+date.getDate() : date.getDate();
	var our = date.getHours()<10 ? '0'+date.getHours() : date.getHours();
	var minuts = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
	return date.getFullYear()  + "/" + (month) + "/" + now_day + " " + our + ":" + minuts + ":" + seconds;
}
