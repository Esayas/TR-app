export const userAccountService = {
  login,
  logout,
  getAll,
  create,
  edit,
  getbyId,
  disable,
  delete: deleteUserAccount,
  editprofile,
};

// function login(username, password) {
function login(UserAccount) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(UserAccount),
    // body: JSON.stringify({ username, password }),
  };
  console.log(UserAccount);

  return fetch(
    "http://localhost:5116/api/UserAccount/authenticate",
    requestOptions
  )
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  localStorage.removeItem("tenat_data");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    // headers: authHeader(),
  };

  return fetch("http://localhost:5116/api/UserAccount", requestOptions).then(
    handleResponse
  );
}

function getbyId(id) {
  const requestOptions = {
    method: "GET",
    // headers: authHeader(),
  };

  return fetch(
    "http://localhost:5116/api/UserAccount/" + id,
    requestOptions
  ).then(handleResponse);
}

function create(UserAccount) {
  // console.log("TG");
  // console.log(UserAccount);
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(UserAccount),
  };

  return fetch("http://localhost:5116/api/UserAccount", requestOptions).then(
    handleResponse
  );
}

function edit(UserAccount) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(UserAccount),
  };
  const id = UserAccount.id;
  return fetch(
    "http://localhost:5116/api/UserAccount/" + id,
    requestOptions
  ).then(handleResponse);
}

function editprofile(UserAccount, id) {
  console.log("3TG");
  const requestOptions = {
    method: "PUT",
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(UserAccount),
  };

  return fetch(
    "http://localhost:5116/api/UserAccount/editprofile/" + id,
    requestOptions
  ).then(handleResponse);
}

function deleteUserAccount(id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "content-type": "applicaiton/json" },
  };

  return fetch(
    "http://localhost:5116/api/UserAccount/" + id,
    requestOptions
  ).then(handleResponse);
}

function disable(UserAccount) {
  console.log(UserAccount);
  console.log(JSON.stringify(UserAccount));
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(UserAccount),
  };

  return fetch(
    `http://localhost:5116/api/UserAccount/disable`,
    requestOptions
  ).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
