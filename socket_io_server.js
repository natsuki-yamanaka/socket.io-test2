/*!
 * socket.io-test
 * Copyright(c) 2013 natsuki-yamanaka <natsukiyamanakafor@gmail.com>
 * MIT Licensed
 */
//---------------------------------------------------------------------------------//
/**
 * Module dependencies.
 */
 
var http = require('http');
var util = require('util');
var socket_io = require('socket.io');
var RedisStore = require('socket.io/lib/stores/redis');

//---------------------------------------------------------------------------------//
/**
 * param
 */
//---------------------------------------------------------------------------------//

var PORT = 20082;
var DEBUG = 1;
var NAMESPACE = 'room:';
var REDIS_OPTION = {'host':'localhost','port':'6379'};
var LOCAL_HOST = '127.0.0.1';

//---------------------------------------------------------------------------------//
//change port by command line.
if (process.argv.length>=3){
	if(process.argv[2] && isFinite(process.argv[2])){
		PORT = process.argv[2];
	}
}

//---------------------------------------------------------------------------------//

/**
 * socket.io listen
 */
var io = 		socket_io.listen(

	//create HTTP Server
	http.createServer(function(req, res){
		logger("eventOn accessHttp:" + req.url );
		if (req.url.match(new RegExp("^/logger_socket_io"))){							logger_socket_io(req,res);}
		else{
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end("START!");
		}
	//Listen HTTP Server
	}).listen( PORT,function(){})
	
);
//--------------------------------------------------------------------------//
/**
 * set Redis Store
 */
var RedisStore = require('socket.io/lib/stores/redis');
try{
	var store = new RedisStore({redisPub:REDIS_OPTION, redisSub:REDIS_OPTION, redisClient:REDIS_OPTION});
	io.set('store', store);
	store.on('error',function(err){
		console.log('Redis Error'+err);
	});
}catch(e){
	console.log('Redis Error '+e);
}

//---------------------------------------------------------------------------------//
logger("socket.io start:" + PORT );
var user_ids = [];
io.sockets.on('connection', function(socket){
	
	//declare socket.on----------------------------------------//
	socket.on('login', 				function(data){login(socket,data)});
	socket.on('disconnect', 		function(data){disconnect(socket,data)});

});
	//################################################################
	//↓declare event//---------------------------------------------------------------------------------//
	
	// disconnect//---------------------------------------------------------------------------------//
	var disconnect = function(socket,data){
		logger('disconnect:'+socket.id);
	};
	
	//---------------------------------------------------------------------------------//
	/** main */
	var login = function(socket,data){
		logger('eventOn login:' + util.inspect(data,false,null));
		var event = 'logined';
		
		var send_data = {
			data1:1,
			data2:2,
			data3:3,
		};
		console.log('data = '+send_data);
		
		socket.join('namespace');
		
		io.sockets.socket(socket.id).emit(event, send_data);
	};



//################################################################
//------------------------------------------------------------------------------------------//
//function

//------------------------------------------------------------------------------------------//
/**
 * logger
 */
function logger(data,level){
	if(level=='error'||level=='crit'||level=='alert'||level=='emerg'||level=='warn'||level=='info'){
		//red
		if(level=='error'){
			console.log('\033[31m'+level+': '+data+' - '+now()+ '\033[39m');
		//yellow
		}else if(level=='info'){
			console.log('\033[33m'+level+': '+data+' - '+now()+ '\033[39m');
		}else{
			console.log(data+' - '+now());
		}
	}
	else if(DEBUG==1){
		console.log(data+' - '+now());
	}
}

//-------------------------------------------------------//
/** 
 * YYYY-MM-DD HH:MM:SS
 */
function now(date){
	if(!date){
		date = new Date();
	}
	var month = (date.getMonth() + 1)<10 ? '0'+(date.getMonth() + 1) : (date.getMonth() + 1);
	var now_day = date.getDate()<10 ? '0'+date.getDate() : date.getDate();
	var our = date.getHours()<10 ? '0'+date.getHours() : date.getHours();
	var minuts = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
	return date.getFullYear()  + "/" + (month) + "/" + now_day + " " + our + ":" + minuts + ":" + seconds;
}

//----------------------------------------------------------//
/** 
 * util.inspect([Socket.IO ListenObject])
 */
function logger_socket_io(req,res){
	
	if(req
	&& req.client
	&& req.client.remoteAddress
//	&& req.client.remoteAddress.indexOf(LOCAL_HOST)!=-1
	){
		var inspect = util.inspect(io,false,null);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end("<pre>"+inspect+"<pre>");
	}else{
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end("");
	}
}


//------------------------------------------------------//
/** 
 * sleep in javascript
 */
function Sleep( T ){ 
	var d1 = new Date().getTime(); 
	var d2 = new Date().getTime(); 
	while( d2 < d1+1000*T ){    //T秒待つ 
		d2=new Date().getTime(); 
	} 
	return; 
} 

