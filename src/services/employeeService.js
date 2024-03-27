export const employeeService = {
  getAll,
  create,
  edit,
  get,
  delete: deleteEmployee,
};

function getAll() {
  const requestOptions = {
    method: "GET",
    // headers: authHeader(),
  };

  return fetch("http://localhost:5116/api/Employee", requestOptions).then(
    handleResponse
  );
}

function get(id) {
  const requestOptions = {
    method: "GET",
    // headers: authHeader(),
  };
  return fetch("http://localhost:5116/api/Employee/" + id, requestOptions).then(
    handleResponse
  );
}

function create(Employee) {
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Employee),
  };

  return fetch("http://localhost:5116/api/Employee", requestOptions).then(
    handleResponse
  );
}

function edit(id, Employee) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(Employee),
  };
  // const id = Employee.id;
  return fetch("http://localhost:5116/api/Employee/" + id, requestOptions).then(
    handleResponse
  );
}

function deleteEmployee(id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "content-type": "applicaiton/json" },
  };

  return fetch("http://localhost:5116/api/Employee/" + id, requestOptions).then(
    handleResponse
  );
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
