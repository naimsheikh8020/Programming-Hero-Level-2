// const http = require('http');

// const sendResponse = (res, { ContentType = 'application/json', status = 200, body = {} }) => {
//   res.writeHead(status, { 'Content-Type': ContentType })
//   res.write(JSON.stringify(body))
//   res.end()
// }

// const server = http.createServer((req, res) => {
//   if (req.url === '/') {
//     sendResponse(res, {
//       body: {
//         msg: "Welcome to full stack Army"
//       }
//     })
//   }
// })

// server.listen(5000, () => {
//   console.log("server is running 5000")
// }) 



const http = require('http');

const students = [
  {
    id: 1,
    name: "Naim Sheikh",
    age: 22,
    department: "CSE",
  },
  {
    id: 2,
    name: "Rahim Ahmed",
    age: 21,
    department: "EEE",
  },
  {
    id: 3,
    name: "Karim Hasan",
    age: 23,
    department: "BBA",
  },
  {
    id: 4,
    name: "Mim Akter",
    age: 20,
    department: "English",
  },
];

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method.toLocaleLowerCase()=== "get") {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: "Every thing is ok" }))
    res.end()
  }
  else if (req.url === "/students" && req.method.toLocaleLowerCase()=== "get") {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.write(
      JSON.stringify({
        message: "Get all students successfully",
        data: students,
      })
    );

    res.end();
  }
  else{
    res.writeHead(400, {'content-type': 'application/json'})
    res.write(JSON.stringify({message: "No Route Found"}))
    res.end()
  }
})

server.listen(5000)