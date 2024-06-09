import { authHeader } from "../helpers/authHeader";
import { authRole } from "../helpers/authHeader";

export const employeeService = {
  getAll,
  create,
  edit,
  get,
  getbyUserName,
  delete: deleteEmployee,
};

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    // body: { Roles: authRole() },
  };

  return fetch("http://localhost:5116/api/Employee", requestOptions).then(
    handleResponse
  );
}

function get(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch("http://localhost:5116/api/Employee/" + id, requestOptions).then(
    handleResponse
  );
}

function getbyUserName(uName) {
  // console.log("GOD");
  // console.log(uName);
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  // `http://localhost:5116/api/useraccount/userRoles/${uName}`,

  return fetch(
    `http://localhost:5116/api/Employee/username/${uName}`,
    requestOptions
  ).then(handleResponse);
}

function create(Employee) {
  // console.log("ServiceEmp");
  // console.log(Employee);
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
