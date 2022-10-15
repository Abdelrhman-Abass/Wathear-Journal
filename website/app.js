/* Global Variables */
// US is default country. Parameter is zip code,country code
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = "1ca6261d35c51434ba88bc9e3c2f0437";

const button = document.getElementById('generate');
// HTML elements to get the values

const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content'); 

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const data = async ()=> {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    tem(url, zip, apiKey)
    .then(function (data){
        const data = {temperature: data.main.temp, date: newDate, feelings: feelings };
        postData('/dataAdd', data).then(function() {retrieveData()})
    })
};

button.addEventListener('click', data);

// Async GET
const tem = async (baseURL, code, key)=>{
    const res = await fetch(baseURL + code + ',us' + '&APPID=' + key);
    try {
        const getData = await res.json();
        return getData;
    } catch (error) {
        console.log(error);
    }
};

// Async POST
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await req.json();
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}


// Update user interface
const retrieveData = async () =>{
    const request = await fetch('/data');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'D';
    document.getElementById('content').innerHTML = allData.feelings;
    document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }