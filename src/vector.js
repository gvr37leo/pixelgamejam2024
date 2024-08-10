class Vector {
    constructor(...vals) {
        this.vals = vals;
    }
    map(callback) {
        for (var i = 0; i < this.vals.length; i++) {
            callback(this.vals, i);
        }
        return this;
    }
    mul(v) {
        return this.map((arr, i) => arr[i] *= v.vals[i]);
    }
    div(v) {
        return this.map((arr, i) => arr[i] /= v.vals[i]);
    }
    floor() {
        return this.map((arr, i) => arr[i] = Math.floor(arr[i]));
    }
    ceil() {
        return this.map((arr, i) => arr[i] = Math.ceil(arr[i]));
    }
    round() {
        return this.map((arr, i) => arr[i] = Math.round(arr[i]));
    }
    add(v) {
        return this.map((arr, i) => arr[i] += v.vals[i]);
    }
    sub(v) {
        return this.map((arr, i) => arr[i] -= v.vals[i]);
    }
    scale(s) {
        return this.map((arr, i) => arr[i] *= s);
    }
    length() {
        var sum = 0;
        this.map((arr, i) => sum += arr[i] * arr[i]);
        return Math.pow(sum, 0.5);
    }
    normalize() {
        return this.scale(1 / this.length());
    }
    to(v) {
        return v.c().sub(this);
    }
    lerp(v, weight) {
        return this.c().add(this.to(v).scale(weight));
    }
    c() {
        return Vector.fromArray(this.vals.slice());
    }
    overwrite(v) {
        return this.map((arr, i) => arr[i] = v.vals[i]);
    }
    dot(v) {
        var sum = 0;
        this.map((arr, i) => sum += arr[i] * v.vals[i]);
        return sum;
    }
    angle2d(b) {
        return Math.acos(this.dot(b) / (this.length() + b.length()));
    }
    rotate2d(turns) {
        var radians = turns * Math.PI * 2;
        var cost = Math.cos(radians);
        var sint = Math.sin(radians);
        var x = this.x * cost - this.y * sint;
        var y = this.x * sint + this.y * cost;
        this.x = x;
        this.y = y;
        return this;
    }
    rotate3d(axis, radians) {
        var cost = Math.cos(radians);
        var sint = Math.sin(radians);
        var res = this.c().scale(cost);
        res.add(axis.cross(this).scale(sint));
        res.add(axis.c().scale(axis.dot(this) * (1 - cost)));
        this.overwrite(res);
        return this;
    }
    anglediff3d(v) {
        return Math.acos(this.dot(v) / (this.length() * v.length()));
    }
    projectOnto(v) {
        // https://www.youtube.com/watch?v=fjOdtSu4Lm4&list=PLImQaTpSAdsArRFFj8bIfqMk2X7Vlf3XF&index=1
        var vnormal = v.c().normalize();
        return vnormal.scale(this.dot(vnormal));
    }
    static reflect(normalout, vecin) {
        var vecout = vecin.c().scale(-1);
        var center = vecout.projectOnto(normalout);
        var vec2center = vecout.to(center);
        var refl = vecout.add(vec2center.scale(2));
        return refl;
    }
    wedge(v) {
        // https://www.youtube.com/watch?v=tjTRXzwdU6A&list=PLImQaTpSAdsArRFFj8bIfqMk2X7Vlf3XF&index=7
        return this.x * v.y - this.y * v.x;
    }
    //wedge can be used for collission detection
    //https://www.youtube.com/watch?v=tjTRXzwdU6A&list=PLImQaTpSAdsArRFFj8bIfqMk2X7Vlf3XF&index=8
    //1:18:06
    area(v) {
        return this.wedge(v) / 2;
    }
    loop(callback) {
        var counter = this.c();
        counter.vals.fill(0);
        while (counter.compare(this) == -1) {
            callback(counter);
            if (counter.incr(this)) {
                break;
            }
        }
    }
    compare(v) {
        for (var i = this.vals.length - 1; i >= 0; i--) {
            if (this.vals[i] < v.vals[i]) {
                continue;
            }
            else if (this.vals[i] == v.vals[i]) {
                return 0;
            }
            else {
                return 1;
            }
        }
        return -1;
    }
    incr(comparedTo) {
        for (var i = 0; i < this.vals.length; i++) {
            if ((this.vals[i] + 1) < comparedTo.vals[i]) {
                this.vals[i]++;
                return false;
            }
            else {
                this.vals[i] = 0;
            }
        }
        return true;
    }
    project(v) {
        return v.c().scale(this.dot(v) / v.dot(v));
    }
    get(i) {
        return this.vals[i];
    }
    set(i, val) {
        this.vals[i] = val;
    }
    get x() {
        return this.vals[0];
    }
    get y() {
        return this.vals[1];
    }
    get z() {
        return this.vals[2];
    }
    set x(val) {
        this.vals[0] = val;
    }
    set y(val) {
        this.vals[1] = val;
    }
    set z(val) {
        this.vals[2] = val;
    }
    draw(ctxt) {
        var width = 10;
        var halfwidth = width / 2;
        ctxt.fillRect(this.x - halfwidth, this.y - halfwidth, width, width);
    }
    cross(v) {
        var x = this.y * v.z - this.z * v.y;
        var y = this.z * v.x - this.x * v.z;
        var z = this.x * v.y - this.y * v.x;
        return new Vector(x, y, z);
    }
    static fromArray(vals) {
        var x = new Vector();
        x.vals = vals;
        return x;
    }
    loop2d(callback) {
        var counter = new Vector(0, 0);
        for (counter.x = 0; counter.x < this.x; counter.x++) {
            for (counter.y = 0; counter.y < this.y; counter.y++) {
                callback(counter);
            }
        }
    }
    loop3d(callback) {
        var counter = new Vector(0, 0, 0);
        for (counter.x = 0; counter.x < this.x; counter.x++) {
            for (counter.y = 0; counter.y < this.y; counter.y++) {
                for (counter.z = 0; counter.z < this.z; counter.z++) {
                    callback(counter);
                }
            }
        }
    }
}