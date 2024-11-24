class Comic {
    constructor(titulo, precio, genero, editorial) {
        this.titulo = titulo;
        this.precio = precio;
        this.genero = genero;
        this.editorial = editorial;
    }

    mostrarInformacion() {
        return `${this.titulo} - ${this.genero} - ${this.editorial} - $${this.precio.toFixed(2)}`;
    }
}

const comics = [
    new Comic("Batman: Año Uno", 15.99, "Superhéroes", "DC Comics"),
    new Comic("Spider-Man: Blue", 18.50, "Superhéroes", "Marvel Comics"),
    new Comic("Watchmen", 25.75, "Ciencia ficción", "DC Comics")
];

function mostrarComics() {
    const comicListContainer = document.getElementById("comicList");
    comics.forEach(comic => {
        const div = document.createElement("div");
        div.classList.add("comic");
        div.innerHTML = `
            <span>${comic.mostrarInformacion()}</span>
            <button onclick="agregarAlCarrito('${comic.titulo}')">Comprar</button>
        `;
        comicListContainer.appendChild(div);
    });
}

function agregarAlCarrito(titulo) {
    const comic = comics.find(c => c.titulo === titulo);
    if (!comic) {
        alert("Cómic no encontrado.");
        return;
    }

    const cliente = JSON.parse(localStorage.getItem("cliente"));
    if (!cliente) {
        alert("Debes iniciar sesión para comprar cómics.");
        window.location.href = "registro.html";
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(comic);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`Cómic "${comic.titulo}" agregado al carrito.`);
}

mostrarComics();