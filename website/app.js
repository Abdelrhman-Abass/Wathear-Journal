/* Global Variables */
// US is default country. Parameter is zip code,country code
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = "1ca6261d35c51434ba88bc9e3c2f0437";

const button = document.getElementById('generate');



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;

// Async GET
const tem = async (URL, code, key)=>{
    const respo = await fetch(URL + code + ',us' + '&APPID=' + key);
    try {
        const get = await respo.json();
        return get;
    } catch (e) {
        console.log(e);
    }
};

// Async POST
const postd = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
  });
    try {
        const newd = await req.json();
        return newd;
    }
    catch (e) {
        console.log('Error', e);
    }
};




// Update user interface
const retrieve = async () =>{
    const request = await fetch('http://localhost:5500/data');
    try {
    // Transform into JSON
    const alld = await request.json()
    console.log(alld)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(alld.temp)+ 'D';
    document.getElementById('content').innerHTML = alld.feelings;
    document.getElementById("date").innerHTML =alld.date;
    }
    catch(e) {
      console.log("error", e);
      // appropriately handle the error
    }
};
// handling data
const data = async ()=> {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    if (zip === 0){alert("Please enter a valid zipcode");}
    else{tem(url, zip, apiKey)
        .then(function (data){
            const dat = {temperature: data.main.temp, date: newDate, feelings: feelings };
            postd('http://localhost:5500/dataAdd', dat);
        })
        retrieve()
    };
};   
button.addEventListener('click', data);
