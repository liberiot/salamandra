export default {
    developer: "panStamp",
    product: "Binary/PWM output module",
    pwrdownmode: "false",
    registers:
    [
        {
            id: 7,
            endpoints:
            [
                {
                    name: "Binary output 0",
                    type: "bool",
                    dir: "output",
                    size: 0.1,
                    pos: 0.7,
                    units: []
                },
                {
                    name: "Binary output 1",
                    type: "bool",
                    dir: "output",
                    size: 0.1,
                    pos: 0.6,
                    units: []
                },
                {
                    name: "Binary output 2",
                    type: "bool",
                    dir: "output",
                    size: 0.1,
                    pos: 0.5,
                    units: []
                },
                {
                    name: "Binary output 3",
                    type: "bool",
                    dir: "output",
                    size: 0.1,
                    pos: 0.4,
                    units: []
                },
                {
                    name: "Binary output 4",
                    type: "bool",
                    dir: "output",
                    size: 0.1,
                    pos: 0.3,
                    units: []
                },
                {
                    name: "Binary output 5",
                    type: "bool",
                    dir: "output",
                    size: 0.1,
                    pos: 0.2,
                    units: []
                },
                {
                    name: "Binary output 6",
                    type: "bool",
                    dir: "output",
                    size: 0.1,
                    pos: 0.1,
                    units: []
                },
                {
                    name: "Binary output 7",
                    type: "bool",
                    dir: "output",
                    size: 0.1,
                    pos: 0.0,
                    units: []
                }
            ]
        },
        {
            id: 8,
            endpoints:
            [
                {
                    name: "PWM output 0",
                    type: "int",
                    dir: "output",
                    size: 1,
                    pos: 3,
                    units: []
                },
                {
                    name: "PWM output 1",
                    type: "int",
                    dir: "output",
                    size: 1,
                    pos: 2,
                    units: []
                },
                {
                    name: "PWM output 2",
                    type: "int",
                    dir: "output",
                    size: 1,
                    pos: 1,
                    units: []
                },
                {
                    name: "PWM output 3",
                    type: "int",
                    dir: "output",
                    size: 1,
                    pos: 0,
                    units: []
                }
            ]
        }
    ]
}
