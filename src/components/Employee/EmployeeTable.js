import React, { useEffect } from "react";
import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { employeeActions } from "../../store/employee-slice";
import { uiActions } from "../../store/ui-slice";
import { employeeService } from "../../services/employeeService";
import { SearchOutlined } from "@ant-design/icons";

function EmployeeTable() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employeelist = useSelector((state) => state.employee.employees);

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

  function getall() {
    setLoading(true);

    employeeService.getAll().then(
      (json) => {
        dispatch(employeeActions.getall(json));
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
      title: "Title",
      dataIndex: "title",
      width: 150,
      sorter: (a, b) => a.title.localeCompare(b.title),
      ...getColumnSearch("title"),
    },
    {
      key: "4",
      title: "Duty",
      dataIndex: "dutyStationId",
      sorter: (a, b) => a.dutyStationId.localeCompare(b.dutyStationId),
      width: "20%",
      ...getColumnSearch("dutyStationId"),
    },
    {
      key: "5",
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      ...getColumnSearch("email"),
    },
    {
      key: "6",
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      ...getColumnSearch("phone"),
    },
    {
      key: "7",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditEmployee(record.id);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteEmployee(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onDeleteEmployee = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this employee record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        employeeService
          .delete(record.id)
          .then((data) => {
            console.log(record.id);
            //Data deleted succesfully
            // dispatch(employeeActions.removedata(record.id));

            getall();
            dispatch(
              uiActions.showNotification({
                open: true,
                message: "Data delete successfully!",
                type: "success",
              })
            );
          })
          .catch((error) => {
            //Failed to delete
            dispatch(
              uiActions.showNotification({
                open: true,
                message: "Data Deleting failed!",
                type: "error",
              })
            );
          });
      },
    });
  };

  const onEditEmployee = (id) => {
    console.log(id);

    navigate(`/employee/edit/${id}`);

    // to={`/triptype/edit/${triptype.id}`}
    // navigation.navigate("RouteName", {
    //   /* params go here */
    // });
  };

  return (
    <div>
      <h4>Employee List</h4>
      <header className="App-header">
        {/* <Button className="btn btn-primary">Add a new Emplyee</Button> */}

        <Link to="/add-employee" className="btn btn-success my-3">
          Create +
        </Link>
        <Table
          columns={columns}
          dataSource={employeelist}
          bordered
          style={{ display: "flex", margin: 0 }}
          loading={loading}
          // size="large"

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

export default EmployeeTable;
