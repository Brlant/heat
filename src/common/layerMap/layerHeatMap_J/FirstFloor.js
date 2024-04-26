import h337 from '@rengr/heatmap.js'
export function getLayerHeatmapFirstFloor_J(points, x = 30, y = 30) {
    var canvasBox = document.createElement('div')
    document.body.appendChild(canvasBox)

    canvasBox.style.width = x + 'px'
    canvasBox.style.height = y + 'px'
    canvasBox.style.position = 'absolute'

    var heatmapInstance = h337.create({
        container: canvasBox,
        backgroundColor: 'rgba(255, 255, 255, 0)', // '#121212'    'rgba(0,102,256,0.2)'
        radius: 10, // [0,+∞)
        minOpacity: 0,
        maxOpacity: 0.6,
    })
    // 构建一些随机数据点,这里替换成你的业务数据
    var data
    if (points && points.length) {
        data = {
            max: 40,
            min: 0,
            data: points,
        }
    } else {
        let randomPoints = []
        var max = 0
        var cwidth = x
        var cheight = y
        var len = 50

        while (len--) {
            var val = Math.floor(Math.random() * 10 + 20)
            max = Math.max(max, val)
            var point = {
                x: Math.floor(Math.random() * cwidth),
                y: Math.floor(Math.random() * cheight),
                value: val,
            }
            randomPoints.push(point)
        }
        data = {
            max: 60,
            min: 15,
            data: randomPoints,
        }
    }

    // 因为data是一组数据,所以直接setData

    heatmapInstance.setData(data)
    let canvas = canvasBox.querySelector('canvas')
    document.body.removeChild(canvasBox)
    return canvas
}
