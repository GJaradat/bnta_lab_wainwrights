// Fetch wainwrights from API
var fetchData = async () => {
    const response = await fetch ("https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json");
    jsonDataAll = await response.json();
    return jsonDataAll;
}
// make this global scope: can use var/window/globalThis
globalThis.jsonDataAll = fetchData();

// Get all wainwrights on page
const getAllWainwrights = async (filterInput) => {

    //Dynamic heading
    await waitForResults(5000);

    //Filter out wainwrights from the keyword input OR get all wainwrights
    if (filterInput){
        var jsonData = filterWainwrights(filterInput);
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

// Display each wainwright
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
const filterWainwrights = (filterInput) => {
    return jsonData = jsonDataAll.filter((wainwright) => {
        return wainwright.name.toLowerCase().includes(filterInput.toLowerCase())||
        wainwright.area.areaName.includes(filterInput.toLowerCase())||
        wainwright.area.localTowns.includes(filterInput.toLowerCase()) ||
        wainwright.area.about.includes(filterInput.toLowerCase());
    })
}

// Delaying function
const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// Wait for results to load
const waitForResults = async (time) => {
    // "Animate" loading message
    loadingMessage(time);

    // Artificial delay
    await delay(time);
    document.querySelector("#wainwrights-heading").innerHTML = "List of Wainwrights:"
}

// Animate loading message
const loadingMessage = async (time) => {
    let dots = "";
    let timer = 0;
    while (timer < time) {
        dots += ".";
        document.querySelector("#wainwrights-heading").innerHTML = "List of Wainwrights: Loading" + dots;
        await delay(500);
        if (dots == "....") {
            dots = "";
        }
        timer += 500;
    }
}