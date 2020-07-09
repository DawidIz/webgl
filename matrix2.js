const degToRad = deg => ((2 * Math.PI) / 360) * deg

// prettier-ignore
const identity = () => [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1]

// prettier-ignore
const  scaleMatrix = (x = 1, y = 1, z = 1) => [
    x,0,0,0,
    0,y,0,0,
    0,0,z,0,
    0,0,0,1,]

// prettier-ignore
const translationMatrix = (x = 1, y = 1, z = 1) => [
        1,0,0,x,
        0,1,0,y,
        0,0,1,z,
        0,0,0,1,]

// prettier-ignore
const rotateXMatrix = (sin = 1, cos = 0) => [
        1,     0,     0,     0,
        0,     cos,   -sin,  0,
        0,     sin,   cos,   0,
        0,     0,     0,     1]

// prettier-ignore
const rotateYMatrix = (sin = 1, cos = 0) => [
        cos,   0,     sin,   0,
        0,     1,     0,     0,
        -sin,  0,     cos,   0,
        0,     0,     0,     1]

// prettier-ignore
const rotateZMatrix = (sin = 1, cos = 0) => [
        cos,   -sin,  0,     0,
        sin,   cos,   0,     0,
        0,     0,     1,     0,
        0,     0,     0,     1]

// prettier-ignore
const ortho = (w,h,f,n) => [
        1/w,   0,  0,     0,
        0,   1/h,   0,     0,
        0,     0,     -2/(f-n),     -(f+n)/f-n,
        0,     0,     0,     1]

// prettier-ignore
const multiply = (a, b) => [
        a[0]  * b [0] + a[1]  * b[4] + a[2]  * b[8]  + a[3]  * b[12],
        a[0]  * b [1] + a[1]  * b[5] + a[2]  * b[9]  + a[3]  * b[13],
        a[0]  * b [2] + a[1]  * b[6] + a[2]  * b[10] + a[3]  * b[14],
        a[0]  * b [3] + a[1]  * b[7] + a[2]  * b[11] + a[3]  * b[15],

        a[4]  * b [0] + a[5]  * b[4] + a[6]  * b[8]  + a[7]  * b[12],
        a[4]  * b [1] + a[5]  * b[5] + a[6]  * b[9]  + a[7]  * b[13],
        a[4]  * b [2] + a[5]  * b[6] + a[6]  * b[10] + a[7]  * b[14],
        a[4]  * b [3] + a[5]  * b[7] + a[6]  * b[11] + a[7]  * b[15],

        a[8]  * b [0] + a[9]  * b[4] + a[10] * b[8]  + a[11] * b[12],
        a[8]  * b [1] + a[9]  * b[5] + a[10] * b[9]  + a[11] * b[13],
        a[8]  * b [2] + a[9]  * b[6] + a[10] * b[10] + a[11] * b[14],
        a[8]  * b [3] + a[9]  * b[7] + a[10] * b[11] + a[11] * b[15],

        a[12] * b [0] + a[13] * b[4] + a[14] * b[8]  + a[15] * b[12],
        a[12] * b [1] + a[13] * b[5] + a[14] * b[9]  + a[15] * b[13],
        a[12] * b [2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14],
        a[12] * b [3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15],
    ]

const scale = (m, x, y, z) => multiply(m, scaleMatrix(x, y, z))
const translate = (m, x, y, z) => multiply(m, translationMatrix(x, y, z))

const rotate = (m, x) => {
    const rad = degToRad(x)
    const sin = Math.sin(rad)
    const cos = Math.cos(rad)
    return multiply(m, rotateZMatrix(sin, cos))
}

export default {
    degToRad,
    identity,
    ortho,

    scaleMatrix,
    translationMatrix,
    rotateXMatrix,
    rotateYMatrix,
    rotateZMatrix,

    scale,
    translate,
    rotate,
}
// export default mat

/*
export default class {
    // constructor() {}
    // static degToRad = deg => ((2 * Math.PI) / 360) * deg

    // prettier-ignore
    static identity = () => [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1]

    // prettier-ignore
    static scaleMatrix = (x = 1, y = 1, z = 1) => [
        x,0,0,0,
        0,y,0,0,
        0,0,z,0,
        0,0,0,1,]

    // prettier-ignore
    static translationMatrix = (x = 1, y = 1, z = 1) => [
        1,0,0,x,
        0,1,0,y,
        0,0,1,z,
        0,0,0,1,]

    // prettier-ignore
    static rotateXMatrix = (sin = 1, cos = 0) => [
        1,     0,     0,     0,
        0,     cos,   -sin,  0,
        0,     sin,   cos,   0,
        0,     0,     0,     1]

    // prettier-ignore
    static rotateYMatrix = (sin = 1, cos = 0) => [
        cos,   0,     sin,   0,
        0,     1,     0,     0,
        -sin,  0,     cos,   0,
        0,     0,     0,     1]

    // prettier-ignore
    static rotateZMatrix = (sin = 1, cos = 0) => [
        cos,   -sin,  0,     0,
        sin,   cos,   0,     0,
        0,     0,     1,     0,
        0,     0,     0,     1]

    // prettier-ignore
    static ortho = (w,h,f,n) => [
        1/w,   0,  0,     0,
        0,   1/h,   0,     0,
        0,     0,     -2/(f-n),     -(f+n)/f-n,
        0,     0,     0,     1]

    // prettier-ignore
    static multiply = (a, b) => [
        a[0]  * b [0] + a[1]  * b[4] + a[2]  * b[8]  + a[3]  * b[12],
        a[0]  * b [1] + a[1]  * b[5] + a[2]  * b[9]  + a[3]  * b[13],
        a[0]  * b [2] + a[1]  * b[6] + a[2]  * b[10] + a[3]  * b[14],
        a[0]  * b [3] + a[1]  * b[7] + a[2]  * b[11] + a[3]  * b[15],

        a[4]  * b [0] + a[5]  * b[4] + a[6]  * b[8]  + a[7]  * b[12],
        a[4]  * b [1] + a[5]  * b[5] + a[6]  * b[9]  + a[7]  * b[13],
        a[4]  * b [2] + a[5]  * b[6] + a[6]  * b[10] + a[7]  * b[14],
        a[4]  * b [3] + a[5]  * b[7] + a[6]  * b[11] + a[7]  * b[15],

        a[8]  * b [0] + a[9]  * b[4] + a[10] * b[8]  + a[11] * b[12],
        a[8]  * b [1] + a[9]  * b[5] + a[10] * b[9]  + a[11] * b[13],
        a[8]  * b [2] + a[9]  * b[6] + a[10] * b[10] + a[11] * b[14],
        a[8]  * b [3] + a[9]  * b[7] + a[10] * b[11] + a[11] * b[15],

        a[12] * b [0] + a[13] * b[4] + a[14] * b[8]  + a[15] * b[12],
        a[12] * b [1] + a[13] * b[5] + a[14] * b[9]  + a[15] * b[13],
        a[12] * b [2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14],
        a[12] * b [3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15],
    ]

    static scale = (m, x, y, z) => this.multiply(m, this.scaleMatrix(x, y, z))
    static translate = (m, x, y, z) =>
        this.multiply(m, this.translationMatrix(x, y, z))

    static rotate = (m, x) => {
        const rad = this.degToRad(x)
        const sin = Math.sin(rad)
        const cos = Math.cos(rad)
        return this.multiply(m, this.rotateZMatrix(sin, cos))
    }

    static test = value => {
        console.log(value)
    }
}

*/
