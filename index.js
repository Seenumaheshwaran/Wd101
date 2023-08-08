const words = document.getElementById("words");
const userentries= retrieveEntries();
const details = document.getElementById("userentries");


function retrieveEntries() {
  return JSON.parse(localStorage.getItem("userentries") || "[]");
}

function displayEntries() {
  const tableEntries = information
    .map(({ name, email, password, dob, acceptTerms }) => `<tr>
        <td class="border px-2 py-6">${name}</td>
        <td class="border px-2 py-6">${email}</td>
        <td class="border px-2 py-6">${password}</td>
        <td class="border px-2 py-6">${dob}</td>
        <td class="border px-2 py-6">${acceptTerms}</td>
      </tr>`).join("\n");
  const table = ` <table class="table-auto w-full"><thead><tr>
          <th class="px-2 py-6">Name</th>
          <th class="px-2 py-6">Email</th>
          <th class="px-2 py-6">Password</th>
          <th class="px-2 py-6">Dob</th>
          <th class="px-2 py-6">Accepted terms?</th>
        </tr></thead><tbody> ${tableEntries}</tbody></table>`;

  details.innerHTML = table;
}

function savewords(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  const currentYear = new Date().getFullYear();
  const birthYear = dob.split("-");
  const year = birthYear[0];
  const age = currentYear - year;


  if (age < 18 || age > 55) {
    document.getElementById("dob").style.border = "1px solid blue";
    return alert(" only between 18 to 55");
  }

  document.getElementById("dob").style.border = "none";

  const entry = { name, email, password, dob, acceptTerms };
  userentries.push(entry);

  localStorage.setItem("userentries", JSON.stringify(userentries));
  displayEntries();
  words.reset();
}

words.addEventListener("submit", savewords);
displayEntries();
