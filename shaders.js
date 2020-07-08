// const vertexShaderSource = `
// attribute vec4 aVertexPosition;

// uniform mat4 uModelViewMatrix;
// uniform mat4 uProjectionMatrix;

// void main() {
//   gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
// }
// `

const vs = `
attribute vec4 position;
uniform mat4 projection;
uniform mat4 modelView;

varying vec4 color;
void main(){
    gl_Position = projection * position;
    color = gl_Position * 0.8 + 0.5;
}
`

const fs = `
precision mediump float;
varying vec4 color;
void main(){
    gl_FragColor = color;
}
`

export { vs, fs }
