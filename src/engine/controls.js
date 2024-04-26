import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import cameraModule from "./camera";
import renderer from "./renderer";
import eventHub from "../until/eventHub";

//创建控制器
class ControlsModule {
    constructor() {
        this.controls = null
        // 默认轨道控制器
        this.setOrbitControls()
    }
    /**
     * 设置抗阻尼
     * 设置右键无法拖动
     * 设置最大垂直角度
     * 设置最小垂直角度
     * 设置控制器的目标方向
     * **/
    setOrbitControls() {
        this.controls = new OrbitControls(cameraModule.activeCamera,renderer.domElement)
        this.controls.enableDamping = true
        // this.controls.enablePan = true
        this.controls.maxPolarAngle = Math.PI * 0.36
        this.controls.minPolarAngle = 0
        this.controls.autoRotate = false;
        this.controls.autoRotateSpeed = 0;
        this.controls.target.set(0, 0.5, 0);
    }

}

export default new ControlsModule()
