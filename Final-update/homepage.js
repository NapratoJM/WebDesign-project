const stories = document.getElementById("stories");

function scrollStories(direction) {
  const scrollAmount = stories.clientWidth * 0.7;

  stories.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}
document
  .querySelector(".story-nav.left")
  .addEventListener("click", () => scrollStories(-1));

document
  .querySelector(".story-nav.right")
  .addEventListener("click", () => scrollStories(1));
const menuBtn = document.getElementById("menuBtn");
const dropdown = document.getElementById("menuDropdown");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
});
document.addEventListener("click", () => {
  dropdown.style.display = "none";
});
document.querySelectorAll(".react-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("comments")) return;

    let count = btn.querySelector("span");
    let num = parseInt(count.textContent);

    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      count.textContent = num - 1;
    } else {
      btn.classList.add("active");
      count.textContent = num + 1;
    }
  });
});

document.querySelectorAll(".sw-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.closest(".sw-widget").querySelector(".sw-content");
    content.style.display = content.style.display === "none" ? "block" : "none";
  });
});
const weatherKey = "YOUR_OPENWEATHER_KEY";

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=Narita,jp&units=metric&appid=${weatherKey}`,
)
  .then((r) => r.json())
  .then((data) => {
    document.getElementById("weatherContent").innerHTML = `
        <strong>${data.name}</strong><br>
        🌡 ${Math.round(data.main.temp)}°C<br>
        ☁ ${data.weather[0].description}<br>
        💨 Wind ${data.wind.speed} m/s
    `;
  })
  .catch(() => {
    document.getElementById("weatherContent").textContent =
      "Weather unavailable";
  });
const newsKey = "YOUR_NEWS_KEY";

fetch(
  `https://newsapi.org/v2/top-headlines?language=en&pageSize=4&apiKey=${newsKey}`,
)
  .then((r) => r.json())
  .then((data) => {
    document.getElementById("newsContent").innerHTML = data.articles
      .map(
        (a) => `
            <div style="margin-bottom:8px">
                <a href="${a.url}" target="_blank" style="text-decoration:none;color:#222">
                    📰 ${a.title}
                </a>
            </div>
        `,
      )
      .join("");
  })
  .catch(() => {
    document.getElementById("newsContent").textContent = "News unavailable";
  });
const avatar = document.querySelector(".top-avatar");
const profilePanel = document.getElementById("profilePanel");

avatar.addEventListener("click", (e) => {
  e.stopPropagation();
  profilePanel.style.display =
    profilePanel.style.display === "flex" ? "none" : "flex";
});

document.addEventListener("click", () => {
  profilePanel.style.display = "none";
});
function applyImageLayout(container) {
  const images = Array.from(container.querySelectorAll("img"));
  const count = images.length;

  container.classList.remove("one", "two", "three", "four", "more");

  images.forEach((img) => {
    if (!img.parentElement.classList.contains("img-wrapper")) {
      const wrapper = document.createElement("div");
      wrapper.className = "img-wrapper";
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    }
  });

  const wrappers = container.querySelectorAll(".img-wrapper");

  if (count === 1) container.classList.add("one");
  else if (count === 2) container.classList.add("two");
  else if (count === 3) container.classList.add("three");
  else if (count === 4) container.classList.add("four");
  else if (count > 4) container.classList.add("four", "more");

  if (count > 4) {
    const extra = count - 4;
    const lastVisible = wrappers[3];

    const existingOverlay = lastVisible.querySelector(".overlay");
    if (existingOverlay) existingOverlay.remove();

    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.textContent = `+${extra}`;
    overlay.style.cursor = "pointer";

    overlay.addEventListener("click", (e) => {
      e.stopPropagation();
      const allSrcs = images.map((img) => img.src);
      openLightbox(allSrcs, 3);
    });

    lastVisible.appendChild(overlay);
  }

  const allSrcs = images.map((img) => img.src);
  wrappers.forEach((wrapper, index) => {
    const img = wrapper.querySelector("img");
    img.style.cursor = "pointer";
    img.onclick = () => openLightbox(allSrcs, index);
  });
}
document
  .querySelectorAll(".post-images")
  .forEach((container) => applyImageLayout(container));
function openLightbox(images, startIndex = 0) {
  let currentIndex = startIndex;

  document.querySelector(".lightbox-overlay")?.remove();

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.style.cssText = `
    position: fixed;
    top:0; left:0; width:100%; height:100%;
    background: rgba(0,0,0,0.85);
    display:flex; justify-content:center; align-items:center;
    z-index:1000;
  `;
  document.body.appendChild(overlay);

  const img = document.createElement("img");
  img.src = images[currentIndex];
  img.style.maxWidth = "90%";
  img.style.maxHeight = "90%";
  overlay.appendChild(img);

  const closeBtn = document.createElement("div");
  closeBtn.textContent = "✕";
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px; right: 20px;
    font-size: 24px;
    color: white;
    cursor: pointer;
  `;
  closeBtn.onclick = () => overlay.remove();
  overlay.appendChild(closeBtn);
  const leftArrow = document.createElement("div");
  leftArrow.textContent = "⟨";
  leftArrow.style.cssText = `
    position: absolute; left: 15px; top: 50%;
    transform: translateY(-50%);
    font-size: 30px; color: white; cursor: pointer;
    user-select: none;
  `;
  leftArrow.onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    img.src = images[currentIndex];
  };
  overlay.appendChild(leftArrow);
  const rightArrow = document.createElement("div");
  rightArrow.textContent = "⟩";
  rightArrow.style.cssText = `
    position: absolute; right: 15px; top: 50%;
    transform: translateY(-50%);
    font-size: 30px; color: white; cursor: pointer;
    user-select: none;
  `;
  rightArrow.onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    img.src = images[currentIndex];
  };
  overlay.appendChild(rightArrow);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
  document.addEventListener("keydown", function navHandler(e) {
    if (!document.body.contains(overlay))
      return document.removeEventListener("keydown", navHandler);
    if (e.key === "ArrowLeft") leftArrow.click();
    if (e.key === "ArrowRight") rightArrow.click();
    if (e.key === "Escape") overlay.remove();
  });
}
const chatheadsData = [
  {
    name: "Ysabella Santos",
    img: "https://i.pinimg.com/1200x/12/66/fe/1266fe1c738d770602693a234baa6db7.jpg",
    lastMessage: "charot kaya mo yan!",
    messages: [
      { type: "received", text: "charot kaya mo yan!" },
      { type: "sent", text: "okii te" }
    ],
    unread: 0
  },
  {
    name: "Jhorelle Naprato",
    img: "https://i.pinimg.com/736x/a4/58/e9/a458e9a93a3a6a4e1f8101805eb2ccb5.jpg",
    lastMessage: "sana nandito ka dito masaya",
    messages: [
      { type: "received", text: "sana nandito ka dito masaya" }
    ],
    unread: 1
  },
  {
    name: "Nina Becina",
    img: "https://i.pinimg.com/736x/4d/e1/8f/4de18f8aaa5eab191c44a5d9a8947882.jpg",
    lastMessage: "sige na please libre mo ako next time",
    messages: [
      { type: "received", text: "sige na please libre mo ako next time" }
    ],
    unread: 1
  }
];

const chatheadsContainer = document.getElementById("chatheads-container");
const chatWindowsContainer = document.getElementById("chat-windows-container");

chatheadsData.forEach((user, index) => {
  const chathead = document.createElement("div");
  chathead.classList.add("chathead");
  chathead.innerHTML = `
    <img src="${user.img}" alt="${user.name}">
    <span class="status-dot"></span>
    <span class="notif-badge">${user.unread || ""}</span>
    <div class="chat-preview">
      <strong>${user.name}</strong>
      ${user.lastMessage}
    </div>
  `;
  chatheadsContainer.appendChild(chathead);

  // CREATE CHAT WINDOW
  const chatWindow = document.createElement("div");
  chatWindow.classList.add("chat-window");
  chatWindow.id = `chat-window-${index}`;

  const renderMessages = () => {
    return user.messages
      .map(msg => `<div class="message ${msg.type}">${msg.text}</div>`)
      .join("");
  };

  chatWindow.innerHTML = `
    <div class="chat-header">
      ${user.name}
      <div class="actions">
        <button class="voice" title="Voice Call">
          <svg viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3zm4.3-3c0 2.53-1.92 4.62-4.3 4.9V21h-2v-5.1c-2.38-.28-4.3-2.37-4.3-4.9h2c0 1.54 1.26 2.8 2.8 2.8s2.8-1.26 2.8-2.8h2z"/>
          </svg>
        </button>
        <button class="video" title="Video Call">
          <svg viewBox="0 0 24 24">
            <path d="M17 10.5V6c0-1.1-.9-2-2-2H5C3.9 4 3 4.9 3 6v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4.5l4 4v-11l-4 4z"/>
          </svg>
        </button>
        <span class="close">&times;</span>
      </div>
    </div>

    <div class="chat-content">
      ${renderMessages()}
    </div>

    <div class="chat-input">
      <input type="text" placeholder="Type a message...">
      <button>Send</button>
    </div>
  `;
  chatWindowsContainer.appendChild(chatWindow);

  const chatContent = chatWindow.querySelector(".chat-content");
  const input = chatWindow.querySelector("input");
  const sendBtn = chatWindow.querySelector(".chat-input button");
  const badge = chathead.querySelector(".notif-badge");

  // OPEN CHAT
  chathead.addEventListener("click", () => {
    chatWindow.style.display = "flex";
    badge.textContent = ""; // clear notification
    chatContent.scrollTop = chatContent.scrollHeight;
  });

  // CLOSE CHAT
  chatWindow.querySelector(".close").addEventListener("click", () => {
    chatWindow.style.display = "none";
  });

  // SEND MESSAGE FUNCTION
  const sendMessage = () => {
    const text = input.value.trim();
    if (!text) return;

    // store message per user
    user.messages.push({ type: "sent", text });

    // render
    const msgEl = document.createElement("div");
    msgEl.className = "message sent";
    msgEl.textContent = text;
    chatContent.appendChild(msgEl);

    input.value = "";
    chatContent.scrollTop = chatContent.scrollHeight;

    // OPTIONAL: fake reply
    setTimeout(() => {
      const reply = "Got it!";
      user.messages.push({ type: "received", text: reply });

      const replyEl = document.createElement("div");
      replyEl.className = "message received";
      replyEl.textContent = reply;
      chatContent.appendChild(replyEl);

      chatContent.scrollTop = chatContent.scrollHeight;
    }, 1000);
  };

  // EVENTS
  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });

  // CALL BUTTONS
  chatWindow.querySelector(".voice").addEventListener("click", () => {
    alert(`Starting voice call with ${user.name}...`);
  });

  chatWindow.querySelector(".video").addEventListener("click", () => {
    alert(`Starting video call with ${user.name}...`);
  });
});
