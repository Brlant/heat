import {http} from "./http";

/**
 * 查询3d热立图数据
 * **/
export const hotMap = (id)=>{
    return http({
        url:`/warehousePointImage/3d/hotMap/${id}`,
        method:"GET",
    })
}

/**
 * 获取设备分布图3d详情
 * **/
export const thermometerPosition = (id,params)=>{
    return http({
        url:`/warehousePointImage/3d/${id}`,
        method:"GET",
        params:params
    })
}

//无线
export const wirelessPosition = (id,params)=>{
    return http({
        url:`/warehousePointImage/3d/${id}`,
        method:"GET",
        params:params
    })
}
//有限
export const wiredPosition = (id,params)=>{
    return http({
        url:`/warehousePointImage/3d/${id}`,
        method:"GET",
        params:params
    })
}
//其他
export const otherPosition = (id,params)=>{
    return http({
        url:`/warehousePointImage/3d/${id}`,
        method:"GET",
        params:params
    })
}
