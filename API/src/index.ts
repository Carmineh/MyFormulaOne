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

// ALL POLE POSITION BY SPECIFIC DRIVER

app.get("/api/results/poles/:id", async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.send("No ID specified");
        return;
    }

    const driverId = parseInt(req.params.id); // Qui dobbiamo passare l'id del driver

    const agg = [
        {
            '$match': {
                'driverId': driverId
            }
        },
        {
            '$match': {
                'grid': 1
            }
        },
        {
            '$lookup': {
                'from': 'races',
                'localField': 'raceId',
                'foreignField': 'raceId',
                'as': 'raceDetails'
            }
        },
        {
            '$unwind': '$raceDetails'
        },
        {
            '$lookup': {
                'from': 'drivers',
                'localField': 'driverId',
                'foreignField': 'driverId',
                'as': 'driverDetails'
            }
        },
        {
            '$unwind': '$driverDetails'
        },
        {
            '$project': {
                '_id': 0,
                'raceName': '$raceDetails.name',
                'raceDate': '$raceDetails.date',
                'circuitId': '$raceDetails.circuitId',
                'driverId': '$driverId',
                'driverName': {
                    '$concat': [
                        '$driverDetails.forename', ' ', '$driverDetails.surname'
                    ]
                },
                'grid': '$grid'
            }
        },
        {
            '$sort': {
                'raceDate': 1
            }
        },
        {
            '$group': {
                '_id': {
                    'driverId': '$driverId',
                    'driverName': '$driverName'
                },
                'poles': {
                    '$push': {
                        'raceName': '$raceName',
                        'raceDate': '$raceDate',
                        'circuitId': '$circuitId'
                    }
                },
                'totalPoles': {
                    '$sum': 1
                }
            }
        },
        {
            '$unwind': {
                'path': '$poles',
                'includeArrayIndex': 'index',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            '$project': {
                '_id': 0,
                'driverId': '$_id.driverId',
                'driverName': '$_id.driverName',
                'totalPoles': '$totalPoles',
                'circuitId': '$poles.circuitId',
                'raceName': '$poles.raceName',
                'raceDate': '$poles.raceDate'
            }
        }
    ];
    database.collection("results").aggregate(agg).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

// ALL CONSCTRUCTORS BY SPECIFIC DRIVER

app.get("/api/driver_standings/constructors/:id", async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.send("No ID specified");
        return;
    }

    const driverId = parseInt(req.params.id); // Qui dobbiamo passare l'id del driver

    const agg = [
        {
          '$match': {
            'driverId': driverId
          }
        }, {
          '$lookup': {
            'from': 'results', 
            'localField': 'driverId', 
            'foreignField': 'driverId', 
            'as': 'driverCostruttore'
          }
        }, {
          '$unwind': {
            'path': '$driverCostruttore', 
            'includeArrayIndex': 'index', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$group': {
            '_id': '$driverCostruttore.constructorId'
          }
        }, {
          '$lookup': {
            'from': 'constructors', 
            'localField': '_id', 
            'foreignField': 'constructorId', 
            'as': 'constructorDetails'
          }
        }, {
          '$unwind': '$constructorDetails'
        }, {
          '$project': {
            '_id': 0, 
            'constructorId': '$_id', 
            'constructorName': '$constructorDetails.name', 
            'constructorNationality': '$constructorDetails.nationality'
          }
        }
      ];
    database.collection("driver_standings").aggregate(agg).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

// Classifica a fine gara e vincitore

app.get("/api/races/result/:id", async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.send("No ID specified");
        return;
    }

    const raceId = parseInt(req.params.id); // Qui dobbiamo passare l'id del driver

    const agg = [
        {
          '$match': {
            'raceId': raceId
          }
        }, {
          '$lookup': {
            'from': 'results', 
            'localField': 'raceId', 
            'foreignField': 'raceId', 
            'as': 'risultati'
          }
        }, {
          '$unwind': {
            'path': '$risultati', 
            'includeArrayIndex': 'index', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$lookup': {
            'from': 'drivers', 
            'localField': 'risultati.driverId', 
            'foreignField': 'driverId', 
            'as': 'nomeDriver'
          }
        }, {
          '$unwind': {
            'path': '$nomeDriver', 
            'includeArrayIndex': 'index', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$sort': {
            'risultati.position': 1
          }
        }, {
          '$project': {
            '_id': 0, 
            'driverId': '$nomeDriver.driverId', 
            'driverName': {
              '$concat': [
                '$nomeDriver.forename', ' ', '$nomeDriver.surname'
              ]
            }, 
            'granPrix': '$name', 
            'IdGranPrix': '$raceId', 
            'position': '$risultati.position'
          }
        }
      ];
    database.collection("races").aggregate(agg).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

// Giro più veloce in gara

app.get("/api/results/bestlaprace/:id", async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.send("No ID specified");
        return;
    }

    const raceId = parseInt(req.params.id); // Qui dobbiamo passare l'id del driver

    const agg = [
        {
          '$match': {
            'raceId': raceId, 
            'fastestLapTime': {
              '$exists': true, 
              '$ne': null, 
              '$nin': [
                '\\N'
              ]
            }
          }
        }, {
          '$sort': {
            'fastestLapTime': 1
          }
        }, {
          '$limit': 1
        }, {
          '$lookup': {
            'from': 'drivers', 
            'localField': 'driverId', 
            'foreignField': 'driverId', 
            'as': 'driverDetails'
          }
        }, {
          '$unwind': {
            'path': '$driverDetails', 
            'includeArrayIndex': 'index', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$project': {
            '_id': 0, 
            'bestLapTime': '$fastestLapTime', 
            'driverName': {
              '$concat': [
                '$driverDetails.forename', ' ', '$driverDetails.surname'
              ]
            }, 
            'driverId': '$driverId', 
            'raceId': '$raceId', 
            'fastestLap': '$fastestLap'
          }
        }
      ];
    database.collection("results").aggregate(agg).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

// Giro più veloce in qualifica

app.get("/api/qualifying/bestlap/:id", async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.send("No ID specified");
        return;
    }

    const raceId = parseInt(req.params.id); // Qui dobbiamo passare l'id del driver

    const agg = [
        {
          '$match': {
            'raceId': raceId
          }
        }, {
          '$lookup': {
            'from': 'races', 
            'localField': 'raceId', 
            'foreignField': 'raceId', 
            'as': 'raceDetails'
          }
        }, {
          '$unwind': {
            'path': '$raceDetails', 
            'includeArrayIndex': 'index', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$match': {
            '$or': [
              {
                'q1': {
                  '$exists': true, 
                  '$ne': null, 
                  '$nin': [
                    '\\N'
                  ]
                }
              }, {
                'q2': {
                  '$exists': true, 
                  '$ne': null, 
                  '$nin': [
                    '\\N'
                  ]
                }
              }, {
                'q3': {
                  '$exists': true, 
                  '$ne': null, 
                  '$nin': [
                    '\\N'
                  ]
                }
              }
            ]
          }
        }, {
          '$addFields': {
            'best_qualifying_time': {
              '$reduce': {
                'input': [
                  '$q1', '$q2', '$q3'
                ], 
                'initialValue': null, 
                'in': {
                  '$cond': {
                    'if': {
                      '$or': [
                        {
                          '$eq': [
                            '$$value', null
                          ]
                        }, {
                          '$and': [
                            {
                              '$ne': [
                                '$$this', null
                              ]
                            }, {
                              '$lt': [
                                '$$this', '$$value'
                              ]
                            }
                          ]
                        }
                      ]
                    }, 
                    'then': '$$this', 
                    'else': '$$value'
                  }
                }
              }
            }
          }
        }, {
          '$sort': {
            'best_qualifying_time': 1
          }
        }, {
          '$limit': 1
        }, {
          '$lookup': {
            'from': 'drivers', 
            'localField': 'driverId', 
            'foreignField': 'driverId', 
            'as': 'driverDetails'
          }
        }, {
          '$unwind': '$driverDetails'
        }, {
          '$project': {
            'raceId': '$raceId', 
            'fastestQualifyingTime': '$best_qualifying_time', 
            'driverName': {
              '$concat': [
                '$driverDetails.forename', ' ', '$driverDetails.surname'
              ]
            }, 
            'raceName': '$raceDetails.name', 
            'data': '$raceDetails.date'
          }
        }
      ];
    database.collection("qualifying").aggregate(agg).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

// Giro più veloce in qualifica in assoluto per quella pista

app.get("/api/circuits/bestlapq3ever/:id", async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.send("No ID specified");
        return;
    }

    const circuitId = parseInt(req.params.id); // Qui dobbiamo passare l'id del driver

    const agg = [
        {
          '$match': {
            'circuitId': circuitId
          }
        }, {
          '$lookup': {
            'from': 'races', 
            'localField': 'circuitId', 
            'foreignField': 'circuitId', 
            'as': 'raceDetails'
          }
        }, {
          '$unwind': '$raceDetails'
        }, {
          '$lookup': {
            'from': 'qualifying', 
            'localField': 'raceDetails.raceId', 
            'foreignField': 'raceId', 
            'as': 'qualifyingDetails'
          }
        }, {
          '$unwind': '$qualifyingDetails'
        }, {
          '$match': {
            '$or': [
              {
                'qualifyingDetails.q1': {
                  '$exists': true, 
                  '$ne': null, 
                  '$nin': [
                    '\\N'
                  ]
                }
              }, {
                'qualifyingDetails.q2': {
                  '$exists': true, 
                  '$ne': null, 
                  '$nin': [
                    '\\N'
                  ]
                }
              }, {
                'qualifyingDetails.q3': {
                  '$exists': true, 
                  '$ne': null, 
                  '$nin': [
                    '\\N'
                  ]
                }
              }
            ]
          }
        }, {
          '$addFields': {
            'qualifyingDetails.best_qualifying_time': {
              '$reduce': {
                'input': [
                  '$qualifyingDetails.q1', '$qualifyingDetails.q2', '$qualifyingDetails.q3'
                ], 
                'initialValue': null, 
                'in': {
                  '$cond': {
                    'if': {
                      '$or': [
                        {
                          '$eq': [
                            '$$value', null
                          ]
                        }, {
                          '$and': [
                            {
                              '$ne': [
                                '$$this', null
                              ]
                            }, {
                              '$lt': [
                                '$$this', '$$value'
                              ]
                            }
                          ]
                        }
                      ]
                    }, 
                    'then': '$$this', 
                    'else': '$$value'
                  }
                }
              }
            }
          }
        }, {
          '$sort': {
            'qualifyingDetails.best_qualifying_time': 1
          }
        }, {
          '$limit': 1
        }, {
          '$lookup': {
            'from': 'drivers', 
            'localField': 'qualifyingDetails.driverId', 
            'foreignField': 'driverId', 
            'as': 'driverDetails'
          }
        }, {
          '$unwind': '$driverDetails'
        }, {
          '$project': {
            'circuitId': 1, 
            'circuitName': '$name', 
            'fastestQualifyingTime': {
              '$cond': {
                'if': {
                  '$eq': [
                    '$qualifyingDetails.best_qualifying_time', '$qualifyingDetails.q1_milliseconds'
                  ]
                }, 
                'then': '$qualifyingDetails.q1', 
                'else': {
                  '$cond': {
                    'if': {
                      '$eq': [
                        '$qualifyingDetails.best_qualifying_time', '$qualifyingDetails.q2_milliseconds'
                      ]
                    }, 
                    'then': '$qualifyingDetails.q2', 
                    'else': '$qualifyingDetails.q3'
                  }
                }
              }
            }, 
            'driverName': {
              '$concat': [
                '$driverDetails.forename', ' ', '$driverDetails.surname'
              ]
            }, 
            'raceName': '$raceDetails.name', 
            'data': '$raceDetails.date'
          }
        }
      ];

    database.collection("circuits").aggregate(agg).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

// Giro più veloce in gara in assoluto per quella pista

app.get("/api/circuits/bestlapraseever/:id", async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.send("No ID specified");
        return;
    }

    const circuitId = parseInt(req.params.id); // Qui dobbiamo passare l'id del driver

    const agg = [
        {
          '$match': {
            'circuitId': circuitId
          }
        }, {
          '$lookup': {
            'from': 'races', 
            'localField': 'circuitId', 
            'foreignField': 'circuitId', 
            'as': 'raceDetails'
          }
        }, {
          '$unwind': '$raceDetails'
        }, {
          '$lookup': {
            'from': 'results', 
            'localField': 'raceDetails.raceId', 
            'foreignField': 'raceId', 
            'as': 'raceResults'
          }
        }, {
          '$unwind': '$raceResults'
        }, {
          '$match': {
            'raceResults.fastestLapTime': {
              '$exists': true, 
              '$ne': null, 
              '$nin': [
                'N'
              ]
            }
          }
        }, {
          '$sort': {
            'raceResults.fastestLapTime': 1
          }
        }, {
          '$limit': 1
        }, {
          '$project': {
            '_id': 0, 
            'circuitName': '$name', 
            'raceName': '$raceDetails.name', 
            'date': '$raceDetails.date', 
            'driverId': '$raceResults.driverId', 
            'fastestLapTime': '$raceResults.fastestLapTime', 
            'fastestLapTimeMilliseconds': '$raceResults.fastestLapTimeMilliseconds'
          }
        }, {
          '$lookup': {
            'from': 'drivers', 
            'localField': 'driverId', 
            'foreignField': 'driverId', 
            'as': 'driverDetails'
          }
        }, {
          '$unwind': '$driverDetails'
        }, {
          '$project': {
            'circuitName': 1, 
            'raceName': 1, 
            'date': 1, 
            'driverName': {
              '$concat': [
                '$driverDetails.forename', ' ', '$driverDetails.surname'
              ]
            }, 
            'fastestLapTime': 1, 
            'fastestLapTimeMilliseconds': 1
          }
        }
      ];

    database.collection("circuits").aggregate(agg).toArray((error, result) => {
        if (!error && result != null) {
            res.send(result);
        }
    });
});

// Classifica piloti con più vittorie

app.get("/api/results/halloffame", async (req: Request, res: Response) => {

    const agg = [
        {
          '$match': {
            'position': 1
          }
        }, {
          '$group': {
            '_id': '$driverId', 
            'winCount': {
              '$sum': 1
            }
          }
        }, {
          '$sort': {
            'winCount': -1
          }
        }, {
          '$lookup': {
            'from': 'drivers', 
            'localField': '_id', 
            'foreignField': 'driverId', 
            'as': 'driverDetails'
          }
        }, {
          '$unwind': '$driverDetails'
        }, {
          '$project': {
            '_id': 0, 
            'driverId': '$_id', 
            'winCount': '$winCount', 
            'driverName': {
              '$concat': [
                '$driverDetails.forename', ' ', '$driverDetails.surname'
              ]
            }
          }
        }
      ];

    database.collection("results").aggregate(agg).toArray((error, result) => {
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
