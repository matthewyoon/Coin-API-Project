const API_KEY = '4421ABB9-96C5-46C2-84A8-22EB00072AF7'

// GET /v1/exchangerate/BTC?apikey=73034021-THIS-IS-SAMPLE-KEY

// window.addEventListener("load", function() {
//     const url = 'https://rest.coinapi.io/v1/assets';
//     fetch(url, {
//         method: "GET",
//         headers: {
//         "X-CoinAPI-Key": API_KEY,
//         "Accept": "application/json",
//         "Accept-Encoding": "deflate", "gzip"
//         }
//     })
//     .then(resp => resp.json())
//     .then(function(data) {
//         console.log(data);
        


//     })
//     .catch(function(error) {
//         console.log(error);
//     })
// });

const create_list = (asset_id, asset_name, price_usd) => {
    const html = `<tr id="coin_data"><th scope="row" id="coin_data">${asset_id}</th><td id="name">${asset_name}</td><td id="price_usd">$${price_usd}</td></tr>`
    document.getElementById('data_table').insertAdjacentHTML('beforeend', html)
}

window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    get_data(event)
});

const get_data = async () => {
    let response = await axios.get(`https://rest.coinapi.io/v1/assets/?apikey=${API_KEY}`)
    console.log(response);

    const all = response.data;

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

// Filter/search function for specific asset ID
form.addEventListener('submit', ( event ) => {
    event.preventDefault();
    let search_name = document.getElementById('coin_id');
    get_one_data(search_name)
})

// Refresh the table back to default of all assets
form.addEventListener('reset', logReset);




// asset_id: "BTC",
// name: "Bitcoin",
// type_is_crypto: 1,
// data_start: "2010-07-17",
// data_end: "2021-07-24",
// data_quote_start: "2014-02-24T17:43:05.0000000Z",
// data_quote_end: "2021-07-24T22:11:32.3816757Z",
// data_orderbook_start: "2014-02-24T17:43:05.0000000Z",
// data_orderbook_end: "2020-08-05T14:38:38.3413202Z",
// data_trade_start: "2010-07-17T23:09:17.0000000Z",
// data_trade_end: "2021-07-24T22:11:19.6100000Z",
// data_symbols_count: 59410,
// volume_1hrs_usd: 1361682626266.55,
// volume_1day_usd: 65506462020325.15,
// volume_1mth_usd: 2553673061115921.5,
// price_usd: 33970.33322796611,
// id_icon: "4caf2b16-a017-4e26-a348-2cea69c34cba"

const create_table = () => {
    const htmltest = 
    
        `<thead><tr class="clickable">
        <th scope="col" id="coin_name">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Price in USD</th>
        </tr></thead>`
    
        document.getElementById('data_table').insertAdjacentHTML('beforeend', htmltest)
    }

const DOM_ELEMENTS = {
    data: 'data_table'
}