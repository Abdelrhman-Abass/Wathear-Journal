/* Global Variables */
// US is default country. Parameter is zip code,country code
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = "1ca6261d35c51434ba88bc9e3c2f0437";

const button = document.getElementById('generate');
button.addEventListener('click', data);


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const data = async ()=> {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    tem(url, zip, apiKey)
    .then(function (data){
        const dat = {temperature: data.main.temp, date: newDate, feelings: feelings };
        postd('/dataAdd', dat).then(function() {retrieve()})
    })
};



// Async GET
const tem = async (URL, code, key)=>{
    const respo = await fetch(URL + code + ',us' + '&APPID=' + key);
    try {
        const get = await respo.json();
        return get;
    } catch (error) {
        console.log(error);
    }
};

// Async POST
const postd = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newd = await req.json();
        return newd;
    }
    catch (error) {
        console.log('Error', error);
    }
}


// Update user interface
const retrieve = async () =>{
    const request = await fetch('/data');
    try {
    // Transform into JSON
    const all = await request.json()
    console.log(all)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(all.temp)+ 'D';
    document.getElementById('content').innerHTML = all.feelings;
    document.getElementById("date").innerHTML =all.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }