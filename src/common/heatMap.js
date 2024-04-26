import * as THREE from 'three'
import {useStore} from 'vuex'
import {computed} from "vue";
import {useRoute} from 'vue-router';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import eventHub from "../until/eventHub";
import cameraModule from "../engine/camera";
import {hotMap} from "../request/api";
import {getAreaX, getAreaZ} from "../until/coordTool";

import {getLayerHeatmapFirstFloor_E3} from "./layerMap/layerHeatMap_E3/FirstFloor";
import {getLayerHeatmapSecondFloor_E3} from "./layerMap/layerHeatMap_E3/SecondFloor";
import {getLayerHeatmapFirstFloor_E2} from "./layerMap/layerHeatMap_E2/FirstFloor";
import {getLayerHeatmapSecondFloor_E2} from "./layerMap/layerHeatMap_E2/SecondFloor";
import {getLayerHeatmapFirstFloor_E1} from "./layerMap/layerHeatMap_E1/FirstFloor";
import {getLayerHeatmapSecondFloor_E1} from "./layerMap/layerHeatMap_E1/SecondFloor";
import {getLayerHeatmapSecondFloor_A} from "./layerMap/layerHeatMap_A/SecondFloor";
import {getLayerHeatmapFirstFloor_A} from "./layerMap/layerHeatMap_A/FirstFloor";
import {getLayerHeatmapSecondFloor_BC} from "./layerMap/layerHeatMap_BC/SecondFloor";
import {getLayerHeatmapFirstFloor_BC} from "./layerMap/layerHeatMap_BC/FirstFloor";
import {getLayerHeatmapSecondFloor_D} from "./layerMap/layerHeatMap_D/SecondFloor";
import {getLayerHeatmapFirstFloor_D} from "./layerMap/layerHeatMap_D/FirstFloor";
import {getLayerHeatmapSecondFloor_G} from "./layerMap/layerHeatMap_G/SecondFloor";
import {getLayerHeatmapFirstFloor_G} from "./layerMap/layerHeatMap_G/FirstFloor";
import {getLayerHeatmapFirstFloor_K1} from "./layerMap/layerHeatMap_K1/FirstFloor";
import {getLayerHeatmapSecondFloor_K1} from "./layerMap/layerHeatMap_K1/SecondFloor";
import {getLayerHeatmapFirstFloor_K2} from "./layerMap/layerHeatMap_K2/FirstFloor";
import {getLayerHeatmapSecondFloor_K2} from "./layerMap/layerHeatMap_K2/SecondFloor";
import {getLayerHeatmapFirstFloor_K} from "./layerMap/layerHeatMap_K/FirstFloor";
import {getLayerHeatmapSecondFloor_K} from "./layerMap/layerHeatMap_K/SecondFloor";
import {getLayerHeatmapFirstFloor_K3} from "./layerMap/layerHeatMap_K3/FirstFloor";
import {getLayerHeatmapSecondFloor_K3} from "./layerMap/layerHeatMap_K3/SecondFloor";


export default class HeatMap {
    constructor(scene) {
        this.scene = scene
        this.store = useStore();
        this.route = useRoute();
        this.id = computed(() => this.route.query.id)
        this.store.commit('initToken', this.id.value)

        //E3库区
        let arrayE3 = {
            minX: 0.726552,
            maxX: 5.68032,
            minZ: 82.5095,
            maxZ: 90.5894,
            resultArray_E3: []
        }
        //E2库区
        let arrayE2 = {
            minX: 0.900225,
            maxX: 5.92648,
            minZ: 74.169,
            maxZ: 82.1462,
            resultArray_E2: []
        }
        //E1库区
        let arrayE1 = {
            minX: 0.902184,
            maxX: 5.84046,
            minZ: 65.622,
            maxZ: 73.6942,
            resultArray_E1: []
        }
        //A库区
        let arrayA = {
            minX: 50.6173,
            maxX: 60.4938,
            minZ: 65.717,
            maxZ: 90.3134,
            resultArray_A: []
        }
        //BC库区
        let arrayBC = {
            minX: 20.7028,
            maxX: 50.7122,
            minZ: 65.622,
            maxZ: 90.4084,
            resultArray_BC: []
        }
        //D库区
        let arrayD = {
            minX: 5.79297,
            maxX: 20.7028,
            minZ: 65.5271,
            maxZ: 90.5033,
            resultArray_D: []
        }
        //G库区
        let arrayG = {
            minX: 15.8594,
            maxX: 35.3276,
            minZ: 6.55271,
            maxZ: 29.6296,
            resultArray_G: []
        }
        //K库区
        let arrayK = {
            minX: 0.759734,
            maxX: 10.4938,
            minZ: 54.0361,
            maxZ: 58.5945,
            resultArray_K: []
        }
        //K1库区
        let arrayK1 = {
            minX: 0.997151,
            maxX: 21.51,
            minZ: 59.6391,
            maxZ: 65.5271,
            resultArray_K1: []
        }
        //K2库区
        let arrayK2 = {
            minX: 25.641,
            maxX: 60.4463,
            minZ: 59.1643,
            maxZ: 65.3371,
            resultArray_K2: []
        }
        //K3库区
        let arrayK3 = {
            minX: 10.3989,
            maxX: 20.4179,
            minZ: 53.8462,
            maxZ: 58.4046,
            resultArray_K3: []
        }


        hotMap(this.id.value).then(response => {
            response.forEach((item, index) => {
                const wareHeat = item.list
                let length = 11.956
                let width = 7.764
                //E3库区
                wareHeat.forEach((item, index) => {
                    if (item.positionX >= arrayE3.minX && item.positionX <= arrayE3.maxX && item.positionZ >= arrayE3.minZ && item.positionZ <= arrayE3.maxZ) {
                        const areaX = getAreaX(item.positionX, {
                            length,
                            minX: arrayE3.minX,
                            maxX: arrayE3.maxX
                        })
                        const areaZ = getAreaZ(item.positionZ, {
                            width,
                            minZ: arrayE3.minZ,
                            maxZ: arrayE3.maxZ
                        })
                        let object = {
                            x: Number(areaX),
                            y: Number(areaZ),
                            height: item.pointHeight,
                            temperature: item.temperature
                        }
                        arrayE3.resultArray_E3.push(object)
                    }
                })
                //E2库区
                wareHeat.forEach((item, index) => {
                    if (item.positionX >= arrayE2.minX && item.positionX <= arrayE2.maxX && item.positionZ >= arrayE2.minZ && item.positionZ <= arrayE2.maxZ) {
                        const areaX = getAreaX(item.positionX, {
                            length,
                            minX: arrayE2.minX,
                            maxX: arrayE2.maxX
                        })
                        const areaZ = getAreaZ(item.positionZ, {
                            width,
                            minZ: arrayE2.minZ,
                            maxZ: arrayE2.maxZ
                        })
                        let object = {
                            x: Number(areaX),
                            y: Number(areaZ),
                            height: item.pointHeight,
                            temperature: item.temperature
                        }
                        arrayE2.resultArray_E2.push(object)
                    }
                })
                //E1库区
                wareHeat.forEach((item, index) => {
                    if (item.positionX >= arrayE1.minX && item.positionX <= arrayE1.maxX && item.positionZ >= arrayE1.minZ && item.positionZ <= arrayE1.maxZ) {
                        const areaX = getAreaX(item.positionX, {
                            length,
                            minX: arrayE1.minX,
                            maxX: arrayE1.maxX
                        })
                        const areaZ = getAreaZ(item.positionZ, {
                            width,
                            minZ: arrayE1.minZ,
                            maxZ: arrayE1.maxZ
                        })
                        let object = {
                            x: Number(areaX),
                            y: Number(areaZ),
                            height: item.pointHeight,
                            temperature: item.temperature
                        }
                        arrayE1.resultArray_E1.push(object)
                    }
                })
                //A库区
                wareHeat.forEach((item, index) => {
                    if (item.positionX >= arrayA.minX && item.positionX <= arrayA.maxX && item.positionZ >= arrayA.minZ && item.positionZ <= arrayA.maxZ) {
                        const areaX = getAreaX(item.positionX, {
                            length,
                            minX: arrayA.minX,
                            maxX: arrayA.maxX
                        })
                        const areaZ = getAreaZ(item.positionZ, {
                            width,
                            minZ: arrayA.minZ,
                            maxZ: arrayA.maxZ
                        })
                        let object = {
                            x: Number(areaX),
                            y: Number(areaZ),
                            height: item.pointHeight,
                            temperature: item.temperature
                        }
                        arrayA.resultArray_A.push(object)
                    }
                })
                //BC库区
                wareHeat.forEach((item, index) => {
                    if (item.positionX >= arrayBC.minX && item.positionX <= arrayBC.maxX && item.positionZ >= arrayBC.minZ && item.positionZ <= arrayBC.maxZ) {
                        const areaX = getAreaX(item.positionX, {
                            length,
                            minX: arrayBC.minX,
                            maxX: arrayBC.maxX
                        })
                        const areaZ = getAreaZ(item.positionZ, {
                            width,
                            minZ: arrayBC.minZ,
                            maxZ: arrayBC.maxZ
                        })
                        let object = {
                            x: Number(areaX),
                            y: Number(areaZ),
                            height: item.pointHeight,
                            temperature: item.temperature
                        }
                        arrayBC.resultArray_BC.push(object)
                    }
                })
                //D库区
                wareHeat.forEach((item, index) => {
                    if (item.positionX >= arrayD.minX && item.positionX <= arrayD.maxX && item.positionZ >= arrayD.minZ && item.positionZ <= arrayD.maxZ) {
                        const areaX = getAreaX(item.positionX, {
                            length,
                            minX: arrayD.minX,
                            maxX: arrayD.maxX
                        })
                        const areaZ = getAreaZ(item.positionZ, {
                            width,
                            minZ: arrayD.minZ,
                            maxZ: arrayD.maxZ
                        })
                        let object = {
                            x: Number(areaX),
                            y: Number(areaZ),
                            height: item.pointHeight,
                            temperature: item.temperature
                        }
                        arrayD.resultArray_D.push(object)
                    }
                })
                //G库区
                wareHeat.forEach((item, index) => {
                    if (item.positionX >= arrayG.minX && item.positionX <= arrayG.maxX && item.positionZ >= arrayG.minZ && item.positionZ <= arrayG.maxZ) {
                        const areaX = getAreaX(item.positionX, {
                            length,
                            minX: arrayG.minX,
                            maxX: arrayG.maxX
                        })
                        const areaZ = getAreaZ(item.positionZ, {
                            width,
                            minZ: arrayG.minZ,
                            maxZ: arrayG.maxZ
                        })
                        let object = {
                            x: Number(areaX),
                            y: Number(areaZ),
                            height: item.pointHeight,
                            temperature: item.temperature
                        }
                        arrayG.resultArray_G.push(object)
                    }
                })
                //K库区
                wareHeat.forEach((item, index) => {
                    if (item.positionX >= arrayK.minX && item.positionX <= arrayK.maxX && item.positionZ >= arrayK.minZ && item.positionZ <= arrayK.maxZ) {
                        const areaX = getAreaX(item.positionX, {
                            length,
                            minX: arrayK.minX,
                            maxX: arrayK.maxX
                        })
                        const areaZ = getAreaZ(item.positionZ, {
                            width,
                            minZ: arrayK.minZ,
                            maxZ: arrayK.maxZ
                        })
                        let object = {
                            x: Number(areaX),
                            y: Number(areaZ),
                            height: item.pointHeight,
                            temperature: item.temperature
                        }
                        arrayK.resultArray_K.push(object)
                    }
                })
                //K1库区
                wareHeat.forEach((item, index) => {
                    if (item.positionX >= arrayK1.minX && item.positionX <= arrayK1.maxX && item.positionZ >= arrayK1.minZ && item.positionZ <= arrayK1.maxZ) {
                        const areaX = getAreaX(item.positionX, {
                            length,
                            minX: arrayK1.minX,
                            maxX: arrayK1.maxX
                        })
                        const areaZ = getAreaZ(item.positionZ, {
                            width,
                            minZ: arrayK1.minZ,
                            maxZ: arrayK1.maxZ
                        })
                        let object = {
                            x: Number(areaX),
                            y: Number(areaZ),
                            height: item.pointHeight,
                            temperature: item.temperature
                        }
                        arrayK1.resultArray_K1.push(object)
                    }
                })
                //K2库区
                wareHeat.forEach((item, index) => {
                    if (item.positionX >= arrayK2.minX && item.positionX <= arrayK2.maxX && item.positionZ >= arrayK2.minZ && item.positionZ <= arrayK2.maxZ) {
                        const areaX = getAreaX(item.positionX, {
                            length,
                            minX: arrayK2.minX,
                            maxX: arrayK2.maxX
                        })
                        const areaZ = getAreaZ(item.positionZ, {
                            width,
                            minZ: arrayK2.minZ,
                            maxZ: arrayK2.maxZ
                        })
                        let object = {
                            x: Number(areaX),
                            y: Number(areaZ),
                            height: item.pointHeight,
                            temperature: item.temperature
                        }
                        arrayK2.resultArray_K2.push(object)
                    }
                })
                //K3库区
                wareHeat.forEach((item, index) => {
                    if (item.positionX >= arrayK3.minX && item.positionX <= arrayK3.maxX && item.positionZ >= arrayK3.minZ && item.positionZ <= arrayK3.maxZ) {
                        const areaX = getAreaX(item.positionX, {
                            length,
                            minX: arrayK3.minX,
                            maxX: arrayK3.maxX
                        })
                        const areaZ = getAreaZ(item.positionZ, {
                            width,
                            minZ: arrayK3.minZ,
                            maxZ: arrayK3.maxZ
                        })
                        let object = {
                            x: Number(areaX),
                            y: Number(areaZ),
                            height: item.pointHeight,
                            temperature: item.temperature
                        }
                        arrayK3.resultArray_K3.push(object)
                    }
                })
            })
            /**
             * 重构库区获取各个库区的值
             * 'E3库区',arrayE3.resultArray_E3
             * 'E2库区',arrayE2.resultArray_E2
             * 'E1库区',arrayE1.resultArray_E1
             * 'A库区',arrayA.resultArray_A
             * 'BC库区',arrayBC.resultArray_BC
             * 'D库区',arrayD.resultArray_D
             * 'G库区',arrayG.resultArray_G
             * 'K库区',arrayK.resultArray_K
             * 'K1库区',arrayK1.resultArray_K1
             * 'K2库区', arrayK2.resultArray_K2
             * 'K3库区', arrayK3.resultArray_K3
             * **/

            //E3重构的库区，获取的数据值
            let newArr_E3 = [];
            for (let i = 0; i < arrayE3.resultArray_E3.length; i++) {   // 循环重构的E库区数组
                const obj = arrayE3.resultArray_E3[i];
                const {height} = obj;
                const existingObj = newArr_E3.find(item => item.height === height);  // 检查新数组中是否已存在相同 height 值的对象组合
                if (existingObj) {
                    existingObj.list.push(obj);  // 如果存在，则将当前对象合并到已存在的组合中
                } else {
                    newArr_E3.push({height, list: [obj]});   // 如果不存在，则创建一个新的对象组合，并加入新数组
                }
            }
            newArr_E3.forEach((item, index) => {
                if (item.height === "2") {
                    this.layer_e3_first_floor = getLayerHeatmapFirstFloor_E3(item.list, 30, 30)
                    this.createPlaneByCanvas_E3_FF(this.layer_e3_first_floor, {
                        x: -5.565,
                        y: 0.2,
                        z: 2.92,
                    })
                } else if (item.height === "3") {
                    this.layer_e3_second_floor = getLayerHeatmapSecondFloor_E3(item.list,30,30)
                    this.createPlaneByCanvas_E3_SF(this.layer_e3_second_floor,{
                        x: -5.565,
                        y: 0.3,
                        z: 2.92,
                    })
                } else {
                    return;
                }
            })

            //E2重构的库区，获取的数据值
            let newArr_E2 = [];
            for (let i = 0; i < arrayE2.resultArray_E2.length; i++) {
                const obj = arrayE2.resultArray_E2[i];
                const {height} = obj;
                const existingObj = newArr_E2.find(item => item.height === height);  // 检查新数组中是否已存在相同 height 值的对象组合
                if (existingObj) {
                    existingObj.list.push(obj);  // 如果存在，则将当前对象合并到已存在的组合中
                } else {
                    newArr_E2.push({height, list: [obj]});   // 如果不存在，则创建一个新的对象组合，并加入新数组
                }
            }
            newArr_E2.forEach((item, index) => {
                if (item.height === "2") {
                    this.layer_e2_first_floor = getLayerHeatmapFirstFloor_E2(item.list, 30, 30)
                    this.createPlaneByCanvas_E2_FF(this.layer_e2_first_floor, {
                        x: -5.565,
                        y: 0.2,
                        z: 2.250,
                    })
                } else if (item.height === "3") {
                    this.layer_e2_second_floor = getLayerHeatmapSecondFloor_E2(item.list,30,30)
                    this.createPlaneByCanvas_E2_SF(this.layer_e2_second_floor,{
                        x: -5.565,
                        y: 0.3,
                        z: 2.250,
                    })
                } else {
                    return;
                }
            })

            //E1重构的库区，获取的数据值
            let newArr_E1 = [];
            for (let i = 0; i < arrayE1.resultArray_E1.length; i++) {
                const obj = arrayE1.resultArray_E1[i];
                const {height} = obj;
                const existingObj = newArr_E1.find(item => item.height === height);  // 检查新数组中是否已存在相同 height 值的对象组合
                if (existingObj) {
                    existingObj.list.push(obj);  // 如果存在，则将当前对象合并到已存在的组合中
                } else {
                    newArr_E1.push({height, list: [obj]});   // 如果不存在，则创建一个新的对象组合，并加入新数组
                }
            }
            newArr_E1.forEach((item, index) => {
                if (item.height === "2") {
                    this.layer_e1_first_floor = getLayerHeatmapFirstFloor_E1(item.list,30,30)
                    this.createPlaneByCanvas_E1_FF(this.layer_e1_first_floor,{
                        x: -5.565,
                        y: 0.2,
                        z: 1.6,
                    })
                } else if (item.height === "3") {
                    this.layer_e1_second_floor = getLayerHeatmapSecondFloor_E1(item.list,30,30)
                    this.createPlaneByCanvas_E1_SF(this.layer_e1_second_floor,{
                        x: -5.565,
                        y: 0.3,
                        z: 1.6,
                    })
                } else {
                    return;
                }
            })

            //A重构的库区，获取的数据值
            let newArr_A = [];
            for (let i = 0; i < arrayA.resultArray_A.length; i++) {
                const obj = arrayA.resultArray_A[i];
                const {height} = obj;
                const existingObj = newArr_A.find(item => item.height === height);  // 检查新数组中是否已存在相同 height 值的对象组合
                if (existingObj) {
                    existingObj.list.push(obj);  // 如果存在，则将当前对象合并到已存在的组合中
                } else {
                    newArr_A.push({height, list: [obj]});   // 如果不存在，则创建一个新的对象组合，并加入新数组
                }
            }
            newArr_A.forEach((item, index) => {
                if (item.height === "2") {
                    this.layer_a_second_floor = getLayerHeatmapSecondFloor_A(item.list,35,70)
                    this.createPlaneByCanvas_A_SF(this.layer_a_second_floor, {
                        x: 0.72,
                        y: 0.2,
                        z: 2.26,
                    })
                } else if (item.height === "6") {
                    this.layer_a_first_floor = getLayerHeatmapFirstFloor_A(item.list,35,70)
                    this.createPlaneByCanvas_A_FF(this.layer_a_first_floor, {
                        x: 0.72,
                        y: 0.6,
                        z: 2.26,
                    })
                } else {
                    return;
                }
            })

            //BC重构的库区，获取的数据值
            let newArr_BC = [];
            for (let i = 0; i < arrayBC.resultArray_BC.length; i++){
                const obj = arrayBC.resultArray_BC[i];
                const {height} = obj;
                const existingObj = newArr_BC.find(item => item.height === height);  // 检查新数组中是否已存在相同 height 值的对象组合
                if (existingObj) {
                    existingObj.list.push(obj);  // 如果存在，则将当前对象合并到已存在的组合中
                } else {
                    newArr_BC.push({height, list: [obj]});   // 如果不存在，则创建一个新的对象组合，并加入新数组
                }
            }
            newArr_BC.forEach((item, index) => {
                if (item.height === "2") {
                    this.layer_bc_second_floor = getLayerHeatmapSecondFloor_BC(item.list,80,40)
                    this.createPlaneByCanvas_BC_SF(this.layer_bc_second_floor, {
                        x: -1.678,
                        y: 0.2,
                        z: 2.26,
                    })
                } else if (item.height === "6") {
                    this.layer_bc_first_floor = getLayerHeatmapFirstFloor_BC(item.list,80,40)
                    this.createPlaneByCanvas_BC_FF(this.layer_bc_first_floor, {
                        x: -1.678,
                        y: 0.6,
                        z: 2.26,
                    })
                } else {
                    return;
                }
            })

            //D重构的库区，获取的数据值
            let newArr_D = [];
            for(let i = 0; i < arrayD.resultArray_D.length; i++){
                const obj = arrayD.resultArray_D[i];
                const {height} = obj;
                const existingObj = newArr_D.find(item => item.height === height);  // 检查新数组中是否已存在相同 height 值的对象组合
                if (existingObj) {
                    existingObj.list.push(obj);  // 如果存在，则将当前对象合并到已存在的组合中
                } else {
                    newArr_D.push({height, list: [obj]});   // 如果不存在，则创建一个新的对象组合，并加入新数组
                }
            }
            newArr_D.forEach((item, index) => {
                if (item.height === "2") {
                    this.layer_d_second_floor = getLayerHeatmapSecondFloor_D(item.list,40,40)
                    this.createPlaneByCanvas_D_SF(this.layer_d_second_floor, {
                        x: -4.38,
                        y: 0.2,
                        z: 2.26,
                    })
                } else if (item.height === "6") {
                    this.layer_d_first_floor = getLayerHeatmapFirstFloor_D(item.list,40,40)
                    this.createPlaneByCanvas_D_FF(this.layer_d_first_floor, {
                        x: -4.38,
                        y: 0.6,
                        z: 2.26,
                    })
                } else {
                    return;
                }
            })

            //G重构的库区，获取的数据值
            let newArr_G = [];
            for(let i = 0; i < arrayG.resultArray_G.length; i++){
                const obj = arrayG.resultArray_G[i];
                const {height} = obj;
                const existingObj = newArr_G.find(item => item.height === height);  // 检查新数组中是否已存在相同 height 值的对象组合
                if (existingObj) {
                    existingObj.list.push(obj);  // 如果存在，则将当前对象合并到已存在的组合中
                } else {
                    newArr_G.push({height, list: [obj]});   // 如果不存在，则创建一个新的对象组合，并加入新数组
                }
            }
            newArr_G.forEach((item, index) => {
                if (item.height === "2") {
                    this.layer_g_second_floor = getLayerHeatmapSecondFloor_G(item.list,60,60)
                    this.createPlaneByCanvas_G_SF(this.layer_g_second_floor,{
                        x: -2.9,
                        y: 0.2,
                        z: -2.358,
                    })
                } else if (item.height === "6") {
                    this.layer_g_first_floor = getLayerHeatmapFirstFloor_G(item.list,60,60)
                    this.createPlaneByCanvas_G_FF(this.layer_g_first_floor,{
                        x: -2.9,
                        y: 0.6,
                        z: -2.358,
                    })
                } else {
                    return;
                }
            })

            //K1重构的库区，获取的数据值
            let newArr_K1 = [];
            for(let i = 0; i < arrayK1.resultArray_K1.length; i++){
                const obj = arrayK1.resultArray_K1[i];
                const {height} = obj;
                const existingObj = newArr_K1.find(item => item.height === height);  // 检查新数组中是否已存在相同 height 值的对象组合
                if (existingObj) {
                    existingObj.list.push(obj);  // 如果存在，则将当前对象合并到已存在的组合中
                } else {
                    newArr_K1.push({height, list: [obj]});   // 如果不存在，则创建一个新的对象组合，并加入新数组
                }
            }
            newArr_K1.forEach((item, index) => {
                if (item.height === "2") {
                    this.layer_k1_first_floor = getLayerHeatmapFirstFloor_K1(item.list,100,20)
                    this.createPlaneByCanvas_K1_FF(this.layer_k1_first_floor,{
                        x: -4.375,
                        y: 0.2,
                        z: 1.07,
                    })
                } else if (item.height === "6") {
                    this.layer_k1_second_floor = getLayerHeatmapSecondFloor_K1(item.list,100,20)
                    this.createPlaneByCanvas_K1_SF(this.layer_k1_second_floor,{
                        x: -4.375,
                        y: 0.6,
                        z: 1.07,
                    })
                } else {
                    return;
                }
            })

            //K2重构的库区，获取的数据值
            let newArr_K2 = [];
            for(let i = 0; i < arrayK2.resultArray_K2.length; i++){
                const obj = arrayK2.resultArray_K2[i];
                const {height} = obj;
                const existingObj = newArr_K2.find(item => item.height === height);  // 检查新数组中是否已存在相同 height 值的对象组合
                if (existingObj) {
                    existingObj.list.push(obj);  // 如果存在，则将当前对象合并到已存在的组合中
                } else {
                    newArr_K2.push({height, list: [obj]});   // 如果不存在，则创建一个新的对象组合，并加入新数组
                }
            }
            newArr_K2.forEach((item, index) => {
                if (item.height === "2") {
                    this.layer_k2_first_floor = getLayerHeatmapFirstFloor_K2(item.list,120,20)
                    this.createPlaneByCanvas_K2_FF(this.layer_k2_first_floor,{
                        x: -0.775,
                        y: 0.2,
                        z: 1.07,
                    })
                } else if (item.height === "6") {
                    this.layer_k2_second_floor = getLayerHeatmapSecondFloor_K2(item.list,120,20)
                    this.createPlaneByCanvas_K2_SF(this.layer_k2_second_floor,{
                        x: -0.775,
                        y: 0.6,
                        z: 1.07,
                    })
                } else {
                    return;
                }
            })

            //K重构的库区，获取的数据值
            let newArr_K = [];
            for(let i = 0; i < arrayK.resultArray_K.length; i++){
                const obj = arrayK.resultArray_K[i];
                const {height} = obj;
                const existingObj = newArr_K.find(item => item.height === height);  // 检查新数组中是否已存在相同 height 值的对象组合
                if (existingObj) {
                    existingObj.list.push(obj);  // 如果存在，则将当前对象合并到已存在的组合中
                } else {
                    newArr_K.push({height, list: [obj]});   // 如果不存在，则创建一个新的对象组合，并加入新数组
                }
            }
            newArr_K.forEach((item, index) => {
                if (item.height === "2") {
                    this.layer_k_first_floor = getLayerHeatmapFirstFloor_K(item.list,20,10)
                    this.createPlaneByCanvas_K_FF(this.layer_k_first_floor,{
                        x: -5.33,
                        y: 0.2,
                        z: 0.57,
                    })
                } else if (item.height === "6") {
                    this.layer_k_second_floor = getLayerHeatmapSecondFloor_K(item.list,20,10)
                    this.createPlaneByCanvas_K_SF(this.layer_k_second_floor,{
                        x: -5.33,
                        y: 0.6,
                        z: 0.57,
                    })
                } else {
                    return;
                }
            })

            //K3重构的库区，获取的数据值
            let newArr_K3 = [];
            for(let i = 0; i < arrayK3.resultArray_K3.length; i++){
                const obj = arrayK3.resultArray_K3[i];
                const {height} = obj;
                const existingObj = newArr_K3.find(item => item.height === height);  // 检查新数组中是否已存在相同 height 值的对象组合
                if (existingObj) {
                    existingObj.list.push(obj);  // 如果存在，则将当前对象合并到已存在的组合中
                } else {
                    newArr_K3.push({height, list: [obj]});   // 如果不存在，则创建一个新的对象组合，并加入新数组
                }
            }
            newArr_K3.forEach((item, index) => {
                if (item.height === "2") {
                    this.layer_k3_first_floor = getLayerHeatmapFirstFloor_K3(item.list,20,10)
                    this.createPlaneByCanvas_K3_FF(this.layer_k3_first_floor,{
                        x: -4.12,
                        y: 0.2,
                        z: 0.57,
                    })
                } else if (item.height === "6") {
                    this.layer_k3_second_floor = getLayerHeatmapSecondFloor_K3(item.list,20,10)
                    this.createPlaneByCanvas_K3_SF(this.layer_k3_second_floor,{
                        x: -4.12,
                        y: 0.6,
                        z: 0.57,
                    })
                } else {
                    return;
                }
            })
        })
    }
    /**
     * K3库区
     */
    createPlaneByCanvas_K3_FF(canvas, position = {}, size = {x: 1.18, y: 0.34}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_K3_First_Floor_Plane = plane
        this.scene.add(this.layer_K3_First_Floor_Plane)
    }
    createPlaneByCanvas_K3_SF(canvas, position = {}, size = {x: 1.18, y: 0.34}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_K3_Second_Floor_Plane = plane
        this.scene.add(this.layer_K3_Second_Floor_Plane)
    }

    /**
     * K库区
     */
    createPlaneByCanvas_K_FF(canvas, position = {}, size = {x: 1.18, y: 0.34}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_K_First_Floor_Plane = plane
        this.scene.add(this.layer_K_First_Floor_Plane)
    }
    createPlaneByCanvas_K_SF(canvas, position = {}, size = {x: 1.18, y: 0.34}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_K_Second_Floor_Plane = plane
        this.scene.add(this.layer_K_Second_Floor_Plane)
    }
    /**
     * K2库区
     */
    createPlaneByCanvas_K2_FF(canvas, position = {}, size = {x: 4.15, y: 0.45}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_K2_First_Floor_Plane = plane
        this.scene.add(this.layer_K2_First_Floor_Plane)
    }
    createPlaneByCanvas_K2_SF(canvas, position = {}, size = {x: 4.15, y: 0.45}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_K2_Second_Floor_Plane = plane
        this.scene.add(this.layer_K2_Second_Floor_Plane)
    }

    /**
     * K1库区
     */
    createPlaneByCanvas_K1_FF(canvas, position = {}, size = {x: 2.95, y: 0.45}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_K1_First_Floor_Plane = plane
        this.scene.add(this.layer_K1_First_Floor_Plane)
    }
    createPlaneByCanvas_K1_SF(canvas, position = {}, size = {x: 2.95, y: 0.45}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_K1_Second_Floor_Plane = plane
        this.scene.add(this.layer_K1_Second_Floor_Plane)
    }

    /**
     * G库区
     */
    createPlaneByCanvas_G_FF(canvas, position = {}, size = {x: 2.3255, y: 1.79}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_G_First_Floor_Plane = plane
        this.scene.add(this.layer_G_First_Floor_Plane)
    }
    createPlaneByCanvas_G_SF(canvas, position = {}, size = {x: 2.3255, y: 1.79}, rotation = {}){
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_G_Second_Floor_Plane = plane
        this.scene.add(this.layer_G_Second_Floor_Plane)
    }

    /**
     * E3库区
     */
    createPlaneByCanvas_E3_FF(canvas, position = {}, size = {x: 0.55, y: 0.66}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_E3_First_Floor_Plane = plane
        this.scene.add(this.layer_E3_First_Floor_Plane)
    }
    createPlaneByCanvas_E3_SF(canvas, position = {}, size = {x: 0.55, y: 0.66}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_E3_Second_Floor_Plane = plane
        this.scene.add(this.layer_E3_Second_Floor_Plane)
    }

    /**
     * E2库区
     */
    createPlaneByCanvas_E2_FF(canvas, position = {}, size = {x: 0.55, y: 0.66}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_E2_First_Floor_Plane = plane
        this.scene.add(this.layer_E2_First_Floor_Plane)
    }
    createPlaneByCanvas_E2_SF(canvas, position = {}, size = {x: 0.55, y: 0.66}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_E2_Second_Floor_Plane = plane
        this.scene.add(this.layer_E2_Second_Floor_Plane)
    }

    /**
     * E1库区
     */
    createPlaneByCanvas_E1_FF(canvas, position = {}, size = {x: 0.55, y: 0.6}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_E1_First_Floor_Plane = plane
        this.scene.add(this.layer_E1_First_Floor_Plane)
    }
    createPlaneByCanvas_E1_SF(canvas, position = {}, size = {x: 0.55, y: 0.6}, rotation = {}){
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_E1_Second_Floor_Plane = plane
        this.scene.add(this.layer_E1_Second_Floor_Plane)
    }

    /**
     * A库区
     */
    createPlaneByCanvas_A_FF(canvas, position = {}, size = {x: 1.18, y: 1.93}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_A_First_Floor_Plane = plane
        this.scene.add(this.layer_A_First_Floor_Plane)
    }
    createPlaneByCanvas_A_SF(canvas, position = {}, size = {x: 1.18, y: 1.93}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_A_Second_Floor_Plane = plane
        this.scene.add(this.layer_A_Second_Floor_Plane)
    }


    /**
     * BC库区
     */
    createPlaneByCanvas_BC_FF(canvas, position = {}, size = {x: 3.575, y: 1.925}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_BC_First_Floor_Plane = plane
        this.scene.add(this.layer_BC_First_Floor_Plane)
    }
    createPlaneByCanvas_BC_SF(canvas, position = {}, size = {x: 3.575, y: 1.925}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_BC_Second_Floor_Plane = plane
        this.scene.add(this.layer_BC_Second_Floor_Plane)
    }

    /**
     * D库区
     */
    createPlaneByCanvas_D_FF(canvas, position = {}, size = {x: 1.75, y: 1.925}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_D_First_Floor_Plane = plane
        this.scene.add(this.layer_D_First_Floor_Plane)
    }
    createPlaneByCanvas_D_SF(canvas, position = {}, size = {x: 1.75, y: 1.925}, rotation = {}) {
        const geometry = new THREE.PlaneGeometry(size.x, size.y)
        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        })
        texture.needsUpdate = true
        const plane = new THREE.Mesh(geometry, material)
        plane.material.side = 2
        plane.position.x = position.x || 0
        plane.position.y = position.y || 0
        plane.position.z = position.z || 0
        plane.rotation.x = rotation.x || 1.5707963267948966
        plane.rotation.y = rotation.y || 0
        plane.rotation.z = rotation.z || 0
        this.layer_D_Second_Floor_Plane = plane
        this.scene.add(this.layer_D_Second_Floor_Plane)
    }
}
