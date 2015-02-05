rad = 250; // Выбранный радиал
crs = 250; // текущий курс
crad = 250; // Текущий радиал

tv = -1; // Направление на vor (-1 - на, +1 - от)
nv = 0; // Текущий vor

vrs = [
    {r: 250,
        cr: 250,
        tv: -1
    },
    {r: 96, cr: 50, tv: 1}
]

cx = a.width / 2;
cy = a.height / 2 + 200;


b.onkeydown = function (e) {
    k = e.keyCode;
    v = vrs[nv];
    k == 37 && [v.cr--, D(0, 1)];
    k == 39 && [v.cr++, D(0, 1)];
    k == 38 && v.r--;
    k == 40 && v.r++;
    if (k == 32) nv ^= 1;
    D(0);
    D(1);
    console.log(k)
};

pi = Math.PI;
tau = 2 * pi;
cos = Math.cos;
sin = Math.sin;
abs = Math.abs;
br = 150;
sw = "NESW";
w = '#FFF'

c.font = "25px arial";
c.textAlign = "center";
c.lineWidth = 2;

function D(n, t) {
    y = cy - n*420;
    x = cx - (t||0) * 400;
    i = -100;
    r = vrs[n].r
    tv = vrs[n].tv
    ofs = (vrs[n].cr - r);
    c.strokeStyle = w;
    c.translate(x, y);
// Фон
    c.arc(0, 0, 200, 0, 2 * pi, false);
    c.fillStyle = '#000';
    c.fill();

    //// Фон текущего курса
    //c.rect(-50, -280, 100, 50);
    //c.fill()
    //// Текущий курс
    //c.fillText(crs, 0, -245);

// Шкала отклонения от радиала
    for (; i < 120; i += 20) {
        c.beginPath();
        c.arc(i, 0, i ? 2 : 8, 0, tau, false);
        c.stroke();
    }

// Индикатор отклонения
    _o = abs(ofs) > 5 ? (ofs<0?-1:1) * 100 : ofs * 100 / 5;
    c.rect(_o - 2, -100, 4, 200);
    c.fillStyle = w;
    c.fill();
    c.stroke();


// Направление на VOR
    c.moveTo(55, 10 * tv);
    c.lineTo(55 + 30, 10 * tv);
    c.lineTo(55 + 15, 30 * tv);
    c.fill();
    c.stroke();

// Указатель радиала
    c.moveTo(0, -145);
    c.lineTo(-5, -140);
    c.lineTo(5, -140);
    c.fill();
    c.stroke();

// Настройка на радиал (поворот шкалы)
    c.save();
    c.rotate(-r * pi / 180);
    c.translate(-x, -y);

    for (i = 0; i < 360; i += 5) {
        aR = (tau * i / 360) - (tau / 4);
        ls = i % 10 ? 5 : i % 30 ? 10 : 15;
        car = cos(aR);
        sar = sin(aR);
        fx = x + car * br;
        fy = y + sar * br;
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
    c.translate(-x, -y);
    c.closePath();

}

D(1);
D(0);
D(0, 1);

