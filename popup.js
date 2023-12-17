const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");
const ipElement = document.getElementById("ip");
const ipLocation = document.getElementById("location");
const copyButton = document.getElementById("copyButton");

const showLoading = () => {
  ipElement.textContent = "Loading IP address...";
};

const updateDate = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  dateElement.textContent = `${currentDate}`;
};

const updateIP = async () => {
  try {
    showLoading();
    const response = await fetch("https://ipinfo.io/json");
    const data = await response.json();
    const { ip, city, region, country } = data;
    const location = `${city}, ${region}, ${country}`;
    ipElement.textContent = `${ip}`;
    ipLocation.textContent = ` ${location}`;
  } catch (error) {
    console.error("Error fetching IP address:", error);
    ipElement.textContent = "Error fetching IP address";
  }
};

const copy = () => {
  let copyText = document.querySelector("#ip");
  let range = document.createRange();
  range.selectNode(copyText);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
};

const updateTimeElements = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  const currentTimeFormatted = `${displayHours}:${minutes.toLocaleString(
    "en-US",
    { minimumIntegerDigits: 2 }
  )}:${seconds.toLocaleString("en-US", { minimumIntegerDigits: 2 })} ${ampm}`;

  timeElement.textContent = `${currentTimeFormatted}`;
};

updateIP();
updateDate();
updateTimeElements();
setInterval(updateTimeElements, 1000);
document.querySelector("#copy").addEventListener("click", copy);
