// Variable to hold the secret key
const API_KEY = '7A90C62A-0A49-403A-B67E-48E3CCC26760'

// Method to create the list of data that we retrieve from the API. The data points we need are the id, name, and price
const create_list = (asset_id, asset_name, price_usd) => {
    const html = `<tr class="data_list" id="coin_data"><th scope="row" id="asset_id" onclick="get_exchange_rate(this.innerText)">${asset_id}</th><td id="name">${asset_name}</td><td id="price_usd">$${price_usd}</td></tr>`
    document.getElementById('data_table').insertAdjacentHTML('beforeend', html)
}

// method to load the table whenever the webpage loads
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    get_data(event)
});

// Method to call the API to grab the data. We need only specific data points so we'll set those datapoints as variables
const get_data = async () => {
    let response = await axios.get(`https://rest.coinapi.io/v1/assets/?apikey=${API_KEY}`)
    console.log(response);

    var all = response.data;

    // Declare variables that will hold the data for our table
    let asset_id = ''
    let asset_name = ''
    let price_usd = ''

    console.log(all);

    // for loop to grab each data point from the object that we received through axios get
    for(let i = 0; i < all.length; i++) {
        asset_id = all[i].asset_id
        asset_name = all[i].name
        
        if (all[i].price_usd == 0 | all[i].price_usd == null){
            price_usd = 0.00
        }
        else {price_usd = all[i].price_usd.toFixed(2)
        }
        create_list(asset_id,asset_name,price_usd)
}   
}

get_exchange_rate = async (id) => {
        let txt = id;
        // console.log(txt)
    let response = await axios.get(`https://rest.coinapi.io/v1/assets/${txt}?apikey=${API_KEY}`)
    // console.log(response)
    // console.log(response.data)
    // console.log(response.data[0])
    alert(JSON.stringify(response.data[0], null, 4))
}

// Method to see just 1 or multiple data points based on search criteria, eg. BTC or ETH
const get_one_data = async (search_name) => {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = search_name;
    filter = input.value.toUpperCase();
    table = document.getElementById("data_table");
    tr = table.getElementsByTagName("tr");
    
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
        }
    }
    
}

// Filter/search function for specific asset ID which will run when the user hits the submit button
form.addEventListener('submit', ( event ) => {
    event.preventDefault();
    let search_name = document.getElementById('coin_id');
    get_one_data(search_name)
})

// DOM manipulation create the table based on these criteria and headers
const create_table = () => {
    const htmltest = 
    
        `<thead><tr class="clickable row100" id="asset_id">
        <th scope="col" id="coin_name">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Price in USD</th>
        </tr></thead>`
    
        document.getElementById('data_table').insertAdjacentHTML('beforeend', htmltest)
    }

const DOM_ELEMENTS = {
    data: 'data_table'
}