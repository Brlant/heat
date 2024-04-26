import h337 from '@rengr/heatmap.js'
export function getLayerHeatmapFirstFloor_K2(points, x , y ) {
    var canvasBox = document.createElement('div')
    document.body.appendChild(canvasBox)
    canvasBox.style.width = x + 'px'
    canvasBox.style.height = y + 'px'
    canvasBox.style.position = 'absolute'
    var heatmapInstance = h337.create({
        container: canvasBox,
        backgroundColor: 'rgba(255, 255, 255, 0)', // '#121212'    'rgba(0,102,256,0.2)'
        radius: 12, // [0,+∞)
        minOpacity: 0,
        maxOpacity: 0.6,
    })
    // 构建一些随机数据点,这里替换成你的业务数据
    var data
    var randomPoints = []
    var max = 0
    var cwidth = x
    var cheight = y
    points.forEach((item, index) => {
        let val = item.temperature
        let point = {
            x: Math.floor(item.x  * cwidth ),
            y: Math.floor(item.y  * cheight ),
            value: val,
        }
        randomPoints.push(point)
    })
    data = {
        max: 10,
        min: 2,
        data: randomPoints,
    }
    // 因为data是一组数据,所以直接setData
    heatmapInstance.setData(data)
    let canvas = canvasBox.querySelector('canvas')
    document.body.removeChild(canvasBox)
    return canvas
}
