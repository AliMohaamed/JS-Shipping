fetch("../components/footer/footer.html")
    .then((res) => res.text())
    .then((data) => {
        document.getElementById("footer-container").innerHTML = data;
    })
    .catch((err) => {
        console.log(err.message);
    });