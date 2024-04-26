import * as THREE from 'three';
import {useStore} from 'vuex';
import {computed} from "vue";
import {useRoute} from 'vue-router';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {thermometerPosition,wirelessPosition,wiredPosition,otherPosition} from "../request/api";
import {tempToolX, tempToolZ} from "../until/tempTool";
//事件处理
import eventHub from "../until/eventHub";


export default class Thermometer{
    constructor(scene) {
        this.scene = scene
        this.store = useStore();
        this.route = useRoute();
        this.id = computed(() => this.route.query.id)
        this.store.commit('initToken', this.id.value)
        this.loader = new GLTFLoader()
        // 设置解压加载器
        const dracoLoader = new DRACOLoader()
        // 将解压的文件夹draco复制到自己项目
        dracoLoader.setDecoderPath("./draco/")
        dracoLoader.setDecoderConfig({type: "js"})
        dracoLoader.preload()
        this.loader.setDRACOLoader(dracoLoader)
        this.previousData = null;
        this.params={
            type:''
        }

        this.tempObject = new THREE.Object3D();
        this.tempSpriteObject = new THREE.Object3D();

        //无线温度计
        this.wirelessObject = new THREE.Object3D();
        this.wirelessSpriteObject = new THREE.Object3D();
        //有线温度计
        this.wiredObject = new THREE.Object3D();
        this.wiredSpriteObject = new THREE.Object3D();
        //其他设备
        this.otherObject = new THREE.Object3D();
        this.otherSpriteObject = new THREE.Object3D();

        thermometerPosition(this.id.value,this.params).then((response) => {
            const positionData = response.ccsWarehouseImagePointRelationDTOList
            this.updateModelPositions(positionData)
        }).catch(error => {
        })

        this.initTempAnimation()
    }
    initTempAnimation(){


        const closeInitTemp = ()=>{
            this.scene.remove(this.tempObject)
            this.scene.remove(this.tempSpriteObject)
        }

        eventHub.on("resetTemp",()=>{
            thermometerPosition(this.id.value,this.params).then((response) => {
                const positionData = response.ccsWarehouseImagePointRelationDTOList
                this.updateModelPositions(positionData)
            }).catch(error => {
            })
        })

        //无线温度计
        eventHub.on("toggleWireless",()=>{
            closeInitTemp()
            this.params = {
                type:0
            }
            wirelessPosition(this.id.value,this.params).then((response) => {
                const positionData = response.ccsWarehouseImagePointRelationDTOList
                this.updateWirelessModelPositions(positionData)
            }).catch(error => {})
        })
        //关闭无线温度计
        eventHub.on("closeToggleWireless",()=>{
            this.scene.remove(this.wirelessObject)
            this.scene.remove(this.wirelessSpriteObject)
        })


        //有线温度计
        eventHub.on("toggleWired",()=>{
            closeInitTemp()
            this.params = {
                type:1
            }
            wiredPosition(this.id.value,this.params).then((response) => {
                const positionData = response.ccsWarehouseImagePointRelationDTOList
                this.updateWiredModelPositions(positionData)
            }).catch(error => {})
        })
        //关闭有线温度计
        eventHub.on("closeToggleWired",()=>{
            this.scene.remove(this.wiredObject)
            this.scene.remove(this.wiredSpriteObject)
        })


        //其他
        eventHub.on("toggleOther",()=>{
            closeInitTemp()
            this.params = {
                type:2
            }
            otherPosition(this.id.value,this.params).then((response) => {
                const positionData = response.ccsWarehouseImagePointRelationDTOList
                this.updateOtherModelPositions(positionData)
            }).catch(error => {})
        })
        //关闭其他
        eventHub.on("closeToggleOther",()=>{
            this.scene.remove(this.otherObject)
            this.scene.remove(this.otherSpriteObject)
        })
    }

    /**
     * 更新接口模型数据
     * **/
    updateModelPositions(data){
        // 更新上一次的数据
        this.previousData = data;
        data.forEach((item,index)=>{
            const vector3X = tempToolX(item.positionX)
            const vector3Z = tempToolZ(item.positionZ)
            const position = new THREE.Vector3(vector3X, item.positionY, vector3Z);
            let dataSource = {
                modelUrl: './model/hangtou_warehouse_wenduji_01_0613.glb'
            }
            this.loader.load(dataSource.modelUrl, gltf => {
                const temp = gltf.scene;
                temp.rotation.y = Math.PI / 2;
                temp.position.set(position.x, position.y, position.z)
                temp.userData = item;
                temp.visible = true
                this.tempObject.add(temp)
            }, (xhr) => {
            }, (error) => {
            })

            // 创建 sprite 贴图，并将数据值绑定到该贴图上
            const canvas = document.createElement('canvas');
            canvas.width = 250;
            canvas.height = 145;
            const ctx = canvas.getContext("2d");
            const obj = {
                temperature: item.temperature,
                pointName: item.pointName,
                statusCode: item.statusCode,
                recordDate: item.recordDate
            }
            // 绘制标签的背景颜色
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(0, 0, 250, 145);
            // 绘制标签的文字
            ctx.fillStyle = "#fff";
            ctx.font = "14px Arial";
            ctx.textAlign = "left";
            ctx.fillText(`温度:${obj.temperature}`, 30, 30);
            ctx.fillText(`名称:${obj.pointName}`, 30, 60);
            ctx.fillText(`编码:${obj.statusCode}`, 30, 90);
            ctx.fillText(`最新时间:${obj.recordDate}`, 30, 120);
            const texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            const spriteMaterial = new THREE.SpriteMaterial({map: texture});
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.set(vector3X, item.positionY + 0.03, vector3Z - 0.025);
            sprite.scale.set(0.03, 0.03, 0.03)
            sprite.visible = true
            this.tempSpriteObject.add(sprite)
        })
        this.scene.add(this.tempObject);
        this.scene.add(this.tempSpriteObject);
    }


    /**
     * 更新无线模型数据
     * **/
    updateWirelessModelPositions(data){
        // 更新上一次的数据
        this.previousData = data;
        data.forEach((item,index)=>{
            const vector3X = tempToolX(item.positionX)
            const vector3Z = tempToolZ(item.positionZ)
            const position = new THREE.Vector3(vector3X, item.positionY, vector3Z);
            let dataSource = {
                modelUrl: './model/hangtou_warehouse_wenduji_01_0613.glb'
            }
            this.loader.load(dataSource.modelUrl, gltf => {
                const temp = gltf.scene;
                temp.rotation.y = Math.PI / 2;
                temp.position.set(position.x, position.y, position.z)
                temp.userData = item;
                temp.visible = true
                this.wirelessObject.add(temp)
            }, (xhr) => {
            }, (error) => {
            })

            // 创建 sprite 贴图，并将数据值绑定到该贴图上
            const canvas = document.createElement('canvas');
            canvas.width = 250;
            canvas.height = 145;
            const ctx = canvas.getContext("2d");
            const obj = {
                temperature: item.temperature,
                pointName: item.pointName,
                statusCode: item.statusCode,
                recordDate: item.recordDate
            }
            // 绘制标签的背景颜色
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(0, 0, 250, 145);
            // 绘制标签的文字
            ctx.fillStyle = "#fff";
            ctx.font = "14px Arial";
            ctx.textAlign = "left";
            ctx.fillText(`温度:${obj.temperature}`, 30, 30);
            ctx.fillText(`名称:${obj.pointName}`, 30, 60);
            ctx.fillText(`编码:${obj.statusCode}`, 30, 90);
            ctx.fillText(`最新时间:${obj.recordDate}`, 30, 120);
            const texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            const spriteMaterial = new THREE.SpriteMaterial({map: texture});
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.set(vector3X, item.positionY + 0.03, vector3Z - 0.025);
            sprite.scale.set(0.03, 0.03, 0.03)
            sprite.visible = true
            this.wirelessSpriteObject.add(sprite);
        })
        this.scene.add(this.wirelessObject);
        this.scene.add(this.wirelessSpriteObject)
    }

    /**
     * 更新无线模型数据
     * **/
    updateWiredModelPositions(data){
        // 更新上一次的数据
        this.previousData = data;
        data.forEach((item,index)=>{
            const vector3X = tempToolX(item.positionX)
            const vector3Z = tempToolZ(item.positionZ)
            const position = new THREE.Vector3(vector3X, item.positionY, vector3Z);
            let dataSource = {
                modelUrl: './model/hangtou_warehouse_wenduji_01_0613.glb'
            }
            this.loader.load(dataSource.modelUrl, gltf => {
                const temp = gltf.scene;
                temp.rotation.y = Math.PI / 2;
                temp.position.set(position.x, position.y, position.z)
                temp.userData = item;
                temp.visible = true
                this.wiredObject.add(temp)
            }, (xhr) => {
            }, (error) => {
            })

            // 创建 sprite 贴图，并将数据值绑定到该贴图上
            const canvas = document.createElement('canvas');
            canvas.width = 250;
            canvas.height = 145;
            const ctx = canvas.getContext("2d");
            const obj = {
                temperature: item.temperature,
                pointName: item.pointName,
                statusCode: item.statusCode,
                recordDate: item.recordDate
            }
            // 绘制标签的背景颜色
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(0, 0, 250, 145);
            // 绘制标签的文字
            ctx.fillStyle = "#fff";
            ctx.font = "14px Arial";
            ctx.textAlign = "left";
            ctx.fillText(`温度:${obj.temperature}`, 30, 30);
            ctx.fillText(`名称:${obj.pointName}`, 30, 60);
            ctx.fillText(`编码:${obj.statusCode}`, 30, 90);
            ctx.fillText(`最新时间:${obj.recordDate}`, 30, 120);
            const texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            const spriteMaterial = new THREE.SpriteMaterial({map: texture});
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.set(vector3X, item.positionY + 0.03, vector3Z - 0.025);
            sprite.scale.set(0.03, 0.03, 0.03)
            sprite.visible = true
            this.wiredSpriteObject.add(sprite);
        })
        this.scene.add(this.wiredObject);
        this.scene.add(this.wiredSpriteObject);
    }


    /**
     * 更新其他模型数据
     * **/
    updateOtherModelPositions(data){
        // 更新上一次的数据
        this.previousData = data;
        data.forEach((item,index)=>{
            const vector3X = tempToolX(item.positionX)
            const vector3Z = tempToolZ(item.positionZ)
            const position = new THREE.Vector3(vector3X, item.positionY, vector3Z);
            let dataSource = {
                modelUrl: './model/hangtou_warehouse_wenduji_01_0613.glb'
            }
            this.loader.load(dataSource.modelUrl, gltf => {
                const temp = gltf.scene;
                temp.rotation.y = Math.PI / 2;
                temp.position.set(position.x, position.y, position.z)
                temp.userData = item;
                temp.visible = true
                this.otherObject.add(temp)
            }, (xhr) => {
            }, (error) => {
            })

            // 创建 sprite 贴图，并将数据值绑定到该贴图上
            const canvas = document.createElement('canvas');
            canvas.width = 250;
            canvas.height = 145;
            const ctx = canvas.getContext("2d");
            const obj = {
                temperature: item.temperature,
                pointName: item.pointName,
                statusCode: item.statusCode,
                recordDate: item.recordDate
            }
            // 绘制标签的背景颜色
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(0, 0, 250, 145);
            // 绘制标签的文字
            ctx.fillStyle = "#fff";
            ctx.font = "14px Arial";
            ctx.textAlign = "left";
            ctx.fillText(`温度:${obj.temperature}`, 30, 30);
            ctx.fillText(`名称:${obj.pointName}`, 30, 60);
            ctx.fillText(`编码:${obj.statusCode}`, 30, 90);
            ctx.fillText(`最新时间:${obj.recordDate}`, 30, 120);
            const texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            const spriteMaterial = new THREE.SpriteMaterial({map: texture});
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.set(vector3X, item.positionY + 0.03, vector3Z - 0.025);
            sprite.scale.set(0.03, 0.03, 0.03)
            sprite.visible = true
            this.otherSpriteObject.add(sprite);
        })
        this.scene.add(this.otherObject);
        this.scene.add(this.otherSpriteObject);
    }

}
