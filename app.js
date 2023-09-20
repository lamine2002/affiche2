const myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read  = false;

    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    }
}

// const book1 = new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309);
// const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281);
// const book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180);
// const book4 = new Book("The Catcher in the Rye", "J.D. Salinger", 234);
// const book5 = new Book("The Catcher in the Rye", "J.D. Salinger", 234);
// const book6 = new Book("The Catcher in the Rye", "J.D. Salinger", 234);
// const book7 = new Book("The Catcher in the Rye", "J.D. Salinger", 234);

// myLibrary.push(book1, book2, book3, book4, book5, book6, book7);

function remove(id) {
    myLibrary.splice(id, 1);
    displayBooks();
}

function displayBooks() {
    const bookContainer = document.querySelector(".book-container");
    bookContainer.innerHTML = '';

    for (let i = 0; i < myLibrary.length; i++) {
   
    bookContainer.setAttribute('style', ` grid-template-rows: repeat( ${Math.ceil((i+1)/3)}, 350px);`)
        const book = myLibrary[i];
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card", "card");
        bookCard.id = i;
        colorReadButton = book.read ?  "btn-secondary" : "btn-success";
        textReadButton = book.read ?  "Not Read": "Read";
        bookCard.innerHTML = `
            <h6>${book.title}</h6>
            <h6>${book.author}</h6>
            <h6>${book.pages}</h6>
            <button class="remove-btn btn btn-danger" data-id="${i}">Remove</button>
            <button class="read-btn btn ${colorReadButton}" data-id="${i}">${textReadButton}</button>
        `;
        bookContainer.appendChild(bookCard);
    }
}

displayBooks();

const bookContainer = document.querySelector(".book-container");
bookContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
        // Dans le contexte de votre code, event.target est utilisé 
        // pour déterminer quel bouton a été cliqué
        //  dans le conteneur de livres. Voici comment cela fonctionne :
        const id = event.target.getAttribute("data-id");
        remove(id);
    }
    if (event.target.classList.contains("read-btn")){

        const id = event.target.getAttribute("data-id");    
        myLibrary[id].read =!myLibrary[id].read;
        displayBooks();

    }
});


function addBookToLibrary(newBook) {
    
    myLibrary.push(newBook);
    displayBooks();
}

// Sélectionnez le formulaire dans le modal
const form = document.querySelector("form");

// Ajoutez un gestionnaire d'événements "submit" au formulaire
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement

    // Récupérez les valeurs des champs du formulaire
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const readCheckbox = document.querySelector("#read"); // Sélectionnez la case à cocher

    // Vérifiez si la case à cocher est cochée
    const read = readCheckbox.checked;

    // Créez un nouvel objet Book avec les valeurs du formulaire
    const newBook = new Book(title, author, pages);
    newBook.read = read;

    // Ajoutez le nouveau livre à la bibliothèque
    addBookToLibrary(newBook);

    // Réinitialisez le formulaire
    form.reset();
});



