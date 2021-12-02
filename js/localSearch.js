function nestedFilter(targetArray) {
    let filters = [];
    filters.Surname = document.getElementById("Surname").value.toLowerCase();
    filters.Firstname = document.getElementById("firstName").value.toLowerCase();
    filters.Location = document.getElementById("Loc").value.toLowerCase();


    console.log(filters);
    let filterKeys = Object.keys(filters);

    result = targetArray.filter(function(eachObj) {
        return filterKeys.every(function(eachKey) {
            if (!filters[eachKey].length) {
                return true;
            }
            return filters[eachKey].includes(eachObj[eachKey].toLowerCase());
        });

    });
    console.table(result);
    findDates(result);
};

function findDates(initialSearch) {
    let dateChoice = "";
    let dateA = "";
    let dateB = "";
    let date1 = "";
    let date2 = "";

    dateChoice = document.getElementById("yearChoice").value;
    dateA = document.getElementById("Year").value.trim();
    dateB = document.getElementById("Year2").value.trim();
    date1 = parseInt(dateA);
    date2 = parseInt(dateB);

    //console.log(dateChoice, date1, date2);

    if (date1) {

        if (dateChoice.includes("is")) {
            searchResults = initialSearch.filter(function(currentElement) {
                console.log(dateChoice, date1 - currentElement.Date);
                if (date1 === currentElement.Date) {
                    return true;
                }
            });
        };

        if (dateChoice.includes("before")) {
            searchResults = initialSearch.filter(function(currentElement) {
                console.log(dateChoice, date1 - currentElement.Date);
                if (currentElement.Date < date1) {
                    return true;
                }
            });
        };

        if (dateChoice === "after") {
            searchResults = initialSearch.filter(function(currentElement) {
                console.log(dateChoice, date1 - currentElement.Date);
                if (currentElement.Date > date1) {
                    return true;
                }
            });
        };

        if (dateChoice === "between") {
            searchResults = initialSearch.filter(function(currentElement) {
                if (currentElement.Date >= date1 && currentElement.Date <= date2) {
                    return true;
                }
            });
        };
    } else {
        searchResults = initialSearch;
    }

    let shortResults = [{}];
    for (
        let j = 0; j < searchResults.length; j++) {
        shortResults.push({
            "Surname": searchResults[j].Surname,
            "Firstname": searchResults[j].Firstname,
            "Year": searchResults[j].Date,
            "Location": searchResults[j].Location,
            "Notes": searchResults[j].Notes
        });

    };
    //console.table(shortResults);

    if (this.searchResults.length < 1) {
        document.getElementById("messageArea").innerHTML = "No records found";
        console.log("No records");
    } else {

        document.getElementById("messageArea").innerHTML = this.searchResults.length + " records found";
    };
    drawTable(searchResults, "searchTable");
    //generateTable(searchResults);
    getRow();
};

function resetForm() {
    document.getElementById('searchForm').reset();
};



function getRow() {
    let table = document.getElementById("searchTable");
    currentRecord = {};
    let modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {
            rIndex = this.rowIndex;
            let rowSelected = table.getElementsByTagName('tr')[rIndex];
            console.log(rowSelected);

            currentRecord.Surname = rowSelected.getElementsByTagName("td")[0].innerHTML;

            modal.style.display = "block";
            document.getElementById("modalSurname").innerHTML = currentRecord.Surname;
            document.getElementById("modalFirstname").innerHTML = rowSelected.getElementsByTagName("td")[1].innerHTML;
            document.getElementById("modalYear").innerHTML = rowSelected.getElementsByTagName("td")[3].innerHTML;
            document.getElementById("modalLoc").innerHTML = rowSelected.getElementsByTagName("td")[2].innerHTML;
            document.getElementById("modalVolume").innerHTML = rowSelected.getElementsByTagName("td")[4].innerHTML;
            document.getElementById("modalPages").innerHTML = rowSelected.getElementsByTagName("td")[5].innerHTML;
            document.getElementById("modalOrigRef").innerHTML = rowSelected.getElementsByTagName("td")[6].innerHTML;
            document.getElementById("modalNotes").innerHTML = rowSelected.getElementsByTagName("td")[7].innerHTML;

        };
    };


    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        span.onclick = function() {
            modal.style.display = "none";
        }

    };

};

function yearOption() {
    if (document.getElementById("yearChoice").value == "between") {
        document.getElementById("Year2").style = "display: block";
    } else {
        document.getElementById("Year2").style = "display: none";
    }
};