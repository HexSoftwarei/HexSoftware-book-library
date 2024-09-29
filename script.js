let books = [];
let borrowHistory = [];

document.getElementById('addBook').addEventListener('click', function() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;

    if (title && author && category) {
        const book = { title, author, category };
        books.push(book);
        displayBooks();
        clearInputFields();
    } else {
        alert('Please fill in all fields');
    }
});

// Event listener for real-time search
document.getElementById('search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm) || 
        book.category.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
});

function displayBooks(filteredBooks = books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    
    filteredBooks.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (Category: ${book.category})`;
        li.addEventListener('click', () => borrowBook(book));
        bookList.appendChild(li);
    });
}

function borrowBook(book) {
    const historyEntry = `${book.title} borrowed`;
    borrowHistory.push(historyEntry);
    updateBorrowHistory();
}

function updateBorrowHistory() {
    const historyList = document.getElementById('borrowHistory');
    historyList.innerHTML = '';
    
    borrowHistory.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

function clearInputFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('category').value = '';
    document.getElementById('search').value = '';
}

// Initial display of books
displayBooks();
