Shery.imageEffect("#back", { style: 5, config:{"a":{"value":2,"range":[0,30]},"b":{"value":-0.97,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":2.179341732699468},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.3,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":false},"onMouse":{"value":1},"noise_speed":{"value":0.84,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2],"_gsap":{"id":3}},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}} , gooey: true});

 


var elems = document.querySelectorAll(".elem");

elems.forEach(function(elem){

    var h1s = elem.querySelectorAll("h1");
    var index = 0;
    var animating = false

    document.querySelector("#main")
    .addEventListener("click", function(){
   if(!animating){ 
   // animating = true;
    gsap.to(h1s[index], {
        top:"-=100%",
        ease: Expo.easeInOut,
        duration: 1,
        onComplete: function(){
            gsap.set(this._target[0], { top: "100%"});
            //animating = false;
        },
    })

    index === h1s.length - 1 ? (index = 0) : index++;
    
    gsap.to(h1s[index], {
        top:"-=100%",
        ease: Expo.easeInOut,
        duration: 1,
    });
   }
})

});



document.getElementById('chatbot-button').addEventListener('click', function() {
    document.getElementById('chat-container').classList.toggle('active');
});

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('chat-container').classList.remove('active');
    document.getElementById('chatbot-button').style.display = 'flex';
});


function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (message === '') return;

    appendMessage('user', message);
    userInput.value = '';

    // Simulate bot response
    setTimeout(() => {
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage('bot', data.response);
        })
        .catch(error => {
            console.error('Error:', error);
            appendMessage('bot', "Sorry, something went wrong.");
        });
    }, 1000);
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    const imgElement = document.createElement('img');
    if (sender === 'user') {
        imgElement.src = 'static/images/user.jpeg'; // User icon
    } else {
        imgElement.src = 'static/images/xan logo.jpg'; // Bot icon
    }

    const textElement = document.createElement('p');
    textElement.textContent = message;

    messageElement.appendChild(imgElement);
    messageElement.appendChild(textElement);

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}


function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex'
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none'
}


document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav a");
    const content = document.getElementById("content");
    
    const loadContent = (page) => {
        fetch(page)
            .then(response => response.text())
            .then(data => {
                content.innerHTML = data;
            })
            .catch(error => {
                content.innerHTML = "<p>Error loading content. Please try again later.</p>";
                console.error('Error fetching content:', error);
            });
    };

    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const page = event.target.getAttribute("data-page");
            loadContent(page);
        });
    });

    //Load initial content
    loadContent("index.html")
});

// function msg(){
//     let bot = document.getElementById('chatbot-button');
//     alert('This chat-bot is in developing state and it works only on specific set of questions.');
// }
