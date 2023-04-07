const http = require('http');
const PORT = process.env.port || 3000
const HOST = '127.0.0.1';
const dob = new Date('11-06-1998').toLocaleDateString();
http.createServer(function (req, res) {   
    res.write('Hello, Good Morning');
    res.end(` My Birthdate is ${dob}.`);  
}).listen(PORT, () => {
    console.log(`Server is running at http://${HOST}:${PORT}/`);
}); 
 