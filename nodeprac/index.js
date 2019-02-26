let fs=require('fs');
let http=require('http');
let express=require('express');
let mongoose=require('mongoose');
let bodyParser=require('body-parser');
let app=express();
let bp=bodyParser.json();
mongoose.connect('mongodb://admin:admin123@ds247330.mlab.com:47330/boutique')

let measurementSchema=new mongoose.Schema({
   "name":String,
   "date":String,
   "address":String,
   "phone":String,
   "email":String,
    "status":String,
   "measurement":{
        "shoulderLength":Number,
        "shirtLength":Number,
        "sleaveLength":Number
   }
});


let measurementModel=new mongoose.model("measurement",measurementSchema);

let botiqueSchema=new mongoose.Schema({
    "bname":String,
    "specialization":String,
    "uname": String,
    "email":String,
    "phone":Number,
    "address":String,
    "state":String,
    "pinCode":String,
    "password1":String,
    "password2":String
    });
 
 
 let boutiqueSignupModel=new mongoose.model("bsignup",botiqueSchema);
 
 
let customersignupschema=new mongoose.Schema({
    "name":String,
    "gender":String,
    "uname":String,
    "email":String,
    "phone":String,
    "address":String,
    "state":String,
    "pincode":Number,
    "password1":String,
    "password2":String
 });

 
 
 let customerSignupModel=new mongoose.model("csignup",customersignupschema);
 
// app.get("/",function(req,res){
//     let data={
//         "name":"Ramau",
//         "date":"12/12/2019",
//         "address":"Bangalore",
//         "phone":"12345678",
//         "email":"ramu@gmail.com",
//         "measurement":{
//              "shoulderLength":23,
//              "shirtLength":23,
//              "sleaveLength":23
//         }
//     }

//     measurementModel(data).save(function(err,data){
//         console.log(err);
//         console.log(data);
//     });

// });



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.get("/measurement",function(req,res){
    measurementModel.find({},function(err,data){
        res.json(data);
    });   
});


app.get("/measurementnotif",function(req,res){
    measurementModel.find({}).limit(5).exec(function(err,data){
        res.json(data);
    });   
});


app.post("/giveMeasurement",bp,function(req,res){
    measurementModel(req.body).save(function(err,data){
        console.log(err);
    })
})

app.post("/updateOrderStatus",bp,function(req,res){
    console.log(req.body);
    let data={
        "status":req.body.status
    }
    measurementModel.findByIdAndUpdate(req.body.orderId,data, function(err,data){
        console.log(data);
    })
})

app.get("/fetchMaleBoutiques",function(req,res){
    boutiqueSignupModel.find({"specialization":"s_male"},function(err,data){
                console.log(err);
                res.json(data);
        })
});


app.get("/fetchFemaleBoutiques",function(req,res){
    boutiqueSignupModel.find({"specialization":"s_female"},function(err,data){
            console.log(err);
            res.json(data);
    })
});

app.post("/fetchMaleBoutiques",bp,function(req,res){
    // console.log("fetch by id called");
     console.log(req.body.boutiquename);
     boutiqueSignupModel.find({"bname":req.body.boutiquename},function(err,data){
         res.json(data);
     });   
 });
 

app.get("/bsignup",function(req,res){
    console.log("bsignup called");
    boutiqueSignupModel.find({},function(err,data){
        console.log("bsignup called");
        res.json(data);
    });   
});

app.post("/givebsignupdata",bp,function(req,res){
    console.log("data calle");
    boutiqueSignupModel(req.body).save(function(err,data){
        console.log(err);
        res.json(data);
    })
});

app.get("/csignup",function(req,res){
    customerSignupModel.find({},function(err,data){
        res.json(data);
    });   
});


app.post("/givecsignupdata",bp,function(req,res){
    console.log("data calle");
    customerSignupModel(req.body).save(function(err,data){
        console.log(err);
        res.json(data);
    })
});


app.post("/login",bp,function(req,res){
    console.log(req.body.email);
    console.log(req.body.password);
    boutiqueSignupModel.find({"email":req.body.email,"password1":req.body.password},function(err,data){
        
        if(data.length!=0){
            console.log(data);
            res.json({"msg":"ok"});
        }
        else{
            let error={"msg":"invalid email or password"}
            res.json(error);
        }
    });
});

// app.post("/viewMore",bp,function(req,res){
//     console.log("fetch by id called");
//     console.log(req.body.animalId);
//     measurementModel.find({"_id":req.body.animalId},function(err,data){
//         res.json(data);
//     });   
// });



app.listen(3000);
console.log("server running @ 3000");




// myReadStream.pipe(myWrite);

// myReadStream.on('data',function(response){
//     console.log(response);
// });


// let myWrite=fs.createWriteStream(__dirname+"/data/dataop.json");

// let server=http.createServer(function(req,res){

//     res.writeHead(200,{'Content-Type':'application/json'})
//     let myReadStream=fs.createReadStream(__dirname+"/data/data.json","utf-8");
//     myReadStream.pipe(res);

// });
