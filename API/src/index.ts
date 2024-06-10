import { Request, Response } from 'express';
import { MongoClient, Db } from 'mongodb';
import cors from 'cors';
import multer from 'multer';
import express from "express";

const app = express();
app.use(cors());

const CONNECTION_STRING = "mongodb+srv://carmine_calabrese:carmine99@bd2-f1.uscm2jt.mongodb.net/?retryWrites=true&w=majority&appName=BD2-F1";
const DATABASE_NAME = "formula1";

let database: Db;

const listener = app.listen(3001, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        if (error) throw error;
        if(client == null) return;
        database = client.db(DATABASE_NAME);
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
    console.log(`Server running on port 3001`);
});

// CIRCUITS METHODS => getAll , getById, getByName, getByLocation
app.get("/api/circuits/getAll", (req: Request, res: Response) => {
    database.collection("circuits").find({}).toArray((error, result) => {
        if (!error) {
            res.send(result);
        }
    });
});

app.get("/api/circuits/getById/:id", (req: Request, res: Response) => {
    if (req.params.id == null) {
        res.send("No ID specified");
        return;
    }
    database.collection("circuits").find({ circuitId: parseInt(req.params.id) }).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

app.get("/api/circuits/getUrl/:id", (req: Request, res: Response) => {
    if (req.params.id == null) {
        res.send("No ID specified");
        return;
    }
    database.collection("circuits").find({ circuitId: parseInt(req.params.id) }).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result[0].url);
        }
    });
});

// CONSTRUCTOR RESULTS
app.get("/api/constructors/getAll", (req: Request, res: Response) => {
    database.collection("constructors").find({}).toArray((error, result) => {
        if (!error) {
            res.send(result);
        }
    });
});

app.get("/api/constructors/getById/:id", (req: Request, res: Response) => {
    if (req.params.id == null) {
        res.send("No ID specified");
        return;
    }
    database.collection("constructors").find({ constructorId: parseInt(req.params.id) }).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

app.get("/api/constructors/getUrl/:id", (req: Request, res: Response) => {
    if (req.params.id == null) {
        res.send("No ID specified");
        return;
    }
    database.collection("constructors").find({ constructorId: parseInt(req.params.id) }).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result[0].url);
        }
    });
});

// CONSTRUCTORS => CONSTRUCTOR_STANDINGS
app.get("/api/constructors/standings/getAll", (req: Request, res: Response) => {
    const agg = [
        {
            $lookup: {
                from: "constructor_standings",
                localField: "constructorId",
                foreignField: "constructorId",
                as: "standings", 
            },
        },
    ];

    database.collection("constructors").aggregate(agg).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

app.get("/api/constructors/standings/getById/:id", (req: Request, res: Response) => {
    if (req.params.id == null) {
        res.send("No ID specified");
        return;
    }
    const agg = [
        {
            $match: {
                constructorId: parseInt(req.params.id),
            },
        },
        {
            $lookup: {
                from: "constructor_standings",
                localField: "constructorId",
                foreignField: "constructorId",
                as: "standings",
            },
        },
    ];
    database.collection("constructors").aggregate(agg).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

// CONSTRUCTORS => CONSTRUCTOR_RESULTS
app.get("/api/constructors/results/getAll", (req: Request, res: Response) => {
    const agg = [
        {
            $lookup: {
                from: "constructor_results",
                localField: "constructorId",
                foreignField: "constructorId",
                as: "results",
            },
        },
    ];

    database.collection("constructors").aggregate(agg).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

app.get("/api/constructors/results/getById/:id", (req: Request, res: Response) => {
    if (req.params.id == null) {
        res.send("No ID specified");
        return;
    }
    const agg = [
        {
            $match: {
                constructorId: parseInt(req.params.id),
            },
        },
        {
            $lookup: {
                from: "constructor_results",
                localField: "constructorId",
                foreignField: "constructorId",
                as: "results",
            },
        },
    ];
    database.collection("constructors").aggregate(agg).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

// DRIVERS METHODS
app.get("/api/drivers/getAll", (req: Request, res: Response) => {
    database.collection("drivers").find({}).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

app.get("/api/drivers/getById/:id", (req: Request, res: Response) => {
    if (req.params.id == null) {
        res.send("No ID specified");
        return;
    }
    database.collection("drivers").find({ driverId: parseInt(req.params.id) }).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

app.get("/api/drivers/getUrl/:id", (req: Request, res: Response) => {
    if (req.params.id == null) {
        res.send("No ID specified");
        return;
    }
    database.collection("drivers").find({ driverId: parseInt(req.params.id) }).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result[0].url);
        }
    });
});

// DRIVERS STANDINGS
app.get("/api/drivers/standings/getAll", (req: Request, res: Response) => {
    const agg = [
        {
            $lookup: {
                from: "driver_standings",
                localField: "driverId",
                foreignField: "driverId",
                as: "standings",
            },
        },
    ];

    database.collection("drivers").aggregate(agg).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

app.get("/api/drivers/standings/getById/:id", (req: Request, res: Response) => {
    if (req.params.id == null) {
        res.send("No ID specified");
        return;
    }
    const agg = [
        {
            $match: {
                driverId: parseInt(req.params.id),
            },
        },
        {
            $lookup: {
                from: "driver_standings",
                localField: "driverId",
                foreignField: "driverId",
                as: "standings",
            },
        },
    ];
    database.collection("drivers").aggregate(agg).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

// RACES METHODS
app.get("/api/races/getAll", (req: Request, res: Response) => {
    database.collection("races").find({}).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

app.get("/api/races/getById/:id", (req: Request, res: Response) => {
    if (req.params.id == null) {
        res.send("No ID specified");
        return;
    }
    database.collection("races").find({ raceId: parseInt(req.params.id) }).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

app.get("/api/races/getUrl/:id", (req: Request, res: Response) => {
    if (req.params.id == null) {
        res.send("No ID specified");
        return;
    }
    database.collection("races").find({ raceId: parseInt(req.params.id) }).toArray((error, result) => {
        if (!error && result != null)  {
            res.send(result[0].url);
        }
    });
});

app.get("/api/races/getByYear/:year", (req: Request, res: Response) => {
    if (req.params.year == null || parseInt(req.params.year) < 1950 || parseInt(req.params.year) > 2023) {
        res.send("No valid year specified");
        return;
    }
    database.collection("races").find({ year: parseInt(req.params.year) }).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});
