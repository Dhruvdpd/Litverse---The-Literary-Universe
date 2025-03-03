document.addEventListener("DOMContentLoaded", () => {
    // Like button functionality
    document.querySelectorAll(".like-btn").forEach((button) => {
        button.addEventListener("click", () => {
            let count = button.querySelector(".like-count");
            let likes = parseInt(count.innerText);
            count.innerText = likes + 1;
        });
    });

    // Reply button functionality
    document.querySelectorAll(".reply-btn").forEach((button) => {
        button.addEventListener("click", () => {
            let replyBox = button.parentElement.nextElementSibling;
            replyBox.classList.toggle("active");
        });
    });

    // Submit reply functionality
    document.querySelectorAll(".submit-reply").forEach((button) => {
        button.addEventListener("click", () => {
            let input = button.previousElementSibling;
            if (input.value.trim() !== "") {
                alert("Reply Posted: " + input.value);
                input.value = ""; // Clear input field
            }
        });
    });
});
