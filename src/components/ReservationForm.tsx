import React, { useState, useEffect } from "react";
import "../styling/reservationform.css";
import { AvailableForDay, ChosenActivityWithStringDates, ReservationFormData, ReservationListItem, ReservationWithStringDates } from "../interfaces/reservationInterface";

import {  submitReservation, getAvailableForDay, getReservationsPaginated } from "../services/apiFacade.ts";
// import ErrorOption from "./ErrorOption.tsx";

export default function ReservationForm({
  setFormData,
  formData,
  setReservations,
  defaultFormObj,
  currentPage
}: {
  setFormData: React.Dispatch<React.SetStateAction<ReservationFormData>>;
  formData: ReservationFormData;
  setReservations: React.Dispatch<React.SetStateAction<ReservationListItem[]>>;
  defaultFormObj: ReservationFormData;
  currentPage: number;
}) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  // const [notAllowedMessage, setNotAllowedMessage] = useState<string>("Fill out the fields first");
  // const [freeSlots, setFreeSlots] = useState<number>(10);
  const [availableTimes, setAvailableTimes] = useState<AvailableForDay>({} as AvailableForDay);

  useEffect(() => {
    getAvailableSlots();
  }, [formData.date]);

  async function getAvailableSlots() {
    if (formData.date) {
      setAvailableTimes(await getAvailableForDay(formData.date));
    } else {
      setAvailableTimes({} as AvailableForDay);
    }
  }
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    setReservations(await getReservationsPaginated(currentPage));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "startTime" && value == "22:00:00") {
      setFormData((prevFormData) => ({ ...prevFormData, duration: "1" }));
    }
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
            endTime: convertStartStringToEndString(s),
            date: formData.date,
          },
        ],
        activityType: "",
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

  function convertStartStringToEndString(startTime: string) {
    return Number(startTime.substring(0, 2)) + +formData.duration + ":" + startTime.substring(3);
  }

  const handleRemoveActivity = (chosenActivity: ChosenActivityWithStringDates) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      activities: prevFormData.activities.filter((activity) => activity.activityType !== chosenActivity.activityType),
    }));
  };

  function ErrorOptionArray(message = "Fill out the other fields") {
    return [
      <option key={0} value={""}>
        {message}
      </option>,
    ];
  }

  function generateTimes() {
    const times = ErrorOptionArray("Select a time");
    if (availableTimes[formData.activityType] === undefined) {
      return times;
    }

    for (const time of availableTimes[formData.activityType]) {
      if (time.amountAvailable > 0) {
        times.push(
          <option key={time.hour} value={time.hour}>
            {time.hour.substring(0, 5)}
          </option>
        );
      }
    }

    if (times.length === 1) {
      if (formData.startTime !== "") {
        setFormData((prevFormData) => ({ ...prevFormData, startTime: "" }));
      }
      return ErrorOptionArray("No available times for this activity");
    }

    return times;
  }

  function generateAmountOptions() {
    if (availableTimes[formData.activityType] === undefined) {
      return ErrorOptionArray();
    }

    let availableAtTime = availableTimes[formData.activityType].find((time) => {
      return time.hour === formData.startTime;
    })?.amountAvailable;
    console.log("availableAtTime:" + availableAtTime);

  

    let optionalAvailable = availableAtTime;
    if (formData.duration === "2") {
      optionalAvailable = availableTimes[formData.activityType].find((time) => {
        return time.hour === convertStartStringToEndString(formData.startTime);
      })?.amountAvailable;
    }
    console.log("optionalAvailable:" + optionalAvailable);
  if (!availableAtTime) {
    return ErrorOptionArray();
  }
    // set available time to the lowest of the two
    if (optionalAvailable != undefined) {
      availableAtTime = optionalAvailable < availableAtTime ? optionalAvailable : availableAtTime;
    }

    // make sure you can't reserve more than 4 lanes or tables
    availableAtTime = availableAtTime > 4 ? 4 : availableAtTime;
    console.log("availableAtTime available:" + availableAtTime);
    if (formData.amount > availableAtTime) {
      setFormData((prevFormData) => ({ ...prevFormData, amount: availableAtTime }));
    }
    if (availableAtTime <= 0) {
      console.log("returning error");

      return ErrorOptionArray(`No ${formData.activityType == "AIRHOCKEY" || formData.activityType == "DINING" ? "tables" : "lanes"} available at this time`);
    } else if (formData.amount == 0) {
      setFormData((prevFormData) => ({ ...prevFormData, amount: 1 }));
    }

    const options = [];
    for (let i = 1; i <= availableAtTime; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return options;
  }

  function activityAllowed(): boolean {
    return formData.activityType !== "" && formData.startTime !== "" && formData.duration !== "" && formData.date !== "" && formData.amount > 0;
  }

  function submitAllowed(): boolean {
    // Only run the check on activities if the date has changed - they all share the same date, can just check the first
    if (formData.date !== formData.activities[0]?.date) {
      for (const activity of formData.activities) {
        const response = validActivity(activity);
        if (response === false) {
          console.log("not valid activity");
          return false;
        }
      }
    }
    return formData.name !== "" && formData.phoneNumber !== "" && formData.participants > 0 && formData.activities.length > 0;
  }

  function validActivity(activity: ChosenActivityWithStringDates): boolean {
    if (availableTimes[activity.activityType] === undefined) {
      return false;
    }
    for (const time of availableTimes[activity.activityType]) {
      if (timeOverlaps(activity, time)) {
        if (time.amountAvailable < activity.amountBooked) {
          const newError = "Not enough slots available for " + normalizeName(activity.activityType);
          if (errorMessage !== newError) {
            setErrorMessage(newError);
          }
          return false;
        }
      }
    }
    if (errorMessage !== "") {
      setErrorMessage("");
    }
    return true;
  }

  function timeOverlaps(activity: ChosenActivityWithStringDates, time: { hour: string }) {
    return time.hour === activity.startTime || (time.hour < activity.endTime && time.hour > activity.startTime);
  }

  function normalizeName(name: string): string {
    return name.substring(0, 1).toLocaleUpperCase() + name.substring(1).toLocaleLowerCase();
  }

  function secondHourAllowed(): boolean {
    if (availableTimes[formData.activityType] === undefined) {
      return false;
    }
    const availableNextHour = availableTimes[formData.activityType].find((e) => 1 + Number(e.hour.substring(0, 2)) + e.hour.substring(3) === formData.startTime);
    if (availableNextHour === undefined) {
      return false;
    }
    return formData.startTime != "22:00:00" && availableNextHour?.amountAvailable <= 0;
  }

  return (
    <div className="reservation-form-page">
      <h2 className="reservation-header">Add New Reservation</h2>
      <div className="reservation-form-container">
        <form className="reservation-form" onSubmit={handleFormSubmit}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <button type="submit" disabled={!submitAllowed()}>
              {/* {formData.id ? "Update" : "Submit"} */}
              {!submitAllowed() ? "Fill out the fields first" : formData.id ? "Update" : "Submit"}
            </button>

            <button type="reset" onClick={() => setFormData(defaultFormObj)}>
              Reset
            </button>
          </div>
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
            <select name="activityType" value={formData.activityType} disabled={!formData.date} onChange={handleInputChange}>
              <option value="">Select an activity</option>
              <option value="BOWLING">Bowling</option>
              <option value="CHILDBOWLING">Bowling with barriers</option>
              <option value="AIRHOCKEY">Air Hockey</option>
              <option value="DINING">Dining</option>
            </select>
          </label>

          <label>
            Start Time:
            <select name="startTime" onChange={handleInputChange} disabled={!formData.date || !formData.activityType}>
              {/* formData.date && formData.activityType */}
              {generateTimes().map((option) => option)}
            </select>
          </label>
          <label>
            Duration:
            <select name="duration" value={formData.duration} onChange={handleInputChange} disabled={!formData.startTime}>
              <option value="">Select duration</option>
              <option value="1">1 hour</option>
              <option value="2" disabled={secondHourAllowed()}>
                2 hours
              </option>
            </select>
          </label>

          {formData.activityType !== "DINING" && (
            <label>
              How many {formData.activityType == "AIRHOCKEY" ? "tables" : "lanes"}
              <select name="amount" id="" onChange={handleInputChange} disabled={!formData.startTime || !formData.activityType || !formData.date || !formData.duration}>
                {generateAmountOptions()}
              </select>
            </label>
          )}
          {/* {formData.activityType && formData.startTime && formData.duration && formData.date && (
          )} */}
          <button type="button" onClick={handleAddActivity} disabled={!activityAllowed()} className="test">
            {activityAllowed() ? "Add activity " : "Fill out all the fields first"}
          </button>
        </form>

        <div className="chosen-activities">
          <h3>Chosen Activities:</h3>
          {/* <div>Free slots: {freeSlots}</div> */}
          <h4 className="error-message">{errorMessage && <p>{errorMessage}</p>}</h4>

          <ul>
            {formData.activities.map((chosenActivity) => (
              <div key={chosenActivity.activityType} className="chosen-activity-container">
                <li>Activity: {chosenActivity.activityType.charAt(0) + chosenActivity.activityType.substring(1).toLocaleLowerCase()}</li>
                <li>Start time: {chosenActivity.startTime.substring(0, 5)}</li>
                <li>End time: {chosenActivity.endTime.substring(0, 5)}</li>
                {chosenActivity.activityType !== "DINING" && (
                  <li>
                    Amount of {chosenActivity.activityType == "AIRHOCKEY" ? "tables" : "lanes"} booked: {chosenActivity.amountBooked}
                  </li>
                )}

                <button type="button" className="button-remove" onClick={() => handleRemoveActivity(chosenActivity)}>
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
