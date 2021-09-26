const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res)
{
    const email = req.body.email;
    var fname = req.body.fname;
    var lname = req.body.lname;
    console.log(email+" "+fname+" "+lname);
    const data = {
      members:[{
        email_address :email,
        status : "subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname,
        }
        }
      ]
    };
    var jsonData = JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/8f0736581e"
    var options = {
      method:"post",
      auth:"ishitva:fa7412468f696ddc6844453bb37c98c6-us5"
    }
    const request = https.request(url,options,function(response)
    {
      if(response.statusCode==2000)
      {
        res.send("The action was successful");
      }
      else{
        res.send("The action didn't work");
      }
      response.on("data",function(data)
      {
        console.log(JSON.parse(data));
      })
    });
    request.write(jsonData);
    request.end();
});


app.listen(3000,function()
{
  console.log("The port is up and listening")
});





// API key
// fa7412468f696ddc6844453bb37c98c6-us5



// UniqueId for Audience
//
