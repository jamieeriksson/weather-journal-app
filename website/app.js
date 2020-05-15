// On click of "Generate" perform fetching
document.getElementById("generate").addEventListener("click", showEntry);

const getTemp = async () => {
  const zip = document.getElementById("zip").value;
  const apiKey = "cd5123a986aa675d9c7a468518fcc1aa";
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=`;

  // make a GET request to Open Weather Map API
  const response = await fetch(apiURL + apiKey);
  try {
    // Convert resonse to json data
    const data = await response.json();
    console.log(data);
    const tempF = ((data.main.temp - 273.15) * 9) / 5 + 32;
    return tempF;
  } catch (error) {
    // If error getting data from API, log the error response
    console.log("error", error);
  }
};

const postWeather = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
  } catch (error) {
    console.log("error", error);
  }
};

const changeUI = async () => {
  const response = await fetch("http://localhost:8000/weather");
  try {
    const entry = await response.json();
    document.getElementById("date").innerHTML = entry[entry.length - 1].date;
    document.getElementById("temp").innerHTML = entry[entry.length - 1].temp;
    document.getElementById("content").innerHTML =
      entry[entry.length - 1].content;
  } catch (error) {
    console.log("error", error);
  }
};

function postGet(postEntry) {
  postWeather("http://localhost:8000/weather", postEntry).then(function (data) {
    changeUI("http://localhost:8000/weather");
  });
}

async function showEntry() {
  let d = new Date();
  let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
  const userFeelings = document.getElementById("feelings").value;

  const temperature = await getTemp();
  const projectEntry = {
    date: newDate,
    temp: temperature,
    feelings: userFeelings,
  };

  postGet(projectEntry);

  changeUI();
}
