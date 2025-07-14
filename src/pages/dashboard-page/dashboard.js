import { getUserInfo, logOut } from "../../auth/services/auth";
import Alerts from "../../shared/alerts";

const API_URL = "http://localhost:3000";

export function dashboardSetup() {
  //Take DOM references
  const eventsBtn = document.getElementById("events-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const addNewEventBtn = document.getElementById("add-new-event-btn");
  const userNameText = document.getElementById("user-name");
  const userRoleText = document.getElementById("user-role");

  //Get user info
  const userInfo = getUserInfo()[0];

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
  });

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
                <span onclick="(editEvent('${event.id}'))">Edit</span>
                <span onclick="(deleteEvent('${event.id}'))">Delete</span>
              </div>
            </td>
          </tr>`;

    tableRows.innerHTML += newEvent;
  });
}

async function editEvent(id) {}
async function deleteEvent(id) {
  let request = await fetch(`${API_URL}/events/${id}`, { method: "DELETE" });

  if (!request.ok) {
    Alerts.error("Error, event cannot be deleted");
    return;
  }

  Alerts.success("Event removed successfully");
  renderEvents();
}
