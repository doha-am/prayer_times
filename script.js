//#region Get the API
let cities = [{
    city: "Cairo",
    cityName: "القاهرة"
},
{
    city: "Alexandria",
    cityName: "الاسكندرية"
},
{
    city: "Al Minūfīyah",
    cityName: "المنوفية"
}
]

function GetAllTimes(nameOfCity) {
    let params = {
        country: "Egypt",
        city: nameOfCity
    }

    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: params
    })
        .then(function (response) {
            document.getElementById("Fajr").innerHTML = response.data.data.timings.Fajr
            document.getElementById("Shrouq").innerHTML = response.data.data.timings.Sunrise
            document.getElementById("Zhr").innerHTML = response.data.data.timings.Dhuhr
            document.getElementById("Asr").innerHTML = response.data.data.timings.Asr
            document.getElementById("Maghreb").innerHTML = response.data.data.timings.Maghrib
            document.getElementById("Isha").innerHTML = response.data.data.timings.Isha

            let readble = response.data.data.date.readable
            let day = response.data.data.date.hijri.weekday.ar
            document.getElementById("date-time").innerHTML = day + readble
        })
        .catch(function (error) {
            console.log(error);
        })
}
GetAllTimes("Cairo")
//#endregion

//#region Select
let Selects = document.getElementById("selectMenu");

for (city of cities) {
    let content = `<option selected>${city.cityName}</option>`;

    Selects.innerHTML += content
}

Selects.addEventListener("change", () => {

    let selectedCity = "";
    for (city of cities) {
        if (city.cityName == Selects.value) {
            selectedCity = city.city;
            document.getElementById("city-name").innerHTML = city.cityName
        }
        GetAllTimes(selectedCity)
    }
})
//#endregion