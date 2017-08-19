 function calc(e, link) {
    e.preventDefault();

    const principal = document.getElementById("input-0-principal").value;
    const rate = document.getElementById("input-0-rate").value / 100;
    const time = document.getElementById("input-time").value;

    const frequencies = document.getElementsByName('frequency');
    var period = 12;

    for (var i = 0; i < frequencies.length; i++) { 
        if (frequencies[i].checked) { // Is radio button checked
            period = frequencies[i].value; // The value of selected radio button
            break;
        }
    }

    const monthly = principal * (rate / period) / (1 - Math.pow((1 + (rate / period)), (-period * time)));
    const totalPaid = monthly * (period * time);
    const interestPaid = totalPaid - principal;
    const salary10 = (monthly * (100 / 10)) * 12;
    const salary15 = (monthly * (100 / 15)) * 12;
    
    document.getElementById("output-principal").innerHTML = principal;
    document.getElementById("output-rate").innerHTML = (rate*100).toFixed(2);
    document.getElementById("output-time").innerHTML = time;
    document.getElementById("output-monthly").innerHTML = monthly.toFixed(2);
    document.getElementById("output-total-paid").innerHTML = totalPaid.toFixed(2).toLocaleString();
    document.getElementById("output-interest-paid").innerHTML = interestPaid.toFixed(2).toLocaleString();
    document.getElementById("output-10-salary").innerHTML = salary10.toFixed(2);
    document.getElementById("output-15-salary").innerHTML = salary15.toFixed(2);

}

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
		document.getElementById("loans-calculate-button").addEventListener('click', function(event){ calc(event, this); }, false);
        document.getElementById("loans-clear-button").addEventListener('click', function(){ clear(); }, false);
        document.getElementById("loans-add-button").addEventListener('click', function(){ addLoan(); }, false);
	}
};