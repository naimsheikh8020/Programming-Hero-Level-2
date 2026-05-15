const http = require('http')
const userData = [
  {
    name: 'Naim Sheikh',
    age:  20,
    email: "naim@gmail.com"
  },
   {
    name: 'Motin Sheikh',
    age:  21,
    email: "motin@gmail.com"
  },
   {
    name: 'Joynal Sheikh',
    age:  22,
    email: "joynl@gmail.com"
  },
   {
    name: 'Tanvir Khan',
    age:  23,
    email: "tanvir@gmail.com"
  },

]

http.createServer((req, res)=>{
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(userData))
  res.end()
}).listen(5000)