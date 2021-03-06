function dismissMenu(e) {
    const navList = document.getElementsByClassName("nav-ul")[0];
    const isClickOnNavList = e.target.className === 'nav-ul';
    if(navList.className !== "nav-ul" && !isClickOnNavList)
    {
        openCloseMenu(e);
    }
}

function openCloseMenu(e)
{
    e.stopPropagation();
    const navList = document.getElementsByClassName("nav-ul")[0];
    navList.classList.toggle("open");
}

/**
 * @return void
**/
function addLoan() {
    const loansElement = document.getElementById("loans");
    const loans = document.getElementsByClassName("loan")
    const lastLoan = loans[loans.length - 1]; 
    var lastLoanId = lastLoan.id.slice(-2);
    if (lastLoanId[0] === "-") {
        lastLoanId = lastLoanId.slice(-1);
    }
    const loan = createLoanRow(+lastLoanId + 1);
    loansElement.appendChild(loan);
    calc();
}

/**
 * @param integer i
 * @return Element
**/
function createLoanRow(i) {
    const loan = document.createElement("div");
    loan.className = "loan";
    loan.id = "loan-" + i;

    const removeButton = createRemoveButton(i);
    loan.appendChild(removeButton);

    const typeSelect = createTypeSelect(i);
    loan.appendChild(typeSelect);

    const principalInput = createPrincipalInput(i);
    loan.appendChild(principalInput);

    const rateInput = createRateInput(i);
    loan.appendChild(rateInput);

    const clear = document.createElement("div");
    clear.className = "clear";
    loan.appendChild(clear);

    return loan;
 }

/**
 * @param integer i
 * @return Element
**/
function createTypeSelect(i) {
    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";

    // Type Select Label
    const label = document.createElement("label");
    const labelContents = document.createTextNode("Type");
    label.appendChild(labelContents);
    label.className = "loan-label loan-label-select";
    label.htmlFor = "input-" + i + "-type";
    inputGroup.appendChild(label);

    // Type Select
    const select = document.createElement("select");
    select.className = 'loan-input';
    select.id = 'input-' + i + "-type";

    const options = [
        {
            id: "option-" + i + "-student",
            label: "Student Loan"
        },
        {
            id: "option-" + i + "-mortgage",
            label: "Mortgage"
        },
        {
            id: "option-" + i + "-auto",
            label: "Auto"
        },
        {
            id: "option-" + i + "-credit",
            label: "Credit Card"
        },
        {
            id: "option-" + i + "-other",
            label: "Other"
        }
    ]

    options.forEach(function(option) {
        const typeSelectOption = createSelectOption(option.id, option.label);
        select.appendChild(typeSelectOption);
    })

    inputGroup.appendChild(select);
    return inputGroup;
}

/**
 * @param String id
 * @param String label
 * @return Element
**/
function createSelectOption(id, label) {
    const option = document.createElement("option")
    option.id = id;
    const optionContents = document.createTextNode(label);
    option.appendChild(optionContents);

    return option;
 }

/**
 * @param integer i
 * @void Element
**/
function createPrincipalInput(i) {
    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";
    
    // Principal Input Label
    const label = document.createElement("label");
    const labelContents = document.createTextNode("Principal");
    label.appendChild(labelContents);
    label.className = "loan-label";
    label.htmlFor = "input-" + i + "-principal";
    inputGroup.appendChild(label);

    // Principal Input Decorator
    const decorator = document.createElement("span");
    decorator.className = "input-decorator";
    const decoratorContents = document.createTextNode("$");
    decorator.appendChild(decoratorContents);
    inputGroup.appendChild(decorator);

    // Principal Input
    const input = document.createElement("input");
    input.className = "loan-input loan-input-principal";
    input.id = "input-" + i + "-principal";
    input.min = "1.00";
    input.max = "1000000.00";
    input.step = ".01";
    input.type = "number";
    input.value = "30000.00";
    input.onchange = function(){ calc(); };
    inputGroup.appendChild(input);

    return inputGroup;
}

/**
 * @param integer i
 * @void Element
**/
function createRateInput(i) {
    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";

    // Rate Input Label
    const label = document.createElement("label");
    const labelContents = document.createTextNode("at rate");
    label.appendChild(labelContents);
    label.className = "loan-label";
    label.htmlFor = "input-" + i + "-rate";
    inputGroup.appendChild(label);

    // Rate Input Decorator
    const decorator = document.createElement("span");
    decorator.className = "input-decorator";
    const decoratorContents = document.createTextNode("%");
    decorator.appendChild(decoratorContents);
    inputGroup.appendChild(decorator);

    // Rate Input
    const input = document.createElement("input");
    input.className = "loan-input loan-input-rate";
    input.id = "input-" + i + "-rate";
    input.min = "0.10";
    input.max = "99.99";
    input.step = ".01";
    input.type = "number";
    input.value = "3.8";
    input.onchange = function(){ calc();};
    inputGroup.appendChild(input);

    return inputGroup;
}

/**
 * @param integer i
 * @return Element
**/
function createRemoveButton(i) {
    const button = document.createElement("button");
    button.className = "button-remove";

    const buttonIcon = document.createElement('img');
    buttonIcon.alt = "Remove icon";
    buttonIcon.className = "button-remove-icon"
    buttonIcon.src = "images/round-delete-button.svg";
    button.appendChild(buttonIcon);

    const buttonContents = document.createTextNode("Remove");
    button.appendChild(buttonContents);

    button.onclick = function(event){ removeRow(event, i); calc(); };

    return button;
}


/**
 * @param Event event
 * @param integer i
 * @return void
**/
function removeRow(event, i) {
    event.preventDefault();
    const loans = document.getElementById("loans");
    const loanToRemove = document.getElementById("loan-" +i);
    if (loanToRemove) {
        loans.removeChild(loanToRemove);
    }
}

/**
 * @param Event event
 * @return void
**/
function calc(event) {
    if (event) {
        event.preventDefault();
    }

    const time = document.getElementById("input-time").value;

    const frequencies = document.getElementsByName('frequency');
    var period = 12;

    for (var i = 0; i < frequencies.length; i++) { 
        if (frequencies[i].checked) { // Is radio button checked
            period = frequencies[i].value; // The value of selected radio button
            break;
        }
    }

    const principals = [];
    const rates = [];

    const loans = document.getElementsByClassName("loan");
    console.debug("Number of loans: " + loans.length);

    var totalPrincipal = 0;

    var i = 0;
    var j = 0;
    while (j < loans.length) {
        const loan = document.getElementById("input-" + i + "-principal")
        if (loan) {
            const principal = document.getElementById("input-" + i + "-principal").value;
            principals.push(principal);
            totalPrincipal = totalPrincipal + +principal;
            rates.push(document.getElementById("input-" + i + "-rate").value / 100);
            j++;
        }
        i++;
    }
    console.debug("Total Principal: " + totalPrincipal);

    var totalWeightFactor = 0;
    rates.forEach(function(r, index) {
        totalWeightFactor += r * +principals[index];
    });
    console.debug("Total weight factor: " + totalWeightFactor)
    const rate = totalWeightFactor / totalPrincipal;
    console.debug("Weighted APR: " + (rate * 100).toFixed(2));

    const monthly = getMonthlyPayment(totalPrincipal, rate, time, period);
    console.debug("Monthly Payment: " + monthly);
    const totalPaid = monthly * (12 * time);
    const interestPaid = totalPaid - totalPrincipal;
    const salary10 = (monthly * (100 / 10)) * 12;
    const salary15 = (monthly * (100 / 15)) * 12;
    
    document.getElementById("output-principal").innerHTML = totalPrincipal.toFixed(2);
    document.getElementById("output-rate").innerHTML = (rate*100).toFixed(2);
    document.getElementById("output-time").innerHTML = time;
    document.getElementById("output-monthly").innerHTML = monthly.toFixed(2);
    document.getElementById("output-total-paid").innerHTML = totalPaid.toFixed(2).toLocaleString("en");
    document.getElementById("output-interest-paid").innerHTML = interestPaid.toFixed(2).toLocaleString("en");
    document.getElementById("output-10-salary").innerHTML = salary10.toFixed(2);
    document.getElementById("output-15-salary").innerHTML = salary15.toFixed(2);
    document.getElementById("output-15-salary").innerHTML = salary15.toFixed(2);
    document.getElementById("output-frequency").innerHTML = period;
    document.getElementById("output-number-loans").innerHTML = principals.length;
}

/**
 * @param float principal
 * @param float rate
 * @param integer time
 * @param integer period
 * @return float
**/

function getMonthlyPayment(principal, rate, time, period) {
    var monthly = principal * (rate / period) / (1 - Math.pow((1 + (rate / period)), (-period * time)));

    if (period == 4) {
        monthly = monthly / 3;
    } else if (period == 1) {
        monthly = monthly / 12;
    }

    return monthly;
}

/**
 * @return void
**/
function clear() {
    location.reload();
}

/**
 * @return void
**/
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
		document.getElementById("loans-calculate-button").addEventListener('click', function(event){ calc(event); }, false);
        document.getElementById("input-0-rate").addEventListener('change', function(){ calc(); }, false);
        document.getElementById("input-0-rate").addEventListener('change', function(){ calc(); }, false);
        document.getElementById("loans-clear-button").addEventListener('click', function(){ clear(); }, false);
        document.getElementById("loans-add-button").addEventListener('click', function(){ addLoan(); }, false);
        document.getElementById("main").addEventListener('click', function(event){ dismissMenu(event); }, false);
	}
};