let canvasW, canvasH, canvas;

function init() {
    canvas = document.getElementById("myCanvas");
    const stage = new createjs.Stage(canvas);
    resize();

    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick(event) {
        stage.update();
    }

    setUp(stage)
}

function setUp(st) {
    let g = new createjs.Graphics();
    g.setStrokeStyle(1);
    g.beginStroke("#000000");
    g.beginFill("white");
    g.drawRect(0, 0, canvas.width, canvas.height);

    let sh = new createjs.Shape(g);

    console.log(canvasW, canvasH)

    st.addChild(sh)
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