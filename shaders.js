const vertexShaderSource = `
attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;

attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying lowp vec4 vColor;
varying highp vec2 vTextureCoord;

void main(){
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
    vTextureCoord = aTextureCoord;
}
`
const fragmentShaderSource = `
    varying lowp vec4 vColor;

    varying highp vec2 vTextureCoord;
    uniform sampler2D uSampler;

    void main(){
        // gl_FragColor = vColor;
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
`

////////////////////////////////////////////////////////////////

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

export { vs, fs, vertexShaderSource, fragmentShaderSource }
