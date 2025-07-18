import { renderRoute } from "../../../routes";
import Alerts from "../../../shared/alerts";

const API_URL = "http://localhost:3000";

export async function addEvent(name, description, capacity, date) {
  const newEvent = {
    name: name,
    description: description,
    capacity: capacity,
    date: date,
  };

  let request = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEvent),
  });

  if (!request.ok) {
    Alerts.error("Error, we cannot add this event, try again later");
  }

  Alerts.success("Event created successfully");
  renderRoute();
}