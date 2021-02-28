class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
    };

    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    // downloadAll(callback) {
    //     if (this.downloadQueue.length === 0) setTimeout(callback, 10);
    //     for (var i = 0; i < this.downloadQueue.length; i++) {
    //         var img = new Image();
    //         var that = this;

    //         var path = this.downloadQueue[i];
    //         console.log(path);

    //         img.addEventListener("load", function () {
    //             console.log("Loaded " + this.src);
    //             that.successCount++;
    //             if (that.isDone()) callback();
    //         });

    //         img.addEventListener("error", function () {
    //             console.log("Error loading " + this.src);
    //             that.errorCount++;
    //             if (that.isDone()) callback();
    //         });

    //         img.src = path;
    //         this.cache[path] = img;
    //     }
    // };

    downloadAll(callback) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
        for (var i = 0; i < this.downloadQueue.length; i++) {
            var img = new Image();
            var aud = new Audio();
            var that = this;

            var path = this.downloadQueue[i];
            console.log(path);
            var ext = path.substring(path.length - 3);

            if (ext === 'png' || ext === 'PNG') {
                img.addEventListener("load", function () {
                    console.log("Loaded " + this.src);
                    that.successCount++;
                    if (that.isDone()) callback();
                });

                img.addEventListener("error", function () {
                    console.log("Error loading " + this.src);
                    that.errorCount++;
                    if (that.isDone()) callback();
                });

                img.src = path;
                this.cache[path] = img;
            }

            if (ext === 'mp3') {
                aud.addEventListener("loadeddata", function () {
                    console.log("Loaded " + this.src);
                    that.successCount++;
                    if (that.isDone()) callback();
                });

                aud.addEventListener("error", function () {
                    console.log("Error loading " + this.src);
                    that.errorCount++;
                    if (that.isDone()) callback();
                });

                aud.addEventListener("ended", function () {
                    aud.pause();
                    aud.currentTime = 0;
                });

                aud.src = path;
                aud.load()

                this.cache[path] = aud;
            }
        }
    };

    getAsset(path) {
        return this.cache[path];
    };

    playAsset(path) {
        let audio = this.cache[path];
        //audio.currentTime = 0;
        if (path === "./music/driving.mp3") {
            if (audio.currentTime > 10) {
                console.log("Audio is over 10 " +audio.currentTime);
                audio.play();
            }
        } else {
            audio.currentTime = 0;
            audio.play();
        }
        //audio.play();
    };

    // isDone(path) {
    //     let audio = this.cache[path];
    //     //return (audio.currentTime > 48);
    //     if (audio.currentTime != 0) {
    //         return true;
    //     }
    // }

    muteAudio(mute) {
        for (var key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio) {
                asset.muted = mute;
            }
        }
    };

    adjustVolume(volume) {
        for (var key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio) {
                asset.volume = volume;
            }
        }
    };

    adjustVolumeOnPath(volume, path) {
        let asset = this.cache[path];
        if (asset instanceof Audio) {
                asset.volume = volume;
            }
    };

    pauseBackgroundMusic(mute) {
        for (var key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio) {
                asset.pause();
                asset.currentTime = 0;
            }
        }
    };

    autoRepeat(path) {
        var aud = this.cache[path];
        aud.ddEventListener("ended", function () {
            aud.play();
        });
    };
};

