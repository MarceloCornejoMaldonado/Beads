a=document.getElementById("canvas")
c=a.getContext('2d')

function Import(L){
	K=L.split(",")
	width=K[0]*1
	height=K[1]*1
	clear(width,height)
	Draw=decompress(K[2]).split(" "); 
	for(let i=0;i<Draw.length;i++){
		grid[Math.floor(i/width)][i%width]=Draw[i]*1
	}
	localStorage.setItem("settings",[beadMode])
}
function Export(){
	return width+","+height+","+compress(grid.map(k=>k.join(" ")).join(" "))
}


function isBead(x,y){
	return grid[y][x]!=0
}

function getBead(x,y){
	return grid[y][x]
}


function compress (str) {
	var output = '';
	var count = 0;
	S=str.split(" ")
	for (var i = 0; i < S.length; i++) {
	  count++;
	  if (S[i] != S[i+1]) {
		output +=" "+S[i] +"_"+ count;
		count = 0;
	  }
	}
	return output.substring(1);
  }
function decompress(str){
	S=str.split(" ").map(k=>k.split("_"))
	var output = '';
	for (let i = 0; i < S.length; i++) {
		output+=i?" ":""
			for (let j = 0; j < S[i][1]; j++) {
			output+=(j?" ":"")+S[i][0]
		}
	}
	  return output;
}

function save(){
	if(Sav.length>100){Sav.shift(1)}
	Sav.push(Export())
}

function getBead(x,y){
	if(isInside(x,y)){
		return grid[y][x]
	}else{
		return 0
	}
	
}

function getPos(x,y){
	return [Math.floor((x -a.width /2+scale*(width /2-xOffset))/scale),
			Math.floor((y -a.height/2+scale*(height/2-yOffset))/scale)]
}

function isInside(x,y){
	return y>=0&&y<height&&x>=0&&x<width
}



function fill(x1,y1){
	if(grid[y1][x1]==beadColor){return}
	grid[y1][x1]=beadColor
	if(getBead(x1-1,y1)==fillColor&&isInside(x1-1,y1)){
		fill(x1-1,y1)
	}
	if(getBead(x1+1,y1)==fillColor&&isInside(x1+1,y1)){
		fill(x1+1,y1)
	}
	if(getBead(x1,y1-1)==fillColor&&isInside(x1,y1-1)){
		fill(x1,y1-1)
	} 
	if(getBead(x1,y1+1)==fillColor&&isInside(x1,y1+1)){
		fill(x1,y1+1)
	} 
	
}

function clear(w,h){
	
	grid=[...Array(h)].map(()=>[...Array(w)].map(()=>0))
	width=w;height=h
	localStorage.setItem("settings",[beadMode])
}


function drawBead(x,y,color){
if(beadMode==1){
c.beginPath()
c.arc(x*scale-scale*(width/2-xOffset)+a.width/2+scale/2,
		  y*scale-scale*(height/2-yOffset)+a.height/2+scale/2,
		  scale*0.5,0,6.29,0);	
	c.fillStyle=color
	c.fill();
	
}else{
	c.beginPath()
	c.rect(x*scale-scale*(width/2-xOffset)+a.width/2,
		   y*scale-scale*(height/2-yOffset)+a.height/2,
		   scale,
		   scale
	)
	c.fillStyle=color
	c.fill()
}

}


//paleta= ["#060e27","#1c0365","#250662","#17232","#2f1179","#520d3a","#1d1d58","#1c271","#4f0f6f","#521250","#0023b8","#5d1d0c","#880977","#3f16d9","#421f79","#640fc1","#bb09b","#d00043","#2a3434","#6119d0","#911e20","#802234","#7d1d85","#5d2c52","#651be6","#f50422","#ce00be","#ff065","#b308d3","#b11573","#5426e0","#911e7e","#6b2e5f","#d70a9c","#2f3f94","#79352c","#dc1c06","#4834d0","#aa226d","#0f525f","#3e464c","#243eeb","#36486a","#f205e6","#513d98","#af3101","#225b8","#792ed8","#fa06ec","#1350ce","#a82b89","#21538e","#823c59","#cd2f00","#474893","#0f5997","#f812b3","#cb2582","#d02e29","#7a3d93","#4a543f","#0d5ac1","#d3277a","#ac3e1b","#983f7a","#ea24a3","#fb21a3","#6749e8","#3d6751","#1c65cb","#ff3420","#9348af","#7e50a8","#635f6d","#4b5bdc","#f53b2a","#1a8011","#e33e52","#a84a8f","#ca4751","#0971f0","#d3493a","#436a9e","#436a9f","#9b5c2a","#2d7d2a","#615af0","#935b6d","#d3486d","#1a806a","#1a806b","#e23dd0","#228916","#566ca0","#fb4c03","#7260d8","#2f7b99","#996635","#406df9","#a259a4","#f2510e","#8d6c2f","#e145ba","#df514a","#34891f","#947002","#b46238","#fc458e","#77772a","#088baf","#986b53","#996c48","#64820f","#3b8c2a","#916988","#3f8473","#289812","#807fb","#be608b","#9e6d71","#648177","#d36647","#608572","#73872a","#cb5bea","#79806e","#ac7c0a","#b47162","#409188","#f158bf","#01ac53","#d7790f","#539397","#ef6e3c","#608fa4","#0eb621","#d2737d","#fc6b57","#2ca1ae","#14a9ad","#f07815","#25b67","#ce7d78","#6995ba","#b17fc9","#de73c2","#9685eb","#1dc18","#679c9d","#a48a9e","#48b41b","#1bb699","#1ec227","#fc7e41","#8798a4","#c188a2","#4ca2f9","#5bb32d","#8a96c6","#88aa0b","#4bb473","#e08c56","#15b9ee","#ae90e2","#7fb411","#51aed9","#96b00c","#0ec0ff","#05d371","#8fb413","#0cd36d","#30cc49","#63b598","#ba96ce","#c0a43c","#62c03e","#da967d","#21d52e","#aead3a","#c79bc2","#06e052","#71b1f4","#c9a941","#9cb64a","#41d158","#d298e2","#dd93fd","#c79ed2","#ee91e3","#ea9e70","#79bca0","#07d7f6","#f697c1","#57c4d8","#e3a481","#11dec1","#e4ac44","#f1ae16","#c5a4fb","#9ab9b7","#32d5d6","#a5b3d9","#dba2e6","#4be47","#10e5b1","#06f43a","#b2be57","#7ad236","#b2c24f","#a8b8d4","#61da5e","#c2b0e2","#b2b4f0","#89d534","#b4c086","#3cec35","#c6c42c","#1deaa7","#1ae6db","#00efd4","#00f87c","#5cdd87","#75d89e","#1bede6","#a4d17a","#8fd883","#00f7f9","#8fe22a","#67eb4b","#c3c89d","#b2db15","#20f6ba","#4cf09d","#5be4f0","#c4d647","#c9d730","#e1cf3b","#b0d87b","#a4e43f","#86e98f","#96e591","#bde052","#28fcfd","#76fc1b","#77ecca","#88e9b8","#e3d94c","#2dfff6","#d6dd92","#c6e1e8","#93f2d7","#e7dbce","#dce77a","#a2f8a5","#ffdbe1","#c4fd57","#e0eeb8","#cefcb8","#fff4d7"]
paleta=["rgb(0,0,0)"
	,"rgb(155,155,155)"
	,"rgb(255,255,255)"
	,"rgb(92,71,56)"
	
	,"rgb(55,182,230)"
	,"rgb(20,123,209)"
	,"rgb(100,53,155)"
	,"rgb(123,77,53)"
	
	,"rgb(186,12,47)"
	,"rgb(255,103,31)"
	,"rgb(250,224,83)"
	,"rgb(135,216,57)"
	
	,"rgb(252,191,109)"
	,"rgb(219,33,82)"
	,"rgb(0,104,94)"
	
	,"rgb(170,220,235)"
	,"rgb(0,51,153)"
	,"rgb(118,119,119)"
	,"rgb(72,73,85)"
	
	,"rgb(51,0,144)"
	,"rgb(167,123,202)"
	,"rgb(234,184,228)"
	,"rgb(201,128,158)"

	,"rgb(167,123,202)"
	,"rgb(234,184,228)"
	,"rgb(201,128,158)"

	,"rgb(255,106,19)"
	,"rgb(246,178,78)"
	,"rgb(255,231,128)"
	,"rgb(234,170,0)"

	,"rgb(92,19,27)"
	,"rgb(255,109,106)"
	,"rgb(252,251,205)"
	,"rgb(205,178,119)"
]
beadMode=1

tool=1

beadColor=1

scale=12
xOffset=0
yOffset=0

width=29
height=29
// Cuadricula
grid=[...Array(height)].map(()=>[...Array(width)].map(()=>0))
showGrid=1
Sav=[]

function draw(){
	c.clearRect(0,0,a.width,a.height)
	c.beginPath()
	c.rect(0,0,a.width,a.height)
	c.fillStyle="rgb(48,40,40)"
	c.fill()

	switch (beadMode) {
		case 1:

			c.beginPath()
			c.rect(-scale*(width/2-xOffset)+a.width/2-scale/2,
						-scale*(height/2-yOffset)+a.height/2-scale/2,
						width*scale+2*scale/2,
						height*scale+2*scale/2)
			c.fillStyle="rgb(143,137,138)"
			c.fill()
			break;
		case 2:
			c.beginPath()
			c.rect(-scale*(width/2-xOffset)+a.width/2,
						-scale*(height/2-yOffset)+a.height/2,
						width*scale,
						height*scale)
			c.fillStyle="rgb(255,255,255)"
			c.fill()

		default:
			break;
	}

	for(let y in grid){
		for(let x in grid[y]){
		
		if(isBead(x,y)){
			drawBead(x,y,paleta[getBead(x,y)-1])
		}
		
		if(beadMode==1){
			c.beginPath()
			c.arc(x*scale-scale*(width/2-xOffset)+a.width/2+scale/2,
				y*scale-scale*(height/2-yOffset)+a.height/2+scale/2,
				scale*0.17,0,6.29,0);
				c.fillStyle="white"
				
			if(scale>40){
			//	c.shadowBlur = scale*0.1;
			//	c.shadowColor = "rgba(0,0,0,"+(scale-40)/50+")";
			}
			c.fill();
			if(scale>40){
			//	c.shadowBlur = 0;
			//	c.shadowColor = "black";
			}
			
		}

		}
	}


	if(beadMode==2){
		if(Math.log(scale)*0.3>0&&showGrid){
		c.beginPath();
		for(let i=0;i<=height;i++){
			c.moveTo(-scale*(width/2-xOffset)+a.width/2,
					 -scale*(height/2-yOffset)+a.height/2+i*scale,
					 );
			c.lineTo(width*scale-scale*(width/2-xOffset)+a.width/2,
			-scale*(height/2-yOffset)+a.height/2+i*scale,
			)
		}
		for(let j=0;j<=width;j++){	
			c.moveTo(-scale*(width/2-xOffset)+a.width/2+j*scale,
			-scale*(height/2-yOffset)+a.height/2,
			);
			
			c.lineTo(-scale*(width/2-xOffset)+a.width/2+j*scale,
			height*scale-scale*(height/2-yOffset)+a.height/2,
			   )
		}
		c.strokeStyle="black"
		c.lineWidth=Math.log(scale)*0.3
		c.stroke();
		}
	}
	if(isInside(...getPos(...mouse)) && (tool==1 || tool==2)){
		c.beginPath()
		if(beadMode==1){
			c.arc(getPos(...mouse)[0]*scale-scale*(width/2-xOffset)+a.width/2+scale/2,
			getPos(...mouse)[1]*scale-scale*(height/2-yOffset)+a.height/2+scale/2,
			scale*0.5,0,6.29,0);	
		}
		if(beadMode==2){
			c.rect(getPos(...mouse)[0]*scale-scale*(width/2-xOffset)+a.width/2,
			getPos(...mouse)[1]*scale-scale*(height/2-yOffset)+a.height/2,scale,scale)
		}
		c.fillStyle=paleta[beadColor-1]
		c.globalAlpha=.6
		c.fill();
		c.globalAlpha=1
	}

	pensPerRow=Math.floor((a.height-30)/24)
	c.beginPath()
	c.rect(0,0,35+Math.floor(paleta.length/pensPerRow)*24,a.height)
	c.fillStyle="rgb(30,30,30)"
	c.fill()
	for(let i=0;i<paleta.length;i++){
		c.beginPath()
		c.arc(15+Math.floor(i/pensPerRow)*24,
				15+i%Math.floor(pensPerRow)*24,
				20*0.35,0,6.29,0);	
		c.strokeStyle=paleta[i]
		c.lineWidth=6*(1+(i+1==beadColor)*0.4)

		//c.shadowBlur = scale*0.8;
		c.stroke();
		//c.shadowBlur = 0;
	}

}
	dragging=false
	drawing=false

	panZoom1=[0,0]
	panZoom2=[0,0]

	fillColor=0
	mouse=[0,0]
	onmousedown=(e)=>{
		save()
		mouse=[e.pageX,e.pageY]
		if(tool==0){
			panZoom1=[e.pageX-xOffset*scale,e.pageY-yOffset*scale]
			panZoom2=[e.pageX-xOffset*scale,e.pageY-yOffset*scale]
			dragging=true
		}
		if(tool==1){
			if(mouse[0]<35+Math.floor(paleta.length/pensPerRow)*24){
				beadColor=Math.floor(Math.floor((mouse[0])/24)*pensPerRow+Math.floor((mouse[1]))/24)+1
				if(beadColor>paleta.length||beadColor<0){beadColor=0}
			}else{
				drawing=true
				if(isInside(...getPos(e.pageX,e.pageY))&&grid[getPos(e.pageX,e.pageY)[1]][getPos(e.pageX,e.pageY)[0]]!=beadColor){
					grid[getPos(e.pageX,e.pageY)[1]][getPos(e.pageX,e.pageY)[0]]=beadColor
					//new Audio('./bead.mp3').play()
				}	
			}
		}
		if(tool==2){
			if(mouse[0]<35+Math.floor(paleta.length/pensPerRow)*24){
				beadColor=Math.floor(Math.floor((mouse[0])/24)*pensPerRow+Math.floor((mouse[1]))/24)+1
				if(beadColor>paleta.length||beadColor<0){beadColor=0}
			}else{
			if(isInside(...getPos(e.pageX,e.pageY))){
				fillColor=getBead(...getPos(e.pageX,e.pageY))
				//L=Export()
				//if(!fill(getPos(e.pageX,e.pageY)[0],getPos(e.pageX,e.pageY)[1])){
				//	Import(L)
				//	console.log("dentro")
				//}else{
				//	localStorage.setItem("draw",Export())
				//	console.log("fuera")
				//}
				fill(getPos(e.pageX,e.pageY)[0],getPos(e.pageX,e.pageY)[1])
				
			}
			}
		}
	}

	onmousemove=(e)=>{
		mouse=[e.pageX,e.pageY]
		if(tool==0){
			if(dragging){
				panZoom2=mouse
				xOffset=(panZoom2[0]-panZoom1[0])/scale
				yOffset=(panZoom2[1]-panZoom1[1])/scale
				
			}
		}
		if(tool==1){
			if(drawing==true){
				if(isInside(...getPos(e.pageX,e.pageY))&&grid[getPos(e.pageX,e.pageY)[1]][getPos(e.pageX,e.pageY)[0]]!=beadColor){
					grid[getPos(e.pageX,e.pageY)[1]][getPos(e.pageX,e.pageY)[0]]=beadColor
					//new Audio('./bead.mp3').play()
				}
			}
		}
	}
	onmouseup=()=>{
		if(tool==0){
			dragging=false
		}
		if(tool==1){
			drawing=false
			localStorage.setItem("draw",Export())
			
		}
		localStorage.setItem("settings",beadMode)
		localStorage.setItem("saves",Sav)
	}

	onkeypress=(e)=>{
		if(e.key=="w"){
			scale*=1.1
		}
		if(e.key=="s"){
			scale/=1.1
		}
		
	}
setInterval(()=>{
	//if(dragging){
		draw()
	//}

},1)

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("wheel", e => scale*=1-((e.deltaY)/Math.abs(e.deltaY))/10);

if(localStorage.getItem("draw")){
	Import(localStorage.getItem("draw"))
	beadMode=localStorage.getItem("settings")[0]*1||1
}
if(localStorage.getItem("saves")){
	Sav=localStorage.getItem("saves").split("|")
}
onresize=()=>{
	a.width=window.innerWidth
	a.height=window.innerHeight
}

document.addEventListener('keydown', function(event) {
	if (event.ctrlKey && event.key === 'z' && Sav.length>0) {
	  	Import(Sav.pop())
	}
	localStorage.setItem("draw",Export())
	localStorage.setItem("saves",Sav)
  });