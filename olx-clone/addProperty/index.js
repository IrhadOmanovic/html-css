const handleAddProperty = async (event) => {
    event.preventDefault();
    console.log(document.forms["add-property"])
    const kategorija = document.getElementById("kategorija-nekretnine").value;
    const adresa = document.getElementById("adresa").value;
    const naslov = document.getElementById("naslov").value;
    const cijena = document.getElementById("cijena").value;
    const opis = document.getElementById("opis").value;
    const slika = document.getElementById("slika").files[0];

    const data = {
        kategorija,
        adresa,
        naslov,
        cijena,
        opis,
        slika,
    }

    try {
        await fetch('http://localhost:3000/products/properties', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
    } catch (error) {
        alert("Could not create property!")
    }
}