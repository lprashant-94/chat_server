

var http = require('http')
var responseArray = []

http.createServer(function(request, response)
{
  if(request.method == "POST") {
    request.on('data',publishMessage)
    response.write("Send message successfully")
    response.end()
  } else {
    responseArray.push(response)
    console.log("Got request")
    response.writeHead(200)
    response.write("Welcome to chat server\n")
    request.on('end', function(){
      responseArray = responseArray.filter(function(client){
        if(response!=client)
          return true
        return false
      });
    })
    setTimeout(function(){
      response.write("Timeout Happened")
      response.end()    
    },500000);
  }
}).listen(8080)

function stateOFResponseArray()
{
  console.log("No of clients "+ responseArray.length)
  console.log("Clients are "+ responseArray)
  setTimeout(stateOFResponseArray, 2000)
}

setTimeout(stateOFResponseArray, 2000)

function removeClient(client){
  responseArray.filter(function(response){
    if(response!=client)
      return true
    return false
  });
}

function publishMessage(message)
{
  responseArray.forEach(function(response){
    response.write(message)
  })
}


console.log("Listning on 8080")