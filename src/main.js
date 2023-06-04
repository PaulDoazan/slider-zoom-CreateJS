// Details to improve :
// --

let stage,
    canvasW,
    canvasH,
    canvas,
    preload,
    sliderContainer,
    containerZoom,
    containerDezoom,
    shapeMask,
    maskRadius,
    clickArea,
    imagesArray,
    currentImage,
    maxZoom,
    isDragging,
    navbarContainer,
    slideIndex,
    previousSlideIndex,
    slideDirection,
    arrowLeftShape,
    arrowRightShape,
    countText,
    nbImageLoaded,
    imagesCollection,
    nbImages;

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
    slideDirection = 1
    imagesArray = [];
    imagesCollection = {};
    nbImageLoaded = 0;
    nbImages = 3
    slideIndex = 0;
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
        { src: "image2.jpg", id: "image2" },
        { src: "image3.jpg", id: "image3" },
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
    graphics.drawRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height + paddingTop);

    clickArea = new createjs.Shape(graphics);

    sliderContainer.addChild(containerDezoom, containerZoom, clickArea);
    sliderContainer.set({ x: canvas.width / 2, y: canvas.height / 2 - paddingTop })

    drawLines();
    stage.addChild(sliderContainer);
    setNavBar();
    updateArrows();

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
    drawBtnHome();
    drawPagesCount();
}

function drawPagesCount() {
    countText = new createjs.Text(`0 / ${nbImages}`, "20px Arial", colorNavbar);
    countText.textAlign = "right"
    countText.x = canvas.width - paddingTop;
    countText.y = canvas.height - paddingBottom + 73;
    navbarContainer.addChild(countText);
}

function drawBtnHome() {
    let gr = new createjs.Graphics()
    let homeShape = new createjs.Shape(gr);
    homeShape.set({
        regX: 15,
        regY: 15,
        x: 15,
        y: 15,
    })

    let homeBtnContainer = new createjs.Container();

    gr.beginFill(colorNavbar);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gr.drawRect(0 + i * 12, 0 + j * 12, 5, 5)
        }
    }

    gr.beginFill('rgba(201, 117, 91, 0.01)')
    gr.drawRect(-10, -5, 150, 50)

    homeBtnContainer.x = paddingTop;
    homeBtnContainer.y = canvas.height - paddingBottom + 60;

    homeBtnContainer.on('mousedown', (e) => {
        e.currentTarget = homeShape;
        onBtnDown(e)
    })

    homeBtnContainer.on('pressup', (e) => {
        e.currentTarget = homeShape;
        onBtnUp(e)
    })
    homeBtnContainer.on('click', onHomeClick)

    let text = new createjs.Text("ACCUEIL", "bold 20px Arial", colorNavbar);
    text.x = 45;
    text.y = 13;
    homeBtnContainer.addChild(homeShape, text)
    navbarContainer.addChild(homeBtnContainer);
}

function onBtnDown(e) {
    e.currentTarget.set({
        scaleX: 0.9,
        scaleY: 0.9,
    })
}

function onBtnUp(e) {
    e.currentTarget.set({
        scaleX: 1,
        scaleY: 1,
    })
}

function onHomeClick(e) {
    onBtnUp(e)
    slideIndex = 0;
    updateArrows()
    updateCountText()
    updateCurrentImage()
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

    stage.addChild(linesShape);
}

function drawArrows() {
    const width = 50;
    const height = 80;
    const thickness = 10;

    let gr = new createjs.Graphics()
    arrowLeftShape = new createjs.Shape(gr);
    arrowRightShape = new createjs.Shape(gr);

    arrowLeftShape.rotation = 180

    arrowLeftShape.x = paddingTop + width / 2
    arrowLeftShape.y = canvas.height - (paddingBottom + height)

    arrowRightShape.x = canvas.width - (paddingTop + width / 2)
    arrowRightShape.y = canvas.height - (paddingBottom + height)

    arrowLeftShape.set({
        regX: width / 2,
        regY: height / 2,
        name: 'left'
    })

    arrowRightShape.set({
        regX: width / 2,
        regY: height / 2,
        name: 'right'
    })

    arrowLeftShape.on('mousedown', onBtnDown)
    arrowLeftShape.on('pressup', onBtnUp)
    arrowLeftShape.on('click', onArrowDown)

    arrowRightShape.on('mousedown', onBtnDown)
    arrowRightShape.on('pressup', onBtnUp)
    arrowRightShape.on('click', onArrowDown)

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
    currentImage = imagesCollection[`image${1}`];
    createjs.Ticker.on('tick', () => {
        updateCurrentImage()
    }, null, true)
}

function onArrowDown(e) {
    createjs.Tween.removeAllTweens();
    // FIX THAT TWEEN WHEN USER CLICKS FAST (previous pop up suddenly !!!)
    previousSlideIndex = slideIndex;
    if (e.currentTarget.name === 'left') {
        slideDirection = -1
        slideIndex += slideDirection
        if (slideIndex <= 0) {
            previousSlideIndex = 0
            slideIndex = 0
        }
    } else {
        slideDirection = 1
        slideIndex += slideDirection
        if (slideIndex >= nbImages) {
            slideIndex = nbImages
        }
    }

    updateArrows()
    updateCountText()
    updateCurrentImage()
}

function updateArrows() {
    arrowLeftShape.visible = arrowRightShape.visible = true;

    if (slideIndex <= 0) {
        arrowLeftShape.visible = false;
    }

    if (slideIndex >= nbImages) {
        arrowRightShape.visible = false;
    }
}

function updateCurrentImage() {
    const tweenDuration = 1000
    const easeType = createjs.Ease.quintInOut;
    currentImage = imagesCollection[`image${slideIndex}`];
    for (let i = 1; i <= nbImages; i++) {
        const element = imagesCollection[`image${i}`];
        element.bmpDezoom.alpha = 0;
        element.bmpZoom.alpha = 0;
    }

    if (!currentImage) return

    if (previousSlideIndex !== 0) {
        let previousImage = imagesCollection[`image${previousSlideIndex}`];
        previousImage.bmpDezoom.alpha = 1;
        previousImage.bmpZoom.alpha = 1;

        createjs.Tween.get(previousImage.bmpDezoom).to({
            alpha: 0,
            // x: previousImage.width * previousImage.bmpDezoom.scaleX * -slideDirection
        }, tweenDuration, easeType).call(() => {
            if (!currentImage) return
            createjs.Tween.get(currentImage.bmpDezoom).to({
                alpha: 1,
                // x: currentImage.width * currentImage.bmpDezoom.scaleX * -slideDirection
            }, tweenDuration, easeType)
        })

        createjs.Tween.get(previousImage.bmpZoom).to({
            alpha: 0,
            // x: previousImage.width * previousImage.bmpZoom.scaleX * -slideDirection
        }, tweenDuration / 2, easeType).wait(tweenDuration / 2).call(() => {
            if (!currentImage) return
            createjs.Tween.get(currentImage.bmpZoom).to({
                alpha: 1,
                // x: currentImage.width * currentImage.bmpZoom.scaleX * -slideDirection
            }, tweenDuration * 2, easeType, createjs.Ease.quintInOut)
        })
    } else {
        if (!currentImage) return
        createjs.Tween.get(currentImage.bmpZoom).to({
            alpha: 1,
            // x: currentImage.width * currentImage.bmpZoom.scaleX * -slideDirection
        }, tweenDuration * 2, easeType)

        createjs.Tween.get(currentImage.bmpDezoom).to({
            alpha: 1,
            // x: currentImage.width * currentImage.bmpDezoom.scaleX * -slideDirection
        }, tweenDuration, easeType)
    }
}

function updateCountText() {
    countText.text = `${slideIndex} / ${nbImages}`
}

function handleFileLoad(e) {
    const image = e.result;
    let minSizes = image.width < image.height ? { imgSize: image.width, canvasSize: 1920 } : { imgSize: image.height, canvasSize: 1080 };
    image.minDezoom = (minSizes.canvasSize - (paddingTop + paddingBottom)) / minSizes.imgSize;

    const bmp = new createjs.Bitmap(image).set({
        scaleX: image.minDezoom,
        scaleY: image.minDezoom,
        regX: image.width / 2, regY: image.height / 2,
        alpha: 0.01
    });

    const bmp2 = new createjs.Bitmap(image).set({
        scaleX: image.minDezoom * maxZoom,
        scaleY: image.minDezoom * maxZoom,
        regX: image.width / 2, regY: image.height / 2,
        alpha: 0.01
    });

    createjs.Ticker.on('tick', () => {
        bmp.alpha = 0
        bmp2.alpha = 0
    }, null, true)

    containerDezoom.addChild(bmp);
    containerZoom.addChild(bmp2);

    image.name = e.item.id
    image.bmpDezoom = bmp;
    image.bmpZoom = bmp2;
    imagesCollection[`${e.item.id}`] = image;
}

function handleDown(e) {
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
    if (!isDragging) return;
    onDrag(e);
    isDragging = false;
}

function handleMove(e) {
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