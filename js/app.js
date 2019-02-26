var app = angular.module("myApp",[]);

app.controller("myController",function($scope,$http){
  
   
    $scope.update=function(id,ordstatus){
        let data={
            "status":ordstatus,
            "orderId":id
        }
        console.log("update method "+ordstatus);
        $http.post("http://localhost:3000/updateOrderStatus",data).then(function(response){
            console.log(response);
        });
    }


    $http.get("http://localhost:3000/measurement").then(function(response){
        $scope.data=response.data;
    }).catch(function(err){

    })

    // let data={"boutiquename":$routeParams.boutiquename}
    $http.get("http://localhost:3000/fetchMaleBoutiques").then(function(response){
            $scope.namesList=response.data;
    });
   // let data={"boutiquename":$routeParams.boutiquename}
    $http.get("http://localhost:3000/fetchFemaleBoutiques").then(function(response){
            $scope.fnamesList=response.data;
    });
})


app.controller("notifcontroller",function($scope,$http){
    $http.get("http://localhost:3000/measurementnotif").then(function(response){
        $scope.data=response.data;
    }).catch(function(err){

    })
});


app.controller("orderController",function($scope,$http){
    
    $scope.takeMeasurement=function(){

        let data={
            "name":$scope.name,
            "date":$scope.date,
            "address":$scope.address,
            "phone":$scope.phone,
            "email":$scope.email,
            "status":"pending",
                       "measurement":{
                 "shoulderLength":$scope.shoulderLength,
                 "shirtLength":$scope.shirtLength,
                 "sleaveLength":$scope.sleaveLength
            }};

        $http.post("http://localhost:3000/giveMeasurement",data).then(function(response){

        });
        console.log(data);
    }
    
    
})


app.controller("bsignController",function($scope,$http,$window){
    console.log("controller");
    
    $scope.bsignup=function(){
        if($scope.email==null){
            $scope.emailError="email cannot be null"

        
        }
        else if($scope.specialization==null){
            
            $scope.splError="spl cannot be null"


        }
        else if($scope.bname==null){
            
            $scope.bnameError="boutique name cannot be null"

        }
        else if($scope.uname==null){
            
            $scope.unameError="username cannot be null"

        }
        
        else if($scope.phone==null){
            
            $scope.phoneError="phone number cannot be null"

        }
        
        else if($scope.address==null){
            
            $scope.addressError="address cannot be null"

        }
        
        else if($scope.state==null){
            
            $scope.stateError="state cannot be null"

        }
        
        else if($scope.pincode==null){
            
            $scope.pincodeError="pincode cannot be null"

        }
        else if($scope.password1==null){
            
            $scope.password1Error="password cannot be null"

        }
        else if($scope.password2==null){
            
            $scope.password2Error="password cannot be null"

        }
        
        else{
            $scope.emailError="";
            $scope.splError="";
            $scope.bnameError="";
            
            $scope.unameError="";
            $scope.phoneError="";
            $scope.addressError="";
            $scope.stateError="";
            $scope.pincodeError="";
            $scope.password1Error="";
            $scope.password2Error="";
           
        let data={
            "bname":$scope.bname,
            "specialization":$scope.specialization,
            "uname":$scope.uname,
            "email":$scope.email,
            "phone":$scope.phone,
            "address":$scope.address,
            "state":$scope.state,
            "pincode":$scope.pincode,
            "password1":$scope.password1,
            "password2":$scope.password2
        };
            if($scope.password1!=$scope.password2){
                $scope.error="password must be same as confirm password"
            }else{
                    
             $http.post("http://localhost:3000/givebsignupdata",data).then(function(response){
                 
                   console.log("else");
                //    $location.url('/loginnew.html');
                    // console.log($location);
                      $window.location.href = "loginnew.html";
                
            });
            }
        console.log(data);
    }
}
    
})


app.controller("csignController",function($scope,$http,$window){
    console.log("controller");
    
    $scope.csignup=function(){
        if($scope.email==null){
            $scope.emailError="email cannot be null"

        
        }
        else if($scope.gender==null){
            
            $scope.genderError="gender cannot be null"


        }
        else if($scope.name==null){
            
            $scope.nameError=" name cannot be null"

        }
        else if($scope.uname==null){
            
            $scope.unameError="username cannot be null"

        }
        
        else if($scope.phone==null){
            
            $scope.phoneError="phone number cannot be null"

        }
        
        else if($scope.address==null){
            
            $scope.addressError="address cannot be null"

        }
        
        else if($scope.state==null){
            
            $scope.stateError="state cannot be null"

        }
        
        else if($scope.pincode==null){
            
            $scope.pincodeError="pincode cannot be null"

        }
        else if($scope.password1==null){
            
            $scope.password1Error="password cannot be null"

        }
        else if($scope.password2==null){
            
            $scope.password2Error="password cannot be null"

        }
        
        else{
            $scope.emailError="";
            $scope.genderError="";
            $scope.bnameError="";
            
            $scope.nameError="";
            $scope.phoneError="";
            $scope.addressError="";
            $scope.stateError="";
            $scope.pincodeError="";
            $scope.password1Error="";
            $scope.password2Error="";
           
        let data={
            "name":$scope.name,
            "gender":$scope.gender,
            "uname":$scope.uname,
            "email":$scope.email,
            "phone":$scope.phone,
            "address":$scope.address,
            "state":$scope.state,
            "pincode":$scope.pincode,
            "password1":$scope.password1,
            "password2":$scope.password2
        };
            if($scope.password1!=$scope.password2){
                $scope.error="password must be same as confirm password"
            }else{
                    
             $http.post("http://localhost:3000/givecsignupdata",data).then(function(response){
                if(response.data.msg==null){    
                    $scope.error=response.data.msg;
                }
                else{
                    var host = $window.location.host;
                    var landingUrl = "loginnew.html";
                      $window.location.href = landingUrl;
                }
            });
            }
        console.log(data);
    }
}
    
})


app.controller("loginController",function($scope,$http,$window){
    $scope.login=function(){
        console.log("login called");
        let data={
            "email":$scope.email,
            "password":$scope.pwd
        }
        console.log(data);
        $http.post("http://localhost:3000/login",data).then(function(response){
        console.log("boutique home page")
        if(response.data.msg=="invalid email or password"){    
            $scope.error=response.data.msg;
        }
        else{
            $window.location.href = "boutiquehome.html";
        }
        });
    }
});