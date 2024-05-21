export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}

export function authRole() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.roles) {
    console.log("Thanks God");
    console.log(user.roles);
    return JSON.stringify(user.roles);
  } else {
    return {};
  }
}

export function isInRole(role) {
  // alert(JSON.stringify(role))
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  if (user && user.token) {
    if (!user.roles) return false;
    return user.roles.includes(role);
  } else {
    return false;
  }
}
