import * as THREE from 'three'

/**
 * 创建相机
 * 设置透视相机的基本状态值
 * 设置相机的位置属性
 * 设置相机的方向
 * **/

let fov = 45
let aspect = window.innerWidth / window.innerHeight
let near = 0.1
let far = 1000
let camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(0, 11, 0);
camera.lookAt(0, 1.5, 0)
class CameraModule {
    constructor() {
        this.activeCamera = camera
    }
}
export default new CameraModule()
