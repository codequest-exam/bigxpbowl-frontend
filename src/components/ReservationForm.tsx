import React, { useState } from "react";
import "../styling/reservationform.css";
import { ChosenActivityWithStringDates, ReservationFormData, ReservationListItem, ReservationWithStringDates } from "../interfaces/reservationInterface";
import { defaultFormObj } from "../pages/ReservationPage";
import { getReservations, submitReservation } from "../services/apiFacade";

// export interface ChosenActivityWithStringDates {
//   id: number;
//   amountBooked: number;
//   activityType: string;
//   date: string;
//   startTime: string;
//   endTime: string;
// }

// export interface ReservationFormData {
//   id: number;
//   name: string;
//   phoneNumber: string;
//   participants: number;
//   activityType: string;
//   date: string;
//   startTime: string;
//   duration: string;
//   activities: Array<ChosenActivityWithStringDates>;
// }

export default function ReservationForm({
  setFormData,
  formData,
  setReservations,
}: {
  setFormData: React.Dispatch<React.SetStateAction<ReservationFormData>>;
  formData: ReservationFormData;
  setReservations: React.Dispatch<React.SetStateAction<ReservationListItem[]>>;
}) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("formdata", formData);

    // console.log("formdata date", formData.date);
    // console.log(new Date(formData.date));

    // const stringToDate = new Date(formData.date);
    // // const time = formData.startTime.split(":");
    // // const startTime = new Date(stringToDate.setHours(parseInt(time[0])));
    // // const endTime = new Date(stringToDate.setHours(stringToDate.getHours() + parseInt(formData.duration)));
    // // stringToDate.setHours(parseInt(formData.startTime.split(":")[0]));
    // // stringToDate.setMinutes(parseInt(formData.startTime.split(":")[1]));
    // console.log(stringToDate.toDateString());
    // console.log(stringToDate.toTimeString());
    // console.log(stringToDate.toISOString());

    // of type ReservationWithStringDates:
    const newReservation: ReservationWithStringDates = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      participants: +formData.participants,
      activities: formData.activities.map((activity) => ({ ...activity, date: formData.date })),
    };

    if (formData.id) {
      newReservation.id = formData.id;
    }
    console.log("SUBMIT OBJ", newReservation);

    console.log("FINAL FORM DATA", formData);
    for (const key in newReservation) {
      if (newReservation[key] === "") {
        
        setErrorMessage(`Please fill out ${key}`);
        return;
      }

    }
    if (newReservation.activities.length === 0) {
      setErrorMessage("Please add an activity");
      return;
    }


    await submitReservation(newReservation);
    setFormData(defaultFormObj);
    setReservations(await getReservations());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddActivity = () => {
    console.log("adding activity");

    const checks: { [key: string]: boolean } = {
      activity: formData.activityType !== "",
      startTime: formData.startTime !== "",
      duration: formData.duration !== "",
      date: formData.date !== "",
    };

    if (formData.activities.filter((activity) => activity.activityType === formData.activityType).length !== 0) {
      console.log("FIRST ERROR");

      setErrorMessage("Activity already added");
    } else if (checks.activity && checks.startTime && checks.duration && checks.date) {
      console.log("passed checks");
      console.log(formData);

      const s = formData.startTime;

      setFormData((prevFormData) => ({
        ...prevFormData,
        activities: [
          ...prevFormData.activities,
          {
            activityType: formData.activityType,
            amountBooked: formData.activityType == "DINING" ? 1 : formData.amount,
            startTime: s,
            endTime: Number(s.substring(0, 2)) + 2 + ":" + s.substring(3),
            date: formData.date,
          },
        ],
        // activity: "",
        // startTime: "",
        // duration: "",
      }));
      setErrorMessage("");
    } else {
      console.log("ERROR");

      setErrorMessage(
        "Please fill out " +
          Object.keys(checks)
            .filter((key) => !checks[key])
            .join(" & ")
      );
    }
  };

  const handleRemoveActivity = (chosenActivity: ChosenActivityWithStringDates) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      activities: prevFormData.activities.filter((activity) => activity.activityType !== chosenActivity.activityType),
    }));
  };

  return (
    <div className="reservation-form-page">
      <h2 className="reservation-header">Add New Reservation</h2>
      <div className="reservation-form-container">
        <form className="reservation-form" onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
          <label>
            Phone Number:
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
          </label>
          <label>
            Number of Participants:
            <input type="number" name="participants" value={formData.participants} onChange={handleInputChange} />
          </label>
          <label>
            Date:
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
          </label>
          <label>
            Activity:
            <select name="activityType" value={formData.activityType} onChange={handleInputChange}>
              <option value="">Select an activity</option>
              <option value="BOWLING">Bowling</option>
              <option value="CHILDBOWLING">Bowling with barriers</option>
              <option value="AIRHOCKEY">Air Hockey</option>
              <option value="DINING">Dining</option>
            </select>
            <button type="button" onClick={handleAddActivity}>
              Add
            </button>
          </label>
          {formData.activityType && formData.activityType !== "DINING" && (
            <label>
              How many {formData.activityType == "AIRHOCKEY" ? "tables" : "lanes"}
              <select name="amount" id="" onChange={handleInputChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </label>
          )}
          <label>
            Start Time:
            <select name="startTime" onChange={handleInputChange}>
              <option value="">Select a time</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
              <option value="21:00">21:00</option>
            </select>
          </label>
          <label>
            Duration:
            <select name="duration" value={formData.duration} onChange={handleInputChange}>
              <option value="">Select duration</option>
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
            </select>
          </label>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <button type="submit">{formData.id ? "Update" : "Submit"}</button>
            {formData.id && (
              <button type="reset" onClick={() => setFormData(defaultFormObj)}>
                Reset
              </button>
            )}
          </div>
        </form>
        <div className="chosen-activities">
          <h3>Chosen Activities:</h3>
          <h4 className="error-message">{errorMessage && <p>{errorMessage}</p>}</h4>

          <ul>
            {formData.activities.map((chosenActivity) => (
              <div key={chosenActivity.activityType}>
                <li>Activity: {chosenActivity.activityType.charAt(0) + chosenActivity.activityType.substring(1).toLocaleLowerCase()}</li>
                <li>Start time: {chosenActivity.startTime.substring(0, 5)}</li>
                <li>End time: {chosenActivity.endTime.substring(0, 5)}</li>
                {chosenActivity.activityType !== "DINING" && (
                  <li>
                    Amount of {chosenActivity.activityType == "AIRHOCKEY" ? "tables" : "lanes"} booked: {chosenActivity.amountBooked}
                  </li>
                )}

                <button type="button" onClick={() => handleRemoveActivity(chosenActivity)}>
                  Remove
                </button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
