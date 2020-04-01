"use strick";

var $ = function(id){
    return(document.getElementById(id));
}

var exp;
var preOperator;
var isOperatorSet = 0; //any operation is alredy done
var isEqualSet = 0;  //equal operation is done
var isExpo = 0;  //exponantion function is being performed 
var isSplOprSet = 0; // any special operation is alredy done
var numbers = /^[-+]?\d+(\.\d+)?$/;  //to ensure only numeric values 
var operatorList = ['+', '-', '/', '*']; // array of all operators

//when any number clicked the function called
function insertNumber(number){

    // handling the display of the both screen 
    if(isSplOprSet == 1){
        $("main").value = number;
        $("history").value = number;
        isSplOprSet = 0;
    }
    else if(isOperatorSet == 0 && isEqualSet == 0){
        $("main").value = $("main").value + number;
        $("history").value = $("history").value + number;
        isOperatorSet = 0;
    }
    else if(isOperatorSet == 1 && isEqualSet == 0){
        $("main").value = $("main").value + number;
        $("history").value = $("history").value + number;
        isOperatorSet = 0;
    }
    else if(isEqualSet == 1 && isOperatorSet == 1){
        $("main").value = number;
        $("history").value = $("history").value + number;
        isEqualSet = 0;
        isOperatorSet = 1;
    }
    else if(isEqualSet == 1){
        $("history").value = number;
        $("main").value = number;
        isEqualSet = 0;
    }
    
}

//when any normal operator is clicked 
function insertOperator(operator){
    exp = $("history").value;
    currentNumber = $("main").value;
    
    //checking that any number is exist
    if (currentNumber.match(numbers)){
        var currentOperator = operator;
        preOperator = exp.substring(exp.length-1,exp.length);
        
        //matching the entered operator and existing operator
        if(currentOperator != preOperator){
            if(isSplOprSet == 1) {
                $("history").value = $("main").value + operator;
                $("main").value = "";
                isOperatorSet = 1;
                isSplOprSet = 0;
            }
            else if(isOperatorSet == 0){
                var midValue = eval(exp);
                $("history").value = midValue + operator;
                $("main").value = "";
                isOperatorSet = 1;
            }
            
        }
        
    }
    
    //replacing the last entered operator 
    else if(isOperatorSet == 1){
        var preValue = exp.substring(0 , exp.length-1);
        $("history").value = preValue + operator;
    }
}


//when any special operator is clicked 
function insertSpelOperator(operator){
    
    //checking for any number exixt 
    if($("main").value.match(numbers) && operator != 'π'){
        exp = $("main").value;
        $("history").value = operator +'(' + $("main").value + ')';
        switch(operator){
                case 'sin' :    $("main").value = Math.sin(exp).toFixed(6);
                                isSplOprSet = 1;
                                break;
                case 'cos' :    $("main").value = Math.cos(exp).toFixed(6);
                                isSplOprSet = 1;
                                break;
                case 'tan' :    $("main").value = Math.cos(exp).toFixed(2);
                                isSplOprSet = 1;
                                break;
                case 'log' :    $("main").value = Math.log(exp).toFixed(2);
                                isSplOprSet = 1;
                                break;
                case 'sqrt' :    $("main").value = Math.sqrt(exp).toFixed(2);
                                isSplOprSet = 1;
                                break;
                case 'sqr' :    $("main").value = Math.pow(exp,2);
                                isSplOprSet = 1;
                                break;
                case 'e' :      $("history").value = $("main").value + ".e + ";
                                $("main").value = "";
                                isExpo = 1;
                                break;
        }
    }
    
    //executing function without presence of number
    else if(operator == 'π'){
        $("history").value = operator +'(' + $("main").value + ')';
        if($("main").value == ""){
            $("main").value = 1;
        }
        $("main").value = ($("main").value * 3.14159265).toFixed(8);
        isSplOprSet = 1;
    }
}


//when percentage button is clicked
function percentage(){
    exp = $("history").value;
    for(var i=0; i<4; i++){
        if(exp.indexOf(operatorList[i]) != -1){
            var placeValue = exp.indexOf(operatorList[i]);
            var operator = operatorList[i];
        }
    }
        var num = exp.substring(0, placeValue);
        var percentage = (num/100) * $("main").value;
        $("main").value = percentage.toFixed(2);
        $("history").value = num + operator + percentage.toFixed(2);
        isSplOprSet = 1;
}

//when negative/positive number button is clicked
function plusMinus(){
    exp = $("main").value;
    var firstCharacter = exp.substring(0 , 1);
    if(firstCharacter == '-'){
        $("main").value = $("main").value.slice(1 , exp.length);
    }
    else{
        $("main").value = -Math.abs($("main").value);
        $("history").value = -Math.abs($("history").value);
    }
}


//when (dot) button is clicked
function decimal(){
    var input = $("main").value;
    
    //allowed (.)only once in string
    if(input.indexOf('.') == -1){
        
        //directly (.) is being clicked
        if($("main").value == "" || isEqualSet == 1){
            $("main").value = "0.";
            $("history").value = "0.";
        }
        else{
            exp = $("history").value;
            $("main").value = $("main").value + '.';
            $("history").value = exp + '.';
        }
    }
}


//when equal button is clicked
function equal(){
    
    //perform exponential function
    if(isExpo == 1){
        var str = $("history").value;
        var base = str.substring(0 , str.length-5);
        $("main").value = Math.pow(base , $("main").value);
        isExpo = 0;
        isSplOprSet = 1;
    }
    
    //perform all the evalutions
    else{
        exp = $("history").value;
        if(exp){
            var ans = eval(exp);
            var display = (Number.isInteger(ans)) ? parseInt(ans) : parseFloat(ans).toFixed(2);
            $("main").value = display;
            isEqualSet = 1;
            isOperatorSet = 0;
        }
    }
}


//when clear screen button is clicked
function clearscreen(){
    exp = $("history").value;
    $("history").value = '';
    $("main").value = '';
    isEqualSet = 0;
    isOperatorSet = 0;
}


//when back space button is clicked
function back(){
    exp = $("history").value;
    main = $("main").value;
    $("history").value = exp.substring(0,exp.length-1);
    $("main").value = main.substring(0,main.length-1);
}