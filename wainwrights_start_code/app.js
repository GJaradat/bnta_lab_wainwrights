const getAllWainwrights = async (filterInput) => {
    const response = await fetch ("https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json");
    var jsonDataAll = await response.json();

    //Filter out wainwrights from the keyword input OR get all wainwrights
    if (filterInput){
        var jsonData = jsonDataAll.filter((wainwright) => {
            return wainwright.area.areaName.includes(filterInput);
        })
    } else {
        var jsonData = jsonDataAll;
    }

    //Display wainwrights as elements
    jsonData.forEach((wainwright) => {
        const currentWainwright = document.createElement("li");
        currentWainwright.id = "wainwright-" + wainwright.id;
        const wainwrightText = document.createElement("p");
        const info = "Height: " + wainwright.heightMetres + " | " 
                    + "Area: " + wainwright.area.areaName + " | "
                    + "Nearby towns: " + wainwright.area.localTowns
                    ;

        const about = document.createElement("p");
        about.innerHTML = wainwright.area.about;
        currentWainwright.innerHTML = wainwright.name;
        wainwrightText.innerHTML = info;

        console.log(wainwright);
        document.querySelector("#wainwrights-list").appendChild(currentWainwright);
        document.querySelector("#wainwrights-${wainwright.id}").appendChild(wainwrightText);
        document.querySelector("#wainwrights-${wainwright.id}").appendChild(about);
    })

    return jsonData;
}

//Form to filter out wainwrights by area
const form = document.querySelector("#filterWainwrights");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const filterInput = document.querySelector("#filter").value;
    if(filterInput==""){
        document.querySelector("#wainwrights-list").innerHTML = "";
        getAllWainwrights();
    } else {
        document.querySelector("#wainwrights-list").innerHTML = "";
        getAllWainwrights(filterInput);
    }

});
