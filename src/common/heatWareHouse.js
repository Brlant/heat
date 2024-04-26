import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import eventHub from "../until/eventHub";
import cameraModule from "../engine/camera";

export default class HeatWareHouse {
    constructor(scene) {
        this.scene = scene
        /**
         * 创建加载器
         * 设置解压加载器
         * 将解压的文件夹draco复制到自己项目
         * **/
        this.loader = new GLTFLoader()
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath("./draco/")
        dracoLoader.setDecoderConfig({type: "js"})
        dracoLoader.preload()
        this.loader.setDRACOLoader(dracoLoader)

        /**
         * 加载地面
         * **/
        this.loader.load('./model/headstock_warehouse_ground_20230621.glb', gltf => {
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.material.transparent = true;
                    child.material.opacity = 1
                    child.receiveShadow = true;
                }
            })
            this.ground = gltf.scene
            this.ground.visible = true
            scene.add(this.ground)
        }, (xhr) => {
        }, (error) => {
        })

        /**
         * 加载模型
         * **/
        this.loader.load('./model/headstock_warehouse_level-kong_20230625.glb', gltf => {
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.transparent = true;
                    child.material.opacity = 0.5
                }
            })
            this.emptyGround = gltf.scene
            this.emptyGround.visible = false
            scene.add(this.emptyGround)
        }, (xhr) => {
        }, (error) => {
        })

        /**
         * 进度条
         * **/
        this.progressElement = document.createElement('div');
        this.progressElement.style.position = 'absolute';
        this.progressElement.style.left = '0';
        this.progressElement.style.top = '0';
        this.progressElement.style.width = '100%';
        this.progressElement.style.height = '100%';
        this.progressElement.style.opacity = '0.8';
        this.progressElement.style.backgroundColor = '#000000';
        document.body.appendChild(this.progressElement);

        this.progressBarElement = document.createElement('div');
        this.progressBarElement.style.position = 'absolute';
        this.progressBarElement.style.left = '50%';
        this.progressBarElement.style.top = '50%';
        this.progressBarElement.style.transform = 'translate(-50%, -50%)';
        this.progressBarElement.style.width = '50%';
        this.progressBarElement.style.height = '20px';
        this.progressBarElement.style.borderRadius = '10px';
        this.progressBarElement.style.border = '1px solid #085AB9';

        this.progressBarFillElement = document.createElement('div');
        this.progressBarFillElement.style.width = '0%';
        this.progressBarFillElement.style.height = '100%';
        this.progressBarFillElement.style.borderRadius = '10px';
        this.progressBarFillElement.style.backgroundColor = '#728CD4';

        this.progressBarElement.appendChild(this.progressBarFillElement);
        this.progressElement.appendChild(this.progressBarElement);
        document.body.appendChild(this.progressElement);

        /**
         * 加载仓库主体
         * **/
        this.loader.load('./model/headstock_warehouse_20230802.glb', gltf => {
            this.progressElement.style.display = 'none';
            this.floorGroup = gltf.scene
            this.floorGroup.visible = true;
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.transparent = true;
                    child.material.opacity = 1
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            })
            this.floorGroup.receiveShadow = true
            this.floorGroup.visible = true
            this.scene.add(this.floorGroup)
        }, (xhr) => {
            this.progress = (xhr.loaded / xhr.total) * 100;
            this.progressBarFillElement.style.width = this.progress + '%'; // 更新进度条
        }, () => {
        })
    }
}
