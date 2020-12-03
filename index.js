const http = require("http2");
const fs = require("fs");
const bus = require("./bus")


const { pipeline } = require("stream");
const { request } = require("http");
const serverOptions = {
	key: fs.readFileSync(__dirname + "/secret/localhost-privkey.pem"),
	cert: fs.readFileSync(__dirname + "/secret/localhost-cert.pem"),
};

let count = 1;

const server = http.createSecureServer(serverOptions);

server.on("stream", (stream, requestHeaders) => {
	if (requestHeaders[":path"] == "/") {
		if (requestHeaders[":method"] === "GET") {
			
			for (const asset of [__dirname + "/public/script.js"]) {
				stream.pushStream(
					{ ":path": "/script.js" },
					function (err, pushStream) {
						if (err) throw err;
						pushStream.respondWithFile(asset);
					}
				);
			}

			const fileStream = fs.createReadStream(__dirname + "/public/index.html");
			pipeline(fileStream, stream, (err) => {
				if (err) stream.end(err);
			});
		}
	}
	if (requestHeaders[':path']=='/chat'){
		stream.respond({'content-type':'application/json'})
		bus.instance.createRoom().then((id)=>{
			stream.end({room:id})
		})
	}
	if (requestHeaders[":path"] == "/live") {
	
		stream.respond({'content-type':'text/event-stream','cache-control':'no-cache','access-control-allow-credentials':'*'})
		setInterval(

			function(){
			if (!stream.destroyed){
				stream.write( `event:custom\nid: 1\ndata:${Math.random(1,10)}\n\n`)
			}
			
		},2000)
	

		
		
		

	}
	
});

server.listen("8090", () =>
	console.log("https server started on port", "8090")
);
