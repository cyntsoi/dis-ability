var puzzle1 = new puzzleClass()
var puzzle2 = new puzzleClass()
var puzzle3 = new puzzleClass()
var puzzle4 = new puzzleClass()
var puzzle5 = new puzzleClass()
var puzzle6 = new puzzleClass()
var puzzle7 = new puzzleClass()
var puzzles = []


function puzzleClass() {
	
	this.background;
		
	this.oldPic;
	this.newPic;
	this.hashtags;
	this.hastags2;
	this.minusFactor;
	this.color;
	this.message;
	this.answer;
	this.intro;
	
	this.setup = function(oldPic,newPic,hashtags,hashtags2,scale,color,message,question,intro){
		this.oldPic = oldPic;
		this.newPic = newPic;
		this.hashtags = hashtags;
		this.hashtags2 = hashtags2;
		puzzles.push(this);
		this.minusFactor = 1/hashtags.length
		this.scale = scale
		this.color = color
		this.message = message
		this.question = question
		this.intro = intro
		}
	
	this.drawHashtags = function(){
		if(!gameStarted){return}
		questionContainer.getChildAt(2).getChildAt(1).text = puzzles[puzzleId].hashtags.length
		var counterTween = createjs.Tween.get(questionContainer.getChildAt(2)).wait(1250).to({scaleX:0.8,scaleY:0.8},350)
		var qTween = createjs.Tween.get(questionContainer.getChildAt(1)).to({text:this.question},350)
		var cTween = createjs.Tween.get(questionContainer).to({scaleY:0},350).wait(100).to({scaleY:1},350)
		
		var hashtagContainer = new createjs.Container();
		
		stage.addChild(hashtagContainer);
		
		//var mask = new createjs.Shape();
		//mask.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(pMarginX,pMarginY,pW,pH,30);
		//mask.cache(0,0,canvasW,canvasH);
		
		//hashtagContainer.filters = [new createjs.AlphaMaskFilter(mask.cacheCanvas)] 
		
		currentHashtags = hashtagContainer;
		
		for(var i=0;i<(this.hashtags.length+this.hashtags2.length);i++){
			var hashtag = new createjs.Container();
			hashtagContainer.addChild(hashtag);
			
			if (i<this.hashtags.length){
				var hashtag2 = this.hashtags[i]
				hashtag.answer = true
				} else {
					var hashtag2 = this.hashtags2[i-this.hashtags.length]
					hashtag.answer = false
					} 
			
			var text = new createjs.Text("#" + hashtag2, "bold "+ Math.floor(pH*0.05)+ "px McLaren", "#FFF");
			
			text.x = text.y = 2.5;

			hashtag.addChild(text);
			
			hashtag.minX = hashtag.getBounds().width / 2 + pMarginX
			hashtag.minY = hashtag.getBounds().height / 2 + pMarginY
			hashtag.maxX = hashtag.minX + pW - hashtag.getBounds().width ||  hashtag.minX
			hashtag.maxY = hashtag.minY + pH - hashtag.getBounds().height || hashtag.minY
			
			hashtag.x = hashtag.minX + (pW-hashtag.getBounds().width) * Math.random() || hashtag.minX
			//pMarginX + pW *0.05 + pW * 0.9 * Math.random() | 0;
			hashtag.y = hashtag.minY + (pH-hashtag.getBounds().height) * Math.random() || hashtag.minY
			//pMarginY + pH * 0.05 + pH * 0.9 * Math.random() | 0;
			//hashtag.rotation = 90 * Math.random() | 0;
			hashtag.regX = hashtag.getBounds().width / 2 | 0;
			hashtag.regY = hashtag.getBounds().height / 2 | 0;
			hashtag.scaleX = hashtag.scaleY = hashtag.scale = Math.random() * 0.4 + 0.6;
			hashtag.name = "ht" + i;
			hashtag.cursor = "pointer";
			hashtag.velX = Math.random() * 6 - 3;
			hashtag.velY = Math.random() * 6 - 3;
			hashtag.alpha = Math.random() * 0.3 + 0.3;
			
			var rect = new createjs.Graphics();
			rect.beginFill(this.color).drawRoundRect(0,0,(hashtag.getBounds().width)+hashtag.getBounds().height*1.05,(hashtag.getBounds().height)*1.05+5,((hashtag.getBounds().height)*1.05+5)/2)
			var s = new createjs.Shape(rect);
			hashtag.removeChild(text);
			hashtag.addChild(s,text);
			
			//var blurFilter = new createjs.BlurFilter(10, 10, 5);
			//text.filters = [blurFilter];
			//var bounds = blurFilter.getBounds();
			
			//text.cache(-1.25+bounds.x, -1.25+bounds.y, hashtag.getBounds().width+bounds.width, hashtag.getBounds().height+bounds.height);
			
			// using "on" binds the listener to the scope of the currentTarget by default
			// in this case that means it executes in the scope of the button.
			hashtag.on("mousedown", function (evt) {
				dragStarted = true;
				//this.parent.addChild(this);
				var newChild = this;
				newChild.scale = this.scale
				newChild.scaleX = newChild.scaleY = this.scale * 1.2
				newChild.alpha = 1;
				stage.addChild(newChild);
				console.log(this.parent,this)
				this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
			});



			// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
			hashtag.on("pressmove", function (evt) {
				this.x = evt.stageX + this.offset.x;
				this.y = evt.stageY + this.offset.y;
				var pt = trashIcon.parent.getChildAt(1).globalToLocal(evt.stageX,evt.stageY)
				if(trashIcon.parent.getChildAt(1).shadow == null && trashIcon.parent.getChildAt(1).hitTest(pt.x,pt.y)){
					var tween = createjs.Tween.get(evt.target.parent.getChildAt(0)).to({alpha:0},150)
					trashIcon.parent.getChildAt(1).shadow = new createjs.Shadow("rgba(0,0,0,0)", 0, 0, 10)
					//trashCommand.style = "rgba(69,113,182,0.8)"
					
					} else if (!(trashIcon.parent.getChildAt(1).shadow == null) && !trashIcon.parent.getChildAt(1).hitTest(pt.x,pt.y)) {
						var tween = createjs.Tween.get(evt.target.parent.getChildAt(0)).to({alpha:1},150)
						trashIcon.parent.getChildAt(1).shadow = null;
						//trashCommand.style = "#7caee2"
						}
				
				
				// indicate that the stage should be updated on the next tick:
				update = true;
			});

			hashtag.on("rollover", function (evt) {
				mouseTarget = evt.target;
				var tween = createjs.Tween.get(mouseTarget).to({scaleX:this.scale*1.2,scaleY:this.scale*1.2,alpha:1}, 250)
				var tween2 = createjs.Tween.get(trashIcon.getChildAt(0)).to({rotation:50},250)
				//this.scaleX = this.scaleY = this.scale * 1.2;
				update = true;
			});

			hashtag.on("rollout", function (evt) {
				if(!dragStarted && mouseTarget != null){
				var tween = createjs.Tween.get(mouseTarget).to({scaleX:this.scale,scaleY:this.scale,alpha:Math.random() * 0.1 + 0.5}, 250)
				var tween2 = createjs.Tween.get(trashIcon.getChildAt(0)).to({rotation:0},250)
				update = true;
				mouseTarget = null;}
			});
			
			hashtag.on("pressup", function (evt) {
				if(dragStarted){
					var tween = createjs.Tween.get(this).to({scaleX:this.scale,scaleY:this.scale,alpha:Math.random() * 0.1 + 0.5}, 250)
					var tween2 = createjs.Tween.get(trashIcon.getChildAt(0)).to({rotation:0},250)
					update = true;
					mouseTarget = null;}
					
				if (this.x>this.maxX || this.x < this.minX || this.y>this.maxY || this.y <this.minY){
					this.x = (this.minX + this.maxX)/2
					this.y = (this.minY + this.maxY)/2
					}
				
				dragStarted = false;
				stage.removeChild(this)
				currentHashtags.addChild(this);
				var pt = trashIcon.parent.getChildAt(1).globalToLocal(evt.stageX,evt.stageY)
				if(trashIcon.parent.getChildAt(1).hitTest(pt.x,pt.y)){
					//trashCommand.style = "#7caee2"
					trashIcon.parent.getChildAt(1).shadow = null;
					currentHashtags.removeChild(this)
					
					var tween = createjs.Tween.get(tcContainer.getChildAt(0)).to({alpha:0},0).wait(1200).to({alpha:1},0)
					
					if(this.answer){
					greenH ++ 
					var tween = createjs.Tween.get(tcContainer.getChildAt(1)).to({alpha:1},0).wait(1200).to({alpha:0},0)
					var tween2 = createjs.Tween.get(trashShadowCommand).to({style:"#0c886e"},0).wait(1200).to({style:"#0c3c88"},0)	
					currentPuzzle.getChildAt(2).alpha -= puzzles[puzzleId].minusFactor
					
					if(greenH == puzzles[puzzleId].hashtags.length){
						var counterTween2 = createjs.Tween.get(questionContainer.getChildAt(2)).to({scaleX:0,scaleY:0},350)
						gameWon ++ 
						var tween3 = createjs.Tween.get(currentHashtags).to({alpha:0},450)
						puzzleComplete()
						return
						//changepuzzle();
						}
						
					questionContainer.getChildAt(2).getChildAt(1).text = puzzles[puzzleId].hashtags.length-greenH
					var counterTween = createjs.Tween.get(questionContainer.getChildAt(2)).to({scaleX:1,scaleY:1},350).to({scaleX:0.8,scaleY:0.8},350)
					
					//msIncrease(1)
					
					}
					else{
						redH ++
						var heart = heartContainer.getChildAt(lives)
						heart.getChildAt(0).alpha = 1
						heart.getChildAt(1).alpha = 0
						lives -- 
						
						if (lives == 0 ){
							drawWinLose(false);
							}
						
						var tween = createjs.Tween.get(tcContainer.getChildAt(2)).to({alpha:1},0).wait(1200).to({alpha:0},0)
						var tween2 = createjs.Tween.get(trashShadowCommand).to({style:"#880c26"},0).wait(1200).to({style:"#0c3c88"},0)
						//msIncrease(-1)
						}
					//pt = hashtagContainer.globalToLocal(evt.stageX,evt.stageY)
					drawHashtag(pt.x,pt.y)
					
					
					}
				
			});
			
			}
		//hashtagContainer.cache(0,0,canvasW,canvasH)
		stage.update();
		}
	
	this.draw = function(){
		//barContainer.alpha=0.3
		var puzzleContainer = new createjs.Container(); //create container
		
		stage.addChildAt(puzzleContainer,stage.getChildIndex(barContainer)-1);
		currentPuzzle = puzzleContainer;
		puzzleContainer.alpha = 0
		
		var backdrop = new createjs.Graphics();
		
		backdrop.setStrokeStyle(22);
		backdrop.beginStroke("rgba(69,113,182,1)").drawRoundRect(0,0,pW,pH,10);
		backdrop.setStrokeStyle(12);
		backdrop.beginStroke("#7caee2").drawRoundRect(0,0,pW,pH,10);
		backdrop.setStrokeStyle(2);
		backdrop.beginStroke("white").drawRoundRect(0,0,pW,pH,10);
		backdrop.beginFill("#7caee2").drawRoundRect(0,0,pW,pH,10);
		
		backdrop.endStroke();
		//backdrop.endFill();

		backdrop.beginLinearGradientFill(["rgba(69,113,182,0.8)","rgba(69,113,182,0)"], [0, 0.3], 0, 0, 0, pH).drawRoundRectComplex(15, 15, pW-30, pH-30,10,10,0,0)
		var b2 = new createjs.Shape(backdrop);
		
		var newPic = new createjs.Bitmap(this.newPic)
		newPic.alpha = 0;
		
		var nW = this.newPic.width;
		var nH = this.newPic.height;
		var oldPic = new createjs.Bitmap(this.oldPic)
		puzzleContainer.addChild(b2,newPic,oldPic)
		
		var scale = 1;
		
		if(nW > pW*0.8){
			scale = pW*0.8/nW	
			}
				
		if(nH * scale > pH*0.85){
			scale = pH*0.85/nH
			}	
		
		newPic.scaleX = newPic.scaleY = oldPic.scaleX = oldPic.scaleY = newPic.scale = oldPic.scale = scale
		newPic.x = oldPic.x = (pW - nW * scale)/2
		newPic.y = oldPic.y = (pH - nH * scale)/2
		
		newPic.regX = newPic.getBounds().width/2 
		newPic.regY = newPic.getBounds().height/2
		console.log(newPic.x,newPic.y,newPic.regX,newPic.regY)
		newPic.x = newPic.x + nW * scale/2 
		newPic.y = newPic.y + nH * scale/2
		
		oldPic.regX = oldPic.getBounds().width/2 
		oldPic.regY = oldPic.getBounds().height/2
		oldPic.x = oldPic.x + nW * scale/2 
		oldPic.y = oldPic.y + nH * scale/2
		
		oldPic.shadow = new createjs.Shadow("rgba(0,0,0,0.3)", 0, 0, 10)
		newPic.shadow = new createjs.Shadow("rgba(0,0,0,0.3)", 0, 0, 10)
		
		//puzzleContainer.scaleX = puzzleContainer.scaleY = puzzleContainer.scale = this.scale;
		puzzleContainer.x = pMarginX - canvasW/4;
		puzzleContainer.y = pMarginY ;
		
		drawGameNum()
		
		var tween = createjs.Tween.get(currentPuzzle)
		.to({x:pMarginX,alpha:1},450)
		.call(function(){
				if (!gameStarted){
					drawIntro()
					return
					}
				
				var tween3 = createjs.Tween.get(barContainer)
							.to({alpha:1},350)								
							.call(startGame2)
						
						})
		
		
		
		//this.drawHashtags();
		}
	
	}

function puzzleSetup() {
	puzzle1.setup(p1old,p1new,["Passionate","Professional","Hardworking"],["Hero","TriumphAgainstAdverse","Miracle"],0.6,"#1f2122","Athletes in the Paralympics are like those in the Olympics. They just happen to be disabled.","Paralympics Athletes in real life are...","Athletes in Paralympics featured on the newspapers mostly fall into the 'Supercrip' category, which are uplifting stories of people overcoming their disabilities. ");
	puzzle2.setup(p2old,p2new,["LivingLikeAnyOtherPerson","MakingThingsWork","SlowlyGettingBetter"],["LifeRuined","Doomed","Depressed","Suicidal"],0.9,"brown","Not all people with disablilities need a social worker.","Disabled people under recovery in real life are...",null);
	puzzle3.setup(p3old,p3new,["Beautiful","Strong","Confident","Angels"],["Embarrassing","NotSexy","LowSelfEsteem","Fragile"],0.9,"purple"," These models can sell too.","Disabled women can also be...",null);
	puzzle4.setup(p6old,p6new,["HaveHighIntelligence","LearnReadingOverTime","Recover"],["StayIllForever","HaveLowIQ","HavePermanentDisability"],0.9,"palevioletred","Dyslexics just need extra time to learn.","People with Dyslexia in real life can ...","People identified with Dyslexia at least have an average IQ.");
	puzzle5.setup(p5old,p5new,["SportsLovers","Strong","Persistent","Determined"],["Superhumans","Heros","Superstars"],0.9,"black","Athletes join Paralympics simply because of their love for sports.","Paralympics Athletes in real life are...",null);
	puzzle6.setup(p4old,p4new,["Vigilant","Aware","Alert","Cautious"],["Warriors","Invincible","Powerful"],0.9,"grey","True blind people have to take every step with caution.","Blind people in real life are...",null);
	puzzle7.setup(p7old,p7new,["Unrecognisible","JustLikeYouAndMe","AbleToLiveLong","JustAsIntelligent"],["Noticeable","Isolated","Afraid","SickBecauseOfFlashlights","Mental"],0.9,"grey","You can't really tell who is epileptic judging by the looks.","People who are epileptic are...",null);
	
	//puzzle1.setup(p1old,p1new,["Strong","Superwoman","Supercrip","Success","EveryoneCanDoIt","WhatIsYourExcuse","OneLeggedHero","TriumphAgainstAdverse","NeverStopBelieving","Miracle"],["hi"],0.6,"#1f2122","Athletes in the Paralympics are like those in the Olympics. They just happen to be disabled.",["Which of the following stereotypes does this poster reflects on disabled people?",["Victim","Supercrip","Villain"],1],"Athletes in Paralympics featured on the newspapers mostly fall into the 'Supercrip' category, which are uplifting stories of people overcoming their disabilities. ");
	//puzzle2.setup(p2old,p2new,["LifeRuined","Hopeless","Doomed","SadLife","Darkness","NoLifeWithoutSocialWorker","Victim","EndlessTorture","Helpless"],[],0.9,"brown","Not all people with disablilities need a social worker, but having a good one around sure can make you braver.",false,null);
	//puzzle3.setup(p3old,p3new,["Imperfect","Sickly","Unattractive","Embarrassing","NotSexy","Single","Cripple","LowSelfEsteem","Fragile"],[],0.9,"purple"," These models sell too.",false,null);
	//puzzle4.setup(p6old,p6new,["CantSpellAtAll","ReadingIsAlwaysHard","LowIQ","PermanentDisability","SeeingLettersBackwards"],[],0.9,"palevioletred","Dyslexics just need extra time to spell.",["Which of the following is not true about people with Dyslexia?",["Low IQ","Inherited","Both"],0],"People identified with Dyslexia at least have an average IQ.");
	//puzzle5.setup(p5old,p5new,["Strong","Supercrip","Success","Strength","WhatIsYourExcuse","TrainDayAndNight","TriumphAgainstAdverse","Unbeatable","ProveTheImpossible"],[],0.9,"black","Athletes join Paralympics simply because of their love for sports.",false,null);
	//puzzle6.setup(p4old,p4new,["Superhero*2","Invincible","BlindFighter","InnerStrengthIsEverything","Handsome","Powerful","Supercrip","DetectEnemiesIn10KM","Effortless"],[],0.9,"grey","Most people don't fight their disability but rather learn to live with it.",false,null);
	//puzzle1.setup(p1old,p1new,["Strong"],0.6,"teal");
	//puzzle2.setup(p2old,p2new,["LifeRuined"],0.9,"brown");
	}
	
function puzzleStart(){
	
	var oldPic = currentPuzzle.getChildAt(2);
	var scale = 1;
	if(oldPic.getBounds().width>pW*0.7){
		scale = pW*0.7/oldPic.getBounds().width
		}
	
	var tween = createjs.Tween.get(oldPic) 
		.wait(1650)	
		.to({scaleX:oldPic.scaleX * scale,scaleY:oldPic.scaleY * scale},350)
		.to({x:oldPic.x-pW*0.25},500)
	
	var question = new createjs.Text("Bonus Question: " + puzzles[puzzleId].question[0], "24px Bree Serif", "black")
	question.textAlign = "center"
	question.x = pW*0.75
	question.y = pH*0.25
	question.lineWidth = pW*0.4
	question.alpha = 1
	currentPuzzle.addChild(question)
	
	var bonus1 = new createjs.Text("Bonus Time!", "55px Leckerli One","white")
	bonus1.textAlign = "center"
	bonus1.outline = 5
	
	var bonus2 = bonus1.clone();
	bonus2.outline = false
	bonus2.color = "orange"
	
	var bonus = new createjs.Container()
	bonus.addChild(bonus1,bonus2)
	
	bonus.x = pW*0.5
	bonus.y = pH*0.5 - bonus.getBounds().height*0.5
	bonus.regY = 15
	bonus.alpha = 0
	currentPuzzle.addChild(bonus)
	
	var tween3 = createjs.Tween.get(bonus)
				.to({scaleX:2,scaleY:2,alpha:1},350)
				.wait(1000)
				.to({scaleX:0.75,scaleY:0.75,alpha:0},350)
				.call(function(){
					currentPuzzle.removeChild(currentPuzzle.getChildAt(currentPuzzle.numChild-1))
					})
	
	var a1 = new createjs.Text(puzzles[puzzleId].question[1][0],"bold 24px Bree Serif", "rgba(0,0,0,0.5)")
	var a2 = new createjs.Text(puzzles[puzzleId].question[1][1],"bold 24px Bree Serif", "rgba(0,0,0,0.5)")
	var a3 = new createjs.Text(puzzles[puzzleId].question[1][2], "bold 24px Bree Serif", "rgba(0,0,0,0.5)")
	a1.textAlign = a2.textAlign = a3.textAlign = "center"
	a1.x = pW*0.6
	a2.x = pW*0.75
	a3.x = pW*0.9
	a1.y = a2.y = a3.y = question.y + question.getBounds().height + 100
	var a = [a1,a2,a3]
	for (var i=0;i<3;i++){
		
		a[i].num = i
		a[i].cursor = "pointer"
		
		a[i].on("mouseover",function(){
		console.log(this.color)
		this.color = "white"
		stage.update()
		})
		
	a[i].on("mouseout",function(){
		
		this.color = "rgba(0,0,0,0.5)"
		stage.update()
		})
	
	a[i].on("click",function(){
		
		answer = this.num
		checkAnswer(this.parent);
		
		})
		
		}
	currentPuzzle.removeChild(question)
	
	var questionContainer = new createjs.Container()
	questionContainer.alpha = 0;
	currentPuzzle.addChild(questionContainer)
	questionContainer.addChild(question,a1,a2,a3)

	
	var tween2 = createjs.Tween.get(questionContainer)
				.wait(2200)
				.to({alpha:1},400)
	
	}

function checkAnswer(container){
	currentPuzzle.removeChild(container)
	var correct = puzzles[puzzleId].question[2]
	var answerContainer =  new createjs.Container()
	currentPuzzle.addChild(answerContainer)
	if (answer == correct){
		var text1 = new createjs.Text("You've just earned 3 MS points! The answer is indeed " + puzzles[puzzleId].question[1][correct],"bold 24px Bree Serif", "green")
		//msIncrease(3)
		} else{
			var text1 = new createjs.Text("You almost got it. The answer is " + puzzles[puzzleId].question[1][correct],"bold 24px Bree Serif", "orangered")
			}
	text1.textAlign = "center"
	text1.x = pW*0.75
	text1.y = pH*0.25
	text1.lineWidth = pW*0.4
	currentPuzzle.addChild(text1)
	
	var text2 = new createjs.Text(puzzles[puzzleId].intro,"24px Bree Serif", "rgba(0,0,0,1)")
	
	text2.textAlign= "center"
	text2.x = pW*0.75
	text2.lineWidth = pW*0.4
	text2.y = text1.y + text1.getBounds().height + pH*0.1
	currentPuzzle.removeChild(text1)
	answerContainer.addChild(text1,text2)
	
	
	var button = new createjs.Container()
	answerContainer.addChild(button)
	button.on("mouseover",function(){
		
		button.scaleX = button.scaleY = 1.2
		
		})
		
	button.on("mouseout",function(){
		
		button.scaleX = button.scaleY = 1
		
		})
	
	button.on("click",startGame)
	
	button.cursor = "pointer"
	
	var startText = new createjs.Text("Continue","30px Bree Serif", "white")
	startText.x = 10
	startText.y = 5
	button.addChild(startText)
	
	var rect = new createjs.Graphics();
	rect.beginFill("black").drawRoundRect(0,0,button.getBounds().width+20,button.getBounds().height+10,15)
	var s = new createjs.Shape(rect); 
	button.removeChild(startText);
	button.addChild(s,startText);
	
	button.regX = button.getBounds().width/2
	button.regY = button.getBounds().height/2
	button.x = pW*0.75
	button.y = text2.y+text2.getBounds().height+pH*0.1+button.getBounds().height/2
	
	}

function startGame(){
	var container = currentPuzzle.getChildAt(currentPuzzle.numChildren-1)
	var tween1 = createjs.Tween.get(container)
		.to({alpha:0},350)
		.call(function(){currentPuzzle.removeChild(container)})
	
	var oldPic = currentPuzzle.getChildAt(2)
	var tween2 = createjs.Tween.get(oldPic)
		.wait(350)
		.to({scaleX:oldPic.scale,scaleY:oldPic.scale,x:oldPic.x+pW*0.25},350)
		
	var tween3 = createjs.Tween.get(barContainer)
				.wait(700)
				.to({alpha:1},350)
				.call(startGame2)
	}
	
function startGame2(){
	puzzleOn=true
	currentPuzzle.getChildAt(1).alpha = 1
	puzzles[puzzleId].drawHashtags()
	}

function test(){
	console.log('hi')
	}

function puzzleComplete(){
	greenH = 0
	redH = 0
	var newPic = currentPuzzle.getChildAt(1);
	var scale = 1;
	if(newPic.getBounds().width>pW*0.7){
		scale = pW*0.7/newPic.getBounds().width
		}
		console.log(scale);
	var tween = createjs.Tween.get(newPic) 
		.to({scaleX:newPic.scaleX * 1.1,scaleY:newPic.scaleY*1.1}, 350)
		.wait(50)	
		.to({scaleX:newPic.scaleX * scale,scaleY:newPic.scaleY * scale},350)
		.to({x:newPic.x-pW*0.25},500)
		.call(createCompleteText)
	}

function createCompleteText(){
	var text = new createjs.Text(puzzles[puzzleId].message, "24px Bree Serif", "black")
	text.textAlign = "center"
	text.x = pW*0.75
	text.y = pH*0.25
	text.lineWidth = pW*0.4
	text.alpha = 0
	currentPuzzle.addChild(text)
	var tween2 = createjs.Tween.get(text).to({alpha:1},350)
	
	var button = new createjs.Container()
	currentPuzzle.addChild(button)
	button.on("mouseover",function(){
		
		button.scaleX = button.scaleY = 1.2
		
		})
		
	button.on("mouseout",function(){
		
		button.scaleX = button.scaleY = 1
		
		})
	
	button.on("click",changepuzzle)
	
	button.cursor = "pointer"
	
	var nextText = new createjs.Text("Next","30px Bree Serif", "white")
	nextText.x = 10
	nextText.y = 5
	button.addChild(nextText)
	var rect = new createjs.Graphics();
	rect.beginFill("black").drawRoundRect(0,0,button.getBounds().width+20,button.getBounds().height+10,15)
	var s = new createjs.Shape(rect); 
	button.removeChild(nextText);
	button.addChild(s,nextText);
	button.regX = button.getBounds().width/2
	button.regY = button.getBounds().height/2
	button.x = pW*0.75
	button.y = text.y+text.getBounds().height+100+button.getBounds().height/2
	}

function changepuzzle(){
	if (gameWon == puzzles.length){
		drawWinLose(true)
		return;
		}
	var tween = createjs.Tween.get(barContainer)
				.to({alpha:0.3},350)
	
	puzzleId ++
	
	if(puzzleId == puzzles.length){
		puzzleId = 0;
		}
		
	stage.removeChild(currentPuzzle);
	
	puzzles[puzzleId].draw();
	
	}
