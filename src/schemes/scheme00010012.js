export default {
    developer: "panStamp",
    product: "3-channel current meter with temperature sensor",
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
                    name: "Current channel 1",
                    type: "int",
                    dir: "input",
                    size: 4,
                    pos: 4,
                    units:
                    [
                        {
                            name: "mA",
                            factor: 1,
                            offset: 0
                        }
                    ]
                },
                {
                    name: "Current channel 2",
                    type: "int",
                    dir: "input",
                    size: 4,
                    pos: 8,
                    units:
                    [
                        {
                            name: "mA",
                            factor: 1,
                            offset: 0
                        }
                    ]
                },
                {
                    name: "Current channel 3",
                    type: "int",
                    dir: "input",
                    size: 4,
                    pos: 12,
                    units:
                    [
                        {
                            name: "mA",
                            factor: 1,
                            offset: 0
                        }
                    ]
                }
            ]
        }
    ]
}
