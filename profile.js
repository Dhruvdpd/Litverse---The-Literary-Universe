function openTab(event, tabName) {
    // Hide all tab contents
    const contents = document.querySelectorAll(".tab-content");
    contents.forEach(content => content.classList.remove("active"));

    // Remove active class from all tab links
    const links = document.querySelectorAll(".tab-link");
    links.forEach(link => link.classList.remove("active"));

    // Show the clicked tab's content
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}
