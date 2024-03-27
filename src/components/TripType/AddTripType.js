import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { triptypeActions } from "../../store/triptype-slice";
import { useNavigate, useParams } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";
import { tripTypeService } from "../../services/tripTypeService";
import { employmentTypeService } from "../../services/employmentTypeService";

function AddTripType() {
  const [triptype, setTripType] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //uses to check if it is new entry or record to be updated
  const isCreating = useSelector((state) => state.trip_types.isCreating);

  //gets record to be edited
  const triptypelist = useSelector((state) => state.trip_types.triptypes);

  const { id } = useParams();

  useEffect(() => {
    // console.log(id);
    // console.log(isCreating);
    if (id > 0) {
      // setIsUpdating(true);
      dispatch(triptypeActions.editdata());
      const existingTripType = triptypelist.filter((f) => f.id == id);
      // if (!isCreating) {
      const { description } = existingTripType[0];
      setTripType(description);
      // }
    }
  }, []);

  const TripType = {
    Description: triptype,
  };

  function submithandler(event) {
    event.preventDefault();

    if (id > 0) {
      //updating data
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Updating data",
          type: "warning",
        })
      );
      const tripedited = { id: id, description: triptype };

      tripTypeService
        .edit(tripedited)
        .then((data) => {
          //Data updated succesfully
          dispatch(
            uiActions.showNotification({
              open: true,
              message: "Updated data successfully!",
              type: "success",
            })
          );

          navigate("/triptypetable");
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
      dispatch(triptypeActions.createnew());
    } else {
      //sending data
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Saving data",
          type: "warning",
        })
      );

      tripTypeService
        .create(TripType)
        .then((data) => {
          //Data saved succesfully
          dispatch(
            uiActions.showNotification({
              open: true,
              message: "Saved data successfully!",
              type: "success",
            })
          );
          dispatch(triptypeActions.createnew());
          navigate("/triptypetable");
        })
        .catch((error) => {
          //Failed to save
          dispatch(
            uiActions.showNotification({
              open: true,
              message: "Saving data failed!",
              type: "error",
            })
          );
        });
    }
  }

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5 ">
        <form onSubmit={submithandler} className="bg-secondary ">
          <div>
            <h3> {isCreating ? "Add New Trip Type" : "Update Trip Type"}</h3>
            <label htmlFor="triptype">Trip Type:</label>
            <input
              type="text"
              name="triptype"
              className="form-control"
              placeholder="enter trip type"
              onChange={(e) => setTripType(e.target.value)}
              value={triptype}
            />
            <br />

            <div>
              <button className="btn btn-info">
                {isCreating ? "Add" : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTripType;
