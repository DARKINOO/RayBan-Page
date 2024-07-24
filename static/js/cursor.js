
var main = document.querySelector("#main");
var crsr = document.querySelector(".cursor");

document.addEventListener('click', function() {
    document.getElementById('redirect-link').click();
});


main.addEventListener("mousemove", function(dets){
    crsr.style.left =  dets.x +"px"
    crsr.style.top =  dets.y +"px"
})

var tl = gsap.timeline()

tl.to("#page1",{
    y:"100vh",
    scale:0.6,
    duration:0
})

tl.to("#page1",{
    y:"30vh",
    duration:1,
    delay:1
})
tl.to("#page1",{
    y:"0vh",
    rotate:360,
    scale:1,
    duration :0.7
})