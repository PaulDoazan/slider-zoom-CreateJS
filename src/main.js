let stage, canvasW, canvasH, canvas, preload, sliderContainer, containerZoom, containerDezoom, shapeMask, maskRadius, clickArea, currentImage, maxZoom, isDragging, navbarContainer;

const paddingTop = 50;
const paddingBottom = 150;
const colorNavbar = "white";

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

    setNavBar();

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
    graphics.drawRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height + paddingTop);

    clickArea = new createjs.Shape(graphics);

    sliderContainer.addChild(containerDezoom, containerZoom, clickArea);
    sliderContainer.set({ x: canvas.width / 2, y: canvas.height / 2 - paddingTop })
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

function setNavBar() {
    navbarContainer = new createjs.Container();
    stage.addChild(navbarContainer)
    drawArrows();
    drawLines();
    drawBtnHome();
    drawPagesCount();
}

function drawPagesCount() {
    let text = new createjs.Text("/ 52", "20px Arial", colorNavbar);
    text.textAlign = "right"
    text.x = canvas.width - paddingTop;
    text.y = canvas.height - paddingBottom + 73;
    navbarContainer.addChild(text);
}

function drawBtnHome() {
    let gr = new createjs.Graphics()
    let homeShape = new createjs.Shape(gr);

    let homeBtnContainer = new createjs.Container();

    gr.beginFill(colorNavbar);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gr.drawRect(0 + i * 12, 0 + j * 12, 5, 5)
        }
    }

    homeBtnContainer.x = paddingTop;
    homeBtnContainer.y = canvas.height - paddingBottom + 60;

    let text = new createjs.Text("ACCUEIL", "bold 20px Arial", colorNavbar);
    text.x = 45;
    text.y = 13;
    homeBtnContainer.addChild(homeShape, text)
    navbarContainer.addChild(homeBtnContainer);
}

function drawLines() {
    const thickness = 5
    let gr = new createjs.Graphics()
    let linesShape = new createjs.Shape(gr);

    gr.setStrokeStyle(thickness)
    gr.beginStroke(colorNavbar);

    gr.moveTo(paddingTop, canvas.height - paddingBottom + thickness / 2)
    gr.lineTo(canvas.width - paddingTop, canvas.height - paddingBottom + thickness / 2)

    gr.moveTo(paddingTop, canvas.height - paddingBottom + 30 + thickness / 2)
    gr.lineTo(canvas.width - paddingTop, canvas.height - paddingBottom + 30 + thickness / 2)

    navbarContainer.addChild(linesShape);
}

function drawArrows() {
    const width = 50;
    const height = 80;
    const thickness = 10;

    let gr = new createjs.Graphics()
    let arrowLeftShape = new createjs.Shape(gr);
    let arrowRightShape = new createjs.Shape(gr);

    arrowLeftShape.rotation = 180

    arrowLeftShape.x = paddingTop + width / 2
    arrowLeftShape.y = canvas.height - (paddingBottom + height)

    arrowRightShape.x = canvas.width - (paddingTop + width / 2)
    arrowRightShape.y = canvas.height - (paddingBottom + height)

    arrowLeftShape.set({
        regX: width / 2,
        regY: height / 2,
    })

    arrowRightShape.set({
        regX: width / 2,
        regY: height / 2,
    })

    gr.setStrokeStyle(1);
    gr.beginFill("rgba(201, 117, 91, 0.01)");
    gr.drawCircle(width / 2, height / 2, 60)
    gr.beginStroke(colorNavbar)
    gr.beginFill(colorNavbar);
    gr.moveTo(0, 0)
    gr.lineTo(width, height / 2 - thickness / 1.5)
    gr.lineTo(width, height / 2 + thickness / 1.5)
    gr.lineTo(0, height)
    gr.lineTo(0, height - thickness)
    gr.lineTo(width - thickness / 1.7, height / 2)
    gr.lineTo(0, thickness)

    navbarContainer.addChild(arrowLeftShape, arrowRightShape);
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