// document.addEventListener("DOMContentLoaded", () => {
//     const allBtn = document.getElementById("all-btn");
//     const openBtn = document.getElementById("open-btn");
//     const closedBtn = document.getElementById("closed-btn");
//     const issueList = document.getElementById("issue-list");

//     let allIssues = [];


//     document.addEventListener("DOMContentLoaded", () => {
//     // ... existing variables ...
//     const searchInput = document.getElementById("search-input"); // Navbar-e je id-ta diyechhen

//     // --- EI KOTUKU ADD KORUN ---
//     searchInput.addEventListener("input", (e) => {
//         const searchText = e.target.value.trim();

//         if (searchText === "") {
//             renderIssues("all"); 
//             return;
//         }

//         fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
//             .then(res => res.json())
//             .then(response => {
//                 // Search result pawa gele amra manually list-ta render korbo
//                 renderIssuesWithData(response.data);
//             })
//             .catch(err => console.error("Search error:", err));
//     });
//     // ----------------------------

//     // ... rest of your code (fetch, renderIssues function etc) ...
// });

//     fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
//         .then(res => res.json())
//         .then(data => {
//             allIssues = data.data;
//             renderIssues("all");
//         })
//         .catch(err => console.error("Fetch error:", err));

//     allBtn.addEventListener("click", () => renderIssues("all"));
//     openBtn.addEventListener("click", () => renderIssues("open"));
//     closedBtn.addEventListener("click", () => renderIssues("closed"));

//     function renderIssues(filter, searchResults = null){
//         [allBtn, openBtn, closedBtn].forEach(btn => btn.classList.remove("btn-primary"));
//         [allBtn, openBtn, closedBtn].forEach(btn => btn.classList.add("btn-white"));
        
//         if(filter === "all") allBtn.classList.replace("btn-white", "btn-primary");
//         else if(filter === "open") openBtn.classList.replace("btn-white", "btn-primary");
//         else if(filter === "closed") closedBtn.classList.replace("btn-white", "btn-primary");

//         let filtered = allIssues;
//         if(filter === "open") filtered = allIssues.filter(i => i.status.toLowerCase() === "open");
//         else if(filter === "closed") filtered = allIssues.filter(i => i.status.toLowerCase() === "closed");

//         if(filtered.length === 0) {
//             issueList.innerHTML = "<p class='text-center text-gray-500'>No issues found</p>";
//             return;
//         }

//         issueList.innerHTML = "";
//         const gridDiv = document.createElement("div");
//         gridDiv.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4";

//         filtered.forEach(issue => {
//             let priorityClass = "";
//             switch(issue.priority.toLowerCase()) {
//                 case "high": priorityClass = "bg-red-100 text-red-800"; break;
//                 case "medium": priorityClass = "bg-yellow-100 text-yellow-800"; break;
//                 case "low": priorityClass = "bg-green-100 text-green-800"; break;
//                 default: priorityClass = "bg-gray-100 text-gray-800";
//             }

//             let statusIcon = issue.status.toLowerCase() === "open" 
//                 ? "./assets/Open-Status.png" 
//                 : "./assets/Closed-Status.png";

//             const getLabelClass = (label) => {
//                 switch(label.toLowerCase()) {
//                     case "bug": return "bg-red-100 text-red-800";
//                     case "enhancement": return "bg-green-100 text-green-800";
//                     case "help-wanted": return "bg-yellow-100 text-yellow-800";
//                     default: return "bg-violet-100 text-violet-800";
//                 }
//             };

//             const borderClass = issue.status.toLowerCase() === "open"
//                 ? "border-green-500 border-t-green-500"
//                 : "border-violet-500 border-t-violet-500";

//             const issueCard = document.createElement("div");
//             issueCard.className = `space-y-3 p-4 rounded shadow bg-base-200 border border-t-4 cursor-pointer hover:shadow-lg transition-all ${borderClass}`;

//             issueCard.innerHTML = `
//                 <div class="flex justify-between items-center">
//                     <img src="${statusIcon}" class="w-5 h-5" alt="${issue.status}">
//                     <p class="rounded-full px-3 ${priorityClass}">${issue.priority}</p>
//                 </div>
//                 <h3 class="font-bold text-sm">${issue.title}</h3>
//                 <p class="text-gray-600 text-sm ">${issue.description}</p>
//                 <div class="flex gap-2">
//                     ${issue.labels.map(label => 
//                         `<p class="rounded-full px-2 text-sm ${getLabelClass(label)}">${label}</p>`
//                     ).join("")}
//                 </div>
//                 <div class="p-2 rounded shadow text-sm bg-white/50">
//                     <p>#${issue.id} by ${issue.author}</p>
//                     <p>${issue.createdAt}</p>
//                 </div>
//             `;

//           issueCard.addEventListener("click", () => {
//     const issueId = issue.id; // Loop theke id nilam
    
//     // Specific Issue API Fetch
//     fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
//         .then(res => res.json())
//         .then(response => {
//             const data = response.data;
//             const modal = document.getElementById("my_modal_5");

//             // 1. Basic Data Fill
//             document.getElementById("modal-title").innerText = data.title;
//             document.getElementById("modal-description").innerText = data.description;
//             document.getElementById("modal-meta").innerText = `Opened by ${data.author} • ${new Date(data.createdAt).toLocaleDateString()}`;
//             document.getElementById("modal-assignee").innerText = data.assignee || "Unassigned";

//             // 2. Status Badge
//             const statusBadge = document.getElementById("modal-status-badge");
//             statusBadge.innerText = data.status.charAt(0).toUpperCase() + data.status.slice(1);
//             statusBadge.className = data.status.toLowerCase() === 'open' ? 'badge badge-success text-white' : 'badge badge-ghost';

//             // 3. Priority Badge
//             const priorityBadge = document.getElementById("modal-priority");
//             priorityBadge.innerText = data.priority.toUpperCase();
//             priorityBadge.className = `badge font-bold ${data.priority.toLowerCase() === 'high' ? 'bg-red-500 text-white' : 'bg-blue-100 text-blue-800'}`;

//             // 4. Dynamic Labels
//             const labelContainer = document.getElementById("modal-labels");
//             labelContainer.innerHTML = data.labels.map(l => 
//                 `<span class="badge badge-outline border-orange-200 text-orange-600 bg-orange-50 uppercase text-[10px] font-bold">
//                     <i class="fa-solid fa-tag mr-1"></i> ${l}
//                 </span>`
//             ).join("");

//             // 5. Open Modal
//             modal.showModal();
//         })
//         .catch(err => console.error("Error fetching single issue:", err));
// });
//             gridDiv.appendChild(issueCard);
//         });

//         issueList.appendChild(gridDiv);
//     }
// });
// const searchInput = document.getElementById("search-input");

// searchInput.addEventListener("keydown", (e) => {
//     // Check korun key-ti 'Enter' kina
//     if (e.key === "Enter") {
//         e.preventDefault(); // Browser-er default reload bondho korbe
        
//         const searchText = e.target.value.trim();
        
//         if (searchText === "") {
//             renderIssues("all");
//             return;
//         }

//         // Search API Call
//         fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
//             .then(res => res.json())
//             .then(response => {
//                 // Search result-er data gulo render korun
//                 // Apnar existing renderIssues function-e data pass korun
//                 displaySearchResults(response.data);
//             })
//             .catch(err => console.error("Search error:", err));
//     }
// });   
document.addEventListener("DOMContentLoaded", () => {
    const allBtn = document.getElementById("all-btn");
    const openBtn = document.getElementById("open-btn");
    const closedBtn = document.getElementById("closed-btn");
    const issueList = document.getElementById("issue-list");
    const searchInput = document.getElementById("search-input");

    let allIssues = [];

    // 1. Initial Fetch
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            renderIssues(allIssues, "all");
        })
        .catch(err => console.error("Fetch error:", err));

    // 2. Tab Click Events
    allBtn.addEventListener("click", () => renderIssues(allIssues, "all"));
    openBtn.addEventListener("click", () => renderIssues(allIssues, "open"));
    closedBtn.addEventListener("click", () => renderIssues(allIssues, "closed"));

    // 3. Search Logic (Enter key handle kora hoyeche)
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const searchText = e.target.value.trim();

            if (searchText === "") {
                renderIssues(allIssues, "all");
                return;
            }

            fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
                .then(res => res.json())
                .then(response => {
                    renderIssues(response.data, "search");
                })
                .catch(err => console.error("Search error:", err));
        }
    });

    // 4. Main Render Function
    function renderIssues(dataToRender, filter) {
        // Tab UI Update
        [allBtn, openBtn, closedBtn].forEach(btn => btn.classList.remove("btn-primary"));
        [allBtn, openBtn, closedBtn].forEach(btn => btn.classList.add("btn-white"));

        if (filter === "all") allBtn.classList.replace("btn-white", "btn-primary");
        else if (filter === "open") openBtn.classList.replace("btn-white", "btn-primary");
        else if (filter === "closed") closedBtn.classList.replace("btn-white", "btn-primary");

        // Filtering logic
        let filtered = dataToRender;
        if (filter === "open") filtered = dataToRender.filter(i => i.status.toLowerCase() === "open");
        else if (filter === "closed") filtered = dataToRender.filter(i => i.status.toLowerCase() === "closed");

        issueList.innerHTML = "";
        if (!filtered || filtered.length === 0) {
            issueList.innerHTML = "<p class='text-center text-gray-500 w-full p-10'>No issues found.</p>";
            return;
        }

        const gridDiv = document.createElement("div");
        gridDiv.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4";

        filtered.forEach(issue => {
            // Priority Class logic
            let priorityClass = "";
            switch(issue.priority.toLowerCase()) {
                case "high": priorityClass = "bg-red-100 text-red-800"; break;
                case "medium": priorityClass = "bg-yellow-100 text-yellow-800"; break;
                case "low": priorityClass = "bg-green-100 text-green-800"; break;
                default: priorityClass = "bg-gray-100 text-gray-800";
            }

            // Label Color logic
            const getLabelClass = (label) => {
                switch(label.toLowerCase()) {
                    case "bug": return "bg-red-100 text-red-800";
                    case "enhancement": return "bg-green-100 text-green-800";
                    case "help-wanted": return "bg-yellow-100 text-yellow-800";
                    default: return "bg-violet-100 text-violet-800";
                }
            };

            const statusIcon = issue.status.toLowerCase() === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png";
            const borderClass = issue.status.toLowerCase() === "open" ? "border-green-500 border-t-green-500" : "border-violet-500 border-t-violet-500";

            const issueCard = document.createElement("div");
            issueCard.className = `space-y-3 p-4 rounded shadow bg-base-200 border border-t-4 cursor-pointer hover:shadow-lg transition-all ${borderClass}`;

            // Apnar deya card structure:
            issueCard.innerHTML = `
                <div class="flex justify-between items-center">
                    <img src="${statusIcon}" class="w-5 h-5" alt="${issue.status}">
                    <p class="rounded-full px-3 ${priorityClass}">${issue.priority}</p>
                </div>
                <h3 class="font-bold text-sm">${issue.title}</h3>
                <p class="text-gray-600 text-sm">${issue.description}</p>
                <div class="flex gap-2">
                    ${issue.labels.map(label => 
                        `<p class="rounded-full px-2 text-sm ${getLabelClass(label)}">${label}</p>`
                    ).join("")}
                </div>
                <div class="p-2 rounded shadow text-sm bg-white/50">
                    <p>#${issue.id} by ${issue.author}</p>
                    <p>${issue.createdAt}</p>
                </div>
            `;

            // Modal click handle
            issueCard.addEventListener("click", () => openDetailedModal(issue.id));

            gridDiv.appendChild(issueCard);
        });

        issueList.appendChild(gridDiv);
    }

    // 5. Modal Function with Single Issue API
    function openDetailedModal(issueId) {
        fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
            .then(res => res.json())
            .then(response => {
                const data = response.data;
                const modal = document.getElementById("my_modal_5");

                document.getElementById("modal-title").innerText = data.title;
                document.getElementById("modal-description").innerText = data.description;
                document.getElementById("modal-assignee").innerText = data.assignee || "Not Assigned";
                document.getElementById("modal-meta").innerText = `Opened by ${data.author} • ${new Date(data.createdAt).toLocaleDateString()}`;
                
                const priorityBadge = document.getElementById("modal-priority");
                priorityBadge.innerText = data.priority.toUpperCase();
                priorityBadge.className = `badge font-bold ${data.priority.toLowerCase() === 'high' ? 'bg-red-500 text-white' : 'bg-blue-100 text-blue-800'}`;

                const statusBadge = document.getElementById("modal-status-badge");
                statusBadge.innerText = data.status.toUpperCase();
                statusBadge.className = `badge ${data.status.toLowerCase() === 'open' ? 'badge-success text-white' : 'badge-ghost'}`;

                // Dynamic labels in modal
                const labelContainer = document.getElementById("modal-labels");
                labelContainer.innerHTML = data.labels.map(l => 
                    `<span class="badge badge-outline border-orange-200 text-orange-600 bg-orange-50 uppercase text-[10px] font-bold">${l}</span>`
                ).join("");

                modal.showModal();
            })
            .catch(err => console.error("Modal fetch error:", err));
    }
});