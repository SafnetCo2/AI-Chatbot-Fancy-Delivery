const chatBtn = document.getElementById("chatBtn");
const chatContainer = document.getElementById("chatContainer");
const closeBtn = document.getElementById("closeBtn");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

const leadForm = document.getElementById("leadForm");
const leadName = document.getElementById("leadName");
const leadEmail = document.getElementById("leadEmail");
const leadSubmit = document.getElementById("leadSubmit");

// Toggle chat window
chatBtn.addEventListener("click", () => chatContainer.style.display = "flex");
closeBtn.addEventListener("click", () => chatContainer.style.display = "none");

// Sample AI responses
const responses = {
    "hello": "Hello! How can I help you today?",
    "hi": "Hi there! How can I assist you?",
    "pricing": "Our pricing depends on the package you choose. Contact us for details!",
    "hours": "We are available 24/7 online!",
    "contact": "You can reach us via email or phone. We'll get back to you fast!",
    "default": "Sorry, I didn't understand that. Can you rephrase?"
};

// Chat input
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    userInput.value = "";
    setTimeout(() => addMessage(getResponse(text), "bot"), 600);
}

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("chat-message", sender);
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getResponse(text) {
    text = text.toLowerCase();
    for (let key in responses) {
        if (text.includes(key)) return responses[key];
    }
    return responses["default"];
}

// Lead capture
leadSubmit.addEventListener("click", () => {
    const name = leadName.value.trim();
    const email = leadEmail.value.trim();
    if (!name || !email) {
        alert("Please enter both name and email!");
        return;
    }
    addMessage(`Thank you ${name}! We received your email: ${email}`, "bot");
    leadName.value = "";
    leadEmail.value = "";
});
