let colors2 = ["#C61D34", "#EFD7B3", "#580D14", "#F42444", "#4C1F22", "#1F1715", "#86663F", "#BD9F7A", "#5C5958", "#A0121B", "#C70A27", "#DCE6F2"]; //cheesecake
let colors1 = ["#004E65", "#136E80", "#5E8886", "#EA9F42", "#FFDEBB", "#6F5B50", "#F6AA07", "#426974", "#1EA7C2", "#9BC5C3", "#F88C06", "#83A603"]; //sunrise
let colors = ["#FD0D00", "#D90602", "#4D0101", "#6E8104", "#173008", "#FFC000", "#C2C8D4", "#9FA3AD", "#F8D56B", "#2F4D1D", "#A0BC04", "#BF6550"]; //poopy
let colors3 = ["#36025F", "#8C32CA", "#DA2DAE", "#DD82DD", "#FF1F3C", "#919BDE", "#A0D100", "#6A06B9", "#B049F7", "#F807BB", "#711171", "#730217"]; //pcordobes
let colors7 = ["#F23D91", "#F079F2", "#5F72D9", "#83A603", "#F22727", "#F241A3", "#F063F2", "#97BF04", "#F22222", "#F2F2F2", "#F1B3F2", "#4659C9"] //pcordobes2
let colors4 = ["#BFCAD5", "#dee2e6", "#ced4da", "#adb5bd", "#6c757d", "#d4d700", "#9ef01a", "#C7EC8C", "#F6F905", "#9FA2A5", "#CBCFD3", "#280459"]; //blue/gray
let colors5 = ["#f94144", "#f3722c", "#f8961e", "#f9c74f", "#90be6d", "#43aa8b", "#577590", "#D43739", "#FD5A01", "#D37604", "#3F6B1D", "#3C5911" ]; // Multicol
let colors6 = ["#d8f3dc", "#b7e4c7", "#95d5b2", "#74c69d", "#52b788", "#40916c", "#2d6a4f", "#0C6A40", "#5A9077", "#5FD49D", "#95C6AE", "#83A603"]; // green
let fondo = ["#D0A519", "#C2C5AA", "#8BBCBD", "#CDB4DB", "#D8F3DC", "#FD8A03", "#883E03", "#936639", "#4361ee", "#3a0ca3", "#F8C9DA", "#9d4edd", "#F992A5", "#dab6fc", "#DFAB8F", "#fdffb6", "#e5dcc5", "#ffffff", "#A6B996", "#4C3033", "#E7C02C", "#0B682D", "#20C282", "#506431", "#F6F4F2", "#8F7791", "#B2C12B", "#EBDEA3"];
let paleta = [colors, colors1, colors2, colors3, colors4, colors5, colors6, colors7];
let pltcols = colors.concat(colors1, colors2, colors3, colors4, colors5, colors6, colors7)
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let DIM = Math.min(WIDTH, HEIGHT);
let tokenData = genTokenData(633);
let tkid = tokenData.tokenId;
let seed = parseInt(tokenData.hash.slice(0, 16), 16)
let rdtc1, R, fg, forms = [], bgCol, wid, gCol1 = '', gCol2 = '', vspeed = 45, Arrcol = [], cols1 = [], cols2 = [], rdrectri;
let prc = ((DIM - 650) / 650) * 100;

function setup() {
    createCanvas(DIM, DIM);
    prc = floor(prc);
    console.log(prc);
    R = new Random(seed)
    translate(WIDTH / 2, HEIGHT / 2);
    translate(-WIDTH / 2, -HEIGHT / 2);
    pixelDensity(1);
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
    rdtc1 = R.random_int(0, 1);
    let rdf = R.random_int(0, 3);
    if (rdf >= 2) {
        if (dstrd >= 3 && dstrd < 6) {
            bgCol = R.random_choice(pltcols);
            paleta = [fondo];
            pltcols = fondo;
        }
        rdmFm1 = R.random_int(0, 6);
        let rdcol = R.random_int(0, 7);
        if (rdcol >= 4) {
            let auxpal = R.random_choice(paleta)
            gCol1 = auxpal[R.random_int(0, 11)]
            gCol2 = auxpal[R.random_int(0, 11)]
        }
        rdrectri = R.random_int(0, 1);
        addForms();
    } else {
        rdmFm2 = R.random_int(0, 2);
        rdmFm2b = R.random_int(0, 5);
        addForms2();
    }
}

function addForms2() {

    let cols = R.random_int(10, 15), rows = cols, cellW = DIM / cols, cellH = DIM / rows, dst;

    if (tkid % 2 == 0) paleta.reverse();

    if (rdmFm2 == 1) {
        cols1 = R.random_choice(paleta);
        const index = paleta.indexOf(cols1)
        paleta.splice(index, 1);
        cols2 = R.random_choice(paleta);
    } else {
        for (let t = 0; t < 8; t++) {
            cols1.push(paleta[t][R.random_int(0, 11)]);
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
                            forms.push(new LineMove2(x + cellW + cellW / 2, y + cellH / 2, dst, R.random_choice(cols1), d / 2, R.random_int(0, 10)));
                            break;
                        case 1:
                            forms.push(new LineMove2(x + cellW / 2, y + cellH / 2, dst, R.random_choice(cols1), d / 2, R.random_int(0, 10)));
                            break;
                        case 2:
                            if (rdmFm2 == 1) { forms.push(new LineMove2(x + cellW + cellW / 2, y + cellH / 2, dst, R.random_choice(cols1), d, R.random_int(0, 10))); }
                            else { forms.push(new LineMove2(x + cellW + cellW / 2, y + cellH / 2, dst, R.random_choice(cols1), d / 2, R.random_int(0, 10))); }
                            break;
                        case 3:
                            forms.push(new LineMove2(x + cellW + cellW / 2, y + cellH / 2, dst, R.random_choice(cols1), d, R.random_int(0, 10)));
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
            if (R.random_int(0, 100) < 50) {
                if (rdmFm2 >= 1) {
                    forms.push(new Circulo(x + cellW / 2, y + cellH / 2, d, R.random_choice(cols2), 0, 1));
                    forms.push(new Circulo(x + cellW / 2, y + cellH / 2, d / 2, R.random_choice(cols2), 0, 1));
                } else {
                    forms.push(new RectStatic(x + cellW / 2, y + cellH / 2, d / 2, d / 2, R.random_choice(cols2), d / 2, 1));
                    forms.push(new RectStatic(x + cellW / 2, y + cellH / 2, d / 3, d / 3, R.random_choice(cols2), d / 3, 1));
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
        this.l = this.w;
        this.init();
        this.col = col;
        this.stw = stw;
        this.nl = rdnl;
    }

    show() {

        push();
        translate(this.x, this.y);
        rotate(this.a);
        if (dstrd == 2 || dstrd == 6) { stroke(this.col + '85'); }
        else { stroke(this.col); }
        fill(this.col);
        //stroke(this.col);
        strokeWeight(this.stw);
        if (rdmFm2b <= 3) {
            if (this.nl < 6) {
                line(0, 0, this.l, 0)
            } else if (this.nl < 7) {
                line(0, 0, this.l, 0)
                line(0, -this.l, 0, 0);
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
                line(0, 0, this.l, 0)
            } else if (this.nl < 7) {
                line(0, 0, this.l, 0)
                line(0, -this.l, 0, 0);
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
                line(0, 0, this.l, 0)
            } else if (this.nl < 7) {
                line(0, 0, this.l, 0)
                line(0, this.w, -this.w, 0);
            } else if (this.nl < 8) {
                line(0, 0, this.l, 0)
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
                this.a = lerp(this.a0, this.a1, EIOline(this.t));
            } else if (this.rnd == 1) {
                this.l = lerp(this.l0, this.l1, EIOline(this.t));
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
        this.step = 1 / vspeed;
        this.a0 = this.a;
        this.a1 = int(random(4)) * PI * 0.5;
        this.l0 = this.l;
        this.l1 = int(random(2)) * this.w * 1.8;
    }
}

function addForms() {
	forms.length = 0;
    let seg = R.random_int(5,6);
    let wx = 0.8;
    if (seg <= 4) { wx = 0.7; } else if (seg > 5) { vspeed = 30; }
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
    Arrcol.length = 0;
    if (gCol1 == '' && gCol2 == '') {
        if (tkid % 5 == 0) {
            let pltsel = R.random_choice(paleta);
            for (let i = 0; i < 4; i++) {
                Arrcol.push(R.random_choice(pltsel));
            }
        } else {
            for (let i = 0; i < 4; i++) {
                Arrcol.push(R.random_choice(pltcols));
            }
        }
    } else {
        Arrcol.push(gCol1);
        Arrcol.push(gCol2);
        Arrcol.push(R.random_choice(pltcols));
        Arrcol.push(R.random_choice(pltcols));
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
                forms.push(new LineMove(l.x1, l.y1, l.w1, Arrcol[0], stw, R.random_num(0, 10)));
                stw = w * 0.02;
                break;
            case 1:
                stw = w * 0.18;
                forms.push(new LineMove(l.x1, l.y1, l.w1, Arrcol[0], stw, R.random_num(0, 10)));
                break;
            case 2:
            case 3:
                forms.push(new LineMove(l.x1, l.y1, l.w1, Arrcol[0], stw, R.random_num(0, 10)));
                forms.push(new Elipse(l.x2, l.y2, l.w1 * 0.15, l.w1 * 0.15, Arrcol[0], stw));
                stw = w * 0.02;
                break;
        }
    }

    stw = w * 0.18;
    for (let l of lines) {
        switch (fg) {
            case 0:
                if (tkid % 2 == 0) {
                    if (R.random_int(0, 1) == 1) forms.push(new LineMove(l.x1, l.y1, l.w1, Arrcol[0], stw, R.random_num(0, 10)));
                } else {
                    forms.push(new LineMove(l.x1, l.y1, l.w1, Arrcol[1], stw, R.random_num(0, 10)));
                }
                break;
            case 1:
                if (tkid % 2 == 0) {
                    if (R.random_int(0, 1) == 1) forms.push(new Circulo(l.x1, l.y1, 5, Arrcol[1], 5));
                } else {
                    forms.push(new Circulo(l.x1, l.y1, 5, Arrcol[0], 5));
                }
                
                break;
            case 2:
                stw = w * 0.18;
                if (tkid % 2 == 0) {
                    if (R.random_int(0, 1) == 1) forms.push(new LineMove(l.x1, l.y1, l.w1, Arrcol[1], stw, R.random_num(0, 10)));
                } else {
                    forms.push(new LineMove(l.x1, l.y1, l.w1, Arrcol[0], stw, R.random_num(0, 10)));
                }
                break;
            case 3:
                if (rdrectri == 0) {
                    if (tkid % 2 == 0) {
                        if (R.random_int(0, 1) == 1) {
                            stw = w * 0.20;
                            forms.push(new DrawLines(l.x1, l.y1, l.w1, Arrcol[1]));
                        } else {
                            if (rdtc1 == 0) { forms.push(new RectMove(l.x1, l.y1, 1, 1, Arrcol[1], stw)); }
                            else { forms.push(new RectStatic(l.x1, l.y1, 1, 1, Arrcol[2], stw)); }
                            forms.push(new RectMove(l.x1, l.y1, 1, 1, Arrcol[3], stw));
                        }
                    } else {
                        if (R.random_int(0, 1) != 1) {
                            if (rdtc1 == 0) { forms.push(new RectMove(l.x1, l.y1, 1, 1, Arrcol[1], stw)); }
                            else { forms.push(new RectStatic(l.x1, l.y1, 1, 1, Arrcol[2], stw)); }
                            forms.push(new RectMove(l.x1, l.y1, 1, 1, Arrcol[3], stw));
                        }
                    }
                } else {
                    forms.push(new LineMove(l.x2, l.y2, l.w1, Arrcol[1], stw, R.random_num(0, 10)));
                    //forms.push(new LineMove(l.x2, l.y2, l.w1, Arrcol[2], stw, R.random_num(0, 10)));
                }
                break;
        }
    }

    stw = R.random_int(5, 11);

    for (let l of lines) {
        if (tkid % 2 == 0) {
            forms.push(new PointStatic(l.x1, l.y1, Arrcol[2], stw));
        } else {
            forms.push(new PointStatic(l.x1, l.y1, Arrcol[2], stw));
            if (R.random_int(0, 1) == 1) forms.push(new PointStatic(l.x1, l.y1, Arrcol[3], stw));
        }
    }
}

function EIOline(x) {
	return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
}

class LineMove {
	constructor(x, y, w, col, stw, rdnl) {
		this.x = x;
		this.y = y;
		this.w = w + ((prc * w)/100);
		this.a = int(random(4)) * PI * 0.5;
		this.l = this.w;
		this.init();
        this.col = col;
        this.stw = stw;
        this.nl = rdnl;
	}

    show() {
        
        push();
        translate(this.x, this.y, this.w);
		rotate(this.a);        
        strokeWeight(this.stw);
        if (dstrd == 5 || dstrd == 7 || dstrd == 9) { stroke(this.col); strokeWeight(dstrd); }
        else if (dstrd == 2 || dstrd == 6) { stroke(this.col + '85'); }
        else { stroke(this.col); }

        if (rdmFm1 <= 1) {
            if (this.nl < 7) {
                line(0, 0, this.l, 0)
            } else if (this.nl < 8) {
                line(0, 0, this.l, 0)
            } else if (this.nl < 9) {
                line(0, 0, this.l, 0)
            } else {
                if (int(this.w) > 20 && rdtc1 == 1) {
                    strokeWeight(this.w * 0.1);
                    noFill();
                    rect(0, 0, this.l, this.w * 0.5, 7);
                }
                else {line(0, -this.w, 0, 0, )}
            }
        } else if (rdmFm1 == 2) {
            if (this.nl < 7) {
                line(0, 0, this.l, 0)
            } else if (this.nl < 8) {
                line(0, 0, this.l, 0)
                line(0, -this.l, 0, 0);
            } else if (this.nl < 9) {
                noFill();
                arc(0, 0, -this.w * 2, this.w * 2, 0, PI/2);
            } else {
                if (int(this.w) > 20 && rdtc1 == 1) { triangle(0, -this.l * 0.4, this.l * 0.25, 0, -this.l * 0.25, 0); }
                else {
                    line(0, 0, -this.w, 0)
                }
            }
        } else {
            if (this.nl < 7) {
                line(0, 0, -this.l, 0)
            } else if (this.nl < 8) {
                line(0, 0, this.l, 0)
            } else if (this.nl < 9) {
                line(0, -this.w, this.w, 0);
            } else {
                if (int(this.w) > 20 && rdtc1 == 1) { triangle(0, -this.l * 0.4, this.l * 0.25, 0, -this.l * 0.25, 0); }
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
                this.a = lerp(this.a0, this.a1, EIOline(this.t));
            } else if (this.rnd == 1) {
                this.l = lerp(this.l0, this.l1, EIOline(this.t));
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
		this.step = 1 / vspeed;
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
        this.a = int(random(4)) * PI * 0.5;
        this.l = int(random(2)) * this.w * 1.8;
        this.init();
        this.col = col;
        this.stw = stw;
    }

    show() {
        push();
        translate(this.x, this.y);
        if (dstrd == 1 || dstrd == 3) { stroke(this.col + '85'); }
        else { stroke(this.col); }
        if (this.stw <= 10) {
            strokeWeight(this.stw);
            ellipse(0, 0, this.w);
        } else {
            rotate(this.a);
            noStroke()
            ellipse(0, 0, this.stw);
            let c = 8; //int(random(5, 10));
            for (let i = 0; i < c; i++) {
                for (let j = 0; j < c; j++) {
                    let a = TAU / c;
                    fill(Arrcol[i % Arrcol.length]);
                    arc(0, 0, this.stw, this.stw, a * i, (a * i) + a);
                }
            }

        }
        pop();
    }

    move() {
        if (this.stw > 10) {
            if (this.t > 0) {
                this.a = lerp(this.a0, this.a1, EIOline(this.t));
            }
            this.t += this.step;
            if (this.t >= 1) {
                this.init();
            }
        }
    }

    init() {
        this.t = -0.5;
        this.rnd = int(random(20));
        this.step = 1 / vspeed;
        this.a0 = this.a;
        this.a1 = int(random(4)) * PI * 0.5;
        this.l0 = this.l;
        this.l1 = int(random(2)) * this.w * 1.8;
    }
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
    constructor(x, y, w, col, stw, frm) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.col = col;
        this.a = int(random(4)) * PI * 0.5;
        this.l = int(random(2)) * this.w * 1.8;
        this.init();
        this.stw = stw;
        this.frm = frm;
    }

    show() {
        push();
        translate(this.x, this.y);
        if (this.frm == 1) {
            noStroke();
            if (dstrd == 2 || dstrd == 5 || dstrd == 7) { fill(this.col + '80'); }
            else { fill(this.col); }
            rotate(this.a);
            ellipse(0, 0, this.w);
            if (this.w > 15 && int(this.y * this.x) % 6 == 0) {
                let c = 8;
                for (let i = 0; i < c; i++) {
                    for (let j = 0; j < c; j++) {
                        let a = TAU / c;
                        fill(cols2[i % cols2.length]);
                        arc(0, 0, this.w, this.w, a * i, (a * i) + a);
                    }
                }
            }

        } else {
            stroke(this.col);
            strokeWeight(this.stw);
            ellipse(0, 0, this.w);
        }

        pop();
    }

    move() {
        if (this.frm == 1 && this.w > 15) {
            if (this.t > 0) {
                this.a = lerp(this.a0, this.a1, EIOline(this.t));
            }
            this.t += this.step;
            if (this.t >= 1) {
                this.init();
            }
        }
    }

    init() {
        this.t = -0.5;
        this.rnd = int(random(20));
        this.step = 1 / vspeed;
        this.a0 = this.a;
        this.a1 = int(random(4)) * PI * 0.5;
        this.l0 = this.l;
        this.l1 = int(random(2)) * this.w * 1.8;
    }
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
        if (dstrd == 0 || dstrd == 6 || dstrd == 4) { stroke(this.col + '85'); fill(this.col + '85'); }
        else { stroke(this.col); fill(this.col); }
        let sw = this.w;
        if (rdtc1 == 1) {
            strokeWeight(this.stw);
            rect(0, 0, sw, sw, 0);
        } else {
            strokeWeight(this.stw * 0.8);
            triangle(0, -sw * 0.15, sw * 0.10, 0, -sw * 0.10, 0);
        }
        pop();
    }

    move() {
        if (this.t > 0) {
           this.a = lerp(this.a0, this.a1, EIOline(this.t));
        }
        this.t += this.step;
        if (this.t >= 1) {
            this.init();
        }
    }

    init() {
        this.t = -0.5;
        this.rnd = int(random(20));
        this.step = 1 / vspeed;
        this.a0 = this.a;
        this.a1 = int(random(4)) * PI * 0.5;
        this.l0 = this.l;
        this.l1 = int(random(2)) * this.w * 1.8;
    }
}

class RectStatic {
    constructor(x, y, w, h, col, stw, frm) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = col;
        this.stw = stw;
        this.frm = frm;
    }

    show() {
        push();
        translate(this.x, this.y);
        if (dstrd == 0 || dstrd == 6 || dstrd == 9) { stroke(this.col + '85'); fill(this.col + '85'); }
        else { stroke(this.col); fill(this.col); }
        strokeWeight(this.stw);
        let sw = this.w;
        if (this.frm != 1) {
            if (rdtc1 == 1) {
                rotate(PI / 4.0);
                rect(0, 0, sw, sw, 0);
            } else {
                strokeWeight(this.stw * 0.9);
                triangle(0, sw * 0.15, -sw * 0.10, 0, sw * 0.10, 0);
            }
        } else {
            rotate(PI / 4.0);
            rect(0, 0, sw, sw, 0);
        }

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