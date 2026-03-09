
document.addEventListener("DOMContentLoaded", () => {
    const allBtn = document.getElementById("all-btn");
    const openBtn = document.getElementById("open-btn");
    const closedBtn = document.getElementById("closed-btn");
    const issueList = document.getElementById("issue-list");
    const searchInput = document.getElementById("search-input");
    const issueCountElement = document.getElementById("issue-count"); // Count element

    let allIssues = [];

    // 1. Initial Fetch
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            renderIssues(allIssues, "all");
        })
        .catch(err => console.error("Fetch error:", err));

    // 2. Tab Events
    allBtn.addEventListener("click", () => renderIssues(allIssues, "all"));
    openBtn.addEventListener("click", () => renderIssues(allIssues, "open"));
    closedBtn.addEventListener("click", () => renderIssues(allIssues, "closed"));

    // 3. Search Event (Enter Key)
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
                .then(response => renderIssues(response.data, "search"))
                .catch(err => console.error("Search error:", err));
        }
    });

    // 4. Main Render Function
    function renderIssues(dataToRender, filter) {
        // Tab UI
        [allBtn, openBtn, closedBtn].forEach(btn => btn.classList.remove("btn-primary"));
        [allBtn, openBtn, closedBtn].forEach(btn => btn.classList.add("btn-white"));

        if (filter === "all") allBtn.classList.replace("btn-white", "btn-primary");
        else if (filter === "open") openBtn.classList.replace("btn-white", "btn-primary");
        else if (filter === "closed") closedBtn.classList.replace("btn-white", "btn-primary");

        // Filter Logic
        let filtered = dataToRender;
        if (filter === "open") filtered = dataToRender.filter(i => i.status.toLowerCase() === "open");
        else if (filter === "closed") filtered = dataToRender.filter(i => i.status.toLowerCase() === "closed");

        // --- DYNAMIC COUNT UPDATE ---
        if (issueCountElement) {
            issueCountElement.innerText = `${filtered.length} issues`;
        }

        issueList.innerHTML = "";
        if (!filtered || filtered.length === 0) {
            issueList.innerHTML = "<p class='text-center text-gray-500 w-full p-10'>No issues found.</p>";
            return;
        }

        const gridDiv = document.createElement("div");
        gridDiv.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4";

        filtered.forEach(issue => {
            const issueCard = createCard(issue);
            gridDiv.appendChild(issueCard);
        });
        issueList.appendChild(gridDiv);
    }

    // 5. Helper: Card Creation
    function createCard(issue) {
        let priorityClass = issue.priority.toLowerCase() === "high" ? "bg-red-100 text-red-800" : 
                            issue.priority.toLowerCase() === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800";

        const getLabelClass = (l) => l.toLowerCase() === "bug" ? "bg-red-100 text-red-800" : "bg-violet-100 text-violet-800";
        
        const statusIcon = issue.status.toLowerCase() === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png";
        const borderClass = issue.status.toLowerCase() === "open" ? "border-green-500 border-t-green-500" : "border-violet-500 border-t-violet-500";

        const card = document.createElement("div");
        card.className = `space-y-3 p-4 rounded shadow bg-base-200 border border-t-4 cursor-pointer hover:shadow-lg transition-all ${borderClass}`;
        
        card.innerHTML = `
            <div class="flex justify-between items-center">
                <img src="${statusIcon}" class="w-5 h-5" alt="${issue.status}">
                <p class="rounded-full px-3 ${priorityClass}">${issue.priority}</p>
            </div>
            <h3 class="font-bold text-sm">${issue.title}</h3>
            <p class="text-gray-600 text-sm line-clamp-2">${issue.description}</p>
            <div class="flex gap-2">
                ${issue.labels.map(label => `<p class="rounded-full px-2 text-[10px] ${getLabelClass(label)}">${label}</p>`).join("")}
            </div>
            <div class="p-2 rounded shadow text-[10px] bg-white/50">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>
        `;

        card.addEventListener("click", () => openModal(issue.id));
        return card;
    }

    // 6. Helper: Modal
    function openModal(id) {
        fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
            .then(res => res.json())
            .then(response => {
                const data = response.data;
                const modal = document.getElementById("my_modal_5");
                document.getElementById("modal-title").innerText = data.title;
                document.getElementById("modal-description").innerText = data.description;
                document.getElementById("modal-assignee").innerText = data.assignee || "Not Assigned";
                document.getElementById("modal-meta").innerText = `Opened by ${data.author}`;
                modal.showModal();
            });
    }
});