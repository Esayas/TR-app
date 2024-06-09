import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userAccountService } from "../../../services/useraccountService";
import { Checkbox } from "antd";
import { isInRole } from "../../../helpers/authHeader";

function UserRole() {
  const [userRoles, setUserRoles] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleRemoveItem = (rname) => {
    setUserRoles((l) => l.filter((item) => item.roleName !== rname));
  };

  const deleteByRoleName = (rName) => {
    setUserRoles((oldValues) => {
      return oldValues.filter((fruit) => fruit.roleName !== rName);
    });
  };

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
          // console.log("TG_Result");
          // console.log(result);
          if (!isInRole("SuperAdmin")) {
            // setUserRoles(result);
            setUserRoles(result.filter((a) => a.roleName !== "SuperAdmin"));
          } else {
            setUserRoles(result);
          }
        })
        .catch((error) => {});
    }

    //Remove Super Admin if the user role is not super admin
    // console.log(isInRole("SuperAdmin"));
    // if (!isInRole("SuperAdmin")) {
    //   console.log("Not Admin");
    //   // setUserRoles(userRoles.filter((a) => a.roleName !== "SuperAdmin"));
    //   deleteByRoleName("SuperAdmin");
    // }
    // const tg = isInRole("SuperAdmin");
    // console.log("TGRole");
    // const nextList = [...userRoles];
    // if (!isInRole("SuperAdmin")) {
    //   setUserRoles(userRoles.filter((a) => a.roleName !== "SuperAdmin"));
    // }

    // console.log(nextList.userRole);

    setIsLoading(false);
    // console.log(isLoading);
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
            <label htmlFor="userName">
              User name: <span>{isLoading ? "" : user.fullName}</span>
            </label>
            {/* <span>{isLoading ? "" : user.fullName}</span> */}
          </div>

          {userRoles.map((userRole) => (
            // <h2 key={product.productID}>{product.productName}</h2>
            // {if((userRole.roleName === "SuperAdmin") && isInRole("SuperAdmin")) {}}
            // {userRole.roleName === "SuperAdmin" && isInRole("SuperAdmin")}

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
            <button className="btn btn-primary btn-sm">Save</button>
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
