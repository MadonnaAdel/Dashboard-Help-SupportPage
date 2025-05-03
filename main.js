const sideBarItems = [
  {
    name: "Dashboard",
    icon: "dashboard.svg",
    hasArrow: false,
    hasActive: false,
  },
  { name: "Orders", icon: "orders.svg", hasArrow: true, hasActive: false },
  {
    name: "Restaurants",
    icon: "Resturants.svg",
    hasArrow: true,
    hasActive: false,
  },
  { name: "Clients", icon: "clients.svg", hasArrow: true, hasActive: false },
  { name: "Menu", icon: "Menu (2).svg", hasArrow: true, hasActive: false },
  { name: "Plan", icon: "plan.svg", hasArrow: true, hasActive: false },
  {
    name: "Finances",
    icon: "money-bag (1) 1.svg",
    hasArrow: true,
    hasActive: false,
  },
  { name: "Settings", icon: "settings.svg", hasArrow: true, hasActive: true },
];

const input = document.querySelector(".input-bar input");
const button = document.querySelector(".input-bar button");
const chatContainer = document.querySelector(".chatContainer");
const listContainer = document.querySelector(".sideBarList");

sideBarItems.forEach((item, _) => {
  const li = document.createElement("li");

  const tapDiv = document.createElement("div");
  tapDiv.className = "sideBarTap";

  const img = document.createElement("img");
  const iconNameWithoutExt = item.icon.replace(".svg", "");

  img.src = item.hasActive
    ? `./imgs/${iconNameWithoutExt} White.svg`
    : `./imgs/${item.icon}`;
  img.alt = item.name;

  const span = document.createElement("span");
  span.className = "tapName";
  span.textContent = item.name;

  tapDiv.appendChild(img);
  tapDiv.appendChild(span);
  li.appendChild(tapDiv);

  if (item.hasArrow) {
    const arrowImg = document.createElement("img");
    arrowImg.src = item.hasActive
      ? "./imgs/arrow White.svg"
      : "./imgs/arrow.svg";
    arrowImg.alt = "arrow";
    arrowImg.className = "arrowImg";
    li.appendChild(arrowImg);
  }

  if (item.hasActive) {
    li.classList.add("active");
  }

  listContainer.appendChild(li);
});

const tabs = document.querySelectorAll(".sideBarList li");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.remove("active");

      const img = t.querySelector(".sideBarTap img");
      const spanText = t.querySelector(".tapName")?.textContent;
      const arrow = t.querySelector("img:last-child");

      const item = sideBarItems.find((i) => i.name === spanText);
      if (item) {
        img.src = `./imgs/${item.icon}`;
        if (item.hasArrow && arrow) {
          arrow.src = "./imgs/arrow.svg";
        }
      }
    });

    tab.classList.add("active");
    const img = tab.querySelector(".sideBarTap img");
    const spanText = tab.querySelector(".tapName")?.textContent;
    const arrow = tab.querySelector("img:last-child");

    const item = sideBarItems.find((i) => i.name === spanText);
    if (item) {
      const iconNameWithoutExt = item.icon.replace(".svg", "");
      img.src = `./imgs/${iconNameWithoutExt} White.svg`;
      if (item.hasArrow && arrow) {
        arrow.src = "./imgs/arrow White.svg";
      }
    }
  });
});

function addMessage(text, side) {
  const message = document.createElement("div");
  message.className = `message ${side}`;
  message.innerHTML = `
      <img src="./imgs/${
        side === "left" ? "Frame 1321315001.png" : "images 1.png"
      }" alt="avatar" class="avatar" />
      <div class="message-block">
        <div class="bubble">${text}</div>
        <div class="time">${new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}</div>
      </div>
    `;
  chatContainer.appendChild(message);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function handleSend() {
  const text = input.value.trim();
  if (text === "") return;

  addMessage(text, "right");
  input.value = "";

  setTimeout(() => {
    addMessage(
      "Thanks for your message! Let me check and get back to you.",
      "left"
    );
  }, 1000);
}

button.addEventListener("click", handleSend);

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") handleSend();
});
