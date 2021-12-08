function fuzzyName(targetArray) {

    let searchSurname = document.getElementById("Surname").value; //.toLowerCase();

    //IF THE SURNAME FIELD IS BLANK, GO THROUGH TO SEARCH THE OTHER FORM ENTRIES
    if (searchSurname == "") {
        searchOtherFields(targetArray);
    } else {


        const sliderWeight = document.getElementById("fuzzySlider").value;
        const fuzzyValue = reverseFuzzy(sliderWeight);

        let surnameResults = [];
        console.log(fuzzyValue, sliderWeight, checkedValue, searchSurname);
        //console.log(masterDB);

        const options = {
            isCaseSensitive: false,
            includeScore: true,
            //shouldSort: true,
            //includeMatches: true,
            //findAllMatches: true,
            //minMatchCharLength: 4,
            // location: 0,
            threshold: fuzzyValue, //0.2,
            // distance: 100,
            // useExtendedSearch: false,
            // ignoreLocation: false,
            // ignoreFieldNorm: false,
            keys: [{
                name: 'Surname',
                weight: 1
            }, ]
        };

        const fuse = new Fuse(targetArray, options);


        let fuzzyResults = fuse.search(searchSurname);
        //console.log(fuzzyResults.length);


        for (let j = 0; j < fuzzyResults.length; j++) {
            let tempArray = {
                Surname: fuzzyResults[j].item.Surname,
                Firstname: fuzzyResults[j].item.Firstname,
                Location: fuzzyResults[j].item.Location,
                Date: fuzzyResults[j].item.Date,
                Volume: fuzzyResults[j].item.Volume,
                Page: fuzzyResults[j].item.Page,
                OriginalRef: fuzzyResults[j].item.OriginalRef,
                Notes: fuzzyResults[j].item.Notes,
                Index: fuzzyResults[j].refIndex
            };
            surnameResults.push(tempArray);

        };
        console.table(surnameResults);
        searchOtherFields(surnameResults);
    };
};

function searchOtherFields(chosenData) {
    //SEARCH IN FIELDS OTHER THAN SURNAME
    let filters = [];
    filters.Firstname = document.getElementById("firstName").value.toLowerCase();
    filters.Location = document.getElementById("Loc").value.toLowerCase();
    console.log(filters);


    let filterKeys = Object.keys(filters);
    console.log(filterKeys);

    result = chosenData.filter(function(eachObj) {
        return filterKeys.every(function(eachKey) {
            if (!filters[eachKey].length) {
                return true;
            }
            return filters[eachKey].includes(eachObj[eachKey].toLowerCase());
            //MAY BE A PROBLEM HERE: WILL FIND "JOHN" BUT NOT "JOHN (snr)"
        });

    });
    console.table(result);
    console.log(result.length);

    if (result.length < 1) {
        document.getElementById("messageArea").innerHTML = "No results found";
        document.getElementById("searchTable").innerHTML = "";
        return;
    } else {
        findDates(result);
        //PASSED TO findDates IN localSearch.JS
    };

};




//CALCULATE VALUE FOR THE FUZZY SEARCH FROM SLIDER
function reverseFuzzy(val) {
    if (val < 100) {
        return ((100 - val) / 100);
    } else {
        return -1;
    }
    //console.log(val, fuzzyValue);

}