const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copyBtn");
const bars = document.querySelectorAll("#bars div");

lengthEl.addEventListener("input", () => {
  lengthValue.textContent = lengthEl.value;
});

generateBtn.addEventListener("click", () => {
  const password = generatePassword();
  passwordEl.value = password;
  updateStrength(password);
});

function generatePassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const number = "0123456789";
  const symbol = "!@#$%^&*()";

  let chars = "";

  if (uppercaseEl.checked) chars += upper;
  if (lowercaseEl.checked) chars += lower;
  if (numbersEl.checked) chars += number;
  if (symbolsEl.checked) chars += symbol;

  if (chars === "") return "";

  let password = "";
  for (let i = 0; i < lengthEl.value; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
}

function updateStrength(password) {
  bars.forEach(bar => bar.style.background = "transparent");

  let strength = 0;
  if (password.length > 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  for (let i = 0; i < strength; i++) {
    bars[i].style.background = "#a4ffaf";
  }
}

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordEl.value);
});
