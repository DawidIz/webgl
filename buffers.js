import { cube3D } from './shapes.js'
// verticles or positions
const repeatBuffer = () => {}
const stretchBuffer = () => {}

const hanndleColors = faceColors => {
    const colors = faceColors.reduce(
        (acc, color) => [...acc, ...[...color, ...color, ...color, ...color]],
        []
    )

    let colors2 = faceColors.flat()
    colors2 = [...colors2, ...colors2, ...colors2, ...colors2]

    return colors2
}

const loadObjectBuffers = (gl, obj) => {
    // verticles buffer
    let verticesBuffer = null
    if (obj.vertices) {
        verticesBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer)
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(obj.vertices),
            gl.STATIC_DRAW
        )
    }

    // colors buffer
    let colorsBuffer = null
    if (obj.colors) {
        colorsBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer)
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(hanndleColors(obj.colors)),
            gl.STATIC_DRAW
        )
    }

    // indices buffer

    let indicesBuffer = null
    if (obj.indices) {
        indicesBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer)
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(obj.indices),
            gl.STATIC_DRAW
        )
    }

    // textures buffer

    let texturesBuffer = null
    if (obj.textures) {
        texturesBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, texturesBuffer)
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(obj.textures),
            gl.STATIC_DRAW
        )
    }

    // normals buffer

    let normalsBuffer = null
    if (obj.normals) {
        normalsBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer)
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(obj.normals),
            gl.STATIC_DRAW
        )
    }
    return {
        verticesBuffer,
        colorsBuffer,
        indicesBuffer,
        texturesBuffer,
        normalsBuffer,
    }
}

const enableObjectBuffers = (gl, program, obj) => {
    // verticles
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.verticesBuffer)
    gl.vertexAttribPointer(
        program.attr.vertexPosition,
        3,
        gl.FLOAT,
        false,
        0,
        0
    )
    gl.enableVertexAttribArray(program.attr.vertexPosition)

    // colors
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.colorsBuffer)
    gl.vertexAttribPointer(program.attr.vertexColor, 4, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(program.attr.vertexColor)

    // indices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indicesBuffer)

    // textures
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.texturesBuffer)
    gl.vertexAttribPointer(program.attr.texture, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(program.attr.texture)

    //normals
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.normalsBuffer)
    gl.vertexAttribPointer(program.attr.normal, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(program.attr.normal)
}

export { loadObjectBuffers, enableObjectBuffers }
