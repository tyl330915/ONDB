let ssArray = [];

function readSpreadsheet(file) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const nameData = XLSX.utils.sheet_to_json(
                workbook.Sheets[workbook.SheetNames[0]], { header: 0 }
            );
            resolve(nameData);
        };

        reader.onerror = (event) => {
            reader.abort();
            reject(event);
        };

        reader.readAsArrayBuffer(file);
    });
};

function displayData(event) {
    this.Message = "Loading...";
    const file = event.target.files[0];
    this.readSpreadsheet(file).then((result) => {
        console.log(result);
        //this.items = result;
        this.Message = "Loaded";
        this.cleanUpData(result);
    });
};

function cleanUpData(unclean) {
    console.table(unclean);

    let cleanData = [];

    for (let i = 0; i < unclean.length; i++) {

        /*
        let sName = "";
        let fName = "";
        let loc = "";
        let vol = "";


        if (typeof unclean[i].surname !== 'undefined') { sName = unclean[i].surname.trim() } else { sName = unclean[i].surname };
        if (typeof unclean[i][firstname] !== 'undefined') { fName = unclean[i][firstname].trim() } else { fName = unclean[i][firstname] };
        if (typeof unclean[i].location !== 'undefined') { loc = unclean[i].location.trim() } else { loc = unclean[i].location };
        if (typeof unclean[i].volume !== 'undefined') { vol = unclean[i].volume.trim() } else { vol = unclean[i].volume };

        console.log(sName);
*/
        let cleanDataPart = {
            "Surname": unclean[i].surname,
            "Firstname": unclean[i].firstname,
            "Location": unclean[i].location,
            "Date": unclean[i].date,
            "Volume": unclean[i].volume,
            "Page": unclean[i].page,
            "OriginalRef": unclean[i].originalref,
            "Notes": unclean[i].notes,
            //"Age": unclean[i].age,
            //"Occupation": unclean[i].occupation

        };

        cleanData.push(cleanDataPart);

    };
    console.table(cleanData);

    let sample = cleanData.slice(0, 5);
    //sample = cleanTableData(sample);
    console.log(sample);
    drawTable(sample, 'sampleTable');
    document.getElementById("saveBlock").style.display = "block";
    document.getElementById("tableDiv").style.display = "block";

    ssArray = JSON.stringify(cleanData);
    //console.log(ssArray);
};

function postSSData() {
    console.log(ssArray);
    boxPost(ssArray);

};