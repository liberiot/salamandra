export default {
    developer: "panStamp",
    product: "Motion, vibration and temperature sensor",
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
                    name: "Motion",
                    type: "bool",
                    dir: "input",
                    size: 1,
                    pos: 4,
                    units: []
                }
            ]
        }
    ]
}
