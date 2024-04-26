import * as THREE from "three";
import lightModule from "../engine/light";
// 初始化场景
const scene = new THREE.Scene();
scene.environment = new THREE.Color('#000000')
scene.background = new THREE.Color('#000000')

//场景中增加光的环境
scene.add(lightModule.light1)
scene.add(lightModule.light1.target)

scene.add(lightModule.light2)
scene.add(lightModule.light2.target)

scene.add(lightModule.light3)
scene.add(lightModule.light3.target)

scene.add(lightModule.light4)
scene.add(lightModule.light4.target)

scene.add(lightModule.light5)
scene.add(lightModule.light5.target)


export default scene;
