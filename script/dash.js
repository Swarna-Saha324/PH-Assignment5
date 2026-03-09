// document.addEventListener("DOMContentLoaded", () => {

//     const allBtn = document.getElementById("all-btn");
//     const openBtn = document.getElementById("open-btn");
//     const closedBtn = document.getElementById("closed-btn");
//     const issueList = document.getElementById("issue-list");

//     let allIssues = []; // store all issues from API

//     // Fetch all issues once
//     fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
//         .then(res => res.json())
//         .then(data => {
//             allIssues = data.data;
//             renderIssues("all"); // display all by default
//         })
//         .catch(err => console.error("Fetch error:", err));

//     // Attach button events
//     allBtn.addEventListener("click", () => renderIssues("all"));
//     openBtn.addEventListener("click", () => renderIssues("open"));
//     closedBtn.addEventListener("click", () => renderIssues("closed"));

//     // Render issues filtered by type
//     function renderIssues(filter) {
//         // Highlight active button
//         [allBtn, openBtn, closedBtn].forEach(btn => btn.classList.remove("btn-primary"));
//         [allBtn, openBtn, closedBtn].forEach(btn => btn.classList.add("btn-white"));
//         if(filter === "all") allBtn.classList.replace("btn-white", "btn-primary");
//         else if(filter === "open") openBtn.classList.replace("btn-white", "btn-primary");
//         else if(filter === "closed") closedBtn.classList.replace("btn-white", "btn-primary");

//         // Filter issues client-side
//         let filtered = allIssues;
//         if(filter === "open") filtered = allIssues.filter(i => i.status.toLowerCase() === "open");
//         else if(filter === "closed") filtered = allIssues.filter(i => i.status.toLowerCase() === "closed");

//         // Show message if empty
//         if(filtered.length === 0) {
//             issueList.innerHTML = "<p class='text-center text-gray-500'>No issues found</p>";
//             return;
//         }

//         // Clear previous
//         issueList.innerHTML = "";
//         const gridDiv = document.createElement("div");
//         gridDiv.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4";

//         filtered.forEach(issue => {
//             // Dynamic priority color
//             let priorityClass = "";
//             switch(issue.priority.toLowerCase()) {
//                 case "high": priorityClass = "bg-red-100 text-red-800"; break;
//                 case "medium": priorityClass = "bg-yellow-100 text-yellow-800"; break;
//                 case "low": priorityClass = "bg-green-100 text-green-800"; break;
//                 default: priorityClass = "bg-gray-100 text-gray-800";
//             }

//             // Dynamic status icon
//             let statusIcon = issue.status.toLowerCase() === "open" 
//                 ? "./assets/Open-Status.png" 
//                 : "./assets/Closed-Status.png";

//             // Dynamic label colors
//             const getLabelClass = (label) => {
//                 switch(label.toLowerCase()) {
//                     case "bug": return "bg-red-100 text-red-800";
//                     case "enhancement": return "bg-green-100 text-green-800";
//                     case "help-wanted": return "bg-yellow-100 text-yellow-800";
//                     default: return "bg-violet-100 text-violet-800";
//                 }
//             };
// const borderClass =
// issue.status.toLowerCase() === "open"
// ? "border-green-500 border-t-green-500"
// : "border-violet-500 border-t-violet-500";

//             // Create card
//             const issueCard = document.createElement("div");
//             // issueCard.className = "space-y-3 p-4 rounded shadow bg-base-200";
//    issueCard.className = `
// space-y-3 p-4 rounded shadow bg-base-200
// border border-t-4
// ${borderClass}
// `;


//             issueCard.innerHTML = `
//                 <div class="flex justify-between items-center">
//                     <img src="${statusIcon}" class="w-5 h-5" alt="${issue.status}">
//                     <p class="rounded-full px-3 ${priorityClass}">${issue.priority}</p>
//                 </div>
//                 <h3 class="font-bold text-sm">${issue.title}</h3>
//                 <p class="text-gray-600 text-sm">${issue.description}</p>
//                 <div class="flex gap-2">
//                     ${issue.labels.map(label => 
//                         `<p class="rounded-full px-2 text-sm ${getLabelClass(label)}">${label}</p>`
//                     ).join("")}
//                 </div>
//                 <div class="p-2 rounded shadow text-sm">
//                     <p>#${issue.id} by ${issue.author}</p>
//                     <p>${issue.createdAt}</p>
//                 </div>
//             `;
//             });
// // 1. Card-ke clickable korar jonno cursor pointer add korun
// issueCard.classList.add("cursor-pointer");

// // 2. Click event listener add korun
// issueCard.addEventListener("click", () => {
//     // Modal-er content-gulo dynamic-vabe change korun
//     const modal = document.getElementById("my_modal_5");
    
//     // Modal-er vitorer text update kora (Optional but recommended)
//     modal.querySelector("h3").innerText = issue.title;
//     modal.querySelector("p.py-4").innerText = issue.description;

//     // Finally, DaisyUI modal-ti show korun
//     modal.showModal();

//             gridDiv.appendChild(issueCard);
//         });

//         issueList.appendChild(gridDiv);
//     }


// });  
document.addEventListener("DOMContentLoaded", () => {
    const allBtn = document.getElementById("all-btn");
    const openBtn = document.getElementById("open-btn");
    const closedBtn = document.getElementById("closed-btn");
    const issueList = document.getElementById("issue-list");

    let allIssues = [];

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            renderIssues("all");
        })
        .catch(err => console.error("Fetch error:", err));

    allBtn.addEventListener("click", () => renderIssues("all"));
    openBtn.addEventListener("click", () => renderIssues("open"));
    closedBtn.addEventListener("click", () => renderIssues("closed"));

    function renderIssues(filter) {
        [allBtn, openBtn, closedBtn].forEach(btn => btn.classList.remove("btn-primary"));
        [allBtn, openBtn, closedBtn].forEach(btn => btn.classList.add("btn-white"));
        
        if(filter === "all") allBtn.classList.replace("btn-white", "btn-primary");
        else if(filter === "open") openBtn.classList.replace("btn-white", "btn-primary");
        else if(filter === "closed") closedBtn.classList.replace("btn-white", "btn-primary");

        let filtered = allIssues;
        if(filter === "open") filtered = allIssues.filter(i => i.status.toLowerCase() === "open");
        else if(filter === "closed") filtered = allIssues.filter(i => i.status.toLowerCase() === "closed");

        if(filtered.length === 0) {
            issueList.innerHTML = "<p class='text-center text-gray-500'>No issues found</p>";
            return;
        }

        issueList.innerHTML = "";
        const gridDiv = document.createElement("div");
        gridDiv.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4";

        filtered.forEach(issue => {
            let priorityClass = "";
            switch(issue.priority.toLowerCase()) {
                case "high": priorityClass = "bg-red-100 text-red-800"; break;
                case "medium": priorityClass = "bg-yellow-100 text-yellow-800"; break;
                case "low": priorityClass = "bg-green-100 text-green-800"; break;
                default: priorityClass = "bg-gray-100 text-gray-800";
            }

            let statusIcon = issue.status.toLowerCase() === "open" 
                ? "./assets/Open-Status.png" 
                : "./assets/Closed-Status.png";

            const getLabelClass = (label) => {
                switch(label.toLowerCase()) {
                    case "bug": return "bg-red-100 text-red-800";
                    case "enhancement": return "bg-green-100 text-green-800";
                    case "help-wanted": return "bg-yellow-100 text-yellow-800";
                    default: return "bg-violet-100 text-violet-800";
                }
            };

            const borderClass = issue.status.toLowerCase() === "open"
                ? "border-green-500 border-t-green-500"
                : "border-violet-500 border-t-violet-500";

            const issueCard = document.createElement("div");
            issueCard.className = `space-y-3 p-4 rounded shadow bg-base-200 border border-t-4 cursor-pointer hover:shadow-lg transition-all ${borderClass}`;

            issueCard.innerHTML = `
                <div class="flex justify-between items-center">
                    <img src="${statusIcon}" class="w-5 h-5" alt="${issue.status}">
                    <p class="rounded-full px-3 ${priorityClass}">${issue.priority}</p>
                </div>
                <h3 class="font-bold text-sm">${issue.title}</h3>
                <p class="text-gray-600 text-sm ">${issue.description}</p>
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

            // --- CLICK EVENT (Loop-er vitore thakte hobe) ---
            // issueCard.addEventListener("click", () => {
            //     const modal = document.getElementById("my_modal_5");
            //     modal.querySelector("h3").innerText = issue.title;
            //     modal.querySelector("p.py-4").innerText = issue.description;
            //     modal.showModal();
            // });
          issueCard.addEventListener("click", () => {
    const issueId = issue.id; // Loop theke id nilam
    
    // Specific Issue API Fetch
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
        .then(res => res.json())
        .then(response => {
            const data = response.data;
            const modal = document.getElementById("my_modal_5");

            // 1. Basic Data Fill
            document.getElementById("modal-title").innerText = data.title;
            document.getElementById("modal-description").innerText = data.description;
            document.getElementById("modal-meta").innerText = `Opened by ${data.author} • ${new Date(data.createdAt).toLocaleDateString()}`;
            document.getElementById("modal-assignee").innerText = data.assignee || "Unassigned";

            // 2. Status Badge
            const statusBadge = document.getElementById("modal-status-badge");
            statusBadge.innerText = data.status.charAt(0).toUpperCase() + data.status.slice(1);
            statusBadge.className = data.status.toLowerCase() === 'open' ? 'badge badge-success text-white' : 'badge badge-ghost';

            // 3. Priority Badge
            const priorityBadge = document.getElementById("modal-priority");
            priorityBadge.innerText = data.priority.toUpperCase();
            priorityBadge.className = `badge font-bold ${data.priority.toLowerCase() === 'high' ? 'bg-red-500 text-white' : 'bg-blue-100 text-blue-800'}`;

            // 4. Dynamic Labels
            const labelContainer = document.getElementById("modal-labels");
            labelContainer.innerHTML = data.labels.map(l => 
                `<span class="badge badge-outline border-orange-200 text-orange-600 bg-orange-50 uppercase text-[10px] font-bold">
                    <i class="fa-solid fa-tag mr-1"></i> ${l}
                </span>`
            ).join("");

            // 5. Open Modal
            modal.showModal();
        })
        .catch(err => console.error("Error fetching single issue:", err));
});
            gridDiv.appendChild(issueCard);
        });

        issueList.appendChild(gridDiv);
    }
});