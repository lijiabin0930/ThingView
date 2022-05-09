<template>
    <div>
        <div style="margin-left: 20px; margin-top: 10px; margin-bottom: 20px;">
            <el-row>
                <el-col :span="20">
                    <div style="float:left">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                自定义模型<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  disabled>模型基本信息</el-dropdown-item>
                            
                                <el-dropdown-item >属性定义</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-button icon="el-icon-edit" type="primary" size="small" @click="addmodelstatusDialog = true">
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
            <el-descriptions-item label="编辑">
                <div style="float:right">
                     <el-button type="primary" icon="el-icon-edit" size="small"></el-button>
                </div>
               </el-descriptions-item>
            
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
        <el-dialog title="创建模型属性" :visible.sync="addmodelstatusDialog" width="60%" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="模型名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="命名空间">
                    <el-select v-model="form.namespaces" placeholder="请选择命名空间">
                        <el-option label="default1" value="default1"></el-option>
                        <el-option label="default2" value="default2"></el-option>
                        <el-option label="default2" value="default2"></el-option>
                    </el-select>
                </el-form-item>

                <!-- 添加属性 -->
                <el-divider content-position="left">添加属性</el-divider>

                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;">
                        </el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="即时配送">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>

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
            addmodelstatusDialog: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }


        };
    },
};
</script>

<style scoped lange="less">
 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>