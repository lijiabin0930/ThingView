<template>
    <div>
        <div style="margin-left: 20px; margin-top: 10px; margin-bottom: 20px;">
            <el-row>
                <el-col :span="20">
                    <div style="float:left">
                        <el-button icon="el-icon-edit" type="primary" size="small"
                            @click="addmodelstatusDialog == true">
                            自定义</el-button>
                    </div>

                </el-col>
                <el-col :span="4">
                    <div style="float:right">
                        <el-button type="info" size="small" plain @click="oepndialogTSLModelVisible(true)">TSL模型
                        </el-button>
                        <el-button type="info" size="small" plain @click="dialogUploadFileVisible = true">
                            快速上传
                        </el-button>
                    </div>

                </el-col>
            </el-row>
        </div>
        <!-- 分割线 -->
        <el-divider content-position="center"></el-divider>

        <!-- 数据显示区 -->

        <el-descriptions title="设备基本信息" :size="medium" border>
            <el-descriptions-item label="类型">DeviceModel</el-descriptions-item>
            <el-descriptions-item label="名称">led-light</el-descriptions-item>
            <el-descriptions-item label="命名空间">default</el-descriptions-item>
            <el-descriptions-item label="模型描述">aaaasdadwads</el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="center"><i class="el-icon-thumb"></i></el-divider>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column align="center" prop="properties" label="功能类型">
            </el-table-column>
            <el-table-column align="center" prop="name" label="功能名称">
            </el-table-column>
            <el-table-column align="center" prop="type" label="类型">
            </el-table-column>
            <el-table-column align="center" prop="accessmode" label="权限">
            </el-table-column>
            <el-table-column align="center" prop="defaultValue" label="数据定义">
            </el-table-column>
            <el-table-column align="center" prop="description" label="描述">
            </el-table-column>
            <el-table-column align="center" prop="operate" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteDevice(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>

            <div style="margin-bottom:10px;margin-top:15px;float: right;">

                <el-button type="primary">提交</el-button>
            </div>
        </div>



        <device-model-vue></device-model-vue>

        <!-- 文件上传逻辑解析 -->
        <el-dialog title="提示" :visible.sync="dialogUploadFileVisible" width="60%">
            <div>
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" accept=".json"
                    :on-success="uploadSuccess" :limit="1" :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传json文件</div>
                </el-upload>
                <div v-if="isok" style="margin-left: 30px;margin-top: 30px;">
                    <b-code-editor v-model="jsonStr" :auto-format="true" :smart-indent="true" theme="dracula"
                        :indent-unit="4" :line-wrap="false" ref="editor"></b-code-editor>
                    <br>
                    <el-row :gutter="20">
                        <el-col :span="18" :offset="22">
                            <el-button type="warning" @click="onSubumitJson">提交</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-dialog>

        <!-- 添加模型属性 -->
        <el-dialog title="提示" :visible.sync="addmodelstatusDialog" width="30%" :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">提交</el-button>
            </span>
        </el-dialog>


    </div>
</template>
<script>

import deviceModelVue from "@/static/deviceModel.vue";
//引入
import pubsub from 'pubsub-js'


export default {
    name: "registerDeviceModel",
    components: { deviceModelVue },
    beforeDestroy() {
        pubsub.unsubscribe('showTSLDialog');
    },
    created() {
        console.log(this.modelDeviceJson);
    },
    methods: {
        onSubumitJson() {
            this.dialogUploadFileVisible = false
            this.isok = false
            this.jsonSt = null
            this.fileList = []
            //json 给后端 

        },
        oepndialogTSLModelVisible(result) {
            this.dialogTSLModelVisible = result
            pubsub.publishSync("showTSLDialog", this.dialogTSLModelVisible);
        },
        uploadSuccess(response, file, fileList) {
            // console.log(response,file,fileList,">>>>>>>>..")
            console.log(response.status);
            console.log(">>>>>>>>>>>>>>>>>>.")
            console.log(file, fileList)
            if (file.status == 'success') {
                this.$message.success(`上传文件${file.name}成功`)
            }
            this.isok = true
        },
        // 检测json格式
        isJSON(str) {
            if (typeof str == 'string') {
                try {
                    var obj = JSON.parse(str);
                    if (typeof obj == 'object' && obj) {
                        return true;
                    } else {
                        return false;
                    }

                } catch (e) {
                    return false;
                }
            } else if (typeof str == 'object' && str) {
                return true;
            }
        },
        onSubumit() {
            if (!this.isJSON(this.jsonStr)) {
                this.$message.error(`json格式错误`)
                return false
            }
            this.$message.success('json格式正确')
        },
        addmodelstatus() {

        }
    },
    data() {
        return {
            showdata: false,
            fileList: [],
            dialogTSLModelVisible: false,
            dialogUploadFileVisible: false,
            jsonStr: `{
                    "employees": [{
                    "firstName": "Bill",
                    "lastName": "Gates"
                    }, {
                    "firstName": "George",
                    "lastName": "Bush"
                    }, {
                    "firstName": "Thomas",
                    "lastName": "Carter"
                    }]
                         }`,
            isok: false,
            tableData: [{
                properties: '属性', name: 'power-status', type: 'string', accessmode: "ReadWrite",
                defaultValue: "{maximum:100, unit: degree celsius}", description: 'enable data collection of temperature sensor'
            }, {
                properties: '属性', name: 'power-status', type: 'string', accessmode: "ReadWrite",
                defaultValue: "{maximum:100, unit: degree celsius}", description: 'enable data collection of temperature sensor'
            }, {
                properties: '属性', name: 'power-status', type: 'string', accessmode: "ReadWrite",
                defaultValue: "{maximum:100, unit: degree celsius}", description: 'enable data collection of temperature sensor'
            }, {
                properties: '属性', name: 'power-status', type: 'string', accessmode: "ReadWrite",
                defaultValue: "{maximum:100, unit: degree celsius}", description: 'enable data collection of temperature sensor'
            }

            ],
            addmodelstatusDialog: false


        };
    },
};
</script>

<style scoped lange="less">
</style>