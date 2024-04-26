import * as THREE from "three";
// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
    // 设置抗锯齿
    antialias: true,
    logarithmicDepthBuffer: true,
    physicallyCorrectLights: true,
});
// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.sortObjects = true;
renderer.toneMappingExposure = 0.8

export default renderer;
