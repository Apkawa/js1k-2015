rad = 25.0; // Выбранный радиал
crad = 21.5; // Текущий радиал
tv = -1; // Направление на vor (-1 - на, +1 - от)

tau = 2 * Math.PI;
cx = a.width / 2;
cy = a.height / 2;
pi = Math.PI;
cos = Math.cos;
sin = Math.sin;
abs = Math.abs;
i = -100;
br = 150;
sw = {0: "N", 90: "E", 180: "S", 270: "W"};
ofs = (crad - rad)

c.lineWidth = 2;
c.strokeStyle = '#FFF';
c.font = "25px arial";
c.textAlign = "center";

// Фон
c.beginPath();
c.arc(cx, cy, 200, 0, 2 * pi, false);
c.fillStyle = 'black';
c.fill();
c.stroke();

// Шкала отклонения от радиала
for (; i < 120; i += 20) {
    c.beginPath();
    c.arc(cx + i, cy, i ? 2 : 5, 0, 2 * Math.PI, false);
    c.stroke();
}

// Индикатор отклонения
c.beginPath();
ofs = abs(ofs) > 5 ? 5 : ofs * 100 / 5;
c.rect(cx + ofs - 2, cy - 100, 4, 200);
c.fillStyle = "#FFF";
c.fill();
c.stroke();


// Направление на VOR
c.beginPath();
c.moveTo(cx + 55, cy + 10 * tv);
c.lineTo(cx + 55 + 30, cy + 10 * tv);
c.lineTo(cx + 55 + 15, cy + 30 * tv);
c.closePath();
c.fill();
c.stroke();

// Указатель радиала
c.beginPath();
c.moveTo(cx, cy - br + 5);
c.lineTo(cx - 5, cy - br + 10);

c.lineTo(cx + 5, cy - br + 10);
c.closePath();
c.fill();
c.stroke();

// Настройка на радиал
c.translate(cx, cy);
c.rotate(rad * pi / 180);
c.translate(-cx, -cy);

for (i = 0; i < 360; i += 5) {

    var aR = (tau * i / 360) - (tau / 4),
        ls = i % 10 ? 5 : i % 30 ? 10 : 15,
        car = cos(aR),
        sar = sin(aR),
        fx = cx + car * br,
        fy = cy + sar * br,
        tx = fx + car * ls,
        ty = fy + sar * ls,
        nx = tx + car * 5,
        ny = ty + sar * 5
        ;

    c.beginPath();
    c.moveTo(fx, fy);
    c.lineTo(tx, ty);
    c.stroke();
    c.save();

    if ((i % 30) == 0) {
        c.translate(nx, ny);
        c.rotate(i * pi / 180);
        c.translate(-nx, -ny);
        c.fillText(sw[i] || i.toString(), nx, ny);
        c.restore();
    }
}


