window.onload = function () {
    document.getElementById("addUserButton").addEventListener("click", handleAddUserButton);
    document.getElementById("allUsersButton").addEventListener("click", handleAllUsersButton);
}

function handleAddUserButton() {
    let name = document.getElementById("name");
    let surname = document.getElementById("surname");
    let age = document.getElementById("age");

    //if(!Number.isInteger(age)) {
    //    age = 0;
    //}

    const userStoreUrl = "http://localhost:8080/userStore";
    let user = { name: name.value, surname: surname.value, age: age.value };

    fetch(userStoreUrl, {
        method: 'POST',
        body: JSON.stringify(user),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
            return response.json();
         })
        .then(function (dataSrv) {
            document.getElementById("infoSection").innerHTML = dataSrv;
        })
        .then(function () {
            name.value = "";
            surname.value = "";
            age.value = "";
        });
}

function handleAllUsersButton() {
    fetch('http://localhost:8080/allUsersData')
            .then(function (response) {
                return response.json();
            })
            .then(function (dataSrv) {
                let table = document.createElement("table");
                table.setAttribute("id", "allUsersTable");

                let head = document.createElement("thead");
                let columns = document.createElement("tr");
                let nameColumn = document.createElement("td");
                nameColumn.textContent = "Name";
                let surnameColumn = document.createElement("td");
                surnameColumn.textContent = "Surname";
                let ageColumn = document.createElement("td");
                ageColumn.textContent = "Age";
                let body = document.createElement("tbody");

                for (let user of dataSrv) {
                    let row = document.createElement("tr");
                    let nameData = document.createElement("td");
                    nameData.textContent = user.name;

                    let surnameData = document.createElement("td");
                    surnameData.textContent = user.surname;

                    let ageData = document.createElement("td");
                    ageData.textContent = user.age;

                    row.appendChild(nameData);
                    row.appendChild(surnameData);
                    row.appendChild(ageData);
                    body.appendChild(row);
                }

                columns.appendChild(nameColumn);
                columns.appendChild(surnameColumn);
                columns.appendChild(ageColumn);
                head.appendChild(columns);
                table.appendChild(head);
                table.appendChild(body);

                document.getElementById("dataHolder").appendChild(table);
            });
}