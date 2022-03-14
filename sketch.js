let colors2 = ["#C61D34", "#EFD7B3", "#580D14", "#F42444", "#4C1F22", "#1F1715", "#86663F", "#BD9F7A", "#5C5958", "#A0121B", "#C70A27"]; //cheesecake
let colors1 = ["#004E65", "#136E80", "#5E8886", "#EA9F42", "#FFDEBB", "#6F5B50", "#F6AA07", "#426974", "#1EA7C2", "#9BC5C3", "#F88C06"]; //sunrise
let colors = ["#FD0D00", "#A50301", "#4D0101", "#6E8104", "#173008", "#FFC000", "#C2C8D4", "#9FA3AD", "#F8D56B", "#2F4D1D", "#A0BC04"]; //poopy
let colors3 = ["#36025F", "#8C32CA", "#DA2DAE", "#FF95FF", "#FF1F3C", "#6272DD", "#A0D100", "#6A06B9", "#B049F7", "#F807BB", "#711171"]; //pcordobes
let colors4 = ["#e9ecef", "#dee2e6", "#ced4da", "#adb5bd", "#6c757d", "#d4d700", "#9ef01a", "#C7EC8C", "#F6F905", "#9FA2A5", "#CBCFD3"]; //blue/gray
let colors5 = ["#f94144", "#f3722c", "#f8961e", "#f9c74f", "#90be6d", "#43aa8b", "#577590", "#D43739", "#FD5A01", "#D37604", "#3F6B1D" ]; // Multicol
let colors6 = ["#d8f3dc", "#b7e4c7", "#95d5b2", "#74c69d", "#52b788", "#40916c", "#2d6a4f", "#0C6A40", "#5A9077", "#5FD49D", "#95C6AE"]; // green
let fondo = ["#B6AD90", "#C2C5AA", "#A8DADC", "#CDB4DB", "#95D5B2", "#D8F3DC", "#FFBA08", "#582f0e", "#936639", "#4361ee", "#3a0ca3", "#ffafcc", "#9d4edd", "#ff4d6d", "#dab6fc", "#e07a5f", "#fdffb6", "#ffea00","#e5dcc5","#ffffff"];
let paleta = [colors, colors1, colors2, colors3, colors4, colors5, colors6];
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let DIM = Math.min(WIDTH, HEIGHT);
let tokenData = genTokenData(299);
let tkid = tokenData.tokenId;
let seed = parseInt(tokenData.hash.slice(0, 16), 16)
let R, fg, forms = [], bgCol, wid

function setup() {
    createCanvas(DIM, DIM);
    R = new Random(seed)
    translate(WIDTH / 2, HEIGHT / 2);
    translate(-WIDTH / 2, -HEIGHT / 2);
    centerCanvas();
	init();
}

function draw() {
   
	background(bgCol);

	for (let i of forms) {
		i.show();
		i.move();
	}
}

function init() {
    bgCol = R.random_choice(fondo);
    dstrd = R.random_int(0, 10);    
    let rdf = R.random_int(0, 3);
    if (rdf >= 1) {
        rdmFm1 = R.random_int(0, 6);
        addForms();
        console.log(tkid);
    } else {
        rdmFm2 = R.random_int(0, 2);
        rdmFm2b = R.random_int(0, 5);
        addForms2();
    }
}

function addForms2() {

    let cols = 14, rows = cols, cellW = DIM / cols, cellH = DIM / rows, dst, cols1 = [], cols2 = [];

    if (tkid % 2 == 0) paleta.reverse();

    if (rdmFm2 == 1) {
        cols1 = R.random_choice(paleta);
        const index = paleta.indexOf(cols1)
        paleta.splice(index, 1);
        cols2 = R.random_choice(paleta);
    } else {
        for (let t = 0; t < 7; t++) {
            cols1.push(paleta[t][R.random_int(0, 10)]);
        }
        cols2 = cols1.slice(5, 7);
    }

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {

            let x = i * cellW;
            let y = j * cellH;
            let d = cellW / 2;

            if (x + cellW + cellW / 2 < width) {
                if (y + cellH + cellH / 2 < height) {
                    let r = R.random_int(0, 3);
                    dst = d * 2;
                    switch (r) {
                        case 0:
                            forms.push(new LineMove2(x + cellW + cellW / 2, y + cellH / 2, dst, cols1[0], d / 2, R.random_int(0, 10)));
                            break;
                        case 1:
                            forms.push(new LineMove2(x + cellW / 2, y + cellH / 2, dst, cols1[1], d / 2, R.random_int(0, 10)));
                            break;
                        case 2:
                            if (rdmFm2 == 1) { forms.push(new LineMove2(x + cellW + cellW / 2, y + cellH / 2, dst, cols1[2], d, R.random_int(0, 10))); }
                            else { forms.push(new LineMove2(x + cellW + cellW / 2, y + cellH / 2, dst, cols1[2], d / 2, R.random_int(0, 10))); }
                            break;
                        case 3:
                            forms.push(new LineMove2(x + cellW + cellW / 2, y + cellH / 2, dst, cols1[3], d, R.random_int(0, 10)));
                            break;
                    }
                }
            }
        }
    }

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {

            let x = i * cellW;
            let y = j * cellH;
            let d = cellW / 2;

            if (random(100) < 50) {
                if (rdmFm2 == 1) {
                    forms.push(new Circulo2(x + cellW / 2, y + cellH / 2, d, cols2[0]));
                    forms.push(new Circulo2(x + cellW / 2, y + cellH / 2, d / 2, cols2[1]));
                } else {
                    forms.push(new RectStatic(x + cellW / 2, y + cellH / 2 , d/2, d/2, cols2[0], d/2));
                    forms.push(new RectStatic(x + cellW / 2, y + cellH / 2, d/3, d/3, cols2[1], d/3));
                }
            }
        }
    }

}

class LineMove2 {
    constructor(x, y, w, col, stw, rdnl) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.a = int(random(4)) * PI * 0.5;
        this.l = int(random(2)) * this.w * 1.8;
        this.init();
        this.col = col;
        this.stw = stw;
        this.nl = rdnl;
    }

    show() {

        push();
        translate(this.x, this.y);
        rotate(this.a);
        fill(this.col);
        stroke(this.col);
        strokeWeight(this.stw);
        if (rdmFm2b <= 3) {
            if (this.nl < 6) {
                line(0, 0, this.w, 0)
            } else if (this.nl < 7) {
                line(0, 0, this.w, 0)
                line(0, -this.w, 0, 0);
            } else if (this.nl < 8) {
                line(0, 0, this.w, 0)
                line(this.w, -this.w, this.w, 0);
            } else if (this.nl < 9) {
                noFill();
                if (rdmFm2 == 1) { arc(0, 0, -this.w * 2, this.w * 2, 0, PI / 2); }
            } else {
                if (int(this.w) > 20) { if (rdmFm2 == 1) triangle(0, -this.w * 0.4, this.w * 0.25, 0, -this.w * 0.25, 0); }
                else { line(0, 0, -this.w, 0) }
            }
        } else if (rdmFm2b == 4) {
            if (this.nl < 6) {
                line(0, 0, this.w, 0)
            } else if (this.nl < 7) {
                line(0, 0, this.w, 0)
                line(0, -this.w, 0, 0);
            } else if (this.nl < 8) {
                line(0, 0, this.w, 0)
                line(0, -this.w, this.w, 0);
            } else if (this.nl < 9) {
                noFill();
                if (rdmFm2 == 1) { arc(0, 0, -this.w * 2, this.w * 2, 0, PI / 2); }
            } else {
                if (int(this.w) > 20) { if (rdmFm2 == 1) triangle(0, -this.w * 0.4, this.w * 0.25, 0, -this.w * 0.25, 0); }
                else { line(0, 0, -this.w, 0) }
            }
        } else {
            if (this.nl < 6) {
                line(0, 0, this.w, 0)
            } else if (this.nl < 7) {
                line(0, 0, this.w, 0)
                line(0, this.w, -this.w, 0);
            } else if (this.nl < 8) {
                line(0, 0, this.w, 0)
                line(this.w, -this.w, this.w, 0);
            } else if (this.nl < 9) {
                noFill();
                if (rdmFm2 == 1) { arc(0, 0, -this.w * 2, this.w * 2, 0, PI / 2); }
            } else {
                if (int(this.w) > 20) { if (rdmFm2 == 1) triangle(0, -this.w * 0.4, this.w * 0.25, 0, -this.w * 0.25, 0); }
                else { line(0, 0, -this.w, 0) }
            }

        }
        pop();
    }

    move() {
        if (this.t > 0) {
            if (this.rnd == 0) {
                this.a = lerp(this.a0, this.a1, easeInOutQuad(this.t));
            }
        }
        this.t += this.step;
        if (this.t >= 1) {
            this.init();
        }
    }

    init() {
        this.t = -0.5;
        this.rnd = int(random(20));
        this.step = 1 / 60;
        this.a0 = this.a;
        this.a1 = int(random(4)) * PI * 0.5;
        this.l0 = this.l;
        this.l1 = int(random(2)) * this.w * 1.8;
    }
}

class Circulo2 {
    constructor(x, y, w, col) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.col = col;
    }

    show() {
        push();
        translate(this.x, this.y);
        noStroke();
        fill(this.col);
        circle(0, 0, this.w);
        pop();
    }

    move() { }

    init() { }
}

function addForms() {
	forms.length = 0;
    let seg = 6;
    let wx = 0.8;
    if (DIM >= 1000) { seg = 8; }
    else if (DIM >= 700) { seg = 7; }
    else if (DIM <= 550) { seg = 5; wx = 0.75 }
    if (WIDTH > HEIGHT) { w = HEIGHT / seg; } else { w = WIDTH / seg;}
    w = DIM / seg;
	for (let i = 0; i < seg; i++) {
		for (let j = 0; j < seg; j++) {
            let x = i * w + w / 2;
            let y = j * w + w / 2;
            shape(x, y, w * wx);
		}
	}
}

function shape(x, y, w) {
    let nn = 3;
    let lines = [];
    let ww = w / nn;
    let col1;
    let col2;
    let col3;
    let col4;
    if (tkid % 2 == 0) {
        col1 = R.random_choice(paleta[3]);
        col2 = R.random_choice(paleta[1]);
        col3 = R.random_choice(paleta[2]);
        col4 = R.random_choice(paleta[6]);
    } else if (tkid % 5 == 0) {
        arrcol = R.random_choice(paleta);
        if (R.random_int(0, 1) == 0) {
            col1 = arrcol[0];
            col2 = arrcol[1];
            col3 = arrcol[2];
            col4 = arrcol[3];
        } else {
            col1 = arrcol[7];
            col2 = arrcol[8];
            col3 = arrcol[9];
            col4 = arrcol[10];
        }
    } else {
        col1 = R.random_choice(paleta[0]);
        col2 = R.random_choice(paleta[4]);
        col3 = R.random_choice(paleta[6]);
        col4 = R.random_choice(paleta[5]);
    }
    for (let i = 0; i < nn; i++) {
        for (let j = 0; j < nn; j++) {
            let xx = x + map(i, 0, nn, 0, w) - (w / 2) + (ww / 2);
            let yy = y + map(j, 0, nn, 0, w) - (w / 2) + (ww / 2);
            let dr = R.random_int(0, 5);
            let len = (R.random_int(0, nn - 2) * ww);
            let ex = len;
            let ey = 0;
            if (dr == 1) {
                ex = -len
            } else if (dr == 2) {
                ex = 0;
                ey = len;
            } else if (dr == 3) {
                ex = 0;
                ey = -len;
            }
            if ((xx + ex) < (x - w / 2) || (xx + ex) > (x + w / 2) || (yy + ey) < (y - w / 2) || (yy + ey) > (y + w / 2)) {
                if (int(random(0, 2)) == 0) {
                    if (((x + len / 2) + w) > DIM) { ex = 0; } else { ex = len / 2; }
                    ey = 0;
                } else {
                    ex = 0;
                    if (((y + len / 2) + w) > DIM) { ey = 0; } else { ey = len - 6; }
                }
            }

            let dst = dist(xx, yy, xx + ex, yy + ey);
            if (dst == 0) {
                dst = R.random_num(20, 30);
            }
            else {
                if (dstrd < 6) {
                    if (int(dst) % 2 == 0) dst = dst + (dst * 0.4);
                }
            }
            lines.push({ x1: xx, y1: yy, x2: xx + ex, y2: yy + ey, w1: dst });
        }
    }

    let stw = w * 0.30;
    let fg = R.random_int(0, 3);
    for (let l of lines) {
        switch (fg) {
            case 0:
                forms.push(new LineMove(l.x1, l.y1, l.w1, col1, stw, R.random_num(0, 10)));
                stw = w * 0.02;
                break;
            case 1:
                stw = w * 0.18;
                forms.push(new LineMove(l.x1, l.y1, l.w1, col1, stw, R.random_num(0, 10)));
                break;
            case 2:
            case 3:
                forms.push(new Elipse(l.x2, l.y2, l.w1 * 0.15, l.w1 * 0.15, col1, stw));
                stw = w * 0.02;
                break;
        }
    }

    stw = w * 0.18;
    for (let l of lines) {
        switch (fg) {
            case 0:
                if (tkid % 2 == 0) {
                    if (R.random_int(0, 1) == 1) forms.push(new LineMove(l.x1, l.y1, l.w1, col1, stw, R.random_num(0, 10)));
                } else {
                    forms.push(new LineMove(l.x1, l.y1, l.w1, col2, stw, R.random_num(0, 10)));
                }
                break;
            case 1:
                if (tkid % 2 == 0) {
                    if (R.random_int(0, 1) == 1) forms.push(new Circulo(l.x1, l.y1, 5, col2, 5));
                } else {
                    forms.push(new Circulo(l.x1, l.y1, 5, col2, 5));
                }
                
                break;
            case 2:
                stw = w * 0.18;
                if (tkid % 2 == 0) {
                    if (R.random_int(0, 1) == 1) forms.push(new LineMove(l.x1, l.y1, l.w1, col2, stw, R.random_num(0, 10)));
                } else {
                    forms.push(new LineMove(l.x1, l.y1, l.w1, col2, stw, R.random_num(0, 10)));
                }
                break;
            case 3:
                if (tkid % 2 == 0) {
                    if (R.random_int(0, 1) == 1) {
                        stw = w * 0.20;
                        forms.push(new DrawLines(l.x1, l.y1, l.w1, col2));
                        forms.push(new RectStatic(l.x2, l.y2, 1, 1, col4, stw));
                    } else {
                        forms.push(new RectMove(l.x1, l.y1, 1, 1, col2, stw));
                    }
                }else {
                    if (R.random_int(0, 1) == 1) {
                        forms.push(new RectStatic(l.x2, l.y2, 1, 1, col2, stw));
                    } else {
                        forms.push(new RectMove(l.x1, l.y1, 1, 1, col2, stw));
                    }
                    
                }
                break;
        }
    }

    stw = R.random_int(5, 11);
    stroke(col3)
    for (let l of lines) {
        if (tkid % 2 == 0) {
            forms.push(new PointStatic(l.x1, l.y1, col3, stw));
        } else {
            forms.push(new PointStatic(l.x1, l.y1, col3, stw));
            if (R.random_int(0, 1) == 1) forms.push(new PointStatic(l.x1, l.y1, col4, stw));
        }
    }
}

function easeInOutQuad(x) {
	return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
}

class LineMove {
	constructor(x, y, w, col, stw, rdnl) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.a = int(random(4)) * PI * 0.5;
		this.l = int(random(2)) * this.w * 1.8;
		this.init();
        this.col = col;
        this.stw = stw;
        this.nl = rdnl;
	}

    show() {
        
        push();
        translate(this.x, this.y, this.w);
		rotate(this.a);
        stroke(this.col);        
        strokeWeight(this.stw);

        if (rdmFm1 <= 1) {
            if (this.nl < 7) {
                line(0, 0, this.w, 0)
            } else if (this.nl < 8) {
                line(0, 0, this.w, 0)
            } else if (this.nl < 9) {
                line(0, 0, this.w, 0)
            } else {
                if (int(this.w) > 20) { triangle(0, -this.w * 0.4, this.w * 0.25, 0, -this.w * 0.25, 0); }
                else {line(0, -this.w, 0, 0, )}
            }
        } else if (rdmFm1 == 2) {
            if (this.nl < 7) {
                line(0, 0, this.w, 0)
            } else if (this.nl < 8) {
                line(0, 0, this.w, 0)
                line(0, -this.w, 0, 0);
            } else if (this.nl < 9) {
                noFill();
                arc(0, 0, -this.w * 2, this.w * 2, 0, PI/2);
            } else {
                if (int(this.w) > 20) { triangle(0, -this.w * 0.4, this.w * 0.25, 0, -this.w * 0.25, 0); }
                else {
                    line(0, 0, -this.w, 0)
                }
            }
        } else {
            if (this.nl < 7) {
                line(0, 0, -this.w, 0)
            } else if (this.nl < 8) {
                line(0, 0, this.w, 0)
            } else if (this.nl < 9) {
                line(0, -this.w, this.w, 0);
            } else {
                if (int(this.w) > 20) { triangle(0, -this.w * 0.4, this.w * 0.25, 0, -this.w * 0.25, 0); }
                else {
                    line(0, 0, -this.w, 0)
                }
            }

        }

		pop();
	}

	move() {
		if (this.t > 0) {
            if (this.rnd == 0) {
				this.a = lerp(this.a0, this.a1, easeInOutQuad(this.t));
			}
		}
		this.t += this.step;
		if (this.t >= 1) {
			this.init();
		}
	}

	init() {
		this.t = -0.5;
		this.rnd = int(random(20));
		this.step = 1 / 45;
		this.a0 = this.a;
		this.a1 = int(random(4)) * PI * 0.5;
		this.l0 = this.l;
		this.l1 = int(random(2)) * this.w * 1.8;
	}
}

class DrawLines {
    constructor(x, y, w, col) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.col = col;
        this.rnd = R.random_int(1, 4);
    }

    show() {
        if ((this.y + this.w) < HEIGHT && (this.x + this.w) < DIM) {
            push();
            translate(this.x + this.w / 2, this.y + this.w / 2);
            rotate(this.rnd * (TAU / 4));
            stroke(this.col);
            strokeWeight(this.w * 0.1);
            line(this.w / 2, this.w / 2, -this.w / 2, this.w / 2);
            pop();
        }
    }

    move() { }

    init() { }
}

class Elipse {
    constructor(x, y, w, h, col, stw) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = col;
        this.stw = stw;
    }

    show() {
        push();
        translate(this.x, this.y);
        stroke(this.col);
        strokeWeight(this.stw);
        ellipse(0, 0, this.w, this.h);
        pop();
    }

    move() {}

    init() {}
}

class PointStatic {
    constructor(x, y, col, stw) {
        this.x = x;
        this.y = y;
        this.col = col;
        this.stw = stw;
    }

    show() {
        push();
        translate(this.x, this.y);
        stroke(this.col);
        strokeWeight(this.stw * 0.8);
        point(0, 0);
        pop();
    }

    move() { }

    init() { }
}


class Circulo {
    constructor(x, y, w, col, stw) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.col = col;
        this.stw = stw;
    }

    show() {
        push();
        translate(this.x, this.y);
        stroke(this.col);
        strokeWeight(this.stw);
        ellipse(0, 0, this.w);
        pop();
    }

    move() { }

    init() { }
}

class RectMove {
    constructor(x, y, w, h, col, stw) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = int(random(4)) * PI * 0.5;
        this.l = int(random(2)) * this.w * 1.8;
        this.init();
        this.col = col;
        this.stw = stw;
    }

    show() {
        push();
        translate(this.x, this.y);
        rotate(this.a);
        fill(this.col);
        stroke(this.col);
        strokeWeight(this.stw);
        let sw = this.w;
        rect(0, 0, sw, sw, 0);
        pop();
    }

    move() {
        if (this.t > 0) {
           this.a = lerp(this.a0, this.a1, easeInOutQuad(this.t));
        }
        this.t += this.step;
        if (this.t >= 1) {
            this.init();
        }
    }

    init() {
        this.t = -0.5;
        this.rnd = int(random(20));
        this.step = 1 / 60;
        this.a0 = this.a;
        this.a1 = int(random(4)) * PI * 0.5;
        this.l0 = this.l;
        this.l1 = int(random(2)) * this.w * 1.8;
    }
}

class RectStatic {
    constructor(x, y, w, h, col, stw) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = col;
        this.stw = stw;
    }

    show() {
        push();
        translate(this.x, this.y);
        rotate(PI / 4.0);
        fill(this.col);
        stroke(this.col);
        strokeWeight(this.stw);
        let sw = this.w;
        rect(0, 0, sw, sw, 0);
        pop();
    }

    move() {}

    init() {}
}

function genTokenData(projectNum) {
    let data = {};
    let hash = "0x";
    for (var i = 0; i < 64; i++) {
        hash += Math.floor(Math.random() * 16).toString(16);
    }
    data.hash = hash;
    data.tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();
    return data;
}

function centerCanvas() {
    var e = document.body.style;
    e.display = "flex", e.height = "100vh", e.alignItems = "center", e.justifyContent = "center"
}

class Random {
    constructor(e) {
        this.seed = e
    }
    random_dec() {
        return this.seed ^= this.seed << 13, this.seed ^= this.seed >> 17, this.seed ^= this.seed << 5, (this.seed < 0 ? 1 + ~this.seed : this.seed) % 1e3 / 1e3
    }
    random_num(e, r) {
        return e + (r - e) * this.random_dec()
    }
    random_int(e, r) {
        return Math.floor(this.random_num(e, r + 1))
    }
    random_choice(e) {
        return e[Math.floor(this.random_num(0, .99 * e.length))]
    }
}