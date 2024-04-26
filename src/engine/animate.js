import * as THREE from "three";
import cameraModule from "./camera";
import renderer from "./renderer";
import controlsModule from "./controls";
import scene from "../scene/scene";

const clock = new THREE.Clock();
function animate(t) {
    const time = clock.getDelta();
    controlsModule.controls.update(time);
    requestAnimationFrame(animate);
    renderer.render(scene, cameraModule.activeCamera);
}

export default animate;
