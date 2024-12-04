document.addEventListener('DOMContentLoaded', function() {
    axios
        .get("https://crudcrud.com/api/cf53c670703b4a31a9b4746b3d1c06b2/book")
        .then((result) => {
            const user = result.data;
            user.forEach((users) => {
                displayItem(users);
            });
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        });
});

function handleFormSubmit(event) {
    event.preventDefault();

    // Get the values from the title and description fields
    const title = event.target.title.value.trim();  // Use .trim() to remove extra spaces
    const desc = event.target.desc.value.trim();

    // Validate if the title or description is empty
    if (!title || !desc) {
        console.log('Empty input detected. Not adding empty note.');
        return;
    }

    const bookDetails = {
        title: title,
        desc: desc,
    };

    // Send POST request to add new book details
    axios
        .post("https://crudcrud.com/api/cf53c670703b4a31a9b4746b3d1c06b2/book", bookDetails)
        .then((response) => {
            console.log("Note added:", response.data);
            displayItem(response.data);
        })
        .catch((error) => {
            console.log("Error adding note:", error);
        });

    // Clear the form fields after adding the note
    document.getElementById('title').value = '';
    document.getElementById('desc').value = '';
}

function displayItem(bookDetails) {
    const userItem = document.createElement('li');
    userItem.classList.add('notItem');

    const notTitle = document.createElement('h3');
    notTitle.textContent = bookDetails.title;
    userItem.appendChild(notTitle);

    const noteDesc = document.createElement("p");
    noteDesc.textContent = bookDetails.desc;
    userItem.appendChild(noteDesc);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    // Append the delete button and note to the userItem <li>
    userItem.appendChild(deleteBtn);
    const list = document.getElementById("userList");
    list.appendChild(userItem);

    // Add event listener to delete the note when clicked
    deleteBtn.addEventListener('click', function() {
        axios
            .delete(`https://crudcrud.com/api/cf53c670703b4a31a9b4746b3d1c06b2/book/${bookDetails._id}`)
            .then(() => {
                userItem.remove();  // Remove the <li> element from the list
            })
            .catch((error) => {
                console.log("Error deleting note:", error);
            });
    });
}

module.exports = handleFormSubmit;
