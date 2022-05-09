const express = require('express');
const app = express();

app.listen(3000, '0.0.0.0', () => {
	console.log("Portfolio Project Running . . .");
});

app.use(express.static(__dirname));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});
