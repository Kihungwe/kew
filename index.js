const form = document.getElementById("search-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const Location = document.getElementById("Location").value;
  //send search request to backend
  fetch("/search", {
    method: "POST",
    body: JSON.stringify({ Location }),
    headers: { "Content-type": "application/json" },
    credentials: "include",
    mode: "cors"
})
    .then((response) => response.json())
    .then((results) => {
      // clear the table of any previous results
      const table = document.getElementById("results-table");
      table.innerHTML = "";
      // loop through the results and add a row for each result
      results.forEach((result) => {
        const row = document.createElement("tr");
        row.innerHTML = `
<td>${result.id}</td>
<td>${result.location}</td>
<td>${result.description}</td>
`;
        table.appendChild(row);
      });
    })
    .catch((error) => {
      // handle any errors that occurred during the fetch request
      console.error(error);
      alert("An error occurred while searching for results.");
    });
});
