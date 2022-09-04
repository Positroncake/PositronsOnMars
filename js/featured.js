const featured1 = document.getElementById("f1");
const featured2 = document.getElementById("f2");
const featured3 = document.getElementById("f3");

featured1.addEventListener("click", (event) => {
    featured1.classList.add('selected');
    featured2.classList.remove('selected');
    featured3.classList.remove('selected');
});

featured2.addEventListener("click", (event) => {
    featured2.classList.add('selected');
    featured1.classList.remove('selected');
    featured3.classList.remove('selected');
});

featured3.addEventListener("click", (event) => {
    featured3.classList.add('selected');
    featured2.classList.remove('selected');
    featured1.classList.remove('selected');
});

function viewFeatured() {
    window.location.href = "./builder.html";
}
