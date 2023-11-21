let userForm = document.getElementById("user-form");
const retrieveEntries = () => {
  let ent = localStorage.getItem("user-entries");
  if (ent) {
    return JSON.parse(ent);
  } else {
    return [];
  }
};
let userEntries = retrieveEntries();
const disEntries = () => {
  const entries = retrieveEntries();
  const tableEntries = entries.map((entry) => {
    const naamCel = `<td class='border px-4 py-2'>${entry.name}</td>`;
    const emaCel = `<td class='border px-4 py-2'>${entry.email}</td>`;
    const passwordC = `<td class='border px-4 py-2'>${entry.password}</td>`;
    const dobCl = `<td class='border px-4 py-2'>${entry.dob}</td>`;
    const accepCel = `<td class='border px-4 py-2'>${entry.acceptedTermsAndconditions}</td>`;
    const row = `<tr>${naamCel}${emaCel}${passwordC}${dobCl}${accepCel}</tr>`;
    return row;
  }).join("\n");
  const tab = `<table class="table-auto w-full">
                  <tr>
                    <th class="px-4 py-2">Name</th>
                    <th class="px-4 py-2">Email</th>
                    <th class="px-4 py-2">Password</th>
                    <th class="px-4 py-2">DOB</th>
                    <th class="px-4 py-2">Accepted Terms?</th>
                  </tr>
                  ${tableEntries}
                </table>`;
  let details = document.getElementById("user-entries");
  details.innerHTML = tab;
};
const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;
  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }
  const entr = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndconditions,
  };
  userEntries.push(entr);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  disEntries();
};
userForm.addEventListener("submit", saveUserForm);
disEntries();
