rad = 250; // Выбранный радиал
crs = 250; // текущий курс
crad = 250; // Текущий радиал
tv = -1; // Направление на vor (-1 - на, +1 - от)

b.onkeyup = function (e) {
    k = e.keyCode;
    k == 37 && crs--;
    k == 39 && crs++;
    k == 38 && rad--;
    k == 40 && rad++;
    D()
    console.log(k, crad)
}

tau = 2 * Math.PI;
cx = a.width / 2;
cy = a.height / 2;
pi = Math.PI;
cos = Math.cos;
sin = Math.sin;
abs = Math.abs;
br = 150;
sw = "NESW";
w = '#FFF'

c.font = "25px arial";
c.textAlign = "center";
c.lineWidth = 2;

function D() {
    i = -100;
    ofs = (crad - rad);
    c.strokeStyle = w;
    c.translate(cx, cy);
// Фон
    c.arc(0, 0, 200, 0, 2 * pi, false);
    c.fillStyle = '#000';
    c.fill();

    // Фон текущего курса
    c.rect(-50, -280, 100, 50);
    c.fill()

// Шкала отклонения от радиала
    for (; i < 120; i += 20) {
        c.beginPath();
        c.arc(i, 0, i ? 2 : 8, 0, 2 * pi, false);
        c.stroke();
    }

// Индикатор отклонения
    _o = abs(ofs) > 5 ? 100 : ofs * 100 / 5;
    c.rect(_o - 2, -100, 4, 200);
    c.fillStyle = w;
    c.fill();

    // Текущий курс
    c.fillText(crs, 0, -245);

// Направление на VOR
    c.moveTo(55, 10 * tv);
    c.lineTo(55 + 30, 10 * tv);
    c.lineTo(55 + 15, 30 * tv);
    c.fill();

// Указатель радиала
    c.moveTo(0, -145);
    c.lineTo(-5, -140);
    c.lineTo(5, -140);
    c.fill();

// Настройка на радиал (поворот шкалы)
    c.save();
    c.rotate(-rad * pi / 180);
    c.translate(-cx, -cy);

    for (i = 0; i < 360; i += 5) {
        aR = (tau * i / 360) - (tau / 4);
        ls = i % 10 ? 5 : i % 30 ? 10 : 15;
        car = cos(aR);
        sar = sin(aR);
        fx = cx + car * br;
        fy = cy + sar * br;
        tx = fx + car * ls;
        ty = fy + sar * ls;
        nx = tx + car * 5;
        ny = ty + sar * 5;

        c.moveTo(fx, fy);
        c.lineTo(tx, ty);
        c.stroke();

        if ((i % 30) == 0) {
            c.save();
            c.translate(nx, ny);
            c.rotate(i * pi / 180);
            c.translate(-nx, -ny);
            c.fillText(i % 90 ? i : sw[i / 90], nx, ny);
            c.restore();
        }
    }
    c.restore()
    c.translate(-cx, -cy);

}

D()

