import { authHeader } from "../helpers/authHeader";
import { authRole } from "../helpers/authHeader";

export const transportrequestService = {
  getAll,
  create,
  edit,
  get,
  delete: deleteTransportrequest,
};

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    // body: { Roles: authRole() },
  };

  return fetch(
    "http://localhost:5116/api/Transportrequest",
    requestOptions
  ).then(handleResponse);
}

function get(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(
    "http://localhost:5116/api/Transportrequest/" + id,
    requestOptions
  ).then(handleResponse);
}

function create(transportrequest) {
  // console.log("ServiceTR");
  // console.log(transportrequest);
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(transportrequest),
  };

  return fetch(
    "http://localhost:5116/api/Transportrequest",
    requestOptions
  ).then(handleResponse);
}

function edit(id, Transportrequest) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(Transportrequest),
  };

  return fetch(
    "http://localhost:5116/api/Transportrequest/" + id,
    requestOptions
  ).then(handleResponse);
}

function deleteTransportrequest(id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "content-type": "applicaiton/json" },
  };

  return fetch(
    "http://localhost:5116/api/Transportrequest/" + id,
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
