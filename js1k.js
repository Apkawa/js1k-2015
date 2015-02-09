crs = 250; // текущий курс
tv = -1; // Направление на vor (-1 - на, +1 - от)
nv = 0; // Текущий vor

T = 150;
v = (250 / 3600) * (T / 1000); // Скорость
pos = [5, 5];

vrs = [
    {
        r: 250, // Выбранный радиал
        cr: 250, // текущий радиал
        p: [0, 0] // Позиция
    },
    {
        r: 96,
        cr: 50,
        p: [0, 0] //
    }
];

cx = a.width / 2;
cy = a.height / 2 + 200;


b.onkeydown = function (e) {
    k = e.keyCode;
    v = vrs[nv];
    k == 37 && [crs--, D(0, 1)];
    k == 39 && [crs++, D(0, 1)];
    k == 38 && v.r--;
    k == 40 && v.r++;
    if (k == 32) nv ^= 1;
};

pi = Math.PI;
tau = 2 * pi;
cos = Math.cos;
sin = Math.sin;
abs = Math.abs;
br = 150;
sw = "NESW";
w = '#FFF'

function d360(x) {
    x -= pi / 2;
    return (x >= 0 ? x : (2 * pi + x)) * 180 / pi
}

c.font = "25px arial";
c.textAlign = "center";
c.lineWidth = 2;

function D(n, t) {
    y = cy - n * 420;
    x = cx - (t || 0) * 420;
    i = -100;
    v = vrs[n];
    r = t ? crs : v.r;
    tv = v.tv;
    ofs = t ? 0 : (v.cr - r);
    c.strokeStyle = w;
    c.translate(x, y);
// Фон
    c.beginPath();
    c.arc(0, 0, 200, 0, 2 * pi, false);
    c.fillStyle = '#000';
    c.fill();
    c.fillStyle = w;
    if (!t) {
// Шкала отклонения от радиала
        for (; i < 120; i += 20) {
            c.beginPath();
            c.arc(i, 0, i ? 2 : 8, 0, tau, false);
            c.stroke();
        }
    }
// Индикатор отклонения
    c.beginPath();
    c.rect(abs(ofs) > 5 ? (ofs < 0 ? -1 : 1) * 100 : ofs * 100 / 5 - 2,
        -100, 4, 200);
    c.fill();

// Указатель радиала
    c.moveTo(0, -145);
    c.lineTo(-5, -140);
    c.lineTo(5, -140);
    c.fill();

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
    c.restore();
    c.translate(-x, -y);

}

setInterval(function () {
        var n = vrs.length + 1;
        while (1 < n--) {
            v = vrs[n - 1];
            v.cr = d360(Math.atan2(v.p[1] - pos[1], v.p[0] - pos[0]));
        }
        D(1);
        D(0);
        D(0, 1);
    },
    150);


