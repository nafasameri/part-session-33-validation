const config = require("../config");
const http = require('http');


// / POST roles
let req = http.request({
    hostname: config.serverConfig.hostname,
    port: config.serverConfig.port,
    path: '/users/profiles',
    headers: {
        'content-type': 'application/json'
    },
    method: 'POST'
}, (res) => {

    res.on('data', (chunk) => {
        console.log(chunk.toString());

    });
});
req.write(JSON.stringify({
    id: 1,
    firstname: "AmirHossein",
    lastname: "Shahraki",
    imageUrl: "https://partdp.ir/files/users/amirhossein.png"
}));
req.end();