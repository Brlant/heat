import cameraModule from "./camera";
import renderer from "./renderer";

/**
 * 更新摄像头
 * 更新摄像机的投影矩阵
 * 监听屏幕大小改变的变化，设置渲染的尺寸
 * **/

cameraModule.activeCamera.aspect = window.innerWidth / window.innerHeight;
cameraModule.activeCamera.updateProjectionMatrix();

/**
 *更新摄像头
 *更新摄像机的投影矩阵
 *更新渲染器
 *设置渲染器的像素比例
 **/

window.addEventListener("resize", () => {
    cameraModule.activeCamera.aspect = window.innerWidth / window.innerHeight;
    cameraModule.activeCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});
