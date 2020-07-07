// const vertexShaderSource = `
// attribute vec4 aVertexPosition;

// uniform mat4 uModelViewMatrix;
// uniform mat4 uProjectionMatrix;

// void main() {
//   gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
// }
// `

const vertexShaderSource = `
attribute vec4 a_position;

void main() {
  gl_Position = a_position;
}
`

const fragmentShaderSource = `
//precision mediump float;
void main() {
  gl_FragColor = vec4(1.0, 0.2, 1.0, 1.0);
}
`
export { vertexShaderSource, fragmentShaderSource }
