export default {
    developer: "panStamp",
    product: "RGB driver",
    pwrdownmode: "false",
    registers:
    [
        {
            id: 7,
            endpoints:
            [
                {
                    name: "RGB level",
                    type: "int",
                    dir: "output",
                    size: 3,
                    pos: 0,
                    units: []
                },
                {
                    name: "Red",
                    type: "int",
                    dir: "output",
                    size: 1,
                    pos: 0,
                    units: []
                },
                {
                    name: "Green",
                    type: "int",
                    dir: "output",
                    size: 1,
                    pos: 1,
                    units: []
                },
                {
                    name: "Blue",
                    type: "int",
                    dir: "output",
                    size: 1,
                    pos: 2,
                    units: []
                }
            ]
        }
    ]
}
