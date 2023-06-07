// Details to improve :
// -- limit drag&drop
const titleContainer = document.querySelector('.title-container');

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
    manifest,
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
    indexImgToLoad,
    imagesCollection,
    loaderBackground,
    clickAllowed,
    text1;

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
    previousSlideIndex = 0
    slideDirection = 1
    imagesArray = [];
    imagesCollection = {};
    indexImgToLoad = 1;
    slideIndex = 0;
    maxZoom = 2;
    maskRadius = 200;
    let g = new createjs.Graphics();
    g.setStrokeStyle(1);
    g.beginStroke("#c9755b");
    g.beginFill("#c9755b");
    g.drawRect(0, 0, canvas.width, canvas.height);

    let sh = new createjs.Shape(g);

    textLoader = new createjs.Text(`Loading 0 %`, "40px Arial", colorNavbar);
    textLoader.textAlign = "center"
    textLoader.x = canvas.width / 2;
    textLoader.y = canvas.height * 0.75;

    stage.addChild(sh, textLoader)

    manifest = [
        { src: "image1.jpg", id: "image1" },
        { src: "image2.jpg", id: "image2" },
        { src: "image3.jpg", id: "image3" },
        { src: "image4.jpg", id: "image4" },
        { src: "image5.jpg", id: "image5" },
        { src: "image6.jpg", id: "image6" },
        { src: "image7.jpg", id: "image7" },
        { src: "image8.jpg", id: "image8" },
        { src: "image9.jpg", id: "image9" },
        { src: "image10.jpg", id: "image10" },
        // { src: "image11.jpg", id: "image11" },
        // { src: "image12.jpg", id: "image12" },
        // { src: "image13.jpg", id: "image13" },
        // { src: "image14.jpg", id: "image14" },
        // { src: "image15.jpg", id: "image15" },
        // { src: "image16.jpg", id: "image16" },
        // { src: "image17.jpg", id: "image17" },
        // { src: "image18.jpg", id: "image18" },
        // { src: "image19.jpg", id: "image19" },
        // { src: "image20.jpg", id: "image20" },
        // { src: "image21.jpg", id: "image21" },
        // { src: "image22.jpg", id: "image22" },
        // { src: "image23.jpg", id: "image23" },
        // { src: "image24.jpg", id: "image24" },
        // { src: "image25.jpg", id: "image25" },
        // { src: "image26.jpg", id: "image26" },
        // { src: "image27.jpg", id: "image27" },
        // { src: "image28.jpg", id: "image28" },
        // { src: "image29.jpg", id: "image29" },
        // { src: "image30.jpg", id: "image30" },
        // { src: "image31.jpg", id: "image31" },
        // { src: "image32.jpg", id: "image32" },
        // { src: "image33.jpg", id: "image33" },
        // { src: "image34.jpg", id: "image34" },
        // { src: "image35.jpg", id: "image35" },
        // { src: "image36.jpg", id: "image36" },
        // { src: "image37.jpg", id: "image37" },
        // { src: "image38.jpg", id: "image38" },
        // { src: "image39.jpg", id: "image39" },
        // { src: "image40.jpg", id: "image40" },
        // { src: "image41.jpg", id: "image41" },
        // { src: "image42.jpg", id: "image42" },
        // { src: "image43.jpg", id: "image43" },
        // { src: "image44.jpg", id: "image44" },
    ];


    preload = new createjs.LoadQueue(true);
    // preload.on("fileload", handleFileLoad);
    // preload.loadFile({ id: `image${1}`, src: `images/image${1}.jpg` });
    preload.on("progress", handleProgress);
    preload.on("fileload", handleFileLoad);
    preload.on("complete", handleComplete);
    preload.loadManifest(manifest, true, "images/");

    containerZoom = new createjs.Container();
    containerZoom.mouseEnabled = false;

    const gr = new createjs.Graphics()
    gr.beginFill("#c9755b");
    gr.drawCircle(0, 0, maskRadius);
    shapeMask = new createjs.Shape(gr)

    shapeMask.set({
        offsetX: 0,
        offsetY: 0
    })
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
    countText = new createjs.Text(`0 / ${manifest.length}`, "20px Arial", colorNavbar);
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
    if (!clickAllowed) return
    e.currentTarget.set({
        scaleX: 0.9,
        scaleY: 0.9,
    })
}

function onBtnUp(e) {
    if (!clickAllowed) return
    e.currentTarget.set({
        scaleX: 1,
        scaleY: 1,
    })
}

function onHomeClick(e) {
    if (!clickAllowed) return
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

function onArrowDown(e) {
    if (!clickAllowed) return
    createjs.Tween.removeAllTweens();
    // FIX THAT TWEEN WHEN USER CLICKS FAST (previous pop up suddenly !!!)
    previousSlideIndex = slideIndex;
    if (e.currentTarget.name === 'left') {
        slideDirection = -1
        slideIndex += slideDirection
        if (slideIndex <= 0) {
            slideIndex = 0
        }
    } else {
        slideDirection = 1
        slideIndex += slideDirection
        if (slideIndex >= manifest.length) {
            slideIndex = manifest.length
        }
    }

    if (slideIndex === 0) {
        titleContainer.style.display = 'block';
    } else {
        titleContainer.style.display = 'none';
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

    if (slideIndex >= manifest.length) {
        arrowRightShape.visible = false;
    }
}

function updateCurrentImage() {
    const tweenDuration = 1000
    const easeType = createjs.Ease.quintInOut;
    const deltaTweening = 1
    currentImage = imagesCollection[`image${slideIndex}`];
    for (let i = 1; i <= manifest.length; i++) {
        const element = imagesCollection[`image${i}`];
        element.bmpDezoom.alpha = 0;
        element.bmpZoom.alpha = 0;
    }

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
        }, tweenDuration / deltaTweening, easeType).wait(tweenDuration - tweenDuration / deltaTweening).call(() => {
            if (!currentImage) return
            createjs.Tween.get(currentImage.bmpZoom).to({
                alpha: 1,
                // x: currentImage.width * currentImage.bmpZoom.scaleX * -slideDirection
            }, tweenDuration * deltaTweening, easeType, createjs.Ease.quintInOut)
        })
    } else {
        if (!currentImage) return
        createjs.Tween.get(currentImage.bmpZoom).to({
            alpha: 1,
            // x: currentImage.width * currentImage.bmpZoom.scaleX * -slideDirection
        }, tweenDuration * deltaTweening, easeType)

        createjs.Tween.get(currentImage.bmpDezoom).to({
            alpha: 1,
            // x: currentImage.width * currentImage.bmpDezoom.scaleX * -slideDirection
        }, tweenDuration, easeType)
    }
}

function updateCountText() {
    countText.text = `${slideIndex} / ${manifest.length}`
}

function handleFileLoad(e) {
    const image = e.result;
    // let minSizes = image.width < image.height ? { imgSize: image.width, canvasSize: 1920 } : { imgSize: image.height, canvasSize: 1080 };
    // image.minDezoom = (minSizes.canvasSize - (paddingTop + paddingBottom)) / minSizes.imgSize;
    image.minDezoom = (canvas.height - (paddingTop + paddingBottom)) / image.height;

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


    // createjs.Ticker.on('tick', () => {
    //     updateCurrentImage()
    // }, null, true)


    // if (indexImgToLoad < manifest.length) {
    //     indexImgToLoad++
    //    
    // } else {
    //     handleComplete()
    // }
}

function handleProgress(e) {
    console.log(e.loaded);
    textLoader.text = `Loading ${Math.round(e.loaded * 100)} %`;
    //     preload.loadFile({ id: `image${indexImgToLoad}`, src: `images/image${indexImgToLoad}.jpg` });
}

function handleComplete() {
    clickAllowed = true
    currentImage = imagesCollection[`image${1}`];
}

function handleDown(e) {
    if (!clickAllowed) return
    // e.preventDefault();
    // console.log("down");
    // text1.text = e.type
    const mousePoint = { x: stage.mouseX - canvas.width / 2, y: stage.mouseY - canvas.height / 2 }
    shapeMask.offsetX = (stage.mouseX - canvas.width / 2) - shapeMask.x
    shapeMask.offsetY = (stage.mouseY - canvas.height / 2) - shapeMask.y
    if (distance(mousePoint, shapeMask) > maskRadius) return;

    onDrag(e);
}

function handleUp(e) {
    if (!clickAllowed) return
    const mousePoint = { x: stage.mouseX - canvas.width / 2, y: stage.mouseY - canvas.height / 2 }
    if (distance(mousePoint, shapeMask) > maskRadius) return;
    onDrag(e);
}

function handleMove(e) {
    if (!clickAllowed) return
    const mousePoint = { x: stage.mouseX - canvas.width / 2, y: stage.mouseY - canvas.height / 2 }
    if (distance(mousePoint, shapeMask) > maskRadius) return;
    // e.preventDefault();
    // console.log("move");
    // text1.text = e.type
    // if (!isDragging) return;
    onDrag(e);
}

function onDrag(e) {
    shapeMask.set({
        x: stage.mouseX - canvas.width / 2 - shapeMask.offsetX,
        y: stage.mouseY - canvas.height / 2 - shapeMask.offsetY,
    })

    if (shapeMask.x < -(currentImage.width / 2) * currentImage.minDezoom) shapeMask.x = -(currentImage.width / 2) * currentImage.minDezoom
    if (shapeMask.x > (currentImage.width / 2) * currentImage.minDezoom) shapeMask.x = (currentImage.width / 2) * currentImage.minDezoom

    if (shapeMask.y < -(currentImage.height / 2) * currentImage.minDezoom) shapeMask.y = -(currentImage.height / 2) * currentImage.minDezoom
    if (shapeMask.y > (currentImage.height / 2) * currentImage.minDezoom) shapeMask.y = (currentImage.height / 2) * currentImage.minDezoom

    const ratioX = (shapeMask.x - containerDezoom.x) / ((currentImage.width / 2) * currentImage.minDezoom);
    const ratioY = (shapeMask.y - containerDezoom.y) / ((currentImage.height / 2) * currentImage.minDezoom);

    const dx = ((currentImage.width / 2) * currentImage.minDezoom * (maxZoom - 1)) * ratioX;
    const dy = ((currentImage.height / 2) * currentImage.minDezoom * (maxZoom - 1)) * ratioY;

    containerZoom.x = containerDezoom.x - dx
    containerZoom.y = containerDezoom.y - dy
}

function distance(pointA, pointB) {
    return Math.hypot(pointB.x - pointA.x, pointB.y - pointA.y);
} 