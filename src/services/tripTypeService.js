export const tripTypeService = {
  getAll,
  create,
  edit,
  // get,
  delete: deleteTripType,
};

function getAll() {
  const requestOptions = {
    method: "GET",
    // headers: authHeader(),
  };

  return fetch("http://localhost:5116/api/TripType", requestOptions).then(
    handleResponse
  );
}

function create(TripType) {
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(TripType),
  };

  return fetch("http://localhost:5116/api/TripType", requestOptions).then(
    handleResponse
  );
}

function edit(TripType) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(TripType),
  };
  const id = TripType.id;
  return fetch("http://localhost:5116/api/TripType/" + id, requestOptions).then(
    handleResponse
  );
}

function deleteTripType(id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "content-type": "applicaiton/json" },
  };

  return fetch("http://localhost:5116/api/TripType/" + id, requestOptions).then(
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
