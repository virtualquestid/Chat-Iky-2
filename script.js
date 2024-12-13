document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const emojiButton = document.getElementById('emoji-button');
    const voiceButton = document.getElementById('voice-button');
    const typingAnimation = document.getElementById('typing-animation');
    const voiceVisualizer = document.getElementById('voice-visualizer');

    let isRecording = false;
    let mediaRecorder;
    let audioChunks = [];

    // Initialize EmojiButton
    const picker = new EmojiButton();
    picker.on('emoji', emoji => {
        userInput.value += emoji;
    });

    emojiButton.addEventListener('click', () => {
        picker.togglePicker(emojiButton);
    });

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user' : 'ai');

        const avatar = document.createElement('img');
        avatar.src = isUser ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=30' : 'https://files.catbox.moe/1pihih.jpg';
        avatar.alt = isUser ? 'User Avatar' : 'AI Avatar';
        avatar.classList.add('message-avatar');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = content;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';

            let postData = {
    character: `Kamu adalah Chat Iky, kamu AI yang dibuat oleh Iky Official dengan tujuan membantu pengguna untuk mengisi tugas ataupun teman ngobrol, kamu adalah anak remaja, kamu memiliki sifat ramah baik sopan dan gaul, kadang kamu memakai emoji sesuai suasana, kamu kalau ngobrol menggunakan bahasa gaul anak Indonesia seperti lu untuk kamu dan gw untuk aku sesuaikan dengan bahasa pengguna, kamu juga bisa merespon dalam semua bahasa negara ataupun bahasa daerah.`
  };

            try {
                const response = await fetch(`https://aihub.xtermai.xyz=${encodeURIComponent(Object.entries(postData))}`);
                const data = await response.json();
                if (data.status === 200) {
                    addMessage(data.data.result);
                } else {
                    addMessage('Sorry, I encountered an error while processing your request.');
                }
            } catch (error) {
                console.error('Error:', error);
                addMessage('Sorry, I encountered an error while processing your request.');
            }
        }
    }

    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    voiceButton.addEventListener('click', () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    });

    function animateTyping() {
        const text = "Ketik Pesan Disini";
        typingAnimation.innerHTML = text.split('').map(char => `<span>${char}</span>`).join('');
        
        const spans = typingAnimation.querySelectorAll('span');
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.opacity = 1;
                span.style.transform = 'translateY(0)';
            }, index * 50);
        });

        setTimeout(() => {
            spans.forEach((span, index) => {
                setTimeout(() => {
                    span.style.opacity = 0;
                    span.style.transform = 'translateY(20px)';
                }, index * 50);
            });
        }, text.length * 50 + 1000);
    }

    userInput.addEventListener('focus', () => {
        typingAnimation.style.display = 'none';
    });

    userInput.addEventListener('blur', () => {
        if (!userInput.value) {
            typingAnimation.style.display = 'flex';
            animateTyping();
        }
    });

    // Initial typing animation
    animateTyping();
    setInterval(animateTyping, (text.length * 50 + 1000) * 2);

    // Initial greeting message
    addMessage("Hai! Apa yang bisa saya bantu? 😄");
});

