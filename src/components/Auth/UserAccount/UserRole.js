import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userAccountService } from "../../../services/useraccountService";
import { Form, Checkbox } from "antd";

function UserRole() {
  const [userRoles, setUserRoles] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id > 0) {
      //get user profile
      userAccountService
        .getbyId(id)
        .then((result) => {
          setUser(result);
        })
        .catch((error) => {});
      // get user role
      userAccountService
        .getUserRoles(id)
        .then((result) => {
          setUserRoles(result);
        })
        .catch((error) => {});
    }
    // console.log("loading");
    setIsLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userRoles) {
      userAccountService
        .assignRole(userRoles)
        .then((result) => {
          navigate(`/RegisterTable`);
        })
        .catch((error) => {});
    }
  };

  const handleChange = async (event) => {
    event.preventDefault();

    // var { userRole } = userRoles;
    // console.log(userRole);

    var name = event.target.name;
    // var i = userRoles.findIndex((x) => x.roleName === name);
    // userRoles[i].checked = !userRoles[i].checked;

    const existingRoles = [...userRoles];
    const updatedRole = existingRoles.find(
      (userRole) => userRole.roleName === name
    );
    updatedRole.checked = !updatedRole.checked;
    setUserRoles(existingRoles);

    // console.log(userRoles);
    // userRoles.map((userRole) => {
    //   if (userRole.roleName === name) {
    //     const userSecurityRoleId = userRole.userSecurityRoleId;
    //     const roleId = userRole.roleId;
    //     const userId = userRole.userId;
    //     const roleName = userRole.roleName;
    //     const checked = !userRole.checked;

    //     const UpdatedUserRole = {
    //       userSecurityRoleId,
    //       roleId,
    //       userId,
    //       roleName,
    //       checked,
    //     };

    //     setUserRoles([...userRoles, UpdatedUserRole]);

    //     console.log(userRoles);
    //     console.log(UpdatedUserRole);

    //     return UpdatedUserRole;
    //   }
    // });

    // setUserRoles((pre) => {
    //   return pre.map((userRole) => {
    //     if (userRole.roleName === name) {
    //       const userSecurityRoleId = userRole.userSecurityRoleId;
    //       const roleId = userRole.roleId;
    //       const userId = userRole.userId;
    //       const roleName = userRole.roleName;
    //       const checked = !userRole.checked;

    //       const UpdatedUserRole = {
    //         userSecurityRoleId,
    //         roleId,
    //         userId,
    //         roleName,
    //         checked,
    //       };

    //       console.log(userRoles);
    //       console.log(UpdatedUserRole);

    //       return UpdatedUserRole;
    //     } else {
    //       return userRole;
    //     }
    //   });
    // });
  };

  return (
    <div className="App-section">
      <section>
        <h4>Edit User Role</h4>
        {/* <Form
          autoComplete="off"
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
          <Form.Item name="userName" label="User name">
            <div>{isLoading ? "" : user.fullName}</div>
          </Form.Item>

          {userRoles.map((userRole) => (
            <div>
              <Form.Item
                name={userRole.roleName}
                id={userRole.roleName}
                value={userRole.checked}
                checked={userRole.checked}
                onChange={handleChange}
                key={userRole.roleName}
                wrapperCol={{ span: 24 }}
                valuePropName="checked"
              >
                <Checkbox>{userRole.roleName}</Checkbox>
              </Form.Item>
            </div>
          ))}
        </Form> */}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">User name: </label>
            <div>{isLoading ? "" : user.fullName}</div>
          </div>

          {userRoles.map((userRole) => (
            // <h2 key={product.productID}>{product.productName}</h2>
            <div>
              <Checkbox
                name={userRole.roleName}
                id={userRole.roleName}
                value={userRole.checked}
                checked={userRole.checked}
                onChange={handleChange}
                key={userRole.roleName}
              >
                {userRole.roleName}
              </Checkbox>
            </div>
          ))}
          <br />
          <div>
            <button className="btn btn-primary">Save</button>
            <Link to="/RegisterTable" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default UserRole;
