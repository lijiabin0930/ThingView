<template>
    <div>
        <el-dialog title="TSL模型" :visible.sync="dialogTSLModelVisible" width="60%">
            <div class="info">
                <span class="ccc">
                    物模型是对设备在云端的功能描述，包括设备的属性、服务和事件。物联网平台通过定义一种物的描述语言来描述物模型，称之为
                    TSL（即 Thing Specification Language），采用 JSON 格式，您可以根据 TSL
                    组装上报设备的数据。您可以导出完整物模型，用于云端应用开发；您也可以只导出精简物模型，配合设备端
                    Mapper 实现设备开发。
                </span>
            </div>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="查看物模型" name="first">
                    <json-viewer :value="modelDeviceJson" copyable boxed :expand-depth="20"></json-viewer>
                </el-tab-pane>
                <el-tab-pane label="查看实例模型" name="second">
                    <json-viewer :value="deviceInstanceModel" copyable boxed :expand-depth="15"></json-viewer>
                    >
                </el-tab-pane>
            </el-tabs>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogTSLModelVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogTSLModelVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
    name: 'deviceModel',
    mounted() {
        pubsub.subscribe("showTSLDialog", (e, msg) => {
            console.log(e, msg);//sendMsg 这是A组件发布的消息！
            this.dialogTSLModelVisible= msg
        })
    },
    created() {
        console.log(this.show);
    },
    props: {
        show: { type: Boolean, default: false }
    },
    data() {
        return {
            dialogTSLModelVisible: false,
            modelDeviceJson: {
                apiVersion: "apiextensions.k8s.io/v1beta1",
                kind: "CustomResourceDefinition",
                metadata: {
                    name: "devicemodels.devices.kubeedge.io",
                },
                spec: {
                    group: "devices.kubeedge.io",
                    names: {
                        kind: "DeviceModel",
                        plural: "devicemodels",
                    },
                    scope: "Namespaced",
                    validation: {
                        openAPIV3Schema: {
                            properties: {
                                apiVersion: {
                                    description: {
                                        0: "of an object. Servers should convert recognized schemas to the latest",
                                        "internal value, and may reject unrecognized values. More info":
                                            "https:\\\\git.k8s.io\\community\\contributors\\devel\\api-conventions.md#resources'",
                                    },
                                    type: "string",
                                },
                                kind: {
                                    description: {
                                        0: "object represents. Servers may infer this from the endpoint the client",
                                        "submits requests to. Cannot be updated. In CamelCase. More info":
                                            "https:\\\\git.k8s.io\\community\\contributors\\devel\\api-conventions.md#types-kinds'",
                                    },
                                    type: "string",
                                },
                                metadata: {
                                    type: "object",
                                },
                                spec: {
                                    properties: {
                                        properties: {
                                            description: "Required: List of device properties.",
                                            items: {
                                                properties: {
                                                    description: {
                                                        description: "The device property description.",
                                                        type: "string",
                                                    },
                                                    name: {
                                                        description: "Required: The device property name.",
                                                        type: "string",
                                                    },
                                                    type: {
                                                        description: {
                                                            "'Required":
                                                                "PropertyType represents the type and data",
                                                            0: "validation of the property.'",
                                                        },
                                                        properties: {
                                                            int: {
                                                                properties: {
                                                                    accessMode: {
                                                                        description: {
                                                                            "'Required":
                                                                                "Access mode of property, ReadWrite",
                                                                            0: "or ReadOnly.'",
                                                                        },
                                                                        type: "string",
                                                                        enum: ["ReadOnly", "ReadWrite"],
                                                                    },
                                                                    defaultValue: {
                                                                        format: "int64",
                                                                        type: "integer",
                                                                    },
                                                                    maximum: {
                                                                        format: "int64",
                                                                        type: "integer",
                                                                    },
                                                                    minimum: {
                                                                        format: "int64",
                                                                        type: "integer",
                                                                    },
                                                                    unit: {
                                                                        description: "The unit of the property",
                                                                        type: "string",
                                                                    },
                                                                },
                                                                required: ["accessMode"],
                                                                type: "object",
                                                            },
                                                            string: {
                                                                properties: {
                                                                    accessMode: {
                                                                        description: {
                                                                            "'Required":
                                                                                "Access mode of property, ReadWrite",
                                                                            0: "or ReadOnly.'",
                                                                        },
                                                                        type: "string",
                                                                        enum: ["ReadOnly", "ReadWrite"],
                                                                    },
                                                                    defaultValue: {
                                                                        type: "string",
                                                                    },
                                                                },
                                                                required: ["accessMode"],
                                                                type: "object",
                                                            },
                                                        },
                                                        type: "object",
                                                    },
                                                },
                                                required: ["name", "type"],
                                                type: "object",
                                            },
                                            type: "array",
                                        },
                                    },
                                    type: "object",
                                },
                            },
                        },
                    },
                    version: "v1alpha2",
                },
            },
            deviceInstanceModel: {
                "apiVersion": "apiextensions.k8s.io/v1beta1",
                "kind": "CustomResourceDefinition",
                "metadata": {
                    "labels": {
                        "controller-tools.k8s.io": "1.0"
                    },
                    "name": "devices.devices.kubeedge.io"
                },
                "spec": {
                    "group": "devices.kubeedge.io",
                    "names": {
                        "kind": "Device",
                        "plural": "devices"
                    },
                    "scope": "Namespaced",
                    "validation": {
                        "openAPIV3Schema": {
                            "properties": {
                                "apiVersion": {
                                    "description": {
                                        "0": "of an object. Servers should convert recognized schemas to the latest",
                                        "internal value, and may reject unrecognized values. More info": "https://git.k8s.io/community/contributors/devel/api-conventions.md#resources'"
                                    },
                                    "type": "string"
                                },
                                "kind": {
                                    "description": {
                                        "0": "object represents. Servers may infer this from the endpoint the client",
                                        "submits requests to. Cannot be updated. In CamelCase. More info": "https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds'"
                                    },
                                    "type": "string"
                                },
                                "metadata": {
                                    "type": "object"
                                },
                                "spec": {
                                    "properties": {
                                        "deviceModelRef": {
                                            "description": {
                                                "'Required": "DeviceModelRef is reference to the device model",
                                                "0": "used as a template to create the device instance.'"
                                            },
                                            "type": "object"
                                        },
                                        "nodeSelector": {
                                            "description": [
                                                "devices and nodes. Refer to k8s.io/kubernetes/pkg/apis/core NodeSelector",
                                                "for more details"
                                            ],
                                            "type": "object"
                                        },
                                        "protocol": {
                                            "description": {
                                                "'Required": "The protocol configuration used to connect to",
                                                "0": "the device.'"
                                            },
                                            "properties": {
                                                "bluetooth": {
                                                    "description": "Protocol configuration for bluetooth",
                                                    "properties": {
                                                        "macAddress": {
                                                            "description": "Unique identifier assigned to the device.",
                                                            "type": "string"
                                                        }
                                                    },
                                                    "type": "object"
                                                },
                                                "modbus": {
                                                    "description": "Protocol configuration for modbus",
                                                    "properties": {
                                                        "slaveID": {
                                                            "description": "Required. 0-255",
                                                            "format": "int64",
                                                            "type": "integer",
                                                            "minimum": 0,
                                                            "maximum": 255
                                                        }
                                                    },
                                                    "required": [
                                                        "slaveID"
                                                    ],
                                                    "type": "object"
                                                },
                                                "opcua": {
                                                    "description": "Protocol configuration for opc-ua",
                                                    "properties": {
                                                        "certificate": {
                                                            "description": "Certificate for access opc server.",
                                                            "type": "string"
                                                        },
                                                        "password": {
                                                            "description": "Password for access opc server.",
                                                            "type": "string"
                                                        },
                                                        "privateKey": {
                                                            "description": "PrivateKey for access opc server.",
                                                            "type": "string"
                                                        },
                                                        "securityMode": {
                                                            "description": "Defaults to \"none\".",
                                                            "type": "string"
                                                        },
                                                        "securityPolicy": {
                                                            "description": "Defaults to \"none\".",
                                                            "type": "string"
                                                        },
                                                        "timeout": {
                                                            "description": "Timeout seconds for the opc server connection.???",
                                                            "format": "int64",
                                                            "type": "integer"
                                                        },
                                                        "url": {
                                                            "description": "Required: The URL for opc server endpoint.",
                                                            "type": "string"
                                                        },
                                                        "userName": {
                                                            "description": "Username for access opc server.",
                                                            "type": "string"
                                                        }
                                                    },
                                                    "required": [
                                                        "url"
                                                    ],
                                                    "type": "object"
                                                },
                                                "common": {
                                                    "description": "Common part of protocol configuration",
                                                    "properties": {
                                                        "com": {
                                                            "properties": {
                                                                "baudRate": {
                                                                    "description": "Required. BaudRate 115200|57600|38400|19200|9600|4800|2400|1800|1200|600|300|200|150|134|110|75|50",
                                                                    "format": "int64",
                                                                    "type": "integer",
                                                                    "enum": [
                                                                        115200,
                                                                        57600,
                                                                        38400,
                                                                        19200,
                                                                        9600,
                                                                        4800,
                                                                        2400,
                                                                        1800,
                                                                        1200,
                                                                        600,
                                                                        300,
                                                                        200,
                                                                        150,
                                                                        134,
                                                                        110,
                                                                        75,
                                                                        50
                                                                    ]
                                                                },
                                                                "dataBits": {
                                                                    "description": "Required. Valid values are 8, 7, 6, 5.",
                                                                    "format": "int64",
                                                                    "type": "integer",
                                                                    "enum": [
                                                                        8,
                                                                        7,
                                                                        6,
                                                                        5
                                                                    ]
                                                                },
                                                                "parity": {
                                                                    "description": [
                                                                        "\"odd\". Defaults to \"none\"."
                                                                    ],
                                                                    "type": "string",
                                                                    "enum": [
                                                                        "none",
                                                                        "even",
                                                                        "odd"
                                                                    ]
                                                                },
                                                                "serialPort": {
                                                                    "description": "Required.",
                                                                    "type": "string"
                                                                },
                                                                "stopBits": {
                                                                    "description": "Required. Bit that stops 1|2",
                                                                    "format": "int64",
                                                                    "type": "integer",
                                                                    "enum": [
                                                                        1,
                                                                        2
                                                                    ]
                                                                }
                                                            },
                                                            "required": [
                                                                "baudRate",
                                                                "dataBits",
                                                                "parity",
                                                                "serialPort",
                                                                "stopBits"
                                                            ],
                                                            "type": "object"
                                                        },
                                                        "tcp": {
                                                            "properties": {
                                                                "ip": {
                                                                    "description": "Required.",
                                                                    "type": "string"
                                                                },
                                                                "port": {
                                                                    "description": "Required.",
                                                                    "format": "int64",
                                                                    "type": "integer"
                                                                }
                                                            },
                                                            "required": [
                                                                "ip",
                                                                "port"
                                                            ],
                                                            "type": "object"
                                                        },
                                                        "commType": {
                                                            "description": "Communication type, like tcp client, tcp server or COM",
                                                            "type": "string"
                                                        },
                                                        "reconnTimeout": {
                                                            "description": "Reconnection timeout",
                                                            "type": "integer"
                                                        },
                                                        "reconnRetryTimes": {
                                                            "description": "Reconnecting retry times",
                                                            "type": "integer"
                                                        },
                                                        "collectTimeout": {
                                                            "description": "Define timeout of mapper collect from device.",
                                                            "format": "int64",
                                                            "type": "integer"
                                                        },
                                                        "collectRetryTimes": {
                                                            "description": "Define retry times of mapper will collect from device.",
                                                            "format": "int64",
                                                            "type": "integer"
                                                        },
                                                        "collectType": {
                                                            "description": "Define collect type, sync or async.",
                                                            "type": "string",
                                                            "enum": [
                                                                "sync",
                                                                "async"
                                                            ]
                                                        },
                                                        "customizedValues": {
                                                            "description": "Customized values for provided protocol",
                                                            "type": "object"
                                                        }
                                                    },
                                                    "type": "object"
                                                },
                                                "customizedProtocol": {
                                                    "description": "Protocol configuration for customized Protocol",
                                                    "properties": {
                                                        "protocolName": {
                                                            "description": "The name of protocol",
                                                            "type": "string"
                                                        },
                                                        "configData": {
                                                            "description": "customized config data",
                                                            "type": "object"
                                                        }
                                                    },
                                                    "required": [
                                                        "protocolName"
                                                    ],
                                                    "type": "object"
                                                }
                                            },
                                            "type": "object"
                                        },
                                        "propertyVisitors": {
                                            "description": {
                                                "'Required": "List of property visitors which describe how",
                                                "0": "to access the device properties. PropertyVisitors must unique by propertyVisitor.propertyName.'"
                                            },
                                            "items": {
                                                "properties": {
                                                    "bluetooth": {
                                                        "description": [
                                                            "config fields of bluetooth protocol."
                                                        ],
                                                        "properties": {
                                                            "characteristicUUID": {
                                                                "description": "Required: Unique ID of the corresponding operation",
                                                                "type": "string"
                                                            },
                                                            "dataConverter": {
                                                                "description": [
                                                                    "from the bluetooth device into a form that is understandable",
                                                                    "by the platform"
                                                                ],
                                                                "properties": {
                                                                    "endIndex": {
                                                                        "description": {
                                                                            "'Required": "Specifies the end index of incoming",
                                                                            "0": "byte stream to be considered to convert the data the",
                                                                            "1": "value specified should be inclusive for example if 3",
                                                                            "2": "is specified it includes the third index'"
                                                                        },
                                                                        "format": "int64",
                                                                        "type": "integer"
                                                                    },
                                                                    "orderOfOperations": {
                                                                        "description": [
                                                                            "are required to be performed to convert incoming data",
                                                                            "into understandable form) are performed"
                                                                        ],
                                                                        "items": {
                                                                            "properties": {
                                                                                "operationType": {
                                                                                    "description": {
                                                                                        "'Required": "Specifies the operation",
                                                                                        "0": "to be performed to convert incoming data'"
                                                                                    },
                                                                                    "type": "string",
                                                                                    "enum": [
                                                                                        "Add",
                                                                                        "Subtract",
                                                                                        "Multiply",
                                                                                        "Divide"
                                                                                    ]
                                                                                },
                                                                                "operationValue": {
                                                                                    "description": {
                                                                                        "'Required": "Specifies with what value",
                                                                                        "0": "the operation is to be performed'"
                                                                                    },
                                                                                    "format": "double",
                                                                                    "type": "number"
                                                                                }
                                                                            },
                                                                            "type": "object"
                                                                        },
                                                                        "type": "array"
                                                                    },
                                                                    "shiftLeft": {
                                                                        "description": [
                                                                            "if left-shift operation is necessary for conversion"
                                                                        ],
                                                                        "format": "int64",
                                                                        "type": "integer"
                                                                    },
                                                                    "shiftRight": {
                                                                        "description": [
                                                                            "if right-shift operation is necessary for conversion"
                                                                        ],
                                                                        "format": "int64",
                                                                        "type": "integer"
                                                                    },
                                                                    "startIndex": {
                                                                        "description": {
                                                                            "'Required": "Specifies the start index of the",
                                                                            "0": "incoming byte stream to be considered to convert the",
                                                                            "data. For example": "start-index:2, end-index:3 concatenates",
                                                                            "1": "the value present at second and third index of the incoming",
                                                                            "2": "byte stream. If we want to reverse the order we can",
                                                                            "3": "give it as start-index:3, end-index:2'"
                                                                        },
                                                                        "format": "int64",
                                                                        "type": "integer"
                                                                    }
                                                                },
                                                                "required": [
                                                                    "endIndex",
                                                                    "startIndex"
                                                                ],
                                                                "type": "object"
                                                            },
                                                            "dataWrite": {
                                                                "description": {
                                                                    "0": "the platform into a form that is understood by the bluetooth",
                                                                    "device For example": "ON\":[1], \"OFF\":[0]"
                                                                },
                                                                "type": "object"
                                                            }
                                                        },
                                                        "required": [
                                                            "characteristicUUID"
                                                        ],
                                                        "type": "object"
                                                    },
                                                    "modbus": {
                                                        "description": [
                                                            "fields of modbus protocol."
                                                        ],
                                                        "properties": {
                                                            "isRegisterSwap": {
                                                                "description": [
                                                                    "Defaults to false."
                                                                ],
                                                                "type": "boolean"
                                                            },
                                                            "isSwap": {
                                                                "description": [
                                                                    "Defaults to false."
                                                                ],
                                                                "type": "boolean"
                                                            },
                                                            "limit": {
                                                                "description": "Required: Limit number of registers to read/write.",
                                                                "format": "int64",
                                                                "type": "integer"
                                                            },
                                                            "offset": {
                                                                "description": {
                                                                    "'Required": "Offset indicates the starting register",
                                                                    "0": "number to read/write data.'"
                                                                },
                                                                "format": "int64",
                                                                "type": "integer"
                                                            },
                                                            "register": {
                                                                "description": "Required: Type of register",
                                                                "type": "string",
                                                                "enum": [
                                                                    "CoilRegister",
                                                                    "DiscreteInputRegister",
                                                                    "InputRegister",
                                                                    "HoldingRegister"
                                                                ]
                                                            },
                                                            "scale": {
                                                                "description": [
                                                                    "units. Defaults to 1.0"
                                                                ],
                                                                "format": "double",
                                                                "type": "number"
                                                            }
                                                        },
                                                        "required": [
                                                            "limit",
                                                            "offset",
                                                            "register"
                                                        ],
                                                        "type": "object"
                                                    },
                                                    "opcua": {
                                                        "description": [
                                                            "fields of opc-ua protocol."
                                                        ],
                                                        "properties": {
                                                            "browseName": {
                                                                "description": "The name of opc-ua node",
                                                                "type": "string"
                                                            },
                                                            "nodeID": {
                                                                "description": "Required: The ID of opc-ua node, e.g. \"ns=1,i=1005\"",
                                                                "type": "string"
                                                            }
                                                        },
                                                        "required": [
                                                            "nodeID"
                                                        ],
                                                        "type": "object"
                                                    },
                                                    "customizedProtocol": {
                                                        "description": "customized protocol",
                                                        "properties": {
                                                            "protocolName": {
                                                                "description": "The name of protocol",
                                                                "type": "string"
                                                            },
                                                            "configData": {
                                                                "description": "customized Config Data",
                                                                "type": "object"
                                                            }
                                                        },
                                                        "required": [
                                                            "protocolName",
                                                            "configData"
                                                        ],
                                                        "type": "object"
                                                    },
                                                    "propertyName": {
                                                        "description": {
                                                            "'Required": "The device property name to be accessed.",
                                                            "0": "This should refer to one of the device properties defined in",
                                                            "1": "the device model.'"
                                                        },
                                                        "type": "string"
                                                    },
                                                    "reportCycle": {
                                                        "description": "Define how frequent mapper will report the value.",
                                                        "format": "int64",
                                                        "type": "integer"
                                                    },
                                                    "collectCycle": {
                                                        "description": "Define how frequent mapper will collect from device.",
                                                        "format": "int64",
                                                        "type": "integer"
                                                    },
                                                    "customizedValues": {
                                                        "description": "Customized values for visitor of provided protocols",
                                                        "type": "object"
                                                    }
                                                },
                                                "required": [
                                                    "propertyName"
                                                ],
                                                "type": "object"
                                            },
                                            "type": "array"
                                        },
                                        "data": {
                                            "properties": {
                                                "dataTopic": {
                                                    "description": [
                                                        "should be published to this topic,",
                                                        "the default value is $ke/events/device/+/data/update'"
                                                    ],
                                                    "type": "string"
                                                },
                                                "dataProperties": {
                                                    "description": "A list of data properties, which are not required to be processed by edgecore",
                                                    "items": {
                                                        "properties": {
                                                            "propertyName": {
                                                                "description": {
                                                                    "'Required": "The property name for which the desired//reported",
                                                                    "0": "values are specified. This property should be present in the",
                                                                    "1": "device model.'"
                                                                },
                                                                "type": "string"
                                                            },
                                                            "metadata": {
                                                                "description": "Additional metadata like filter policy, should be k-v format",
                                                                "type": "object"
                                                            }
                                                        },
                                                        "required": [
                                                            "propertyName"
                                                        ],
                                                        "type": "object"
                                                    },
                                                    "type": "array"
                                                }
                                            },
                                            "type": "object"
                                        }
                                    },
                                    "required": [
                                        "deviceModelRef",
                                        "nodeSelector"
                                    ],
                                    "type": "object"
                                },
                                "status": {
                                    "properties": {
                                        "twins": {
                                            "description": [
                                                "values of twin properties. A passive device won't have twin properties",
                                                "and this list could be empty."
                                            ],
                                            "items": {
                                                "properties": {
                                                    "desired": {
                                                        "description": "Required: the desired property value.",
                                                        "properties": {
                                                            "metadata": {
                                                                "description": [
                                                                    "was reported etc."
                                                                ],
                                                                "type": "object"
                                                            },
                                                            "value": {
                                                                "description": "Required: The value for this property.",
                                                                "type": "string"
                                                            }
                                                        },
                                                        "required": [
                                                            "value"
                                                        ],
                                                        "type": "object"
                                                    },
                                                    "propertyName": {
                                                        "description": {
                                                            "'Required": "The property name for which the desired//reported",
                                                            "0": "values are specified. This property should be present in the",
                                                            "1": "device model.'"
                                                        },
                                                        "type": "string"
                                                    },
                                                    "reported": {
                                                        "description": "Required: the reported property value.",
                                                        "properties": {
                                                            "metadata": {
                                                                "description": [
                                                                    "was reported etc."
                                                                ],
                                                                "type": "object"
                                                            },
                                                            "value": {
                                                                "description": "Required: The value for this property.",
                                                                "type": "string"
                                                            }
                                                        },
                                                        "required": [
                                                            "value"
                                                        ],
                                                        "type": "object"
                                                    }
                                                },
                                                "required": [
                                                    "propertyName"
                                                ],
                                                "type": "object"
                                            },
                                            "type": "array"
                                        }
                                    },
                                    "type": "object"
                                }
                            }
                        }
                    },
                    "version": "v1alpha2"
                }
            },
            activeName: "first",

        }
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.info {
    width: 100%;
    height: 100px;
    border-color: #909399;
    margin-bottom: 10px;
}
.ccc {
    font-size: 12px Extra Small;
}
</style>