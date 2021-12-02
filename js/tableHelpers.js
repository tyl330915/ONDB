	function drawTable(obj, target) {
	    console.log(target);
	    console.log(obj);

	    document.getElementById(target).innerHTML = '';

	    var tbody = document.getElementById(target);
	    //tbody.innerHTML = '';
	    //tbody.border = "1";
	    //tbody.padding = "3";



	    var headerNames = Object.getOwnPropertyNames(obj[0]);
	    var columnCount = headerNames.length;
	    var row = tbody.insertRow(-1);

	    for (var i = 0; i < columnCount; i++) {
	        var headerCell = document.createElement("th");
	        headerCell.innerHTML = headerNames[i];
	        row.appendChild(headerCell);
	    };

	    // loop through data source
	    for (var i = 0; i < obj.length; i++) {
	        var tr = document.createElement("tr");
	        for (var colName in obj[i]) {
	            var td = document.createElement("td");
	            td.innerHTML = obj[i][colName];
	            tr.appendChild(td);
	        }

	        tbody.appendChild(tr);
	    };
	};

	function generateTable(data) {
	    let table = document.getElementById("searchTable");
	    for (let element of data) {
	        let row = table.insertRow();
	        for (key in element) {
	            let cell = row.insertCell();

	            let text = document.createTextNode(element[key]);
	            cell.appendChild(text);
	        }
	    }
	};

	/*
	function cleanTableData(recs) {
	    let parsedRecords = [];

	    for (let i = 0; i < recs.length; i++) {
	        let rNote = "";
	        let rType = "";
	        let rMod = "";
	        let rAge = "";
	        let rOcc = "";

	        if (recs[i].Notes) { rNote = recs[i].Notes };
	        if (recs[i].RecordType) { rType = recs[i].recordType };
	        if (recs[i].Modified) { rMod = recs[i].Modified };
	        if (recs[i].Age) { rAge = recs[i].Age };
	        if (recs[i].Occupation) { rOcc = recs[i].Occupation };

	        pRec = {
	            "Surname": recs[i].Surname,
	            "Firstname": recs[i].Firstname,
	            "Location": recs[i].Location,
	            "Date": recs[i].Date,
	            "OriginalRef": recs[i].OriginalRef,
	            "Volume": recs[i].Volume,
	            "Page": recs[i].Page,
	            "Notes": rNote,
	            "RecordType": rType,
	            "Modified": rMod,
	            "Age": rAge,
	            "Occupation": rOcc


	        };
	        parsedRecords.push(pRec);
	    };

	    console.log(parsedRecords);
	    return parsedRecords;

	};
*/