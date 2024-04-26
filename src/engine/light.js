import * as THREE from 'three'

const light1 = new THREE.PointLight(0xffffff, 2.2, 200)
light1.position.set(9.5, 8, -5)
light1.shadow.bias = 1; // 阴影偏移
light1.castShadow = true; // 启用光源的阴影投射
light1.shadow.mapSize.width = 1024; // 阴影贴图的宽度
light1.shadow.mapSize.height = 1024; // 阴影贴图的高度
light1.shadow.camera.near = 1; // 阴影摄像机的近平面
light1.shadow.camera.far = 200; // 阴影摄像机的远平面

const light2 = new THREE.DirectionalLight(0xffffff, 1)
light2.position.set(0, 50, 8)
light2.castShadow = true

const light3 = new THREE.DirectionalLight(0xffffff, 1)
light3.position.set(0, 20, 10)
light3.castShadow = true

const light4 = new THREE.DirectionalLight(0xffffff, 1)
light4.position.set(-10, 20, 0)
light4.castShadow = true

const light5 = new THREE.DirectionalLight(0xffffff, 1)
light5.position.set(0, 20, -10)
light5.castShadow = true

const light6 = new THREE.DirectionalLight(0xffffff, 1)
light6.position.set(10, 20, 0)
light6.castShadow = true


export default {
    light1,
    light2,
    light3,
    light4,
    light5,
    light6,
}
