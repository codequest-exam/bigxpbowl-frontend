import React, { useState, useEffect } from "react";
import "../styling/reservationform.css";
import {
  ChosenActivityWithStringDates,
  ReservationFormData,
  ReservationListItem,
  ReservationWithStringDates,
} from "../interfaces/reservationInterface";

import { getReservations, submitReservation, getAvailableSlots } from "../services/apiFacade";

export default function ReservationForm({
  setFormData,
  formData,
  setReservations,
  defaultFormObj,
}: {
  setFormData: React.Dispatch<React.SetStateAction<ReservationFormData>>;
  formData: ReservationFormData;
  setReservations: React.Dispatch<React.SetStateAction<ReservationListItem[]>>;
  defaultFormObj: ReservationFormData;
}) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [freeSlots, setFreeSlots] = useState<number>(10);

  useEffect(() => {
    async function update() {
      const free = await getFree();
      setFreeSlots(free);
    }
    update();
  }, [formData]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // of type ReservationWithStringDates:
    const newReservation: ReservationWithStringDates = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      participants: +formData.participants,
      activities: formData.activities.map(activity => ({ ...activity, date: formData.date })),
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

    setFormData(prevFormData => ({
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

    if (formData.activities.filter(activity => activity.activityType === formData.activityType).length !== 0) {
      console.log("FIRST ERROR");

      setErrorMessage("Activity already added");
    } else if (checks.activity && checks.startTime && checks.duration && checks.date) {
      console.log("passed checks");
      console.log(formData);

      const s = formData.startTime;

      setFormData(prevFormData => ({
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
            .filter(key => !checks[key])
            .join(" & ")
      );
    }
  };

  function convertStartStringToEndString(startTime: string) {
    return Number(startTime.substring(0, 2)) + 2 + ":" + startTime.substring(3);
  }

  const handleRemoveActivity = (chosenActivity: ChosenActivityWithStringDates) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      activities: prevFormData.activities.filter(activity => activity.activityType !== chosenActivity.activityType),
    }));
  };

  function generateOptions() {
    const options = [];
    const slots = freeSlots > 4 ? 4 : freeSlots;
    if (slots == -1) {
      options.push(
        <option key={0} value={0}>
          Loading...
        </option>
      );
    } else {
      for (let i = 1; i <= slots; i++) {
        options.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
    }
    return options;
  }

  async function getFree() {
    if (formData.date && formData.startTime && formData.duration && formData.activityType) {
      console.log("GETTING FREE SLOTS");

      return await getAvailableSlots(formData.date, formData.startTime, convertStartStringToEndString(formData.startTime), formData.activityType);
    } else {
      console.log("NO FREE SLOTS");
      return freeSlots;
    }
  }

  function allowedToAdd(): boolean {
    // console.log("free slots", freeSlots);
    // console.log("amount", formData.amount);
    
    // console.log("ALLOWED?", res);
    
    const res = freeSlots >= formData.amount;
    return res;
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
            <button type="submit">{formData.id ? "Update" : "Submit"}</button>

            <button type="reset" onClick={() => setFormData(defaultFormObj)}>
              Reset
            </button>

            {/* {formData.id && (
              <button type="reset" onClick={() => setFormData(defaultFormObj)}>
                Reset
              </button>
            )} */}
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
            <select name="activityType" value={formData.activityType} onChange={handleInputChange}>
              <option value="">Select an activity</option>
              <option value="BOWLING">Bowling</option>
              <option value="CHILDBOWLING">Bowling with barriers</option>
              <option value="AIRHOCKEY">Air Hockey</option>
              <option value="DINING">Dining</option>
            </select>
          </label>

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
          {freeSlots != -1 && formData.activityType && formData.activityType !== "DINING" && (
            <label>
              How many {formData.activityType == "AIRHOCKEY" ? "tables" : "lanes"}
              <select name="amount" id="" onChange={handleInputChange}>
                {generateOptions().map(option => option)}
              </select>
            </label>
          )}
          {/* {formData.activityType && formData.startTime && formData.duration && formData.date && (
          )} */}
            <button type="button" onClick={handleAddActivity} disabled={!allowedToAdd()} className="test">
              {allowedToAdd() ? "Add activity " : "No room at the given time"}
            </button>
        </form>

        <div className="chosen-activities">
          <h3>Chosen Activities:</h3>
          <div>Free slots: {freeSlots}</div>
          <h4 className="error-message">{errorMessage && <p>{errorMessage}</p>}</h4>

          <ul>
            {formData.activities.map(chosenActivity => (
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
