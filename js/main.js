function move(e, link) {
    e.preventDefault();
        /*console.log(document.getElementsByClassName("student")[0].innerHTML)
        /var userName = document.getElementById("nameI").value;

        if(userName !== "") {
            document.getElementsByClassName("student")[0].innerHTML = document.getElementById("nameI").value;
        }*/

        var position = parseInt(link.getAttribute("id").substr(1));
        document.getElementById("loc").innerHTML=position;

        document.getElementById("info0"+(position-1).toString()).style.display="none";
        document.getElementById("info0"+(position).toString()).style.display="block";
        document.getElementById("content0"+(position-1).toString()).style.display="none";
        document.getElementById("content0"+(position).toString()).style.display="block";

    
}

function calc(e, link) {
    e.preventDefault();
    document.getElementById("info0"+document.getElementById("loc").innerHTML).style.display="none";

    var m = 0;
    var a = 0;
    var i = 0;
    var salary = 0;
    var p = document.getElementById("pI").value;
    var r = (document.getElementById("rI").value/100);
    var t = document.getElementById("tI").value;
    var n = 12;

    var radios6 = document.getElementsByName('radio6');
    
    for (var i = 0, length = radios6.length; i < length; i++) {
        if (radios6[i].checked) {
            // Grab the value of selected radio button
            n = radios6[i].value;
            break;
        }
    }

    m = (p*(r/n))/(1-Math.pow((1+r/n), -(n*t)));
    a = m * (n*t);
    i = a - p;
    salary = (m / 0.10) * 12;

    
    document.getElementById("info010").style.display="block";
    document.getElementById("pO").innerHTML = p;
    document.getElementById("rO").innerHTML = (r*100).toFixed(1);
    document.getElementById("tO").innerHTML = t;
    document.getElementById("nO").innerHTML = n;
    document.getElementById("mO").innerHTML = m.toFixed(2);
    document.getElementById("aO").innerHTML = a.toFixed(2);
    document.getElementById("iO").innerHTML = i.toFixed(2);
    document.getElementById("sO").innerHTML = salary.toFixed(2);

}


function quiz(e, link) {
    e.preventDefault();
    var quizNum = link.getAttribute("id").substr(1);
    
    if(quizNum === "00"){
        var radios1 = document.getElementsByName('radio1');
        var result1 = 0;
        var correct1 = false;
        for (var i = 0, length = radios1.length; i < length; i++) {
            if (radios1[i].checked) {
                // Grab the value of selected radio button
                result1 = radios1[i].value;
                break;
            }
        }

        var radios2 = document.getElementsByName('radio2');
        var result2 = 0;
        var correct2 = false;
        for (var i = 0, length = radios2.length; i < length; i++) {
            if (radios2[i].checked) {
                // Grab the value of selected radio button
                result2 = radios2[i].value;
                break;
            }
        }

        document.getElementById("info0"+document.getElementById("loc").innerHTML).style.display="none";
        document.getElementById("info03").style.display="block";

        if (result1==="1100"){
            correct1 = true;
            document.getElementById("q1R").style.display="block";
        } else {
            document.getElementById("q1W").style.display="block";
        }
        if (result2 === "6") {
            correct2 = true;
            document.getElementById("q2R").style.display="block";
        } else {
            document.getElementById("q2W").style.display="block";
        }
        document.getElementById("content02").style.display="none";
        document.getElementById("content03").style.display="block";
    }
    else if(quizNum === "01")
    {
        var radios3 = document.getElementsByName('radio3');
        var result3 = 0;
        var correct3 = false;
        for (var i = 0, length = radios3.length; i < length; i++) {
            if (radios3[i].checked) {
                // Grab the value of selected radio button
                result3 = radios3[i].value;
                break;
            }
        }

        var radios4 = document.getElementsByName('radio4');
        var result4 = 0;
        var correct4 = false;
        for (var i = 0, length = radios4.length; i < length; i++) {
            if (radios4[i].checked) {
                // Grab the value of selected radio button
                result4 = radios4[i].value;
                break;
            }
        } 

        document.getElementById("info0"+document.getElementById("loc").innerHTML).style.display="none";
        document.getElementById("info06").style.display="block";

        if (result3==="higher"){
            correct3 = true;
            document.getElementById("q3R").style.display="block";
        } else {
            document.getElementById("q3W").style.display="block";
        }
        if (result4 === "60") {
            correct4 = true;
            document.getElementById("q4R").style.display="block";
        } else {
            document.getElementById("q4W").style.display="block";
        }
        document.getElementById("content05").style.display="none";
        document.getElementById("content06").style.display="block";
    }
    else if (quizNum === "02")
    {
        var radios5 = document.getElementsByName('radio5');
        var result5 = 0;
        var correct5 = false;
        for (var i = 0, length = radios5.length; i < length; i++) {
            if (radios5[i].checked) {
                // Grab the value of selected radio button
                result5 = radios5[i].value;
                break;
            }
        }

        document.getElementById("info0"+document.getElementById("loc").innerHTML).style.display="none";
        document.getElementById("info09").style.display="block";

        if (result5==="7183.26"){
            correct5 = true;
            document.getElementById("q5R").style.display="block";
        } else {
            document.getElementById("q5W").style.display="block";
        }
        
        document.getElementById("content08").style.display="none";
        document.getElementById("content09").style.display="block";  
    }
}

function listeners() {
	document.getElementById('p01').onclick = function (e) {
        e.preventDefault();
	

		

		document.getElementById("info00").style.display="none";
        document.getElementById("info01").style.display="block";
        document.getElementById("content00").style.display="none";
        document.getElementById("content01").style.display="block";

    }

    var moves = document.getElementsByClassName("move");

    for(var i=0;i<moves.length;i++){
      moves[i].addEventListener('click', function(e){move(e, this)}, false);
    }

    var quizzes = document.getElementsByClassName("quiz");



    for(var i=0;i<quizzes.length;i++){
      quizzes[i].addEventListener('click', function(e){quiz(e, this)}, false);
    }

    document.getElementById("calculate").addEventListener('click', function(e){calc(e, this)}, false);

}


document.onreadystatechange = function () {
    if (document.readyState == "complete") {

	   listeners();

    }
};