const canvas = document.getElementById("scratch");
const ctx = canvas.getContext("2d");

let isDrawing = false;

function resizeCanvas() {

    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    drawCover();
}

function drawCover() {

    // สีพื้นการ์ด
    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = "#b9b9b9";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // ข้อความบนแผ่นขูด
    ctx.fillStyle = "#666";

    ctx.font = "bold 28px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "✨ ขูดตรงนี้ ✨",
        canvas.width / 2,
        canvas.height / 2
    );

    ctx.font = "18px Arial";

    ctx.fillText(
        "ใช้มือขูดเพื่อเปิดดู",
        canvas.width / 2,
        canvas.height / 2 + 40
    );
}

function scratch(x, y) {

    ctx.globalCompositeOperation =
        "destination-out";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        25,
        0,
        Math.PI * 2
    );

    ctx.fill();
}

function getPosition(e) {

    const rect =
        canvas.getBoundingClientRect();

    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

canvas.addEventListener(
    "pointerdown",
    function(e) {

        isDrawing = true;

        const pos = getPosition(e);

        scratch(pos.x, pos.y);

        canvas.setPointerCapture(e.pointerId);
    }
);

canvas.addEventListener(
    "pointermove",
    function(e) {

        if (!isDrawing) return;

        const pos = getPosition(e);

        scratch(pos.x, pos.y);
    }
);

canvas.addEventListener(
    "pointerup",
    function() {

        isDrawing = false;
    }
);

canvas.addEventListener(
    "pointercancel",
    function() {

        isDrawing = false;
    }
);

window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();
