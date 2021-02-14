const sun = document.getElementById('sun');
const ctx_sun = sun.getContext('2d');

sun.width = 500;
sun.height = 500;

draw_cloud()
setInterval(draw_cloud,1500);

draw_light();
setInterval(draw_light,200);

function draw_cloud(){
    const new_cloud = document.createElement('div');
    new_cloud.classList.add('cloud');
    document.body.append(new_cloud);
    cloudAnim(new_cloud);
}

function cloudAnim(cloud){
  
    var randtop = (Math.random()-0.5)*50;
    cloud.style.top = ` ${40+randtop}vmin`;
    cloud.style.left = '-20vw';
    var temperature = 0;
    var randspeed = 0.25-Math.random()/5;
    var interval=setInterval(()=>{

        cloud.style.left = `${+cloud.style.left.replace('vw','')+randspeed}vw`;
        if(+cloud.style.left.replace('vw','')>100){
            cloud.remove();
            clearInterval(interval);
            console.log('removed');
        }
        const vmin= Math.min(window.innerHeight,window.innerWidth)/100;
        cloud.style.setProperty('--cloud-color','white');
        if(getDistanceBetweenElements(cloud,sun)<vmin*35 && (cloud.getBoundingClientRect().left+cloud.getBoundingClientRect().right)<window.innerWidth){
            temperature=temperature+1;
            cloud.style.setProperty('--smile','transparent');
            cloud.style.setProperty('--cry','black');
            cloud.style.setProperty('--cloud-color',`#${LightenDarkenColor("ff0a54", 250-1.2*temperature)}`);
            cloud.classList.add('heating');
            var animationduration = temperature>100 ? 0.1 : 0.35-temperature/400;
            cloud.style.animationDuration= `${animationduration}s`
            
            if(temperature>200){
                cloud.classList.add('dissipating');
                cloud.style.top = ` 0vmin`;
                setTimeout(()=>{
                    clearInterval(interval);
                },1000)
                
                setTimeout(()=>{
                    if(cloud){
                        cloud.remove();
                        console.log('removed');
                    }
                },3000);
            }
        }else{
            if(temperature>0){
                temperature = temperature -1;
                cloud.style.setProperty('--cloud-color',`#${LightenDarkenColor("ff0a54", 250-temperature/2)}`);
            }else{
                cloud.classList.remove('heating');
                cloud.style.setProperty('--smile','black');
                cloud.style.setProperty('--cry','transparent');
            } 
        }
    },10)


//source: https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
    function LightenDarkenColor(col, amt) {
        var usePound = false;

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;
    var newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
      }
      
}


//source:https://stackoverflow.com/questions/17628456/measure-distance-between-two-html-elements-centers

function getPositionAtCenter(element) {
    const {top, left, width, height} = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2
    };
  }
  function getDistanceBetweenElements(a, b) {
    const aPosition = getPositionAtCenter(a);
    const bPosition = getPositionAtCenter(b);
  
    return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);  
  }




function draw_light(){
    ctx_sun.clearRect(0,0,500,500);
    ctx_sun.beginPath();
    ctx_sun.arc(250,250,100,0,2*Math.PI,false);
    ctx_sun.fillStyle = '#fdffb6';
    ctx_sun.fill();
    ctx_sun.beginPath();
    ctx_sun.fillStyle = 'yellow';
    ctx_sun.strokeStyle='yellow';
    ctx_sun.arc(250,250,100,0,2*Math.PI,true);
    ctx_sun.lineTo(370,250);
    ctx_sun.arc(250,250,120,0,2*Math.PI,false);
    ctx_sun.fill();
    
    //sun glasses
   
    ctx_sun.beginPath();
    ctx_sun.fillStyle = 'black';
    ctx_sun.arc(210,240,20,0,2*Math.PI,true);
    ctx_sun.fill();

    ctx_sun.beginPath();
    ctx_sun.fillStyle = 'black';
    ctx_sun.arc(290,240,20,0,2*Math.PI,true);
    ctx_sun.fill();

    ctx_sun.beginPath();
    ctx_sun.moveTo(150,250);
    ctx_sun.lineTo(190,240);
    ctx_sun.strokeStyle='black';
    ctx_sun.stroke();

    ctx_sun.beginPath();
    ctx_sun.moveTo(230,240);
    ctx_sun.lineTo(270,240);
    ctx_sun.strokeStyle='black';
    ctx_sun.stroke();

    ctx_sun.beginPath();
    ctx_sun.moveTo(310,240);
    ctx_sun.lineTo(350,250);
    ctx_sun.strokeStyle='black';
    ctx_sun.stroke();
   
    var rand_glass=Math.random()-0.5;
    ctx_sun.save();
    ctx_sun.translate(210,240);
    ctx_sun.rotate(rand_glass*Math.PI/10);
    ctx_sun.translate(-210,-240);
    ctx_sun.beginPath();
    ctx_sun.arc(210,240,15,-3*Math.PI/10,-3*Math.PI/8,true);
    ctx_sun.lineWidth=3;
    ctx_sun.strokeStyle='white';
    ctx_sun.stroke();
    
    ctx_sun.beginPath();
    ctx_sun.arc(210,240,15,0,-Math.PI/4,true);
    ctx_sun.stroke();
    ctx_sun.restore();
    
    ctx_sun.save();
    ctx_sun.strokeStyle='white';
    ctx_sun.lineWidth=3;
    ctx_sun.translate(290,240);
    ctx_sun.rotate(rand_glass*Math.PI/10);
    ctx_sun.translate(-290,-240);
    ctx_sun.beginPath();
    ctx_sun.arc(290,240,15,0,-Math.PI/4,true);
    ctx_sun.stroke();
    ctx_sun.beginPath();
    ctx_sun.arc(290,240,15,-3*Math.PI/10,-3*Math.PI/8,true);
    ctx_sun.stroke();
    ctx_sun.restore();


    //sun mouth
    var rand_mouth =0;
    ctx_sun.save();
    ctx_sun.beginPath();
    ctx_sun.moveTo(210,280);
    ctx_sun.quadraticCurveTo(250,330+10*rand_mouth,290,280);
    ctx_sun.quadraticCurveTo(250,300+10*rand_mouth,210,280);
    ctx_sun.strokeStyle='red';
    ctx_sun.fillStyle='red';
    ctx_sun.stroke();
    ctx_sun.fill();
    ctx_sun.restore();
    
//sunlight
var rand=0;
var rand1=0;
var rand2=Math.random()-0.5;
    for(let i =0; i<8;i++){
        ctx_sun.fillStyle = 'yellow';
        ctx_sun.strokeStyle='yellow';
        rand= Math.random()-0.5;
        rand1= Math.random()-0.5;
        ctx_sun.save();
        ctx_sun.translate(250,250);
        ctx_sun.rotate(i*Math.PI/4+rand2*Math.PI/4);
        ctx_sun.translate(-250,-250);
        ctx_sun.beginPath();
        ctx_sun.moveTo(370,250);
        ctx_sun.quadraticCurveTo(358,222,450+rand*50,170+rand1*50);
        ctx_sun.quadraticCurveTo(346,194,335,165);
        // ctx_sun.quadraticCurveTo(225,150,150,200);
        ctx_sun.stroke();
        ctx_sun.fill();
        ctx_sun.restore();
    }
}








