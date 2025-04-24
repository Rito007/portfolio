export const vertexShader = `
uniform float uTime;
uniform vec2 uMouse; // Posição do mouse
uniform float uAttractRadius; // Raio de atração

attribute float offset; // Deslocamento de cada partícula
varying vec3 vColor;

void main() {
    // Calcular a posição da partícula no espaço
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);

    // Calcular a posição normalizada do mouse
    // O mouse já está em coordenadas de -1 a 1, então precisamos apenas ajustar a comparação
    float distToMouse = length(uMouse - modelViewPosition.xy);

    // Quando a partícula está dentro do raio de atração
    if (distToMouse < uAttractRadius) {
        // Mover a partícula em direção ao mouse
        vec2 directionToMouse = normalize(uMouse - modelViewPosition.xy);
        modelViewPosition.xy += directionToMouse * 0.05; // Intensidade da atração
    }

    // Definir a escala da partícula com base no tempo e no deslocamento
    float scale = sin(offset * 5.0 + uTime * 2.0) * 3.0 + 10.0;

    // Atualizar a posição do vértice
    gl_Position = projectionMatrix * modelViewPosition;
    gl_PointSize = scale;
}

`;

export const fragmentShader = `
  void main() {
    // Coordenadas normalizadas do ponto
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);

    // Borda preta (efeito cartoon)
    float border = smoothstep(0.48, 0.5, dist);
    float circle = smoothstep(0.5, 0.48, dist);

    vec3 color = mix(vec3(0.0), vec3(0.49411764, 0.16470588235294117, 0.047058823529411764), circle); // centro amarelo cartoon

    gl_FragColor = vec4(color, 1.0 - border);
  }
`;
