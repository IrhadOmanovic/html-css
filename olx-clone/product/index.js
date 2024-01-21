const loadProduct = async () => {
    // const articleGridId = "grid-list";
    // const gridListElement = document.getElementById(articleGridId);

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    
    const product = await (await fetch(`http://localhost:3000/products/${id}`, {
        method: "GET"
    })).json();

    console.log(product)

}

document.addEventListener('DOMContentLoaded', async () => {
    await loadProduct();
}, false);