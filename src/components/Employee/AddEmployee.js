import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Checkbox, DatePicker, Input, Select, Space } from "antd";
import { employmentTypeService } from "../../services/employmentTypeService";
import { employeeActions } from "../../store/employee-slice";
import { useDispatch, useSelector } from "react-redux";
import { dutystationService } from "../../services/dutystationService";
import { sectionService } from "../../services/sectionService";
import { employeeService } from "../../services/employeeService";
import { uiActions } from "../../store/ui-slice";
import { useNavigate, useParams } from "react-router-dom";

function AddEmployee() {
  // const formRef = Component.React.useRef();
  // const myRef = useRef();
  // formref = Component.React.createRef();
  const formRef = useRef(null);
  // const [employeedata, setEmployeedata] = useState({
  //   id: "",
  //   fullname: "",
  //   title: "",
  //   dutyStationId: "",
  //   section: "",
  //   isActive: false,
  //   email: "",
  //   phone: "",
  //   isSectionResponsible: false,
  //   userName: "",
  //   employmentTypeId: "",
  //   waiverNeeded: false,
  // });

  // const Employeedata = {
  //   Fullname: "333GODGOD333G",
  //   Title: "GGGGGG",
  //   DutyStationId: 3,
  //   SectionId: 1,
  //   IsActive: false,
  //   Email: "vvfvfv@gmail.com",
  //   Phone: "097181271",
  //   IsSectionResponsible: false,
  //   UserName: "ddddd",
  //   EmploymentTypeId: 1,
  //   WaiverNeeded: false,
  // };

  const { Option } = Select;
  // const [dutystations, setDutystations] = useState([]);
  // const [sections, setSections] = useState([]);
  // const [employmentTypes, setEmploymentTypes] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  const employmentTypelist = useSelector(
    (state) => state.employee.employmentTypes
  );
  const dutystationlist = useSelector((state) => state.employee.dutystations);
  const sectionlist = useSelector((state) => state.employee.sections);
  const employeelist = useSelector((state) => state.employee.employees);

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

  useEffect(() => {
    setIsCreating(true);
    //gets employment type list
    employmentTypeService.getAll().then((result) => {
      dispatch(employeeActions.getallemploymenttypes(result));
    });

    //gets duty station list
    dutystationService.getAll().then((result) => {
      dispatch(employeeActions.getalldutystations(result));
    });

    //gets employee list except current user TBM
    employeeService.getAll().then((result) => {
      dispatch(employeeActions.getall(result));
    });

    if (id > 0) {
      // console.log(id);
      employeeService
        .get(id)
        .then((result) => {
          sectionHandler(result.dutyStationId);
          // console.log("333");
          // console.log(result);
          formRef.current.setFieldsValue({
            ...result,
          });
        })
        .catch((error) => {});
      setIsCreating(false);
    }
  }, []);

  const sectionHandler = (value, e) => {
    if (value != null) {
      //gets section list
      sectionService.getbydtystationId(value).then((result) => {
        dispatch(employeeActions.getallsections(result));
      });
    }
  };

  const submithandler = (values) => {
    if (isCreating) {
      //sending data
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Saving data",
          type: "warning",
        })
      );
      delete values.id;
      employeeService
        .create(values)
        .then((data) => {
          // console.log(values);
          //Data saved succesfully
          dispatch(
            uiActions.showNotification({
              open: true,
              message: "Saved data successfully!",
              type: "success",
            })
          );
          navigate("/employeetable");
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
      // employeeService.getAll().then((data) => {});
    } else {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Updating data",
          type: "warning",
        })
      );

      employeeService
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
          navigate("/employeetable");
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

      setIsCreating(true);
    }
  };

  return (
    <div className="App-section">
      <section>
        <h4 style={{ marginBottom: 0 }}>
          {isCreating ? "Add New Employee" : "Update Employee"}
        </h4>
        {/* <header className="App-header"> */}
        <Form
          {...formItemLayout}
          autoComplete="off"
          onFinish={submithandler}
          ref={formRef}

          // style={{ textAlign:  }}
          // labelCol={{ span: 4 }}
          // wrapperCol={{ span: 18 }}
          // style={{ maxWidth: 600 }}
        >
          <Form.Item name="id">
            <Input hidden="true" />
          </Form.Item>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please enter the name",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            <Input placeholder="Type the name" />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            requiredMark="optional"
            rules={[
              {
                required: true,
                message: "Please enter the title",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            <Input placeholder="Type the title" />
          </Form.Item>
          <Form.Item
            name="dutyStationId"
            label="Duty Station"
            style={{ marginBottom: 2 }}
            rules={[
              {
                required: true,
                message: "Please select duty station",
              },
            ]}
          >
            <Select
              placeholder="Select the duty station"
              onChange={sectionHandler}
            >
              {dutystationlist.map((dtystation) => (
                <Option value={dtystation.id}>
                  {dtystation.dutyStationName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="sectionId"
            label="Section"
            style={{ marginBottom: 2 }}
            rules={[
              {
                required: true,
                message: "Please select section",
              },
            ]}
          >
            <Select placeholder="Select the section">
              {sectionlist.map((sec) => (
                <Option value={sec.id}>{sec.sectionnName}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="isActive"
            wrapperCol={{ span: 2 }}
            valuePropName="checked"
            label="Is Active?"
            style={{ marginBottom: 2 }}
          >
            <Checkbox />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter the email",
              },
              { type: "email", message: "Please enter a valid email" },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            <Input placeholder="Type the email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: "Please enter the phone",
              },
              { type: "tel", message: "Please enter a valid phone" },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            <Input
              type="tel"
              pattern="[0-9]{4}[0-9]{6}"
              placeholder="0912345678"
              minLength={10}
            />
          </Form.Item>
          <Form.Item
            name="isSectionResponsible"
            wrapperCol={{ span: 1 }}
            valuePropName="checked"
            label="Is Section Responsible?"
            style={{ marginBottom: 2 }}
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            name="userName"
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please enter the user name",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
            style={{ marginBottom: 2 }}
          >
            <Input placeholder="Type the user name" />
          </Form.Item>
          <Form.Item
            name="employmentTypeId"
            label="Employment Type"
            style={{ marginBottom: 2 }}
          >
            <Select placeholder="Select the Employment Type">
              {employmentTypelist.map((emptype) => (
                <Option value={emptype.id}>{emptype.employmentTypeName}</Option>
              ))}
            </Select>

            {/* <Select>
              {ypdcTypes.map((ypdcType) => (
                <Option value={ypdcType.id}>{ypdcType.description}</Option>
              ))}
            </Select> */}
          </Form.Item>
          <Form.Item
            name="waiverNeeded"
            wrapperCol={{ span: 1 }}
            valuePropName="checked"
            label="Waiver Needed?"
            style={{ marginBottom: 2 }}
          >
            <Checkbox />
          </Form.Item>

          <Form.Item
            name="employeereportto"
            label="Employee Report to"
            style={{ marginBottom: 2 }}
            // rules={[
            //   {
            //     required: true,
            //     message: "Please select employees supervisor",
            //   },
            // ]}
          >
            <Select
              placeholder="Select the supervisor(s)"
              maxTagCount={2}
              allowClear
              style={{ width: "100%" }}
              mode="multiple"
            >
              {employeelist.map((employee) => (
                <Option value={employee.id}>{employee.fullName}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 6, offset: 10 }}>
            <Button block type="primary" htmlType="submit">
              {isCreating ? "Save" : "Update"}
            </Button>
          </Form.Item>
        </Form>
        {/* </header> */}
      </section>
    </div>
  );
}

export default AddEmployee;
