var http = require("http");
var fs = require("fs");
var os = require("os");
var ip = require('ip');



http.createServer(function(req, res){

    if (req.url === "/") {
        fs.readFile("./public/index.html", "UTF-8", function(err, body){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(body);
    });
}
    else if(req.url.match("/sysinfo")) {
        myHostName=os.hostname();
        myIpAddress=ip.address();
        serverUptime=os.uptime();
        tMem=os.totalmem();
        fMem=os.freemem();
        numberCpu=os.cpus().length;
        html=`    
        <!DOCTYPE html>
        <html>
          <head>
            <title>Node JS Response</title>
          </head>
          <body>
            <p>Hostname: ${myHostName}</p>
            <p>IP: ${myIpAddress}</p>
            <p>Server Uptime: ${serverUptime}</p>
            <p>Total Memory: ${tMem} MB</p>
            <p>Free Memory: ${fMem} MB</p>
            <p>Number of CPUs: ${numberCpu}</p>            
          </body>
        </html>` 
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
    }
    else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end(`404 File Not Found at ${req.url}`);
    }
}).listen(3000);

console.log("Server listening on port 3000");