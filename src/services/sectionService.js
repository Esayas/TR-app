export const sectionService = {
  getAll,
  create,
  edit,
  getbydtystationId,
  delete: deleteSection,
};

function getAll() {
  const requestOptions = {
    method: "GET",
    // headers: authHeader(),
  };

  return fetch("http://localhost:5116/api/Section", requestOptions).then(
    handleResponse
  );
}

function getbydtystationId(dtyid) {
  const requestOptions = {
    method: "GET",
    // headers: authHeader(),
  };
  return fetch(
    "http://localhost:5116/api/Section/bydutystation/" + dtyid,
    requestOptions
  ).then(handleResponse);
}

function create(Section) {
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Section),
  };

  return fetch("http://localhost:5116/api/Section", requestOptions).then(
    handleResponse
  );
}

function edit(Section) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(Section),
  };
  const id = Section.id;
  return fetch("http://localhost:5116/api/Section/" + id, requestOptions).then(
    handleResponse
  );
}

function deleteSection(id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "content-type": "applicaiton/json" },
  };

  return fetch("http://localhost:5116/api/Section/" + id, requestOptions).then(
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
