let myLeads = [];
const inputElement = document.getElementById("input-el");
const inputButton = document.getElementById("input-btn");
const ulElement = document.getElementById("ul-el");
const deleteButton = document.getElementById("delete-btn");
const tabButton = document.getElementById("tab-btn");

let leadsFromLocal = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocal) {
  myLeads = leadsFromLocal;
  render(myLeads);
}

inputButton.addEventListener("click", function () {
  myLeads.push(inputElement.value);
  inputElement.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
  console.log(localStorage.getItem("myLeads"));
});

tabButton.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteButton.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});


function render(leads) {
  let ListItem = "";
  for (let i = 0; i < leads.length; i++) {
    // ListItem += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>";
    ListItem += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulElement.innerHTML = ListItem;
}
