
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    // 1. Prevent the page from refreshing on form submit
    event.preventDefault();

    // 2. Get the values from the input fields
    const userValue = document.getElementById('username').value;
    const passwordValue = document.getElementById('password').value;

    // 3. Check if they match 'admin' and 'admin123'
    if (userValue === 'admin' && passwordValue === 'admin123') {
      
      
      // 4. Redirect to another page (change dashboard.html to your actual file)
      window.location.href = 'dashboard.html'; 
    } else {
      // 5. If it's wrong, show an error
      alert('Invalid username or password!');
    }
  });

  const loadIssues = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
        .then(response => response.json())
        .then(json => displayIssues(json))
        .catch(err => console.error("Fetch error:", err));
};

const displayIssues = (issuesData) => {

    console.log(issuesData);

    const issueList = document.getElementById("issue-list");

    if (!issueList) {
        console.error("Missing element with ID 'issue-list' in HTML!");
        return;
    }

    issueList.innerHTML = "";

    const gridDiv = document.createElement("div");
    // gridDiv.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4";
    gridDiv.className = "grid grid-cols-4 p-4 bg-base-200 rounded-lg  gap-3";

    issuesData.data.forEach(issue => {

        const issueCard = document.createElement("div");

        issueCard.innerHTML = `
        // <div class="space-y-5 shadow-lg p-5 bg-base-200 rounded-lg">
         <div class = "space-y-5 shadow-lg p-5 ">

            // <div class="flex items-center justify-between">
            //     <img src="./assets/Open-Status.png" class="w-5 h-5">
            //     <p class="bg-red-100 rounded-full px-5 text-red-800">${issue.priority}</p>
            // </div> 
            <div class="flex flex-row items-center justify-between  gap-3">
                      <img src="./assets/Open-Status.png" alt="Open Status" class="w-5 h-5">
                    <p class="bg-red-100 rounded-full px-5 text-red-800">${issue.priority}</p>
                </div>

            <div>
                <h3 class="text-sm font-bold">${issue.title}</h3>
                <p class="text-gray-600 text-sm">${issue.description}</p>
            </div>

            <div class="flex gap-3">
                ${issue.labels.map(label =>
                    `<p class="bg-red-100 rounded-full px-5 text-red-800">${label}</p>`
                ).join("")}
            </div>

            <div class="p-2 rounded-lg shadow-lg">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${issue.createdAt}</p>
            </div>

        </div>
        `;

        gridDiv.appendChild(issueCard);
    });

    issueList.appendChild(gridDiv);
};


