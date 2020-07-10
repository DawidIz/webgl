const vertexShaderSource = `
attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;

attribute vec2 aTextureCoord;

attribute vec3 aVertexNormal;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;

varying lowp vec4 vColor;
varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;

void main(){
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
    vTextureCoord = aTextureCoord;

    // Apply lighting effect

    highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
    highp vec3 directionalLightColor = vec3(1, 1, 1);
    highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

    highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    vLighting = ambientLight + (directionalLightColor * directional);
}
`
const fragmentShaderSource = `
    varying lowp vec4 vColor;

    varying highp vec3 vLighting;

    varying highp vec2 vTextureCoord;
    uniform sampler2D uSampler;

    void main(){
        // gl_FragColor = vColor;
        // gl_FragColor = texture2D(uSampler, vTextureCoord);

        highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
        gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
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
