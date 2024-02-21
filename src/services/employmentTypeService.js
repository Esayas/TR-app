export const employmentTypeService = {
  getAll,
  create,
  edit,
  // get,
  delete: deleteEmploymentType,
};

function getAll() {
  const requestOptions = {
    method: "GET",
    // headers: authHeader(),
  };

  return fetch("http://localhost:5116/api/EmploymentType", requestOptions).then(
    handleResponse
  );
}

function create(EmploymentType) {
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(EmploymentType),
  };

  return fetch("http://localhost:5116/api/EmploymentType", requestOptions).then(
    handleResponse
  );
}

function edit(EmploymentType) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(EmploymentType),
  };
  const id = EmploymentType.id;
  return fetch(
    "http://localhost:5116/api/EmploymentType/" + id,
    requestOptions
  ).then(handleResponse);
}

function deleteEmploymentType(id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "content-type": "applicaiton/json" },
  };

  return fetch(
    "http://localhost:5116/api/EmploymentType/" + id,
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
