const create = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]

const perspective = (out, fovy, aspect, near, far) => {
    let f = 1.0 / Math.tan(fovy / 2),
        nf
    out[0] = f / aspect
    out[1] = 0
    out[2] = 0
    out[3] = 0
    out[4] = 0
    out[5] = f
    out[6] = 0
    out[7] = 0
    out[8] = 0
    out[9] = 0
    out[11] = -1
    out[12] = 0
    out[13] = 0
    out[15] = 0
    if (far != null && far !== Infinity) {
        nf = 1 / (near - far)
        out[10] = (far + near) * nf
        out[14] = 2 * far * near * nf
    } else {
        out[10] = -1
        out[14] = -2 * near
    }
    return out
}

const translate = (out, a, v) => {
    let x = v[0],
        y = v[1],
        z = v[2]
    let a00, a01, a02, a03
    let a10, a11, a12, a13
    let a20, a21, a22, a23

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12]
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13]
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14]
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15]
    } else {
        a00 = a[0]
        a01 = a[1]
        a02 = a[2]
        a03 = a[3]
        a10 = a[4]
        a11 = a[5]
        a12 = a[6]
        a13 = a[7]
        a20 = a[8]
        a21 = a[9]
        a22 = a[10]
        a23 = a[11]

        out[0] = a00
        out[1] = a01
        out[2] = a02
        out[3] = a03
        out[4] = a10
        out[5] = a11
        out[6] = a12
        out[7] = a13
        out[8] = a20
        out[9] = a21
        out[10] = a22
        out[11] = a23

        out[12] = a00 * x + a10 * y + a20 * z + a[12]
        out[13] = a01 * x + a11 * y + a21 * z + a[13]
        out[14] = a02 * x + a12 * y + a22 * z + a[14]
        out[15] = a03 * x + a13 * y + a23 * z + a[15]
    }

    return out
}

export default {
    create,
    perspective,
    translate,
}
