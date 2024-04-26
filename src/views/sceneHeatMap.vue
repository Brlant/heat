<template>
  <div class="scene">
    <div ref="sceneDiv"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as THREE from "three";
import gui from "../engine/gui";
import scene from "../scene/scene";
import cameraModule from "../engine/camera";
import controls from "../engine/controls";
import axesHelper from "../engine/axesHelper";
import gridHelper from "../engine/gridHelper";
import renderer from "../engine/renderer";
import animate from "../engine/animate";
import eventHub from "../until/eventHub";
import createWareHouse from "../mesh/createWareHouse";
import createMap from "../mesh/createMap";
import createThermometer from "../mesh/createThermometer";
import "../engine/init";


createWareHouse()
// createMap() //热立场
createThermometer()
let sceneDiv = ref(null);
scene.add(cameraModule.activeCamera);
scene.add(gridHelper);

onMounted(() => {
  sceneDiv.value.appendChild(renderer.domElement);
  animate();
  if (!sessionStorage.getItem('isReloaded')) {
    sessionStorage.setItem('isReloaded', true);
    location.reload();
  } else {
    sessionStorage.removeItem('isReloaded');
  }
});

</script>

<style>
.scene {
  width: 100%;
  height: 100%;
}
</style>
