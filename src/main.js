let stage, canvasW, canvasH, canvas, preload, sliderContainer, containerZoom, containerDezoom, shapeMask, clickArea, currentImage, maxZoom;

function init() {
    canvas = document.getElementById("myCanvas");
    stage = new createjs.Stage(canvas);
    resize();

    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick(event) {
        stage.update();
    }

    setUp()
}

function setUp() {
    maxZoom = 2;
    let g = new createjs.Graphics();
    g.setStrokeStyle(1);
    g.beginStroke("#000000");
    g.beginFill("black");
    g.drawRect(0, 0, canvas.width, canvas.height);

    let sh = new createjs.Shape(g);

    stage.addChild(sh)

    manifest = [
        { src: "image1.jpg", id: "image1" },
    ];

    preload = new createjs.LoadQueue(true);
    preload.on("progress", handleProgress);
    preload.on("complete", handleComplete);
    preload.on("fileload", handleFileLoad);
    preload.loadManifest(manifest, true, "images/");

    containerZoom = new createjs.Container();
    containerZoom.mouseEnabled = false;

    const gr = new createjs.Graphics()
    gr.beginFill("black");
    gr.drawCircle(0, 0, 200);
    shapeMask = new createjs.Shape(gr)

    containerZoom.mask = shapeMask;

    containerDezoom = new createjs.Container();
    sliderContainer = new createjs.Container();

    const graphics = new createjs.Graphics()
    graphics.beginFill("rgba(255, 255, 255, 0.01)");
    graphics.drawRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    clickArea = new createjs.Shape(graphics);

    sliderContainer.addChild(containerDezoom, containerZoom, clickArea);
    sliderContainer.set({ x: canvas.width / 2, y: canvas.height / 2 })
    stage.addChild(sliderContainer);

    clickArea.on("mousedown", handleDown);
    clickArea.on("pressup", handleUp);
    clickArea.on("pressmove", handleMove);
}

function resize() {
    let canvasRatio = canvas.height / canvas.width;
    let windowRatio = window.innerHeight / window.innerWidth;

    if (windowRatio < canvasRatio) {
        canvasH = window.innerHeight;
        canvasW = canvasH / canvasRatio;
    } else {
        canvasW = window.innerWidth;
        canvasH = canvasW * canvasRatio;
    }

    canvas.style.width = canvasW + 'px';
    canvas.style.height = canvasH + 'px';
}

window.addEventListener('load', (e) => {
    init();
})

window.addEventListener('resize', (e) => {
    resize();
})

function handleProgress(e) {

}

function handleComplete(e) {

}

function handleFileLoad(e) {
    const image = e.result;
    let minSizes = image.width < image.height ? { imgSize: image.width, canvasSize: 1920 } : { imgSize: image.height, canvasSize: 1080 };
    image.minDezoom = minSizes.canvasSize / minSizes.imgSize;

    const bmp = new createjs.Bitmap(image).set({
        scaleX: image.minDezoom,
        scaleY: image.minDezoom,
        regX: image.width / 2, regY: image.height / 2,
    });

    const bmp2 = new createjs.Bitmap(image).set({
        scaleX: image.minDezoom * maxZoom,
        scaleY: image.minDezoom * maxZoom,
        regX: image.width / 2, regY: image.height / 2,
    });

    containerDezoom.addChild(bmp);
    containerZoom.addChild(bmp2);

    currentImage = image
}

function handleDown(e) {
    // myWaveFilter.offsetX = myWaveFilter.center.x - (e.data.global.x - containerDezoom.x + containerDezoom.width / 2);
    // myWaveFilter.offsetY = myWaveFilter.center.y - (e.data.global.y - containerDezoom.y + containerDezoom.height / 2);
    shapeMask.offsetX = (stage.mouseX - canvas.width / 2) - shapeMask.x
    shapeMask.offsetY = (stage.mouseY - canvas.height / 2) - shapeMask.y
    onDrag(e);
}

function handleUp(e) {
    onDrag(e);
}

function handleMove(e) {
    onDrag(e);
}

function onDrag(e) {
    shapeMask.set({
        x: stage.mouseX - canvas.width / 2 - shapeMask.offsetX,
        y: stage.mouseY - canvas.height / 2 - shapeMask.offsetY,
    })
    // myWaveFilter.center.x = e.data.global.x - containerDezoom.x + containerDezoom.width / 2 + myWaveFilter.offsetX;
    // myWaveFilter.center.y = e.data.global.y - containerDezoom.y + containerDezoom.height / 2 + myWaveFilter.offsetY;

    // graphics.clear()
    // graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    // graphics.beginFill(0xDE3249, 1);
    // graphics.drawCircle(e.data.global.x + myWaveFilter.offsetX, e.data.global.y + myWaveFilter.offsetY, 150);
    // graphics.endFill();



    const ratioX = (stage.mouseX - canvas.width / 2 - shapeMask.offsetX - containerDezoom.x) / ((currentImage.width / 2) * currentImage.minDezoom);
    const ratioY = (stage.mouseY - canvas.height / 2 - shapeMask.offsetY - containerDezoom.y) / ((currentImage.height / 2) * currentImage.minDezoom);

    const dx = ((currentImage.width / 2) * (maxZoom * currentImage.minDezoom)) * ratioX;
    const dy = ((currentImage.height / 2) * (maxZoom * currentImage.minDezoom)) * ratioY;

    // RETRANCHER LA LARGEUR DU CONTAINER DEZOOM

    console.log(ratioX)
    containerZoom.x = containerDezoom.x - dx
    containerZoom.y = containerDezoom.y - dy
}