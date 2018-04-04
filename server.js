//Import Modules
const express = require("express");
const bodyParser = require("body-parser");
const mongo_js = require("mongojs");
//Create REST Object
var app = express();
//Coverts into json format
app.use(bodyParser.json());
//Inirialize the directory
app.use(express.static(__dirname));
//Create the Connection Object
conn_1 = mongo_js("mongodb://localhost:27017/jsDB");
//Create The REST API
app.get("/get_records", function(req, resp) {
    conn_1.user_tbl.find(function(err, result) {
        if (err) {
            resp.send("Error While Connection!");
        } else {
            resp.send(result);
        }
    });
});

app.post("/insert_data", function(req, resp) {
    var data_1 = req.body;
    console.log(data_1);

    conn_1.user_tbl.save(data_1, function(err, result) {
        resp.send("Data Inserted!");
    });
});

app.post("/delete_oneRecord", function(req, resp) {
    var data_2 = req.body;
    conn_1.user_tbl.remove(data_2, function(err, result) {
        resp.send("One Record Deleted!");
    });
});

app.delete("/delete_allRecords", function(req, resp) {
    conn_1.user_tbl.remove(function(err, result) {
        resp.send("All Data Deleted!!")
    });
});

app.post("/updated_Record", function(req, resp) {
    var recv_data = req.body;
    conn_1.user_tbl.update(recv_data[0], recv_data[1], function(err, result) {
        resp.send("Data Updated!!");
    });
});

//Assign the Port No
app.listen(8090, () => {
    console.log("Server Listening The Port No 8090");
});