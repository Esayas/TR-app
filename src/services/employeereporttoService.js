export const employeereporttoService = {
  getAll,
  create,
  edit,
  get,
  getByEmployeeId,
  delete: deleteEmployeeReportto,
};

function getAll() {
  const requestOptions = {
    method: "GET",
    // headers: authHeader(),
  };

  return fetch(
    "http://localhost:5116/api/Employeereportto",
    requestOptions
  ).then(handleResponse);
}

function get(id) {
  const requestOptions = {
    method: "GET",
    // headers: authHeader(),
  };
  return fetch(
    "http://localhost:5116/api/Employeereportto/" + id,
    requestOptions
  ).then(handleResponse);
}

function getByEmployeeId(id) {
  const requestOptions = {
    method: "GET",
    // headers: authHeader(),
  };
  return fetch(
    "http://localhost:5116/api/Employeereportto/byemployeeid/" + id,
    requestOptions
  ).then(handleResponse);
}

function create(Employeereportto) {
  // console.log(Employeereportto);
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Employeereportto),
  };

  return fetch(
    "http://localhost:5116/api/Employeereportto",
    requestOptions
  ).then(handleResponse);
}

function edit(id, Employeereportto) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(Employeereportto),
  };
  // const id = Employeereportto.id;
  return fetch(
    "http://localhost:5116/api/Employeereportto/" + id,
    requestOptions
  ).then(handleResponse);
}

function deleteEmployeeReportto(id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "content-type": "applicaiton/json" },
  };

  return fetch(
    "http://localhost:5116/api/Employeereportto/" + id,
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
