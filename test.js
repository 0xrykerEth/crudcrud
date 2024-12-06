document.addEventListener('DOMContentLoaded', function () {
    axios
        .get("https://crudcrud.com/api/e9d1de48389c45cfa6f8f9dfb717a604/book")
        .then((result) => {
            const user = result.data;
            found.innerText = user.length;
            user.forEach((users) => {
                displayItem(users);
            });
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        });

    const found = document.getElementById('found');
    document.getElementById("search").addEventListener("input", searchNotes);
});

function handleFormSubmit(event) {
    event.preventDefault();

    const title = event.target.title.value.trim();
    const desc = event.target.desc.value.trim();

    const bookDetails = {
        title: title,
        desc: desc,
    };

    axios
        .post("https://crudcrud.com/api/e9d1de48389c45cfa6f8f9dfb717a604/book", bookDetails)
        .then((response) => {
            console.log("Note added:", response.data);
            displayItem(response.data);
        })
        .catch((error) => {
            console.log("Error adding note:", error);
        });

    document.getElementById("title").value = '';
    document.getElementById("desc").value = '';
}

function displayItem(bookDetails) {
    const userItem = document.createElement('li');
    userItem.classList.add('notItem');
    userItem.setAttribute('data-title', bookDetails.title.toLowerCase());

    const notTitle = document.createElement('h3');
    notTitle.textContent = bookDetails.title;
    userItem.appendChild(notTitle);

    const noteDesc = document.createElement("p");
    noteDesc.textContent = bookDetails.desc;
    userItem.appendChild(noteDesc);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    userItem.appendChild(deleteBtn);
    const list = document.getElementById("userList");
    list.appendChild(userItem);

    deleteBtn.addEventListener('click', function (event) {
        event.preventDefault();
        axios
            .delete(`https://crudcrud.com/api/e9d1de48389c45cfa6f8f9dfb717a604/book/${bookDetails._id}`)
            .then(() => {
                console.log(bookDetails._id);
                userItem.remove();
            })
            .catch((error) => {
                console.log("Error deleting note:", error);
            });
    });
}

function searchNotes(event) {
    const searchQuery = event.target.value.toLowerCase();
    const listItems = document.querySelectorAll("#userList li");
    let visibleCount = 0;

    listItems.forEach((item) => {
        const title = item.getAttribute("data-title");
        if (title.includes(searchQuery)) {
            item.style.display = "";
            visibleCount++;
        } else {
            item.style.display = "none";
        }
    });

    document.getElementById('visible').innerText = visibleCount;
}
