const getAllWainwrights = async () => {
    const response = await fetch ("https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json");
    const jsonData = await response.json();
     
    jsonData.forEach((wainwright) => {
        const currentWainwright = document.createElement("li");
        const wainwrightText = document.createElement("p");
        const info = "Height: " + wainwright.heightMetres + " | " 
                    + "Location: " + wainwright.area.areaName + " | "
                    + "Nearby towns: " + wainwright.area.localTowns
                    ;

        const about = document.createElement("p");
        about.innerHTML = wainwright.area.about;
        currentWainwright.innerHTML = wainwright.name;
        wainwrightText.innerHTML = info;

        console.log(wainwright);
        document.querySelector("#wainwrights-list").appendChild(currentWainwright);
        document.querySelector("#wainwrights-list").appendChild(wainwrightText);
        document.querySelector("#wainwrights-list").appendChild(about);
    })

    return jsonData;
}

// Button to generate list of all wainwrights
document.querySelector("#getWainwrights").addEventListener("click", () => {
    var allWainwrights = getAllWainwrights();
})

