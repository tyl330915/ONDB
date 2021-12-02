	let searchData = [];
	let rIndex = '';


	function allGet() {

	    fetch(dataURL, {
	            headers: {
	                Accept: "application/json",
	                "Content-Type": "application/json"
	            }
	        })
	        .then(response => response.json())
	        .then(json => searchData = json)
	        .then(searchData => displayResults(searchData))
	        //.then(res  => getRow())
	        //console.log(data.people[0]);
	        //findPeople(data)
	        // console.log("https://jsonbox.io/_meta/box_708c461ce8ccf738f6c7/_count")
	};

	function loadRecType() {
	    var select = document.getElementById("recordType");
	    var options = ["PMR1", "WILL", "ANOT", "THIS", "THAT"];

	    var el = document.createElement("option");
	    el.textContent = "Record Type";
	    el.value = "";
	    select.appendChild(el);

	    for (var i = 0; i < options.length; i++) {
	        var opt = options[i];
	        var el = document.createElement("option");
	        el.textContent = opt;
	        el.value = opt;
	        select.appendChild(el);
	    };
	};

	function searchString() {
	    const form = document.forms[0];

	    form.addEventListener("submit", function(event) {
	        event.preventDefault();
	        new FormData(form);
	    });

	    let searchTerms = searchParse();
	    console.log(searchTerms);
	    //SEARCH ALGORITHM
	    //searchFor(searchTerms);

	};

	function searchFor(searchTerm) {
	    fetch("https://jsonbox.io/box_708c461ce8ccf738f6c7" + searchTerm, { ///?q=Surname:Tester", {
	        headers: {
	            Accept: "application/json",
	            "Content-Type": "application/json"
	        }
	    })

	    .then(response => response.json())
	        .then(json => searchData = json)
	        .then(searchData => displayResults(searchData))
	        /*
	        .then(response => response.json())
	        .then(data => {
	          console.log('Success:', data);
	          displayResults(data);
	        */
	        //})
	        .catch((error) => {
	            console.error('Error:', error);
	        });
	};

	function displayResults(data) {
	    //console.log("Data: " + data);
	    if (data.length > 0) {
	        let displayArray = [];
	        let sortBySurnameAndFirstname = data.sort(function(a, b) {
	            return a.Surname.localeCompare(b.Surname) || a.Firstname.localeCompare(b.Firstname);
	        });

	        for (let b = 0; b < sortBySurnameAndFirstname.length; b++) {
	            let dAge = '';
	            if (sortBySurnameAndFirstname[b].Age) { dAge = sortBySurnameAndFirstname[b].Age };

	            let displayEach = {
	                "Surname": sortBySurnameAndFirstname[b].Surname,
	                "Firstname": sortBySurnameAndFirstname[b].Firstname,
	                "Location": sortBySurnameAndFirstname[b].Location,
	                "Date": sortBySurnameAndFirstname[b].Date
	            }
	            displayArray.push(displayEach);
	        };


	        drawTable(displayArray, "searchTable");
	        getRow();
	        document.getElementById("messageArea").innerText = "Records found: " + data.length;
	    } else {
	        document.getElementById("searchTable").innerText = "";
	        document.getElementById("messageArea").innerText = "No records found";
	    }

	};


	function getRow(tableId, callback) {
	    let table = document.getElementById("searchTable");
	    let currentRecord = [];
	    for (var i = 1; i < table.rows.length; i++) {
	        table.rows[i].onclick = function() {
	            rIndex = this.rowIndex;
	            console.log(rIndex);
	            currentRecord = filteredPeople[rIndex - 1];
	            console.table(currentRecord);
	            let rNote = "";
	            let rType = "";
	            let rMod = "";
	            let rAge = "";
	            let rOcc = "";

	            if (currentRecord.Notes) { rNote = currentRecord.Notes };
	            if (currentRecord.recordType) { rType = currentRecord.recordType };
	            if (currentRecord.Modified) { rMod = currentRecord.Modified };
	            if (currentRecord.Age) { rAge = currentRecord.Age };
	            if (currentRecord.Occupation) { rOcc = currentRecord.Occupation };

	            modal.style.display = "block";
	            document.getElementById("modBody").innerHTML =
	                "<table> <tr> <td>Name: <td class = 'edit' ><b>" + currentRecord.Surname + "</b></td></tr>" +
	                "<tr> <td>First Name: <td class = 'edit' ><b>" + currentRecord.Firstname + "</b></td></tr>" +
	                "<tr> <td>Age: <td class = 'edit' ><b>" + rAge + "</b></td></tr>" +
	                "<tr> <td>Occupation: <td class = 'edit' ><b>" + rOcc + "</b></td></tr>" +
	                "<tr> <td>Date: <td  class = 'edit' ><b>" + currentRecord.Date + "</b></td></tr>" +
	                "<tr> <td>Volume: <td class = 'edit' ><b>" + currentRecord.Volume + "</b></td></tr>" +
	                "<tr> <td>Original Reference: <td class = 'edit' ><b>" + currentRecord.OriginalRef + "</b></td></tr>" +
	                "<tr> <td>Record Type: <td class = 'edit' ><b>" + rType + "</b></td></tr>" +
	                "<tr> <td>Notes: <td class = 'edit' ><b>" + rNote + "</b></td></tr>" // +
	                //"<tr> <td>Modified: <td><b>" + rMod + "</b></td></tr>" +
	                //"<tr> <td>Created on: <td><b>" + currentRecord._createdOn.slice(0, 10) + "</b></td></tr>"



	        };
	    };

	};

	function deleteRecord() {
	    console.log(rIndex);
	    let currentRecord = searchData[rIndex];
	    let deleteID = searchData[rIndex - 1]._id;
	    console.log("Deleting");

	    fetch("https://jsonbox.io/box_708c461ce8ccf738f6c7/" + deleteID, {
	            method: "DELETE"
	        })
	        .then(response => console.log(response))
	        /*
	        document.getElementById("modBody").innerHTML = 
	        	"<div>Name: <b>" + currentRecord.Surname + ", " + currentRecord.Firstname + "</b></div>" +
	        	"<p><p><p><div><h3>Deleted</h3></div>"
	        */
	    modal.style.display = "none";
	    alert("<h2>" + currentRecord.Surname + ", " + currentRecord.Firstname + " deleted </h2>");
	};


	function editRecord() {
	    let currentRecord = searchData[rIndex];
	    let editID = searchData[rIndex - 1]._id;

	    let editors = document.getElementsByClassName('edit');
	    for (let i = 0; i < editors.length; i++) {
	        editors[i].setAttribute("contenteditable", "true");
	    }

	};

	function closeModal() {
	    modal.style.display = "none";
	};

	firstBy = (function() {
	    function e(f) {
	        f.thenBy = t;
	        return f
	    }

	    function t(y, x) { x = this; return e(function(a, b) { return x(a, b) || y(a, b) }) }
	    return e
	})();