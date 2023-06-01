let stage, canvasW, canvasH, canvas, preload, sliderContainer, containerZoom, containerDezoom, shapeMask, maskRadius, clickArea, currentImage, maxZoom, isDragging, navbarContainer;

const paddingTop = 50;
const paddingBottom = 150;

function init() {
    canvas = document.getElementById("myCanvas");
    stage = new createjs.Stage(canvas);
    createjs.Touch.enable(stage);
    resize();

    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick(event) {
        stage.update();
    }

    setUp()
}

function setUp() {
    maxZoom = 2;
    maskRadius = 200;
    let g = new createjs.Graphics();
    g.setStrokeStyle(1);
    g.beginStroke("#c9755b");
    g.beginFill("#c9755b");
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
    gr.beginFill("#c9755b");
    gr.drawCircle(0, 0, maskRadius);
    shapeMask = new createjs.Shape(gr)

    containerZoom.mask = shapeMask;

    containerDezoom = new createjs.Container();
    sliderContainer = new createjs.Container();

    const graphics = new createjs.Graphics()
    graphics.beginFill("rgba(255, 255, 255, 0.01)");
    graphics.drawRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    clickArea = new createjs.Shape(graphics);

    sliderContainer.addChild(containerDezoom, containerZoom, clickArea);
    sliderContainer.set({ x: canvas.width / 2, y: canvas.height / 2 - paddingTop })
    stage.addChild(sliderContainer);

    clickArea.on("mousedown", handleDown);
    clickArea.on("pressup", handleUp);
    clickArea.on("pressmove", handleMove);

    // setNavBar();
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

function setNavBar() {
    navbarContainer = new createjs.Container();
    stage.addChild(navbarContainer)
    drawArrows();
}

function drawArrows() {
    let gr = new createjs.Graphics()
    let arrowLeftShape = new createjs.Shape(gr);

    arrowLeftShape.x = 100
    arrowLeftShape.y = 100

    const length = 50;
    const thickness = 5;
    gr.setStrokeStyle(1);
    gr.beginStroke("white")
    gr.beginFill("white");
    gr.moveTo(0, 0)
    gr.lineTo(length, length / 2 - thickness)
    gr.lineTo(length, length / 2 + thickness)
    gr.lineTo(0, length)
    gr.lineTo(0, length - thickness)
    gr.lineTo(length - thickness, length / 2)
    gr.lineTo(0, thickness)

    navbarContainer.addChild(arrowLeftShape);
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
    image.minDezoom = (minSizes.canvasSize - (paddingTop + paddingBottom)) / minSizes.imgSize;

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
    console.log('down');
    const mousePoint = { x: stage.mouseX - canvas.width / 2, y: stage.mouseY - canvas.height / 2 }
    if (distance(mousePoint, shapeMask) > maskRadius) {
        isDragging = false;
        return;
    } else {
        isDragging = true;
    }
    shapeMask.offsetX = (stage.mouseX - canvas.width / 2) - shapeMask.x
    shapeMask.offsetY = (stage.mouseY - canvas.height / 2) - shapeMask.y
    onDrag(e);
}

function handleUp(e) {
    console.log('up');
    if (!isDragging) return;
    onDrag(e);
    isDragging = false;
}

function handleMove(e) {
    console.log('move');
    if (!isDragging) return;
    onDrag(e);
}

function onDrag(e) {
    shapeMask.set({
        x: stage.mouseX - canvas.width / 2 - shapeMask.offsetX,
        y: stage.mouseY - canvas.height / 2 - shapeMask.offsetY,
    })

    const ratioX = (stage.mouseX - canvas.width / 2 - shapeMask.offsetX - containerDezoom.x) / ((currentImage.width / 2) * currentImage.minDezoom);
    const ratioY = (stage.mouseY - canvas.height / 2 - shapeMask.offsetY - containerDezoom.y) / ((currentImage.height / 2) * currentImage.minDezoom);

    const dx = ((currentImage.width / 2) * currentImage.minDezoom * (maxZoom - 1)) * ratioX;
    const dy = ((currentImage.height / 2) * currentImage.minDezoom * (maxZoom - 1)) * ratioY;

    containerZoom.x = containerDezoom.x - dx
    containerZoom.y = containerDezoom.y - dy
}

function distance(pointA, pointB) {
    return Math.hypot(pointB.x - pointA.x, pointB.y - pointA.y);
} 