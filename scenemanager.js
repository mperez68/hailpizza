class SceneManager {
	constructor(game) {
		Object.assign(this, { game });
		
		this.game = game;
		this.game.camera = this;
		this.x = 0;
		this.y = 0;
		this.displayText = "";
		this.controlText = "W/Up: Forward. S/Down: Backward. A,D/Left,Right: Pivot. E: Enter Vehicle. Space: Jump.";
		this.tutorialFlag1 = true;
		this.tutorialFlag2 = true;
		this.shopArrowFlag = false;
		
		this.title = true;
		
		// HUD variables
		//this.life = 5;
		//this.totalLife = 5;
		//this.canTakeDamage = true;
		//this.spritesheet = ASSET_MANAGER.getAsset("./assets/health.PNG");
		//this.animations = [];
		
		// HUD animations
		//this.hud = new Animator(this.spritesheet, 37, 440,
			//this.WIDTH, this.WIDTH, 3, 0.3, 1, this.direction, false, true);
		//this.full = new Animator(this.spritesheet, 773, 113, 85, 480, 1, 0.3, 8, false, true); //full health
		//this.four = new Animator(this.spritesheet, 585, 113, 89, 480, 1, 0.3, 8, false, true); //four hp 
		//this.three = new Animator(this.spritesheet, 400, 113, 90, 480, 1, 0.3, 8, false, true); //three hp
		//this.two = new Animator(this.spritesheet, 217, 113, 86, 480, 1, 0.3, 8, false, true); // two hp
		//this.one = new Animator(this.spritesheet, 31, 113, 86, 480, 1, 0.3, 8, false, true); //one hp
		//this.loadAnimations();
		game.addEntity(this);
		//game.addEntity(new HealthBar(game, 10, 10));
		this.healthBar = new HealthBar(game, 10, 10);
		//game.addEntity(new Minimap(game, 860, 10, 150));
		// Effects
	}
	
	// loadAnimations() {
 //        this.animations[0] = [];
 //        this.animations[1] = [];
 //        this.animations[2] = [];
 //        this.animations[3] = [];
 //        this.animations[4] = [];

 //        // Animator(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop);

 //        // full health
 //        this.animations[0].push(new Animator(this.spritesheet, 773, 113, 85, 480, 1, 0.3, 8, false, true));

 //        // four hp
 //        this.animations[1].push(new Animator(this.spritesheet, 585, 113, 89, 480, 1, 0.3, 8, false, true));

 //        // three hp
 //        this.animations[2].push(new Animator(this.spritesheet, 400, 113, 90, 480, 1, 0.3, 8, false, true));

 //        // two hp
 //        this.animations[3].push(new Animator(this.spritesheet, 217, 113, 86, 480, 1, 0.3, 8, false, true));

 //        // one hp
 //        this.animations[4].push(new Animator(this.spritesheet, 31, 113, 86, 480, 1, 0.3, 8, false, true));

 //    }

	update() {
		let xMidpoint = PARAMS.PAGE_WIDTH / 2;
		let yMidpoint = PARAMS.PAGE_HEIGHT / 2;
		
		this.x = Math.min(Math.max(this.game.player.x - xMidpoint, 0), PARAMS.MAP_WIDTH - PARAMS.PAGE_WIDTH);
		this.y = Math.min(Math.max(this.game.player.y - yMidpoint, 0), PARAMS.MAP_HEIGHT - PARAMS.PAGE_HEIGHT);
		
		// User clicks on "Start your shift" then title screen disappears..
		if (this.title && this.game.keyE) {
                this.title = false;
				this.displayText = "YOU'RE LATE. AGAIN. GET IN THE CAR.";
            }
	}
	
	draw(ctx) {
		//ctx.drawImage(this.spritesheet, 38, 442, 332, 28, this.x - this.game.camera.x + 10, this.y - this.game.camera.y + 10, 200, 20);
		//this.full.drawFrame(this.game.clockTick,ctx, 7, 8, 0.3);
		//this.four.drawFrame(this.game.clockTick,ctx, 7, 8, 0.3);
		//this.three.drawFrame(this.game.clockTick,ctx, 7, 8, 0.3);
		//this.two.drawFrame(this.game.clockTick,ctx, 7, 8, 0.3);
		//this.one.drawFrame(this.game.clockTick,ctx, 7, 8, 0.3)
		
		// Displays whatever text is given.
		ctx.font = "30px Fantasy";
		ctx.textAlign = "center";
		ctx.strokeStyle = 'White';
		ctx.strokeText(this.displayText, PARAMS.PAGE_WIDTH / 2, PARAMS.PAGE_HEIGHT - 50);
		ctx.strokeStyle = 'Black';
		ctx.fillText(this.displayText, PARAMS.PAGE_WIDTH / 2, PARAMS.PAGE_HEIGHT - 50);

		// ctx.font = "50px Fantasy";
		// ctx.textAlign = "center";
		// ctx.strokeStyle = 'White';
		// ctx.strokeText("SCORE: ", (PARAMS.PAGE_WIDTH / 2) + 350, PARAMS.PAGE_HEIGHT - 700);
		//ctx.strokeStyle = 'White';
		//ctx.fillText(this.displayText, PARAMS.PAGE_WIDTH / 2, PARAMS.PAGE_HEIGHT - 50);
		
		// Title Screen
		if (this.title) {
			let xMidpoint = PARAMS.PAGE_WIDTH / 2;
			let yMidpoint = PARAMS.PAGE_HEIGHT / 2;
			ctx.drawImage(ASSET_MANAGER.getAsset("./assets/hailpizza.png"), xMidpoint - 250, yMidpoint - 250);
			//ctx.fillStyle = this.game.mouse && this.game.mouse.y > 0 && this.game.mouse.y < 768 ? "Grey" : "White";
			ctx.textAlign = "center";
			ctx.strokeStyle = 'White';
            ctx.strokeText("PRESS THE E KEY TO START YOUR SHIFT", xMidpoint, PARAMS.PAGE_HEIGHT - 100);
			ctx.strokeStyle = 'Black';
            ctx.fillText("PRESS THE E KEY TO START YOUR SHIFT", xMidpoint, PARAMS.PAGE_HEIGHT - 100);
		}
		// controls only appears for prompt of game.
		 else if (this.tutorialFlag1) {
			ctx.font = "20px Fantasy";
			ctx.textAlign = "center";
			ctx.strokeStyle = 'White';
			ctx.strokeText(this.controlText, PARAMS.PAGE_WIDTH / 2, 100);
			ctx.strokeStyle = 'Black';
			ctx.fillText(this.controlText, PARAMS.PAGE_WIDTH / 2, 100);
		}

		 ctx.font = "50px Fantasy";
		 ctx.textAlign = "center";
		 ctx.strokeStyle = 'White';
		 ctx.strokeText("$"+this.game.driver.theScore + ".00", (PARAMS.PAGE_WIDTH / 2) + 350, PARAMS.PAGE_HEIGHT - 700);
		 ctx.strokeStyle = 'Black';
		 ctx.fillText("$"+this.game.driver.theScore + ".00", (PARAMS.PAGE_WIDTH / 2) + 350, PARAMS.PAGE_HEIGHT - 700);
		 
		 this.healthBar.draw(ctx);
		
        if (PARAMS.DEBUG){
			let coordText = "(" + Math.floor(this.game.player.x) + ","
				+ Math.floor(this.game.player.y) + "); Facing " + this.game.player.direction;
			
			let coordText2 = "L:(" +  Math.floor(this.game.player.BB.left.x) + "," +  Math.floor(this.game.player.BB.left.y) + ")"
							+ "T:(" +  Math.floor(this.game.player.BB.top.x) + "," +  Math.floor(this.game.player.BB.top.y) + ")"
							+ "R:(" +  Math.floor(this.game.player.BB.right.x) + "," +  Math.floor(this.game.player.BB.right.y) + ")"
							+ "B:(" +  Math.floor(this.game.player.BB.bottom.x) + "," +  Math.floor(this.game.player.BB.bottom.y) + ")";
			
			ctx.strokeStyle = 'White';
			ctx.font = "30px serif";
			ctx.textAlign  = "left";
			ctx.strokeText(coordText, 50, 50);
			ctx.textAlign  = "right";
			ctx.strokeText(coordText2, PARAMS.PAGE_WIDTH - 50, 150);
			ctx.strokeStyle = 'Black';
			ctx.textAlign  = "left";
			ctx.fillText(coordText, 50, 50);
			ctx.textAlign  = "right";
			ctx.fillText(coordText2, PARAMS.PAGE_WIDTH - 50, 150); // HUD text for checking bounding edges on driver car
		}
	}
};
