var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

const CONNECTION_STRING =
	"mongodb+srv://carmine_calabrese:carmine99@bd2-f1.uscm2jt.mongodb.net/?retryWrites=true&w=majority&appName=BD2-F1";

const DATABASE = "formula1";

var database;

app.listen(3000, () => {
	MongoClient.connect(
		CONNECTION_STRING,
		{ useUnifiedTopology: true },
		(error, client) => {
			if (error) {
				throw error;
			}
			database = client.db(DATABASE);
			console.log("Connected to `" + DATABASE + "`!");
		}
	);
	console.log("Server running on port 3000");
});

//API METHODS
app.get("/api/drivers/GetDriverData", (req, res) => {
	database
		.collection("drivers")
		.find({})
		.toArray((error, result) => {
			if (!error) {
				res.send(result);
			}
		});
});
