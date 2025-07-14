import { getUserInfo, logOut } from "../../auth/services/auth";

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
}

async function renderEvents() {
  let request = await fetch(`${API_URL}/events`);
  const events = await request.json();

  const tableRows = document.getElementById("rows");

  //Clean old event table
  tableRows.innerHTML = "";

  if (events.length == 0) {
    const noEvents = `<h2>Theres no events here</h2>`;
    tableRows.appendChild(noEvents);
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
                <span>Edit</span>
                <span>Delete</span>
              </div>
            </td>
          </tr>`;

    tableRows.innerHTML += newEvent;
  });
}
