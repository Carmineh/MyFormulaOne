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

/*
	API METHODS
	 TODO: Driver Methods (getAll , getById)
	 TODO: Team Methods (getAll , getById)
	 TODO: Circuit Methods (getAll , getById)
	 TODO: Race Methods (getAll , getById)
	 TODO: Season Methods (getAll)

	 ! IMPORTANT: Trovare collegamenti fra i vari dataset per rendere complete le pagine (Basarsi sugli ID)
*/

//Methods to get all the drivers in the database
app.get("/api/drivers/GetAllDrivers", (req, res) => {
	database
		.collection("drivers")
		.find({})
		.toArray((error, result) => {
			if (!error) {
				res.send(result);
			}
		});
});

app.get("/api/drivers/GetDriverById/:id", (req, res) => {
	console.log("GetDriverbyId:", req.params.id);
	if (req.params.id == null) {
		res.send("No ID specified");
		return;
	}
	database
		.collection("drivers")
		.find({ driverId: parseInt(req.params.id) })
		.toArray((error, result) => {
			if (!error) {
				res.send(result);
				console.log(result);
			}
		});
});
