import { getUserInfo, isAdmin, logOut } from "../../auth/services/auth";
import Alerts from "../../shared/alerts";
import { addEvent } from "./services/events";

const API_URL = "http://localhost:3000";

export function dashboardSetup() {
  //Take DOM references
  const eventsBtn = document.getElementById("events-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const addNewEventBtn = document.getElementById("add-new-event-btn");
  const userNameText = document.getElementById("user-name");
  const userRoleText = document.getElementById("user-role");
  const eventTable = document.getElementById("event-table");
  const newEventSection = document.getElementById("new-event-section");
  const cancelBtn = document.getElementById("cancel-btn");
  const newEventBtn = document.getElementById("add-event");

  //Get user info
  const userInfo = getUserInfo();

  userNameText.textContent = userInfo.name || "User";
  userRoleText.textContent = userInfo.role || "Role";

  renderEvents();

  eventsBtn.addEventListener("click", (event) => {
    event.preventDefault();
  });

  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    logOut();
  });

  addNewEventBtn.addEventListener("click", (event) => {
    event.preventDefault();

    eventTable.classList.toggle("hidden");
    newEventSection.classList.toggle("hidden");
    addNewEventBtn.classList.toggle("hidden");
  });

  cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();

    eventTable.classList.toggle("hidden");
    newEventSection.classList.toggle("hidden");
    addNewEventBtn.classList.toggle("hidden");
  });

  newEventBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addNewEvent();
  });

  if (!isAdmin()) {
    addNewEventBtn.classList.toggle("hidden");
  }

  //Make global those functions
  window.editEvent = editEvent;
  window.deleteEvent = deleteEvent;
}

async function renderEvents() {
  let request = await fetch(`${API_URL}/events`);
  const events = await request.json();

  const tableRows = document.getElementById("rows");

  //Clean old event table
  tableRows.innerHTML = "";

  if (events.length == 0) {
    const noEvents = `
        <tr>
        <td></td>
        <td></td>
        <td></td>
            <td>
                <h2>No events</h2>
            </td>
        <td></td>
        </tr>`;
    tableRows.innerHTML += noEvents;
    return;
  }

  events.forEach((event) => {
    const newEvent = `<tr>
            <td>
              <img
                src="/public/images/event_default_img.jpg"
                alt="Event Picture"
              />
            </td>
            <td><p>${event.name}</p></td>
            <td><p>${event.description}</p></td>
            <td><p>${event.capacity}</p></td>
            <td><p>${event.date}</p></td>
            <td>
              <div class="actions">
                <span onclick="(editEvent('${event.id}'))" >Edit</span>
                <span onclick="(deleteEvent('${event.id}'))">Delete</span>
              </div>
            </td>
          </tr>`;

    tableRows.innerHTML += newEvent;
  });
}

async function addNewEvent() {
  const eventName = document.getElementById("event-name").value.trim();
  const eventDescription = document.getElementById("event-description").value;

  console.log(eventDescription);
  const eventDate = document.getElementById("event-date").value;
  const eventCapacity = document.getElementById("event-capacity").value;

  if ((!eventName, !eventDescription, !eventDate, !eventCapacity)) {
    Alerts.warning("You must complete all fields");
    return;
  }

  addEvent(eventName, eventDescription, eventCapacity, eventDate);
}

async function editEvent(id) {
    Alerts.info("Functionallity not implemented yet")
}

async function deleteEvent(id) {
  if (!isAdmin()) {
    Alerts.info("You are not allowed to do that");
    return;
  }

  let request = await fetch(`${API_URL}/events/${id}`, { method: "DELETE" });

  if (!request.ok) {
    Alerts.error("Error, event cannot be deleted");
    return;
  }

  Alerts.success("Event removed successfully");
  renderEvents();
}
