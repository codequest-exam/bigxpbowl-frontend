import { useEffect, useState } from "react";
import {
  getReservations,
  getRecurringReservations,
  getCompetitionDays,
} from "../services/apiFacade.ts";
import {
  RecurringReservation,
  CompetitionDay,
  ReservationListItem,
} from "../interfaces/reservationInterface";
import "./calendar.css";

interface Week {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
}

const MAX_CAPACITIES = {
  BOWLING: 20,
  CHILDBOWLING: 4,
  DINING: 20,
  AIRHOCKEY: 6,
};

export default function Calendar() {
  const [reservations, setReservations] = useState<ReservationListItem[]>([]);
  const [selectedActivity, setSelectedActivity] = useState("BOWLING");
  const [selectedWeek, setSelectedWeek] = useState<Week>();
  const [recurringReservations, setRecurringReservations] = useState<
    RecurringReservation[]
  >([]);
  const [competitionDays, setCompetitionDays] = useState<CompetitionDay[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const reservationsList = await getReservations();
      setReservations(reservationsList);
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    const fetchCompetitionDays = async () => {
      const competitionDaysList = await getCompetitionDays();
      setCompetitionDays(competitionDaysList);
    };
    fetchCompetitionDays();
  }, []);

  useEffect(() => {
    const fetchRecurringReservations = async () => {
      const recurringReservationsList = await getRecurringReservations();
      setRecurringReservations(recurringReservationsList);
    };
    fetchRecurringReservations();
  }, []);

  useEffect(() => {
    setSelectedWeek(calculateWeekDates(getWeekNumber(new Date())));
  }, []);

  const calculateWeekDates = (weekNumber: number): Week => {
    const firstDayOfYear = new Date(
      Date.UTC(new Date().getUTCFullYear(), 0, 1)
    );
    const firstWeekday = firstDayOfYear.getUTCDay();
    const daysOffset = (weekNumber - 1) * 7 - firstWeekday;
    const startDate = new Date(
      Date.UTC(
        firstDayOfYear.getUTCFullYear(),
        firstDayOfYear.getUTCMonth(),
        firstDayOfYear.getUTCDate() + daysOffset + 1
      )
    );
    const endDate = new Date(startDate);
    endDate.setUTCDate(startDate.getUTCDate() + 6);
    return { weekNumber, startDate, endDate };
  };

  const getWeekNumber = (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const handleWeekChange = (weekOffset: number) => {
    const newWeekNumber = (selectedWeek?.weekNumber || 1) + weekOffset;
    setSelectedWeek(calculateWeekDates(newWeekNumber));
  };

  const countReservations = (
    activity: string,
    date: Date,
    timeSlot: string
  ): number | string => {
    const formattedDate = date.toISOString().split("T")[0];

    const isCompetitionDay = competitionDays.some(
      (competitionDay) =>
        new Date(competitionDay.date).toISOString().split("T")[0] ===
        formattedDate
    );

    if (isCompetitionDay) return "Competition";

    const oneTimeReservationsCount = reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.date)
        .toISOString()
        .split("T")[0];
      const reservationStartTime = new Date(
        `1970-01-01T${reservation.startTime}`
      ).getTime();
      const reservationEndTime = new Date(
        `1970-01-01T${reservation.endTime}`
      ).getTime();
      const slotTime = new Date(`1970-01-01T${timeSlot}`).getTime();
      return (
        //@ts-expect-error - it is not possible to assign a string to a ChosenActivity
        reservation.activities.includes(activity) &&
        reservationDate === formattedDate &&
        slotTime >= reservationStartTime &&
        slotTime < reservationEndTime
      );
    }).length;

    let recurringReservationsCount = 0;
    if (activity === "BOWLING") {
      const dayOfWeek = date
        .toLocaleString("en-US", { weekday: "long" })
        .toUpperCase();
      recurringReservationsCount = recurringReservations.filter(
        (reservation) => {
          const reservationStartTime = new Date(
            `1970-01-01T${reservation.startTime}`
          ).getTime();
          const reservationEndTime = new Date(
            `1970-01-01T${reservation.endTime}`
          ).getTime();
          const slotTime = new Date(`1970-01-01T${timeSlot}`).getTime();
          return (
            reservation.dayOfWeek === dayOfWeek &&
            slotTime >= reservationStartTime &&
            slotTime < reservationEndTime
          );
        }
      ).length;
    }

    const totalReservationsCount =
      oneTimeReservationsCount + recurringReservationsCount;
    const remainingSlots =
      MAX_CAPACITIES[activity as keyof typeof MAX_CAPACITIES] -
      totalReservationsCount;

    return remainingSlots >= 0 ? remainingSlots : 0;
  };

  const getColorForAvailability = (
    remainingSlots: number,
    maxSlots: number
  ) => {
    const ratio = remainingSlots / maxSlots;
    const red = Math.min(255, Math.floor((1 - ratio) * 255));
    const green = Math.min(255, Math.floor(ratio * 255));
    const opacity = 0.85;
    return `rgb(${red}, ${green}, 0, ${opacity})`;
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(selectedWeek?.startDate || new Date());
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="calendar-page">
      <h2 className="calendar-activity-title">Choose Calendar Activity:</h2>
      <div>
        <button
          className="calendar-btn"
          onClick={() => setSelectedActivity("BOWLING")}
        >
          Bowling
        </button>
        <button
          className="calendar-btn"
          onClick={() => setSelectedActivity("CHILDBOWLING")}
        >
          Child Bowling
        </button>
        <button
          className="calendar-btn"
          onClick={() => setSelectedActivity("DINING")}
        >
          Dining
        </button>
        <button
          className="calendar-btn"
          onClick={() => setSelectedActivity("AIRHOCKEY")}
        >
          Airhockey
        </button>
      </div>
      <h2 style={{ textAlign: "center" }}>
        Availability for {capitalizeFirstLetter(selectedActivity)}
      </h2>
      <table className="calendar-table">
        <thead>
          <tr>
            <td colSpan={8} className="noshadow">
              <div className="current-week">
                <button
                  className="calendar-btn-2"
                  onClick={() => handleWeekChange(-1)}
                >
                  Previous Week
                </button>
                <div style={{ textAlign: "center" }}>
                  Week {selectedWeek?.weekNumber}
                  <br />
                  {selectedWeek?.startDate.toLocaleDateString()} -{" "}
                  {selectedWeek?.endDate.toLocaleDateString()}
                </div>
                <button
                  className="calendar-btn-2"
                  onClick={() => handleWeekChange(1)}
                >
                  Next Week
                </button>
              </div>
            </td>
          </tr>
          <tr className="dates-headline">
            <th>Time Slots</th>
            {daysOfWeek.map((date, index) => (
              <th key={index}>{date.toLocaleDateString()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
          ].map((timeSlot) => (
            <tr key={timeSlot}>
              <td className="td-border">{timeSlot}</td>
              {daysOfWeek.map((date, index) => {
                const remainingSlots = countReservations(
                  selectedActivity,
                  date,
                  timeSlot
                );

                const isCompetitionDay = remainingSlots === "Competition";

                const backgroundColor = isCompetitionDay
                  ? "rgb(255, 0, 0, 0.85)" // Red color for competition days
                  : typeof remainingSlots === "number"
                  ? getColorForAvailability(
                      remainingSlots,
                      MAX_CAPACITIES[
                        selectedActivity as keyof typeof MAX_CAPACITIES
                      ]
                    )
                  : "white";

                return (
                  <td
                    className="td-border"
                    key={index}
                    style={{
                      backgroundColor: backgroundColor,
                    }}
                  >
                    {remainingSlots}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
