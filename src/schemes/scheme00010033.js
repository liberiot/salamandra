export default {
    developer: "panStamp",
    product: "Range/level finder with temperature sensor",
    pwrdownmode: "true",
    registers:
    [
        {
            id: 7,
            endpoints:
            [
                {
                    name: "Voltage",
                    type: "float",
                    dir: "input",
                    size: 2,
                    pos: 0,
                    units:
                    [
                        {
                            name: "V",
                            factor: 0.001,
                            offset: 0
                        }
                    ]
                },
                {
                    name: "Temperature",
                    type: "float",
                    dir: "input",
                    size: 2,
                    pos: 2,
                    units:
                    [
                        {
                            name: "C",
                            factor: 0.1,
                            offset: -50
                        },
                        {
                            name: "F",
                            factor: 0.18,
                            offset: -58
                        },
                        {
                            name: "K",
                            factor: 0.1,
                            offset: 223.15
                        }
                    ]
                },
                {
                    name: "level",
                    type: "int",
                    dir: "input",
                    size: 2,
                    pos: 4,
                    units:
                    [
                        {
                            name: "cm",
                            factor: 1,
                            offset: 0
                        }
                    ]
                }
            ]
        }
    ]
}
