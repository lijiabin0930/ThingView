<template>
    <div>
        <div style="margin-left: 20px; margin-top: 10px; margin-bottom: 20px">
            <el-button type="info" size="small" plain @click="oepndialogTSLModelVisible(true)">TSL模型</el-button>
            <el-button type="info" size="small" plain @click="dialogUploadFileVisible = true">
                快速上传
            </el-button>
        </div>
        <device-model-vue></device-model-vue>

        <!-- 文件上传逻辑解析 -->
        <el-dialog title="提示" :visible.sync="dialogUploadFileVisible" width="30%" :before-close="handleClose">
            <div>
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple
                    :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>


            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
        oepndialogTSLModelVisible(result) {
            this.dialogTSLModelVisible = result
            pubsub.publishSync("showTSLDialog", this.dialogTSLModelVisible);
        }
    },
    data() {
        return {
            dialogTSLModelVisible: false,
            dialogUploadFileVisible: false,
        };
    },
};
</script>

<style scoped lange="less">
</style>