document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  var name = document.getElementById('fname').value;
  var email = document.getElementById('email').value;

  if (name == '' || email == '') {
    alert('Por favor, preencha todos os campos!!!')
    return false;
  }

  var date = new Date();
  var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();

  var user = { name: name, email: email, date: formattedDate };


  var users = JSON.parse(localStorage.getItem('users')) || [];

  users.push(user);

  localStorage.setItem('users', JSON.stringify(users));

  document.getElementById('fname').value = '';
  document.getElementById('email').value = '';

  // Display users in box_list div
  displayUsers();
});

// ---
var clearName = document.getElementById('clearName');
clearName.addEventListener('click', () => {
  document.getElementById('fname').value = '';
});
var clearEmail = document.getElementById('clearEmail');
clearEmail.addEventListener('click', () => {
  document.getElementById('email').value = '';
});

document.getElementById('input_search').addEventListener('input', function () {
  displayUsers(this.value);
});

function displayUsers(searchValue = '') {
  var users = JSON.parse(localStorage.getItem('users')) || [];
  var boxList = document.getElementById('box_list_child');
  boxList.innerHTML = '';
  users.forEach(function (user, index) {
    if (user.name.includes(searchValue) || user.email.includes(searchValue)) {
      var userDiv = document.createElement('div');
      userDiv.classList.add('userList');
      var spanName = document.createElement('span');
      spanName.textContent = 'Name: ' + user.name;
      var spanEmail = document.createElement('span');
      spanEmail.textContent = 'Email: ' + user.email;
      var spanDate = document.createElement('span');
      spanDate.textContent = 'Date: ' + user.date;
      var deleteButton = document.createElement('span');
      deleteButton.textContent = 'X';
      deleteButton.classList.add('closeUserList');
      deleteButton.addEventListener('click', function () {
        deleteUser(index);
      });
      userDiv.appendChild(spanName);
      userDiv.appendChild(spanDate);
      userDiv.appendChild(spanEmail);
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

displayUsers();

var closeAll = document.getElementById('bottom_CloseAll');
closeAll.addEventListener('click', function () {
  document.querySelectorAll('.userList').forEach((element) => {
    deleteUser(0);
  })

});
