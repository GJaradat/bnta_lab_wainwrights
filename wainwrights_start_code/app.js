const getAllWainwrights = async (filterInput) => {
    // Trying to limit the API calls to only when the data is needed. I don't think it works though...
    if (typeof jsonDataAll === "undefined") {
        const response = await fetch ("https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json");
        var jsonDataAll = await response.json();
        console.log("API was called");
    }

    //Filter out wainwrights from the keyword input OR get all wainwrights
    if (filterInput){
        var jsonData = filterWainwrights(jsonDataAll, filterInput);
    } else {
        var jsonData = jsonDataAll;
    }

    //Display wainwrights as elements
    jsonData.forEach((wainwright) => {
        displayWainwright(wainwright);
    })
    return jsonData;
}

//Form to filter out wainwrights by area
const form = document.querySelector("#filterWainwrights");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const filterInput = document.querySelector("#filter").value;

    document.querySelector("#wainwrights-list").innerHTML = "";
    getAllWainwrights(filterInput);
});

// Display a wainwright (TO-DO: Could be changed into a Promise.all)
const displayWainwright = (wainwright) => {
    const currentWainwright = document.createElement("li");
    currentWainwright.id = "wainwright-" + wainwright.id;

    //
    const wainwrightDetails = document.createElement("p");
    wainwrightDetails.class = "wainwrightDetails";

    // Create the details txt
    const info = "Height: " + wainwright.heightMetres + "m | " 
                + "Area: " + wainwright.area.areaName + " | "
                + "Nearby towns: " + wainwright.area.localTowns
                ;

    const about = document.createElement("p");
    about.class = "wainwrightAbout";
    about.innerHTML = wainwright.area.about;

    currentWainwright.innerHTML = wainwright.name;
    wainwrightDetails.innerHTML = info;

    //Append elements
    document.querySelector("#wainwrights-list").appendChild(currentWainwright);
    document.querySelector(`[id="wainwright-${wainwright.id}"]`).appendChild(wainwrightDetails);
    document.querySelector(`[id="wainwright-${wainwright.id}"]`).appendChild(about);
}

// Filter wainwrights
const filterWainwrights = (jsonDataAll, filterInput) => {
    return jsonData = jsonDataAll.filter((wainwright) => {
        return wainwright.name.toLowerCase().includes(filterInput.toLowerCase())||
        wainwright.area.areaName.includes(filterInput.toLowerCase())||
        wainwright.area.localTowns.includes(filterInput.toLowerCase()) ||
        wainwright.area.about.includes(filterInput.toLowerCase());
    })
}
