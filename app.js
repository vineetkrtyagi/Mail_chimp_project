//jshint esversion :6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https= require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res){ 

    console.log(req.body);
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data= {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    };
    const jsonData= JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/30643e41b3"

    const options= {
        method: "POST",
        auth: "vineet1:2ad71ad0abe55a094315f2fdef1647be-us21"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();

    
});

app.listen(3000, function(){
    console.log("Server running on port 3000");
})

// API Key
// 2ad71ad0abe55a094315f2fdef1647be-us21

// List ID
// 30643e41b3