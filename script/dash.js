document.addEventListener("DOMContentLoaded", () => {

    const allBtn = document.getElementById("all-btn");
    const issueList = document.getElementById("issue-list");

    // Event listener for All button
    allBtn.addEventListener("click", loadIssues);
    function loadIssues() {
        console.log("Button clicked"); // DEBUG

        const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

        fetch(url)
            .then(res => res.json())
            .then(data => displayIssues(data))
            .catch(err => console.error("Fetch error:", err));
    }

    function displayIssues(issuesData) {
        if (!issuesData || !issuesData.data) {
            issueList.innerHTML = "<p>No data found</p>";
            return;
        }

        issueList.innerHTML = ""; // clear previous

        // Create grid container
        const gridDiv = document.createElement("div");
        gridDiv.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4";

        // Loop through issues
        issuesData.data.forEach(issue => {
            const issueCard = document.createElement("div");
            issueCard.className = "space-y-3 p-4 rounded shadow bg-base-200";

            issueCard.innerHTML = `
                <div class="flex justify-between items-center">
                    <img src="./assets/Open-Status.png" class="w-5 h-5" alt="status">
                    <p class="bg-red-100 rounded-full px-3 text-red-800">${issue.priority}</p>
                </div>
                <h3 class="font-bold text-sm">${issue.title}</h3>
                <p class="text-gray-600 text-sm">${issue.description}</p>
                <div class="flex gap-2">
                    ${issue.labels.map(label => `<p class="bg-red-100 rounded-full px-2 text-red-800">${label}</p>`).join("")}
                </div>
                <div class="p-2 rounded shadow text-sm">
                    <p>#${issue.id} by ${issue.author}</p>
                    <p>${issue.createdAt}</p>
                </div>
            `;
            gridDiv.appendChild(issueCard);
        });

        issueList.appendChild(gridDiv);
    }

});
