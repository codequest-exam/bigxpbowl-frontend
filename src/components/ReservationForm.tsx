import React, { useState } from "react";
import "../styling/reservationform.css";
import {  ChosenActivityWithStringDates, ReservationFormData } from "../interfaces/reservationInterface";
// import { Reservation, ReservationWithStringDates } from "../interfaces/reservationInterface";

export default function ReservationForm({
  // existingReservation = defaultObj,
  setFormData,
  formData,
}: {
  // existingReservation?: ReservationWithStringDates;
  setFormData: React.Dispatch<React.SetStateAction<ReservationFormData>>;
  formData: ReservationFormData;
}) {
  // const initialReservation =
  //   // {
  //   //   name: "buster",
  //   //   phoneNumber: "234234",
  //   //   numParticipants: 1,
  //   //   activity: "",
  //   //   date: "",
  //   //   startTime: "",
  //   //   duration: "",
  //   //   activities: [],
  //   // };
  //   existingReservation
  //     ? {
  //         name: existingReservation.name,
  //         phoneNumber: existingReservation.phoneNumber,
  //         numParticipants: existingReservation.participants,
  //         date: existingReservation.activities[0].date,
  //         // date: existingReservation.activities[0].date.toISOString().split("T")[0],
  //         activities: existingReservation.activities,
  //       }
  //     : {
  //         name: "buster",
  //         phoneNumber: "",
  //         numParticipants: 0,
  //         activity: "",
  //         date: "",
  //         startTime: "",
  //         duration: "",
  //         activities: [],
  //       };

  // const [reservationToSubmit, setReservationToSubmit] = useState<Reservation | undefined>();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReservation = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      participants: +formData.participants,
      activities: formData.activities.map((activity) => ({ ...activity, activity: activity.activityType.toUpperCase() })),
      //activities: formData.chosenActivities.forEach(element => element.activity.toUpperCase()),
    };

    console.log(formData);

    console.log(newReservation);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddActivity = () => {
    const checks: { [key: string]: boolean } = {
      activity: formData.activityType !== "",
      startTime: formData.startTime !== "",
      duration: formData.duration !== "",
      date: formData.date !== "",
    };

    if (formData.activities.filter((activity) => activity.activityType === formData.activityType).length !== 0) {
      setErrorMessage("Activity already added");
    } else if (checks.activity && checks.startTime && checks.duration && checks.date) {
      console.log(formData.startTime);

      const stringToDate = new Date(formData.date);
      const time = formData.startTime.split(":");
      const startTime = new Date(stringToDate.setHours(parseInt(time[0])));
      const endTime = new Date(stringToDate.setHours(stringToDate.getHours() + parseInt(formData.duration)));
      stringToDate.setHours(parseInt(formData.startTime.split(":")[0]));
      stringToDate.setMinutes(parseInt(formData.startTime.split(":")[1]));
      console.log(stringToDate);

      setFormData((prevFormData) => ({
        ...prevFormData,
        chosenActivities: [
          ...prevFormData.activities,
          {
            activity: formData.activityType,
            startTime: startTime,
            endTime: endTime,
            date: stringToDate,
          },
        ],
        // activity: "",
        // startTime: "",
        // duration: "",
      }));
      setErrorMessage("");
    } else {
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
            <input type="number" name="numParticipants" value={formData.participants} onChange={handleInputChange} />
          </label>
          <label>
            Date:
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
          </label>
          <label>
            Activity:
            <select name="activityType" value={formData.activityType} onChange={handleInputChange}>
              <option value="">Select an activity</option>
              <option value="Bowling">Bowling</option>
              <option value="Airhockey">Air Hockey</option>
              <option value="Dining">Dining</option>
            </select>
            <button type="button" onClick={handleAddActivity}>
              Add
            </button>
          </label>

          <label>
            Start Time:
            <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} />
          </label>
          <label>
            Duration:
            <select name="duration" value={formData.duration} onChange={handleInputChange}>
              <option value="">Select duration</option>
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
        <div className="chosen-activities">
          <h3>Chosen Activities:</h3>
          <h4 className="error-message">{errorMessage && <p>{errorMessage}</p>}</h4>

          <ul>
            {formData.activities.map((chosenActivity) => (
              <div key={chosenActivity.activityType}>
                <li>Activity: {chosenActivity.activityType}</li>
                {/* <li>Start time: {chosenActivity.startTime.getHours()}</li>
                <li>End time: {chosenActivity.endTime.getHours()}</li> */}

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
