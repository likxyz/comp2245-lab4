
//gets the subject dropdown
const subjectList = document.getElementById('subject');

//gets the subjects from subjects.php
fetch('subjects.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not fetch subjects');
        }

        //convert the response into JSON
        return response.json();
    })
    .then(subjects => {
        subjects.forEach(subject => {

            const option = document.createElement('option');

            option.value = subject.id;
            option.textContent = subject.name;

            subjectList.appendChild(option);
        });
    })
    .catch(error => {
        console.error(error);
    });

//gets the form, table body and status message
const form = document.getElementById('search-form');
const tableBody = document.querySelector('#results tbody');
const status = document.getElementById('status');

//fetch and display books
function fetchBooks() {

    //get the form data and build the query string
    const params = new URLSearchParams(new FormData(form));

    //fetch the books using the query string
    fetch(`books.php?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not fetch books');
            }

            return response.json();
        })
        .then(books => {

            //empty the table before adding new results
            tableBody.replaceChildren();

            //go through books
            books.forEach(book => {

                //create a new table row
                const row = document.createElement('tr');

                //create the cells
                const titleCell = document.createElement('td');
                const authorCell = document.createElement('td');
                const yearCell = document.createElement('td');
                const subjectCell = document.createElement('td');
                const copiesCell = document.createElement('td');

                //put the book information into each cell
                titleCell.textContent = book.title;
                authorCell.textContent = book.author;
                yearCell.textContent = book.year;
                subjectCell.textContent = book.subject;
                copiesCell.textContent = `${book.available} of ${book.copies}`;

                //check if the book has no available copies
                if (Number(book.available) === 0) {
                    copiesCell.classList.add('out');
                }

                //add the cells to the row
                row.append(titleCell, authorCell, yearCell, subjectCell, copiesCell);

                //add the row to the table
                tableBody.appendChild(row);
            });

            //display the number of books found
            if (books.length === 0) {
                status.textContent = 'No books match your search.';
            } else if (books.length === 1) {
                status.textContent = '1 book found.';
            } else {
                status.textContent = `${books.length} books found.`;
            }
        })
        .catch(error => {
            console.error(error);
        });
}

//fetch books when the page loads
fetchBooks();

//fetch books when the form is submitted
form.addEventListener('submit', event => {
    event.preventDefault();
    fetchBooks();
});
