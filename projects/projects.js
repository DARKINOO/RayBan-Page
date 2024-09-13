let users = [
    {
       id: "black",
       profilePic: "/xan logo.jpg",
       displayPic:"/about page/black.jpeg",
       pendingMessage: 4,
       location: "",
       name: "Black: Bluetooth Controlled Robot",
       age: '',
       interests: [{
        icon: `<i class="ri-bluetooth-fill"></i>`,
        interest: "Bluetooth"
       },{
        icon: `<i class="ri-robot-2-line"></i>`,
        interest: "Design"
       }],
       bio: "Black seamlessly integrates advanced robotics with wireless technology. With intuitive controls and robust functionality, Black represents the pinnacle of our club's innovation and technical expertise.",
       isFriend: null
    },
    {
       id: "robo-spider",
       profilePic: "/xan logo.jpg",
       displayPic:"/about page/spider.jpeg",
       pendingMessage: 4,
       location: "",
       name: "Robo-Spider",
       age: '',
       interests: [{
        icon: `<i class="ri-switch-line"></i>`,
        interest: "Arduino"
       },{
        icon: `<i class="ri-robot-2-line"></i>`,
        interest: "Design"
       }],
       bio: "Powered by intricate code and advanced algorithms, Robo-Spider emulates the agility and precision of its arachnid namesake. Its programmable movements and responsive behavior showcase our club's dedication to merging robotics with software development.",
       isFriend: null
    },
     {
         id: "xan-drone",
         profilePic: "/xan logo.jpg",
         displayPic:"/Gallery/DSC02212.JPG",
         pendingMessage: 4,
         location: "",
         name: "Xan Drone",
         age: '',
         interests: [{
          icon: `<i class="ri-flight-takeoff-line"></i>`,
          interest: "Flight control"
         },{
          icon: `<i class="ri-robot-2-line"></i>`,
          interest: "Design"
         }],
         bio: "Say hello to the Xananoids Drone, a high-flying marvel engineered by our club's skilled members. This drone combines advanced aerodynamics with state-of-the-art technology to deliver exceptional performance and stability. With its precise control systems and innovative features, the Xananoids Drone embodies our commitment to exploring new heights in robotics and technology. ",
         isFriend: null
      },
      {
       id: "tejas",
       profilePic: "/xan logo.jpg",
       displayPic:"/about page/clock.jpeg",
       pendingMessage: 4,
       location: "",
       name: "Hollow Clock",
       age: '',
       interests: [{
        icon: `<i class="ri-switch-line"></i>`,
        interest: "IOT"
       },{
        icon: `<i class="ri-robot-2-line"></i>`,
        interest: "Design"
       }],
       bio: "Our club, Xananoids, has developed an innovative Hollow Clock, a project that integrates IoT technology to offer unique time-tracking capabilities. This clock not only displays time in a hollow, modern design but also connects to smart devices for enhanced functionality.",
       isFriend: null
    },
      {  
         id: "xana-chatbot",
         profilePic: "/xan logo.jpg",
         displayPic: "bot2.jpeg",
         pendingMessage: 3,
         location: "Jai Dhingra, Yash Jain",
         name: "Xana",
         age: '',
         interests: [{
          icon: `<i class="ri-robot-3-fill"></i>`,
          interest: "AI"
         },{
          icon: `<i class="ri-code-line"></i>`,
          interest: "Development"
         }],
         bio: "XANA, our intelligent chatbot designed to tackle your technical queries and club-related questions. XANA leverages advanced algorithms to provide insightful answers on technology, robotics, and club activities. Whether you’re seeking guidance on a technical issue or curious about our latest projects, XANA is here to assist with precision and expertise.",
         isFriend: null
      },
      { 
         id: "lfr",
         profilePic: "/xan logo.jpg",
         displayPic: "/Gallery/DSC02761.JPG",
         pendingMessage: 2,
         location: "",
         name: "LFR: Line Following Robot",
         age: '',
         interests: [{
          icon: `<i class="ri-switch-line"></i>`,
          interest: "Aurdino"
         },{
          icon: `<i class="ri-robot-2-line"></i>`,
          interest: "Design"
         }],
         bio: "Introducing LFR, our innovative line-following robot. Designed with precision sensors and advanced tracking algorithms, LFR excels at navigating complex paths with unparalleled accuracy, exemplifies our club’s commitment to creating practical and efficient solutions in robotics.",
         isFriend: null
      },
 ];
 
 function select(elem){
     return document.querySelector(elem);
 }
 
 let curr = 0;
 let isAnimating = false;
 
 function setData(index){
     select(".prlfimg img").src = users[index].profilePic;

 
     select(".location h3").textContent = users[index].location;
 
     select(".name h1:nth-child(1)").textContent = users[index].name;
 
     select(".name h1:nth-child(2)").textContent = users[index].age;
 
     let clutter = "";
     users[index].interests.forEach(function(interest){
       clutter +=`<div class="tag flex items-center bg-white/30 px-3 py-1 rounded-full gap-3">
       ${interest.icon}
       <h3 class="text-sm tracking-tight capitalize">${interest.interest}</h3>
   </div>`
     })
     select(".tags").innerHTML = clutter;
 
     select(".bio p").textContent = users[index].bio;
 
 }
 
 function imageChange(){
    if(!isAnimating){
       isAnimating = true;
       let tl = gsap.timeline({
 
          onComplete: function(){
             isAnimating = false;                                    
             let main = select(".maincard");
             let incoming = select(".incomingcard");
    
             incoming.classList.remove("z-[2]");
             incoming.classList.add("z-[3]");
             incoming.classList.remove("incomingcard");
    
             main.classList.remove("z-[3]");
             main.classList.add("z-[2]");
             gsap.set(main,{
                scale: 1,
                opacity: 1
             })
             if(curr + 1 === users.length) curr = -1;
             select(".maincard img").src = users[curr+1].displayPic;
             curr++;
             main.classList.remove("maincard");
             incoming.classList.add("maincard");
             main.classList.add("incomingcard");
          }
       });
    
       tl.to(".maincard",{
          scale: 1.1,
          opacity: 0,
          ease: Circ,
          duration: .9
       },"a")
    
       tl.to(".incomingcard",{
          scale: .9,
          opacity: 1,
          ease: Circ,
          duration: 1.1
       },"a")
    }
 }
 
 
 let accept = select(".accept");
 
 
 accept.addEventListener("click", function(){
    imageChange();
    setData(curr);
      gsap.from(".details .element",{
         y: "100%",
         stagger: .06,
         ease: Power4.easeInOut,
         duration: 1.5
      })
      
 });
 
 (function containerCreator(){
       document.querySelectorAll(".element")
       .forEach(function (element){
          let div = document.createElement("div");
          div.classList.add(`${element.classList[1]}container`, 'overflow-hidden');
          div.appendChild(element);
          select(".details").appendChild(div);
       })
 })();
 
 function scrollToProject(projectId) {
   const project = users.find(user => user.id === projectId);
   if (project) {
       curr = users.indexOf(project);
       setData(curr);
       select(".incomingcard img").src = users[curr].displayPic;
       imageChange();
       gsap.from(".details .element", {
           y: "100%",
           stagger: .06,
           ease: Power4.easeInOut,
           duration: 1.5
       });
   }
}


 window.addEventListener('hashchange', function() {
   const projectId = window.location.hash.slice(1);  // Remove the '#' from the hash
   scrollToProject(projectId);
});

// Call this function when the page loads to handle direct links
window.addEventListener('load', function() {
   const projectId = window.location.hash.slice(1);  // Remove the '#' from the hash
   if (projectId) {
       scrollToProject(projectId);
   }
});
 