/**
 * 库区x坐标转换
 * @param positionX 原始x坐标
 * @param length 库区的长度
 * @param minX 库区最小的x坐标
 * @param maxX 库区最大的x坐标
 * @returns {string|number} 计算后的3d坐标
 */

export const getAreaX=(positionX, {length, minX, maxX})=> {
    if (positionX == null) {
        return 0;
    }
    // 计算比例
    let rate = (positionX - minX) / (maxX - minX);
    let x3d = rate;
    // 按比例算出3d的坐标
    return x3d.toFixed(4);
}

/**
 * 库区z坐标转换
 * @param positionZ 原始y坐标
 * @param width 库区的宽度
 * @param minZ 库区最小的z坐标
 * @param maxZ 库区最大的z坐标
 * @returns {string|number} 计算后的3d坐标
 */

export function getAreaZ(positionZ, {width, minZ, maxZ}) {
    if (positionZ == null) {
        return 0;
    }
    // 计算比例
    let rate = (positionZ - minZ) / (maxZ - minZ);
    let z3d = (1 - rate);
    // 按比例算出3d的坐标
    return z3d.toFixed(4);
}
