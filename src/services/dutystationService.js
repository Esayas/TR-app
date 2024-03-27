export const dutystationService = {
  getAll,
  create,
  edit,
  // get,
  delete: deleteDutystation,
};

function getAll() {
  const requestOptions = {
    method: "GET",
    // headers: authHeader(),
  };

  return fetch("http://localhost:5116/api/Dutystation", requestOptions).then(
    handleResponse
  );
}

function create(Dutystation) {
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Dutystation),
  };

  return fetch("http://localhost:5116/api/Dutystation", requestOptions).then(
    handleResponse
  );
}

function edit(Dutystation) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(Dutystation),
  };
  const id = Dutystation.id;
  return fetch(
    "http://localhost:5116/api/Dutystation/" + id,
    requestOptions
  ).then(handleResponse);
}

function deleteDutystation(id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "content-type": "applicaiton/json" },
  };

  return fetch(
    "http://localhost:5116/api/Dutystation/" + id,
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
