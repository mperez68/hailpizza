var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/bgtile00.png");
ASSET_MANAGER.queueDownload("./assets/streetlight.png");
ASSET_MANAGER.queueDownload("./assets/streetlight02.png");
ASSET_MANAGER.queueDownload("./assets/fence.png");
ASSET_MANAGER.queueDownload("./assets/building.png");

ASSET_MANAGER.queueDownload("./assets/npcs.png");
ASSET_MANAGER.queueDownload("./assets/npccars.png");

ASSET_MANAGER.queueDownload("./assets/driver.png");
ASSET_MANAGER.queueDownload("./assets/drivercar.png");

ASSET_MANAGER.queueDownload("./assets/exhaustflame.png");
ASSET_MANAGER.queueDownload("./assets/health.PNG");

ASSET_MANAGER.queueDownload("./assets/exclamation.png");
ASSET_MANAGER.queueDownload("./assets/goal.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	// Background
	var bgTiles = [];
	for (var i = 0; i <= 2; i++) {
		for (var j = 0; j <= 2; j++) {
			bgTiles.push(new Background(gameEngine, i * PARAMS.TILE_WIDTH, j * PARAMS.TILE_WIDTH));		
		}
	}
	
	var buildings = [];
	buildings.push(new Building(gameEngine, 32, 32));
	buildings.push(new Building(gameEngine, 544, 32));
	buildings.push(new Building(gameEngine, 1056, 32));

	// NPCs
	var npccars = [];
	// List of possible starting points
	// (StraightHorizontalLeft1) --> y = 415, 925, 1695, 2205, 2975, 3485
	npccars.push(new Car(gameEngine, 200, 415, 1, 0, 1));
	npccars.push(new Car(gameEngine, 500, 925, 1, 0, 1));
	npccars.push(new Car(gameEngine, 1000, 1695, 1, 0, 1));
	npccars.push(new Car(gameEngine, 1500, 2205, 1, 0, 1));
	npccars.push(new Car(gameEngine, 2000, 2975, 1, 0, 1));
	npccars.push(new Car(gameEngine, 2500, 3485, 1, 0, 1));
	// (StraightHorizontalRight1) --> y = 350, 860, 1630, 2104, 2910, 3420
	npccars.push(new Car(gameEngine, 100, 350, 1, 180, 1));
	npccars.push(new Car(gameEngine, 500, 860, 1, 180, 1));
	npccars.push(new Car(gameEngine, 1000, 1630, 1, 180, 1));
	npccars.push(new Car(gameEngine, 1500, 2104, 1, 180, 1));
	npccars.push(new Car(gameEngine, 2000, 2910, 1, 180, 1));
	npccars.push(new Car(gameEngine, 2500, 3420, 1, 180, 1));
	// (StraightVerticalUp2) --> x = 415, 925, 1695, 2205, 2975, 3485
	npccars.push(new Car(gameEngine, 415, 0, 1, 180, 2));
	npccars.push(new Car(gameEngine, 925, 500, 1, 180, 2));
	npccars.push(new Car(gameEngine, 1695, 1000, 1, 180, 2));
	npccars.push(new Car(gameEngine, 2205, 1500, 1, 180, 2));
	npccars.push(new Car(gameEngine, 2975, 2000, 1, 180, 2));
	npccars.push(new Car(gameEngine, 3485, 2500, 1, 180, 2));
	// // (StraightVerticalDown2) --> x = 350, 860, 1630, 2104, 2910, 3420
	npccars.push(new Car(gameEngine, 350, 0, 1, 0, 2));
	npccars.push(new Car(gameEngine, 860, 500, 1, 0, 2));
	npccars.push(new Car(gameEngine, 1630, 1000, 1, 0, 2));
	npccars.push(new Car(gameEngine, 2104, 1500, 1, 0, 2));
	npccars.push(new Car(gameEngine, 2910, 2000, 1, 0, 2));
	npccars.push(new Car(gameEngine, 3420, 2500, 1, 0, 2));
	// // (HorizontalToVerticalforward3) --> y = 480, 990, 1760, 2270, 3040, 3550
	npccars.push(new Car(gameEngine, 0, 480, 1, 0, 3));
	npccars.push(new Car(gameEngine, 0, 990, 1, 0, 3));
	npccars.push(new Car(gameEngine, 0, 1760, 1, 0, 3));
	npccars.push(new Car(gameEngine, 0, 2270, 1, 0, 3));
	npccars.push(new Car(gameEngine, 0, 3040, 1, 0, 3));
	npccars.push(new Car(gameEngine, 0, 3550, 1, 0, 3));
	// // (HorizontalToVerticalbackward3) --> y = 285, 795, 1565, 2075, 2845, 3355
	npccars.push(new Car(gameEngine, 3840, 285, 1, 180, 3));
	npccars.push(new Car(gameEngine, 3840, 795, 1, 180, 3));
	npccars.push(new Car(gameEngine, 3840, 1565, 1, 180, 3));
	npccars.push(new Car(gameEngine, 3840, 2075, 1, 180, 3));
	npccars.push(new Car(gameEngine, 3840, 2845, 1, 180, 3));
	npccars.push(new Car(gameEngine, 3840, 3355, 1, 180, 3));
	// // (VerticalToHorizontalDown4) --> X = 480, 990, 1760, 2270, 3040, 3550
	npccars.push(new Car(gameEngine, 480, 0, 1, 180, 4));
	npccars.push(new Car(gameEngine, 990, 0, 1, 180, 4));
	npccars.push(new Car(gameEngine, 1760, 0, 1, 180, 4));
	npccars.push(new Car(gameEngine, 2270, 0, 1, 180, 4));
	npccars.push(new Car(gameEngine, 3040, 0, 1, 180, 4));
	npccars.push(new Car(gameEngine, 3550, 0, 1, 180, 4));
	// // (VerticalToHorizontalbackward4) --> X = 285, 795, 1565, 2075, 2845, 3355
	npccars.push(new Car(gameEngine, 285, 3840, 1, 0, 4));
	npccars.push(new Car(gameEngine, 795, 3840, 1, 0, 4));
	npccars.push(new Car(gameEngine, 1565, 3840, 1, 0, 4));
	npccars.push(new Car(gameEngine, 2075, 3840, 1, 0, 4));
	npccars.push(new Car(gameEngine, 2845, 3840, 1, 0, 4));
	npccars.push(new Car(gameEngine, 3355, 3840, 1, 0, 4));

	var npcs = [];
	npcs.push(new Pedestrian(gameEngine, 224, 576, 1, 0));
	npcs.push(new Pedestrian(gameEngine, 544, 696, 0, 180));
	npcs.push(new Pedestrian(gameEngine, 224, 224, 1, 0));
	
	// Goal Markers
	var goals = [];
	goals.push(new StartMission(gameEngine, 192, 192));
	goals.push(new GoalPost(gameEngine, 128, 192));
	
	// Player
	var driver = new Driver(gameEngine, 224, 544);
	var drivercar = new DriverCar(gameEngine, 32, 288);

	///// Draw all entities 
	gameEngine.init(ctx);
	for (var i = 0; i < bgTiles.length; i++) {
		gameEngine.addEntity(bgTiles[i]);
	}
	for (var i = 0; i < goals.length; i++) {
		gameEngine.addEntity(goals[i]);
	}
	
	// NPCs
	for (var i = 0; i < npccars.length; i++)
	{
		gameEngine.addEntity(npccars[i]);
	}
	for (var i = 0; i < npcs.length; i++)
	{
		gameEngine.addEntity(npcs[i]);
	}
	
	// Player
	gameEngine.addEntity(driver);
	gameEngine.addEntity(drivercar);
	
	// Obstacles
	for (var i = 0; i < buildings.length; i++) {
		gameEngine.addEntity(buildings[i]);
	}
	
	new SceneManager(gameEngine);
	new AudioManager(gameEngine);
	
	gameEngine.start();
});
