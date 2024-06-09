export const serviceTypeService = {
  getAll,
  create,
  edit,
  // get,
  delete: deleteServiceType,
};

function getAll() {
  const requestOptions = {
    method: "GET",
    // headers: authHeader(),
  };

  return fetch("http://localhost:5116/api/ServiceType", requestOptions).then(
    handleResponse
  );
}

function create(ServiceType) {
  // console.log(ServiceType);
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(ServiceType),
  };

  return fetch("http://localhost:5116/api/ServiceType", requestOptions).then(
    handleResponse
  );
}

function edit(ServiceType) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(ServiceType),
  };
  const id = ServiceType.id;
  return fetch(
    "http://localhost:5116/api/ServiceType/" + id,
    requestOptions
  ).then(handleResponse);
}

function deleteServiceType(id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "content-type": "applicaiton/json" },
  };

  return fetch(
    "http://localhost:5116/api/ServiceType/" + id,
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
