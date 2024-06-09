import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAccountService } from "../../../services/useraccountService";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { useraccountActions } from "../../../store/useraccount-slice";
import { uiActions } from "../../../store/ui-slice";
import {
  faTrashAlt,
  faKey,
  faUserSlash,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RegisterTable() {
  const { confirm } = Modal;
  const [loading, setLoading] = useState(false);
  const [statuschanged, setStatusChanged] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const useraccountlist = useSelector(
    (state) => state.useraccount.useraccounts
  );

  function handleToggle() {
    setLoading((current) => !current);
  }

  function handleToggleStatus() {
    setStatusChanged((current) => !current);
  }

  function getall() {
    // handleToggle();
    setLoading(true);
    userAccountService.getAll().then(
      (json) => {
        dispatch(useraccountActions.getall(json));
        setLoading(false);
      },
      (error) => {
        dispatch(
          uiActions.showNotification({
            open: true,
            message: error,
            type: "error",
          })
        );
      }
    );
  }

  useEffect(() => {
    getall();
  }, []);

  useEffect(() => {
    getall();
  }, [statuschanged]);

  const getColumnSearch = (dataindex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <>
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
          <Button
            onClick={() => {
              confirm();
            }}
            className="btn btn-primary"
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
            }}
            className="btn btn-danger"
          >
            Reset
          </Button>
        </>
      );
    },
    filterIcon: () => {
      return <SearchOutlined />;
    },
    onFilter: (value, record) => {
      return record[dataindex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },

    // onFilter: (value, record) =>
    //   record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  const onRoleChange = (record) => {
    // console.log(record.id);
    navigate(`/useraccount/user-role/${record.id}`);
  };

  const onEditUserAccount = (record) => {
    // console.log(record.id);
    navigate(`/useraccount/edit/${record.id}`);
  };
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => {
        return a.id > b.id;
      },
      hidden: true,
    },
    {
      key: "2",
      title: "Full Name",
      dataIndex: "fullName",
      width: 200,
      // sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      ...getColumnSearch("fullName"),
    },
    {
      key: "3",
      title: "User Name",
      dataIndex: "userName",
      width: 150,
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      ...getColumnSearch("userName"),
    },
    {
      key: "4",
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      width: "20%",
      ...getColumnSearch("email"),
    },

    {
      key: "5",
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            // href={"/useraccount/edit/" + record.id}
            onClick={() => {
              onEditUserAccount(record);
            }}
            // navigate(`/employee/edit/${record.id}`);
            data-toggle="tooltip"
            data-placement="top"
            title="Edit User"
          >
            Edit
          </Button>

          <Button
            onClick={() => {
              onRoleChange(record);
            }}
            // href={"/useraccount/user-role/" + record.id}
            data-toggle="tooltip"
            data-placement="top"
            title="Change User Role"
          >
            Role
          </Button>

          <Button
            className=""
            onClick={() => onDeleteUserAccount(record)}
            data-toggle="tooltip"
            data-placement="top"
            title="Delete User"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
          <Button
            href={"/reset-password/" + record.id}
            data-toggle="tooltip"
            data-placement="top"
            title="Reset Password"
          >
            <FontAwesomeIcon icon={faKey} />
          </Button>
          <Button
            onClick={() => disableUser(record)}
            data-toggle="tooltip"
            data-placement="top"
            title={record.isActive ? "Disable User" : "Enable user"}
          >
            <FontAwesomeIcon
              icon={record.isActive ? faUserCheck : faUserSlash}
            />
          </Button>
        </span>
      ),
    },

    // {
    //   key: "5",
    //   title: "Actions",
    //   render: (record) => {
    //     return (
    //       <>
    //         <EditOutlined
    //           onClick={() => {
    //             onEditStatus(record);
    //           }}
    //         />
    //         <DeleteOutlined
    //           onClick={() => {
    //             onDeleteUserAccount(record);
    //           }}
    //           style={{ color: "red", marginLeft: 12 }}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  const disableUser = (user) => {
    const title =
      "Do you want " +
      (user && (user.isActive ? "disable " : "enable " + user.userName)) +
      "?";
    const content =
      "When clicked the OK button, user " + user &&
      user.userName +
        " will be" +
        (user && (user.isActive ? " disabled" : " enabled")) +
        "! ";

    confirm({
      title: title,
      content: content,
      onOk: () => {
        userAccountService.disable(user);
        handleToggleStatus();
        //getall();
        // handleToggle();
      },
      onCancel() {},
    });
  };

  const onDeleteUserAccount = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this user account?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        userAccountService
          .delete(record.id)
          .then((data) => {
            getall();
            dispatch(
              uiActions.showNotification({
                open: true,
                message: "User account deleted successfully!",
                type: "success",
              })
            );
          })
          .catch((error) => {
            //Failed to delete
            dispatch(
              uiActions.showNotification({
                open: true,
                message: "User account deleting failed!",
                type: "error",
              })
            );
          });
      },
    });
  };

  return (
    <div className="App-section">
      <h4>User Management</h4>
      <header>
        <Link to="/Register" className="btn btn-success my-3">
          Create +
        </Link>
        <Table
          columns={columns}
          dataSource={useraccountlist}
          bordered
          style={{ display: "flex", margin: 0 }}
          loading={loading}
          size="small"
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "30", "50", "100"],
          }}
        ></Table>
      </header>
    </div>
  );
}

export default RegisterTable;
