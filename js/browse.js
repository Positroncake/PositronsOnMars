const sortby = document.getElementById("sortby");
const search = document.getElementById("search");
const results = document.getElementById("results");

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
    results.innerHTML = 'Results for "' + search.value + '"'

    var xhr = new XMLHttpRequest();
    var url = "api/Sellers/GetBySearch/";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(`{"term": "${search.value}"}`));
    const re = xhr.responseText;
    const results = JSON.parse(re);

    for (let i = 0; i < results.length; i++) {
        const item = results[i];

        const id = item.Id;
        const type = item.Type;
        const name = item.Name;
        const seller = item.Seller;
        const image = item.Image;
        const condition = item.Condition;
        const price = item.Price;

        const card =
            `
        <div class="item-card" id="${id}">
            <div class="left">
                <img src="${image}" alt="Item Image">
            </div>
            <div class="right">
                <h5>${name}</h5>
                <h6>${type + " - " + seller}</h6>
                <h6>${condition}</h6>
                <h7>${price}</h7>
            </div>
        </div>
        `;
        list.innerHTML += card;
    }
}
