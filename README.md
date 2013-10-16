#Memory leak On Socket.IO Using Redis Store 

##depends on
node.js@0.8.21  
socket.io@0.9.11  
redis@2.6.14

##How to run

* run command

node socket_io_server.js 20082

* then run from other terminal

node socket_io_server.js 20083

* then access  
[http://localhost:20083/logger_socket_io](http://localhost:20083/logger_socket_io "http://localhost:20083/logger_socket_io")


* then run from other terminal

node emit.js
	

* then access  
[http://localhost:20083/logger_socket_io](http://localhost:20083/logger_socket_io "http://localhost:20083/logger_socket_io")


***

* compare

↓

io.roomClients.xxxxxx  
io.rooms.xxxxxx  
io.closed.xxxxxx  
io.connected.xxxxxx  
io.connected.xxxxxx  
is still alive.