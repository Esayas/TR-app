import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { transportrequestActions } from "../../store/transportrequest-slice";
import { Form, Button, Checkbox, DatePicker, Input, Select } from "antd";

import { sectionService } from "../../services/sectionService";
import { transportrequestService } from "../../services/transportrequestService";
import { employeeService } from "../../services/employeeService";
import { serviceTypeService } from "../../services/serviceTypeService";
import { uiActions } from "../../store/ui-slice";
import moment from "moment";
import { setupListeners } from "@reduxjs/toolkit/query";

function AddTransportRequest() {
  const [uName, SetUName] = useState("");
  const [departure_Date, setDepartureDate] = useState();
  const [return_Date, setReturnDate] = useState();
  const [populateCurrentUser, SetPopulateCurrentUser] = useState(false);

  const [dataSource, setDataSource] = useState({
    id: 1,
    employeeId: 13,
    sectionId: 2,
    travelerName: "",
    noTraveler: "",
    departureDate: "",
    estimatedReturnDate: "",
    serviceTypeId: "",
    fromPlace: "",
    toPlace: "",
    purposeOfTravel: "",
    waiverNeeded: false,
    reasonForWaiver: "",
  });

  const onChangeDepartureDate = (date, dateString) => {
    setDepartureDate(dateString);
  };

  const onChangeReturnDate = (date, dateString) => {
    setReturnDate(dateString);
  };

  const formRef = useRef(null);
  const { Option } = Select;
  const [isCreating, setIsCreating] = useState(true);

  const sectionlist = useSelector((state) => state.transportrequest.sections);
  const user = useSelector((state) => state.loginuser.user);
  // console.log(user);

  const employeelist = useSelector((state) => state.transportrequest.employees);
  // const empId = useSelector((state) => state.transportrequest.employeeId);
  // const secId = useSelector((state) => state.transportrequest.secId);
  // console.log(employeelist);
  const employeelistexceptcurrentuser = employeelist.filter(
    (emp) => emp.userName !== user.username
  );

  const employee = useSelector((state) => state.transportrequest.employee);

  // console.log("UName");
  // console.log(user.username);
  const uu = user.username;
  // SetUName(user.username);
  // console.log(uName)

  // const employeelistcurrentuser = employeelist.filter(
  //   (emp) => emp.userName === user.username
  // );

  // const valid = employeelistcurrentuser ? employeelistcurrentuser.id : 0;
  // const valsec = employeelistcurrentuser
  //   ? employeelistcurrentuser.sectionId
  //   : 0;

  // const employeelistexceptcurrentuser = null;

  // const employeelistcurrentuser = null;

  // const tt = employeelist.filter((emp) => emp.userName === user.username);

  // console.log("Amlakie");
  // console.log(tt[0].id);

  const servicetypelist = useSelector(
    (state) => state.transportrequest.servicetypes
  );
  // console.log("333");
  // console.log(serviceTypeService);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formItemLayout = {
    labelCol: {
      xs: { span: 6 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 5 },
      sm: { span: 14 },
    },
  };

  const { id } = useParams();

  // const empid = employeelistcurrentuser.id;
  // dataSource.sectionId = employeelistcurrentuser.sectionId;
  useEffect(() => {
    // if (populateCurrentUser === true) {
    setDataSource((prevState) => ({
      ...prevState,
      employeeId: employee.id,
      sectionId: employee.sectionId,
    }));

    formRef.current.setFieldsValue({
      ...dataSource,
    });
    console.log("effectG");
    console.log(dataSource);

    // SetPopulateCurrentUser(false);
    // }
  }, [populateCurrentUser]);

  useEffect(() => {
    // setDataSource((prevState) => ({
    //   ...prevState,
    //   employeeId: 5,
    // }));

    // setDataSource((prevState) => ({ ...prevState, employeeId: 7 }));
    //populate user's first name

    // if (user) {
    //   requestingPerson = "G";
    // }
    // console.log("333");

    // setIsCreating(true);
    //populate section list
    sectionService.getAll().then((result) => {
      dispatch(transportrequestActions.getallsections(result));
    });

    //gets section list
    employeeService.getAll().then((result) => {
      dispatch(transportrequestActions.getallemployees(result));
    });

    //gets service type list
    serviceTypeService.getAll().then((result) => {
      dispatch(transportrequestActions.getallservicetypes(result));
    });

    // gets current user's Id and section
    if (!uu) {
      // console.log("No");
    }
    // if (uu) {
    employeeService.getbyUserName(uu).then((result) => {
      // console.log("result");
      // console.log(result);
      dispatch(transportrequestActions.setEmployeeId_Section(result));
    });
    // }

    // dataSource.sectionId = employee.sectionId;
    // dataSource.employeeId = employee.id;

    // console.log("G3G");
    // console.log(secId);
    // console.log(empId);

    SetPopulateCurrentUser(true);
  }, []);

  // const SelectHandler = () => {
  //   console.log("3G3G3GGG33THree");
  //   setDataSource((prevState) => ({
  //     ...prevState,
  //     employeeId: employee.id,
  //     sectionId: employee.sectionId,
  //   }));
  // };

  const submithandler = (values) => {
    values.departureDate = departure_Date;
    values.estimatedReturnDate = return_Date;
    // values.departureTime = departure_Time;
    // values.estimatedReturnTime = return_Time;

    // console.log(Employeedata);
    // console.log("3G3G3GGG33THree");
    // console.log(values);
    if (isCreating) {
      //sending data
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Saving data",
          type: "warning",
        })
      );

      transportrequestService
        .create(values)
        .then((data) => {
          // console.log("Thanks God");
          //Data saved succesfully
          dispatch(
            uiActions.showNotification({
              open: true,
              message: "Saved data successfully!",
              type: "success",
            })
          );
          // navigate("/transportrequest");
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
          //Failed to save
          dispatch(
            uiActions.showNotification({
              open: true,
              message: error,
              type: "error",
            })
          );
        });
    } else {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Updating data",
          type: "warning",
        })
      );

      transportrequestService
        .edit(id, values)
        .then((data) => {
          // console.log(id);
          // console.log(values);
          //Data saved succesfully
          dispatch(
            uiActions.showNotification({
              open: true,
              message: "Updated data successfully!",
              type: "success",
            })
          );
          navigate("/transportrequest");
        })
        .catch((error) => {
          //Failed to save
          dispatch(
            uiActions.showNotification({
              open: true,
              message: error,
              type: "error",
            })
          );
        });

      setIsCreating(false);
    }
  };

  return (
    <div className="App-section">
      <section>
        {/* <form size="small">
          <div>
            <label htmlFor="requestingPerson">Requesting Person:</label>
            <span>
              <input
                type="text"
                required
                id="requestingPerson"
                value={dataSource.requestingPerson}
                onChange={(e) => {
                  setDataSource((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
            </span>

            <label htmlFor="requestingSection">Requesting Person:</label>
            <span>
              <input
                type="text"
                required
                id="requestingSection"
                value={dataSource.requestingPerson}
                onChange={(e) => {
                  setDataSource((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
            </span>
          </div>
        </form> */}

        <h4 style={{ marginBottom: 0 }}>
          {isCreating ? "Add Transport Request" : "Update Transport Request"}
        </h4>
        <br />
        <Form
          {...formItemLayout}
          autoComplete="off"
          onFinish={submithandler}
          ref={formRef}
          size="medium"
          // initialValues={{
          //   RequestingPerson: "GGG",
          // }}
        >
          {/* <Form.Item name="id">
            <Input hidden="true" />
          </Form.Item>

          <Form.Item name="requestedbyAccount">
            <Input hidden="false" />
            <Input placeholder="Type travelers name" />
          </Form.Item> */}

          <Form.Item
            name="employeeId"
            label="Requesting Person"
            rules={[
              {
                required: true,
                message: "Please enter requesting person",
              },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            {/* <Input /> */}
            <Select
              placeholder="Select request person"
              // disabled
              // defaultValue={dataSource.employeeId}
            >
              {employeelist.map((emp) => (
                <Option value={emp.id}>{emp.fullName}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="sectionId"
            label="Section"
            rules={[
              {
                required: true,
                message: "Please enter requesting section",
              },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
            // defaultValue={dataSource.sectionId}
          >
            {/* <Input /> */}
            <Select placeholder="Select the section">
              {sectionlist.map((sec) => (
                <Option value={sec.id}>{sec.sectionnName}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="travelerName"
            label="Traveler Name"
            rules={[
              {
                required: true,
                message: "Please enter travelers name",
              },
              { whitespace: true },
              { min: 3 },
              { max: 250 },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            <Input placeholder="Type travelers name" />
          </Form.Item>

          <Form.Item
            name="noTraveler"
            label="No of Travelers"
            rules={[
              {
                required: true,
                message: "Please enter number of travellers",
              },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            {/* <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              // onChange={onChange}
            /> */}
            <Input
              type="number"
              min={1}
              max={10}
              placeholder="Type number of travellers"
            />
          </Form.Item>

          <Form.Item
            name="departureDate"
            label="Departure Date"
            rules={[
              {
                required: true,
                message: "Please provide departure date",
              },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            <DatePicker
              style={{ width: "100%" }}
              picker="date"
              placeholder="Chose departure date"
              onChange={onChangeDepartureDate}
              disabledDate={(current) => {
                let customDate = moment().format("YYYY-MM-DD");
                return current && current < moment(customDate, "YYYY-MM-DD");
              }}
            />
          </Form.Item>
          {/* 
          <Form.Item
            name="departureTime"
            label="Departure Time"
            rules={[
              {
                required: true,
                message: "Please provide departure time",
              },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            <DatePicker
              style={{ width: "100%" }}
              picker="time"
              placeholder="Chose departure time"
              // onChange={onChangeDepartureTime}
            />
          </Form.Item> */}

          <Form.Item
            name="estimatedReturnDate"
            label="Estimated Return Date"
            rules={[
              {
                required: true,
                message: "Please provide estimated return date",
              },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            <DatePicker
              style={{ width: "100%" }}
              picker="date"
              placeholder="Choose estimated return date"
              onChange={onChangeReturnDate}
              disabledDate={(current) => {
                let customDate = moment().format("YYYY-MM-DD");
                return current && current < moment(customDate, "YYYY-MM-DD");
              }}
            />
          </Form.Item>
          {/* 
          <Form.Item
            name="estimatedReturnTime"
            label="Estimated Return Time"
            rules={[
              {
                required: true,
                message: "Please provide estimated return time",
              },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            <DatePicker
              style={{ width: "100%" }}
              picker="time"
              placeholder="Choose estimated return time"
              // onChange={onChangeReturnTime}
            />
          </Form.Item> */}

          <Form.Item
            name="serviceTypeId"
            label="Service Type"
            style={{ marginBottom: 2 }}
            rules={[
              {
                required: true,
                message: "Please select service type",
              },
            ]}
          >
            <Select placeholder="Select the service type">
              {servicetypelist.map((servicetype) => (
                <Option value={servicetype.id}>
                  {servicetype.serviceTypeName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="fromPlace"
            label="From Place"
            rules={[
              {
                required: true,
                message: "Please enter departure place",
              },
              { whitespace: true },
              { min: 3 },
              { max: 50 },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            <Input placeholder="Type departure place" />
          </Form.Item>

          <Form.Item
            name="toPlace"
            label="To Place"
            rules={[
              {
                required: true,
                message: "Please enter destination place",
              },
              { whitespace: true },
              { min: 3 },
              { max: 50 },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            <Input placeholder="Type destination place" />
          </Form.Item>

          <Form.Item
            name="purposeOfTravel"
            label="Purpose of Travel"
            rules={[
              {
                required: true,
                message: "Please enter purpose of travel",
              },
              { whitespace: true },
              { min: 3 },
              { max: 200 },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            <Input placeholder="Type purpose of travel" />
          </Form.Item>

          <Form.Item
            name="immediateSupervisor"
            label="Immediate Supervisor"
            style={{ marginBottom: 2 }}
            rules={[
              {
                required: true,
                message: "Please select immediate supervisor",
              },
            ]}
          >
            <Select placeholder="Select immediate supervisor">
              {employeelistexceptcurrentuser.map((emp) => (
                <Option value={emp.id}>{emp.fullName}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="waiverNeeded"
            wrapperCol={{ span: 2 }}
            valuePropName="checked"
            label="Waiver Needed?"
            style={{ marginBottom: 2 }}
          >
            <Checkbox />
          </Form.Item>

          <Form.Item
            name="reasonForWaiver"
            label="Reason for Waiver"
            rules={[
              {
                required: true,
                message: "Please enter reason for waiver",
              },
              { whitespace: true },
              { min: 3 },
              { max: 100 },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            <Input placeholder="Type reason for waiver" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 6, offset: 10 }}>
            <Button block type="primary" htmlType="submit">
              {isCreating ? "Save" : "Update"}
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
}

export default AddTransportRequest;
