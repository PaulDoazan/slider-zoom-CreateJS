const manifest = [
    { src: "image1.jpg", id: "image1", infos: null },
    { src: "image2.jpg", id: "image2", infos: null },
    { src: "image3.jpg", id: "image3", infos: null },
    { src: "image4.jpg", id: "image4", infos: { width: 29.3, paddingTop: 4, paddingLeft: 3, content: "Portait de Raymond Lafage<br>interprété par Cornelis Vermeulen" } },
    { src: "image5.jpg", id: "image5", infos: { width: 15, paddingTop: 3, paddingLeft: 2, content: "Moïse frappant<br>le rocher" } },
    { src: "image6.jpg", id: "image6", infos: { width: 15, paddingTop: 3, paddingLeft: 2, content: "Dieu envoyant le<br>serpent d’Airain<br>pour guérir les<br>israélites " } },
    { src: "image7.jpg", id: "image7", infos: { width: 22.5, paddingTop: 3, paddingLeft: 1.4, content: "Groupe de personnages occupé<br>à boire. Les représentations<br>où les gens boivent sont<br>nombreuses dans l’œuvre<br>de Raymond Lafage" } },
    { src: "image8.png", id: "image8", infos: { width: 22.5, paddingTop: 3, paddingLeft: 1.4, content: "L’artiste a pour volonté de<br>mettre en avant la musculature<br>de cet homme qui est<br>vraisemblablement agressif<br>et a la volonté de frapper." } },
    { src: "image9.jpg", id: "image9", infos: { width: 16.5, paddingTop: 3, paddingLeft: 2, content: "Visage déformé<br>par la peur.<br>Impression que<br>l’œuvre n’est pas<br>achevée..." } },
    { src: "image10.jpg", id: "image10", infos: { width: 16.5, paddingTop: 3, paddingLeft: 2, content: "Le geste de Moïse,<br>ce bras tendu<br>résume à lui seul<br>toute la force<br>du dessin" } },
    { src: "image11.jpg", id: "image11", infos: { width: 16.5, paddingTop: 3, paddingLeft: 2, content: "Les positions des<br>mains et le désarroi<br>lisible sur les<br>visages résument<br>parfaitement la<br>tension dramatique<br>qui se joue dans<br>cette œuvre" } },
    { src: "image12.jpg", id: "image12", infos: { width: 15.5, paddingTop: 3, paddingLeft: 2, content: "Deux combattants<br>s’opposent l’un à<br>l’autre, tant dans<br>leur combat que<br>dans leur posture<br>et même dans<br>leur façon d’être<br>vêtu. Opposition<br>d’un homme<br>en armure à un<br>homme nu. Ces<br>deux personnages<br>résument<br>l’intensité et<br>la violence de<br>la scène." } },
    { src: "image13.jpg", id: "image13", infos: { width: 17, paddingTop: 3, paddingLeft: 2, content: "Les personnages<br>centraux sont<br>statiques, semblant<br>réfléchir, penser,<br>prenant le temps.<br>Les temps de pauses<br>sont plutôt rares<br>dans l’œuvre de<br>Raymond Lafage" } },
    { src: "image14.jpg", id: "image14", infos: { width: 16.5, paddingTop: 3, paddingLeft: 2, content: "À travers la posture<br>et le visage de<br>l’homme, l’artiste<br>retranscrit toute la<br>détresse et la gravité<br>d’une telle scène" } },
    { src: "image15.jpg", id: "image15", infos: { width: 22.5, paddingTop: 3, paddingLeft: 1.4, content: "Grâce à l’intensité du geste<br>et en quelques traits l’artiste<br>trouve le moyen de donner vie et<br>mouvement à son œuvre" } },
    { src: "image16.jpg", id: "image16", infos: { width: 15, paddingTop: 3, paddingLeft: 2, content: "Les musiciens sont<br>souvent présents<br>dans l’œuvre de<br>Raymond Lafage..." } },
    { src: "image17.jpg", id: "image17", infos: { width: 15, paddingTop: 3, paddingLeft: 2, content: "... tout comme les<br>scènes de danse" } },
    { src: "image18.jpg", id: "image18", infos: { width: 22.5, paddingTop: 3, paddingLeft: 1.4, content: "Cette œuvre intitulée <i>La danse</i><br><i>en rond</i>, présente un satyre<br>jouant de la flûte de pan et<br>faisant danser le groupe de<br>jeunes gens qui l’encerclent.<br>En une seule représentation<br>nous retrouvons à la fois la<br>musique et la danse." } },
    { src: "image19.jpg", id: "image19", infos: { width: 22.5, paddingTop: 3, paddingLeft: 1.4, content: "Les personnages féminins sont<br>généralement représentés avec<br>beaucoup de grâce." } },
    { src: "image20.jpg", id: "image20", infos: { width: 15, paddingTop: 3, paddingLeft: 2, content: "Le dieu Bacchus<br>enfant assis sur<br>un lion" } },
    { src: "image21.jpg", id: "image21", infos: { width: 15, paddingTop: 3, paddingLeft: 2, content: "Scène d’ivresse" } },
    { src: "image22.jpg", id: "image22", infos: { width: 14, paddingTop: 3, paddingLeft: 1.4, content: "Portrait de<br>Raymond Lafage.<br>Il est fréquent<br>de retrouver des<br>autoportraits<br>de l’artiste dans<br>ses œuvres. " } },
    { src: "image23.jpg", id: "image23", infos: { width: 14, paddingTop: 3, paddingLeft: 1.4, content: "Groupe de<br>personnages<br>avec satyre" } },
    { src: "image24.jpg", id: "image24", infos: { width: 14, paddingTop: 3, paddingLeft: 1.4, content: "Les<br>musculatures<br>sont souvent<br>prononcées<br>qu’il s’agisse<br>d’œuvres<br>bibliques ou<br>mythologiques<br>et peu importe le<br>personnage.<br>Ici, un satyre vu<br>de dos." } },
    { src: "image25.jpg", id: "image25", infos: { width: 14, paddingTop: 3, paddingLeft: 1.4, content: "Au milieu de<br>cette scène de<br>bacchanale,<br>un personnage<br>reste statique... " } },
    { src: "image26.jpg", id: "image26", infos: { width: 14, paddingTop: 3, paddingLeft: 1.4, content: "Diane, déesse<br>de la nature<br>sauvage, de la<br>chasse et des<br>accouchements<br>possède pour<br>attributs<br>principaux un<br>arc, un carquois,<br>des flèches et un<br>croissant de lune." } },
    { src: "image27.jpg", id: "image27", infos: { width: 15.2, paddingTop: 3, paddingLeft: 2, content: "Portrait de<br>Raymond Lafage<br>au milieu d’une<br>bacchanale." } },
    { src: "image28.jpg", id: "image28", infos: { width: 17, paddingTop: 3, paddingLeft: 2, content: "Personnage féminin<br>au paon." } },
    { src: "image29.jpg", id: "image29", infos: { width: 17, paddingTop: 3, paddingLeft: 2, content: "Personnages<br>dansants." } },
    { src: "image30.jpg", id: "image30", infos: { width: 17, paddingTop: 3, paddingLeft: 2, content: "Cortège triomphal<br>avec éléphants." } },
    { src: "image31.jpg", id: "image31", infos: { width: 25, paddingTop: 3, paddingLeft: 2, content: "Un homme chute d’un âne, petit<br>clin d'œil à la mort de l’artiste" } },
    { src: "image32.jpg", id: "image32", infos: { width: 17, paddingTop: 3, paddingLeft: 2, content: "Musicien et buveur<br>faisant la fête." } },
    { src: "image33.jpg", id: "image33", infos: { width: 40, paddingTop: 3, paddingLeft: 2, content: "Groupe composé d’hommes, d’un enfant et d’un satyre<br>soutenant et couronnant une jeune femme." } },
    { src: "image34.jpg", id: "image34", infos: { width: 14, paddingTop: 3, paddingLeft: 2, content: "Grâce féminine..." } },
    { src: "image35.jpg", id: "image35", infos: { width: 15, paddingTop: 3, paddingLeft: 2, content: "Scène au char lors<br>d’une procession" } },
    { src: "image36.jpg", id: "image36", infos: { width: 17, paddingTop: 3, paddingLeft: 2, content: "Regroupement de<br>personnages figés<br>dans une scène<br>d’offrande." } },
    { src: "image37.jpg", id: "image37", infos: { width: 17, paddingTop: 3, paddingLeft: 2, content: "Scène aquatique" } },
    { src: "image38.jpg", id: "image38", infos: { width: 17, paddingTop: 3, paddingLeft: 2, content: "Homme à dos d’âne" } },
    { src: "image39.jpg", id: "image39", infos: { width: 17, paddingTop: 3, paddingLeft: 2, content: "Musique et<br>acrobaties, une<br>scène pleine d’élan" } },
    { src: "image40.jpg", id: "image40", infos: { width: 17, paddingTop: 3, paddingLeft: 2, content: "Hommes nus<br>statiques au milieu<br>d’un cortège<br>dansant" } },
    { src: "image41.jpg", id: "image41", infos: { width: 17, paddingTop: 3, paddingLeft: 2, content: "Scène de banquet<br>et d’ivresse" } },
    { src: "image42.jpg", id: "image42", infos: { width: 23, paddingTop: 3, paddingLeft: 2, content: "Thème biblique classique,<br>œuvre où l’on peut lire la peur<br>sur le visage de cette mère<br>protégeant ses enfants." } },
    { src: "image43.jpg", id: "image43", infos: { width: 17, paddingTop: 3, paddingLeft: 2, content: "Représentation<br>biblique illustrée de<br>façon héroïque" } },
    { src: "image44.jpg", id: "image44", infos: null },
];

const titleContainer = document.querySelector('.title-container');
const infoContent = document.querySelector('.info-content');
const infoContainer = document.querySelector('.info-container');
const thickVLine = document.querySelector('.thick-v-line');
const thickLine = document.querySelector('.thick-line');
const infoBtn = document.querySelector('.info-btn');

const paperColor = "#fbf0e4";

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
    indexImgToLoad,
    imagesCollection,
    loaderBackground,
    clickAllowed,
    linesShape,
    countBetweenClick,
    crossPictoShape,
    pictoContainer,
    text1;

const paddingTop = 50;
const paddingBottom = 150;
const colorNavbar = paperColor;

function init() {
    canvas = document.getElementById("myCanvas");
    stage = new createjs.Stage(canvas);
    createjs.Touch.enable(stage);
    resize();

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick(event) {
        stage.update();
    }

    setUp()
}

function setUp() {
    countBetweenClick = 0;
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
    g.beginFill("rgba(255, 255, 255, 0.01)");
    g.drawRect(0, 0, canvas.width, canvas.height);

    let sh = new createjs.Shape(g);

    textLoader = new createjs.Text(`Loading 0 %`, "40px Arial", colorNavbar);
    textLoader.textAlign = "center"
    textLoader.x = canvas.width / 2;
    textLoader.y = canvas.height * 0.8;

    stage.addChild(sh, textLoader)

    preload = new createjs.LoadQueue(true);
    preload.on("progress", handleProgress);
    preload.on("fileload", handleFileLoad);
    preload.on("complete", handleComplete);

    createjs.Ticker.on('tick', () => {
        preload.loadManifest(manifest, true, "images/");
    }, null, true)

    containerZoom = new createjs.Container();
    containerZoom.mouseEnabled = false;

    const gr = new createjs.Graphics()
    gr.beginFill("#c9755b");
    gr.drawCircle(0, 0, maskRadius);
    shapeMask = new createjs.Shape(gr)

    glassContainer = new createjs.Container()
    glassContainer.set({
        scaleX: 0.58,
        scaleY: 0.58,
        regX: 490,
        regY: 490,
    })

    const grGlass = new createjs.Graphics()
    grGlass.setStrokeStyle(20)
    grGlass.beginStroke("#00728d");
    grGlass.beginFill("rgba(255,255,255,0.01)");
    grGlass.drawCircle(495, 495, maskRadius * (1 / 0.58));
    const shapeGlass = new createjs.Shape(grGlass)

    glassContainer.addChild(shapeGlass)

    shapeMask.set({
        offsetX: 0,
        offsetY: 0
    })
    containerZoom.mask = shapeMask;

    containerDezoom = new createjs.Container();
    sliderContainer = new createjs.Container();
    glassContainer.visible = false
    // sliderContainer.visible = false;

    const graphics = new createjs.Graphics()
    graphics.beginFill("rgba(255, 255, 255, 0.01)");
    graphics.drawRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height + paddingTop);

    clickArea = new createjs.Shape(graphics);

    sliderContainer.addChild(containerDezoom, containerZoom, clickArea, glassContainer);
    sliderContainer.set({ x: canvas.width / 2, y: canvas.height / 2 - paddingTop })

    drawLines();
    stage.addChild(sliderContainer);
    setNavBar();
    updateArrows();

    arrowRightShape.alpha = 0;

    // clickArea.on("mousedown", handleDown);
    // clickArea.on("pressup", handleUp);
    // clickArea.on("pressmove", handleMove);
    glassContainer.on("mousedown", handleGlassDown);
    glassContainer.on("pressup", handleGlassUp);
    glassContainer.on("pressmove", handleGlassMove);

    infoBtn.addEventListener('click', onBtnInfoChange)
}

function onBtnInfoChange(e) {
    e.currentTarget.isPlus = !e.currentTarget.isPlus
    if (e.currentTarget.isPlus) {
        thickVLine.style.display = 'block'
        thickLine.style.width = '1.3vw'
    } else {
        thickVLine.style.display = 'none'
        thickLine.style.width = '1.5vw'
    }
    showInfos()
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
    navbarContainer.alpha = 0;
    stage.addChild(navbarContainer)
    drawLent()
    drawArrows();
    drawBtnHome();
    drawPagesCount();
}

function drawLent() {
    pictoContainer = new createjs.Container()
    const picto = new createjs.Bitmap("images/loupe_etat_2.png");
    pictoContainer.set({
        regX: 50,
        regY: 50,
        scaleX: 0.07,
        scaleY: 0.07,
    })
    pictoContainer.x = 50
    pictoContainer.y = 50

    crossPictoShape = new createjs.Bitmap("images/loupe_etat_1.png");
    pictoContainer.visible = false

    const gb = new createjs.Graphics();
    const bg = new createjs.Shape(gb)

    gb.beginFill('rgba(201, 117, 91, 0.01)')
    gb.drawCircle(50, 50, 80)

    pictoContainer.addChild(bg, picto, crossPictoShape);
    navbarContainer.addChild(pictoContainer);

    pictoContainer.on('click', () => {
        crossPictoShape.visible = !crossPictoShape.visible
        if (crossPictoShape.visible) {
            if (currentImage) currentImage.bmpZoom.visible = false
            glassContainer.visible = false
        } else {
            if (currentImage) currentImage.bmpZoom.visible = true
            glassContainer.visible = true
        }
    })
}

function drawPagesCount() {
    countText = new createjs.Text(`0 / ${manifest.length}`, "20px Arial", colorNavbar);
    countText.textAlign = "right"
    countText.x = canvas.width - paddingTop;
    countText.y = canvas.height - paddingBottom + 70;
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
    text.y = 10;
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
    linesShape = new createjs.Shape(gr);

    linesShape.y = -350;

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
    arrowLeftShape.alpha = arrowRightShape.alpha = 1;

    if (slideIndex <= 0) {
        arrowLeftShape.alpha = 0;
    }

    if (slideIndex >= manifest.length) {
        arrowRightShape.alpha = 0;
    }
}

function updateCurrentImage() {
    const tweenDuration = 300
    const easeType = createjs.Ease.quintOut;
    const deltaTweening = 1
    currentImage = imagesCollection[`image${slideIndex}`];

    if (currentImage) currentImage.bmpZoom.visible = !crossPictoShape.visible

    infoContainer.style.transition = 'none'
    infoBtn.style.transition = 'none'
    infoContainer.style.opacity = infoBtn.style.opacity = 0

    if (slideIndex === 0) {
        titleContainer.style.display = 'block'
        sliderContainer.visible = false;
        pictoContainer.visible = false;
        infoContainer.style.opacity = 0
        infoBtn.style.opacity = 0
    } else {
        titleContainer.style.display = 'none'
        sliderContainer.visible = true;
        pictoContainer.visible = true;
    }

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
            showInfos()
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
            showInfos()
            createjs.Tween.get(currentImage.bmpZoom).to({
                alpha: 1,
                // x: currentImage.width * currentImage.bmpZoom.scaleX * -slideDirection
            }, tweenDuration * deltaTweening, easeType, createjs.Ease.quintOut)
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

function showInfos() {
    if (!currentImage || !currentImage.infos) return;
    infoContainer.style.transition = 'opacity 1s ease-in-out'
    infoBtn.style.transition = 'opacity 1s ease-in-out'
    infoContainer.style.opacity = infoBtn.style.opacity = 1
    infoContainer.style.paddingLeft = `${currentImage.infos.paddingLeft}vw`
    infoContainer.style.paddingRight = `${currentImage.infos.paddingLeft}vw`
    infoContainer.style.width = `${currentImage.infos.width}vw`
    if (infoBtn.isPlus) {
        infoContainer.style.paddingTop = `2.5vw`
        infoContainer.style.paddingBottom = `0vw`
        infoContent.style.opacity = 0
        infoContent.innerHTML = '';
    } else {
        infoContainer.style.paddingTop = `${currentImage.infos.paddingTop}vw`
        if (slideIndex >= 28 && slideIndex < 34) {
            infoContainer.style.paddingBottom = `1.5vw`
        } else {
            infoContainer.style.paddingBottom = `${currentImage.infos.paddingTop}vw`
        }
        infoContent.innerHTML = currentImage.infos.content;
        infoContent.style.opacity = 1
    }

}

function updateCountText() {
    countText.text = `${slideIndex} / ${manifest.length}`
}

function handleFileLoad(e) {
    const image = e.result;
    if ((image.width / image.height) > 2) {
        image.minDezoom = (canvas.width - paddingBottom * 2) / image.width;
    } else {
        image.minDezoom = (canvas.height - (paddingTop + paddingBottom)) / image.height;
    }

    const bmp = new createjs.Bitmap(image).set({
        scaleX: image.minDezoom,
        scaleY: image.minDezoom,
        regX: image.width / 2, regY: image.height / 2,
        alpha: 0.03
    });

    const bmp2 = new createjs.Bitmap(image).set({
        scaleX: image.minDezoom * maxZoom,
        scaleY: image.minDezoom * maxZoom,
        regX: image.width / 2, regY: image.height / 2,
        alpha: 0.03
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
    image.infos = e.item.infos;
    imagesCollection[`${e.item.id}`] = image;
}

function handleProgress(e) {
    textLoader.text = `Loading ${Math.round(e.loaded * 100)} %`;
    //     preload.loadFile({ id: `image${indexImgToLoad}`, src: `images/image${indexImgToLoad}.jpg` });
}

function handleComplete() {
    createjs.Tween.get(textLoader).to({
        alpha: 0
    }, 1500).call(
        () => {
            createjs.Tween.get(linesShape).to({
                y: 0
            }, 1500, createjs.Ease.quintOut).call(() => {
                createjs.Tween.get(arrowRightShape).to({
                    alpha: 1
                }, 1000)
                createjs.Tween.get(navbarContainer).to({
                    alpha: 1
                }, 1000)
                clickAllowed = true
            })
        }
    )
}

function handleDown(e) {
    if (!clickAllowed || slideIndex === 0) return
    const mousePoint = { x: stage.mouseX - canvas.width / 2, y: stage.mouseY - (canvas.height / 2 - paddingTop) }
    shapeMask.offsetX = (stage.mouseX - canvas.width / 2) - shapeMask.x
    shapeMask.offsetY = (stage.mouseY - canvas.height / 2) - shapeMask.y
    const dist = distance(mousePoint, shapeMask);
    if (dist < maskRadius) {
        isDragging = true;
    };

    onDrag(e);
}

function handleUp(e) {
    if (!clickAllowed || slideIndex === 0) return
    isDragging = false;
}

function handleMove(e) {
    if (!clickAllowed || slideIndex === 0) return
    if (isDragging) onDrag(e);
}

function handleGlassDown(e) {
    e.currentTarget.offsetX = (stage.mouseX - canvas.width / 2) - e.currentTarget.x
    e.currentTarget.offsetY = (stage.mouseY - canvas.height / 2) - e.currentTarget.y
}

function handleGlassUp(e) {
    // just in case
}

function handleGlassMove(e) {
    e.currentTarget.set({
        x: stage.mouseX - canvas.width / 2 - e.currentTarget.offsetX,
        y: stage.mouseY - canvas.height / 2 - e.currentTarget.offsetY,
    })

    if (e.currentTarget.x < -(currentImage.width / 2) * currentImage.minDezoom) e.currentTarget.x = -(currentImage.width / 2) * currentImage.minDezoom
    if (e.currentTarget.x > (currentImage.width / 2) * currentImage.minDezoom) e.currentTarget.x = (currentImage.width / 2) * currentImage.minDezoom

    if (e.currentTarget.y < -(currentImage.height / 2) * currentImage.minDezoom) e.currentTarget.y = -(currentImage.height / 2) * currentImage.minDezoom
    if (e.currentTarget.y > (currentImage.height / 2) * currentImage.minDezoom) e.currentTarget.y = (currentImage.height / 2) * currentImage.minDezoom

    shapeMask.set({
        x: e.currentTarget.x,
        y: e.currentTarget.y,
    })
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