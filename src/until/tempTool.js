/**
 * 温度计库区X坐标转换
 * **/
let length = 11.956
let width = 7.764
let minX = 0.14245
let maxZ = 3.579867
export const tempToolX = (x) => {
    // 计算比例
    let rateTempToolX = ((x+minX) / (100+minX)) * length - (length / 2)
    let axisX = rateTempToolX;
    return axisX.toFixed(20);
}

/**
 * 温度计库区Y坐标转换
 * **/
export const tempToolZ = (y) => {
    // 计算比例
    let rateTempToolZ = ((y+maxZ) / (100+maxZ)) * width - (width / 2)
    let axisZ = rateTempToolZ;
    return axisZ.toFixed(20);
}
