var http = require('http')

var name ;

var host = 'localhost'
var port = 8080
console.log("Whats Your Name")
process.stdin.once('data',function(chunk){
    name = chunk.toString('utf8').split('\n')[0]
    listenToMessages()
    sendMessage()
    logoutMessage()

})


function sendMessage() {
    process.stdin.on('data',function(message){
        post_options = {
            'host': host,
            'port': port,
            'method':'POST'
        }
        var req = http.request(post_options, function(response){})  
        req.write('['+name+'] '+message)
        req.end()
    })
}


function listenToMessages() {
    http.get("http://" + host + ":" + port,function(response){

        console.log("------------Connected to Server -------------");
        response.pipe(process.stdout)

        response.on('end',function(){
            listenToMessages()
            console.log("-----------Reconnecting -------------");
        })

    })
}


function logoutMessage() {
    process.on('SIGINT', function(){
        process.stdout.write('\n end \n');
        process.exit();
    });
}