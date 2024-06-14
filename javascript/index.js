document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    var name = document.getElementById('fname').value;
    var email = document.getElementById('email').value;

    // Get current date and format it to dd/mm/yyyy
    var date = new Date();
    var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();

    // Create user object
    var user = {name: name, email: email, date: formattedDate};

    // Get existing users from local storage or create new array if none exist
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Add new user to users array
    users.push(user);

    // Save new users array to local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Clear input fields
    document.getElementById('fname').value = '';
    document.getElementById('email').value = '';

    // Display users in box_list div
    displayUsers();
});

document.getElementById('input_search').addEventListener('input', function() {
    displayUsers(this.value);
});

function displayUsers(searchValue = '') {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var boxList = document.getElementById('box_list');
    boxList.innerHTML = '';
    users.forEach(function(user, index) {
        if (user.name.includes(searchValue) || user.email.includes(searchValue)) {
            var userDiv = document.createElement('div');
            userDiv.textContent = 'Name: ' + user.name + ', Email: ' + user.email + ', Date: ' + user.date;

            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                deleteUser(index);
            });

            userDiv.appendChild(deleteButton);
            boxList.appendChild(userDiv);
        }
    });
}

function deleteUser(index) {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}

// Display users when page loads
displayUsers();