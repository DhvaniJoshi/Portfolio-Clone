const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});

function firstPageAnim(){
  var tl=gsap.timeline();
  tl.from("#nav",{
    y:'-10',
    opacity:0,
    duration:1.5,
    ease:Expo.easeInOut
  })

  .to(".boundingelem",{
    y:0,
    ease: Expo.easeInOut,
    duration:2,
    delay:-1,
    stagger:0.2
  })
  .from("#herofooter",{
    y:-10,
    opacity:0,
    delay:-1,
    duration:1.5,
    ease:Expo.easeInOut
  });

}

var timeout;

function circleSkew(){
  //default scale value
  var xscale=1;
  var yscale=1;
  var xprev=0;
  var yprev=0;
  window.addEventListener("mousemove", function(dets){
    clearTimeout(timeout); 
    var xdiff = dets.clientX - xprev;
    var ydiff= dets.clientY - yprev;
    
    xscale = gsap.utils.clamp(0.7,1.2,xdiff);
    yscale = gsap.utils.clamp(0.7,1.2,ydiff);

    xprev=dets.clientX;
    yprev=dets.clientY;

    circleMouseFollower(xscale,yscale);

    // timeout=setTimeout(funtion() {
    //   document.querySelector("#minicircle").style.transform= `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`
    // },100);
    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}


function circleMouseFollower(xscale,yscale){
  window.addEventListener("mousemove",function(dets){
    document.querySelector("#minicircle").style.transform= `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleSkew();
circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem")
.forEach(function(elem){
  var rotate=0;
  var diffrot=0;

  elem.addEventListener("mouseleave",function(dets){  
    gsap.to(elem.querySelector("img"),{
      opacity:0,
      ease:Power3,
      duration:0.5,
    });
  });

  elem.addEventListener("mousemove",function(dets){
    var diff = dets.clientY - elem.getBoundingClientRect().top; // this is diff between the cursor from the current cursor distance from the top 
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    
    gsap.to(elem.querySelector("img"),{
      opacity:1,
      ease:Power3,
      top:diff,
      left:dets.clientX,
      rotate:gsap.utils.clamp(-20,20,diffrot * 0.5)
    });
  });
}); 