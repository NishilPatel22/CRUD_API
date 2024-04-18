const http = require("http");
const port = 8000;
const userArray = [];
http.createServer((req, res) => {
    if (req.url == "/") {
        res.end("1. Add User use : /adduser\n2. Update User use : /updateuser\n3. Delete User use : /deleteuser\n4. Get Users use : /users")
    } else if (req.method == "POST" && req.url == "/adduser") {
        req.on("data", (getData) => {
            const { username, userage } = JSON.parse(getData)
            const duplicateUser = userArray.find((avl) => avl.username == username)
            if (!duplicateUser) {
                userArray.push({ userID: userArray.length + 1, username, userage })
            } else {
                res.writeHead(404, { "Content-type": "text" })
                res.end("OPPS! username already exist")
            }
        });
        req.on("end", () => {
            res.end("User Added successfully!")
        });
    } else if (req.method == "PATCH" && req.url == `/updateuser`) {
        req.on('data', (updateData) => {
            const { userID, username, userage } = JSON.parse(updateData);
            const index = userArray.findIndex((id) => id.userID === userID);
            if (index !== -1) {
                userArray[index].username = username
                userArray[index].userage = userage
            } else {
                res.writeHead(404, { "Content-type": "text" });
                res.end("User Not Found!");
            }
        });
        req.on('end', () => {
            res.end("User updated successfully!");
        })
    } else if (req.method == "DELETE" && req.url == "/deleteuser") {
        req.on('data', (getId) => {
            const { userID } = JSON.parse(getId);
            const index = userArray.findIndex((id) => id.userID === userID);
            if (index !== -1) {
                userArray.splice(index, 1);
            } else {
                res.writeHead(404, { "Content-type": "text" })
                res.end("User Not Found!")
            }
        });
        req.on('end', () => {
            res.end("User deleted successfully!");
        });
    } else if (req.method == "GET" && req.url == "/users") {
        res.end(JSON.stringify(userArray))
    } else {
        res.writeHead(404, { "Content-type": "text" })
        res.end("404 Page Not Found")
    }
}).listen(port, () => {
    console.log(`Server Started! http://localhost:${port}`)
})