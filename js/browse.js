const sortby = document.getElementById("sortby");
const search = document.getElementById("search");

const list = document.getElementById("list");

const min = document.getElementById("min");
const max = document.getElementById("max");

let sort = "Newest";
let cate = "All";

function show(cate2) {
    cate = cate2;
}

function sortBy(sort2) {
    sortby.innerHTML = "Sort by: " + sort2;
    sort = sort2;
}

function updateResults() {
    searchItem();
}

function searchItem() {
    const status = document.getElementById("status");
    status.innerHTML = 'Results for "' + search.value.substring(0,25) + (search.value.length > 25 ? '..."' : '"');

    var xhr = new XMLHttpRequest();
    var url = "https://172.105.105.74:55555/api/Sellers/GetBySearch/";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(`${search.value}`));
    const re = xhr.responseText;
    const results = JSON.parse(re);

    for (let i = 0; i < results.length; i++) {
        const item = results[i];

        const id = item.Id;
        const type = item.Type;

        let strtype = "Unknown";
        if(type == 1){
            strtype = "CPU";
        } else if(type == 2){
            strtype = "GPU";
        } else if(type == 3){
            strtype = "RAM";
        } else if(type == 4){
            strtype = "Motherboard";
        } else if(type == 5){
            strtype = "Storage";
        } else if(type == 6){
            strtype = "PSU";
        }

        const name = item.Name;
        const seller = item.Seller;
        const image = item.Image;
        const condition = item.Condition;

        let strcond = condition + " ";
        for(let j = 0; j < condition; j++){
            strcond += `<i style="color: gold;" class="fa fa-star"></i>`
        }

        const price = item.Price;

        const card =
            `
        <div class="item-card" id="${id}">
            <div class="left">
                <img src="${image}" alt="Item Image">
            </div>
            <div class="right">
                <h5>${name}</h5>
                <h6>${strtype + " - " + seller}</h6>
                <h6>${strcond}</h6>
                <h7>$${price}</h7>
            </div>
        </div>
        `;
        if (cate.includes(type)) {
            list.innerHTML += card;
        }
    }
}
