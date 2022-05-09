<template>
  <div>
    <div style="margin-top:15px;margin-left: 20px;margin-bottom: 20px">
      <el-page-header content="" @back="goBack"></el-page-header>
    </div>
    <div style="margin-left: 30px;margin-right: 30px">
      <el-descriptions :column="2" direction="horizon" title="基本信息:">
        <el-descriptions-item label="设备名称">
          <el-tag type="primary">{{ this.product.product_name }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="设备Key">
          <span style="color: #409EFF"> {{ product.product_key }}</span>
        </el-descriptions-item>

      </el-descriptions>

      <el-tabs v-model="activeName" style="margin-top: 30px" type="border-card">
        <el-tab-pane label="产品信息" name="0">
          <span style="font-size: 14px;color: #909399;margin-right: 50px;">产品信息</span>
          <el-button autofocus icon="el-icon-edit" plain size="small" type="primary" @click="editDeviceBasicInfo">编辑
          </el-button>
          <br>
          <div style="margin: 20px 20px 20px 20px">
            <el-descriptions class="margin-top" :column="3" direction="vertical" border>
              <el-descriptions-item label="设备类型">{{ product.point_type }}</el-descriptions-item>
              <el-descriptions-item label="所属品类">{{ product.kind }}</el-descriptions-item>
              <el-descriptions-item label="创建时间"> {{ product.create_time }}</el-descriptions-item>
              <el-descriptions-item label="状态">
                <template>
                  <el-tag type="warning" effect="dark">开发中</el-tag>
                </template>
              </el-descriptions-item>
              <el-descriptions-item label="备注">{{ product.mark }}</el-descriptions-item>
            </el-descriptions>
          </div>


          <span style="font-size: 14px;color: #909399;margin-right: 50px;">标签信息</span>
          <el-button autofocus icon="el-icon-edit" plain size="small" type="primary"
                     @click="dialogSignsFormVisible=true">编辑
          </el-button>
          <br>
          <div style="margin-top: 20px">
            <span>标签信息:</span> <span v-if="sign_info===''" style="margin-left: 50px"> 产品无标签信息</span>
            <div v-else>
              <div v-for="(info,index) in signsForm" :key="index" style="margin-left: 50px">
                <span v-if="info.key !== ''" style="font-size: 14px;color: #909399"> {{ info.key }} : {{
                    info.value
                  }}</span><br>
              </div>

            </div>
          </div>

          <!--          添加标签dialog-->
          <!-- Form -->
          <el-dialog title="添加标签" :visible.sync="dialogSignsFormVisible" width="20%">
            <div style="margin-left: 10px">
              <el-row v-for="(_,index) in signsData" :key="index" style="margin-left: 10px">
                <el-col :span="9" style="margin-left: 10px;margin-bottom: 10px">
                  <el-input
                      placeholder="请输入key"
                      v-model="signsForm[index].key">
                  </el-input>
                </el-col>
                <el-col :span="9" style="margin-left: 10px;margin-bottom: 10px">
                  <el-input
                      placeholder="请输入value" v-model="signsForm[index].value">
                  </el-input>
                </el-col>
                <el-col :span="2" style="margin-left: 10px">
                  <el-button type="text" @click="deleteSign(index)">删除</el-button>
                </el-col>
              </el-row>
              <el-button type="text" style="margin-left: 10px" @click="add">+增加标签</el-button>
            </div>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogSignsFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="commitSigns">确 定</el-button>
            </div>
          </el-dialog>

        </el-tab-pane>
        <el-tab-pane label="Topic类列表" name="1">Topic类列表
          <show-topics></show-topics>
        </el-tab-pane>
        <el-tab-pane label="功能定义" name="2">
          <register-device-model></register-device-model>
        </el-tab-pane>
        <el-tab-pane label="发布与订阅" name="3">
          <el-empty description="暂无自定义发布与订阅"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="设备开发" name="4">设备开发</el-tab-pane>
      </el-tabs>
    </div>


  </div>
</template>

<script>
import ShowTopics from "@/components/cloude/showTopics";
import RegisterDeviceModel from "@/components/cloude/registerDeviceModel";

export default {
  name: "setDeviceModel",
  components: {RegisterDeviceModel, ShowTopics},
  data() {
    return {
      product: {
        product_name: 'tt3',
        product_key: 'dasdasdw221dsaAAW2',
        point_type: '直连设备',
        kind: '自定义设备',
        create_time: '2022-04-13 08:00:00',
        mark: '温度传感器！',
        id: 2, status: "1"
      },
      activeName: '2',
      sign_info: '',
      signsData: [{key: '', value: '', count: 0}],
      dataNum: 0,
      dialogSignsFormVisible: false,
      signsForm: [{key: '', value: ''}]
    }
  },
  methods: {
    //编辑注册设备的基本信息
    editDeviceBasicInfo() {
      this.$prompt('请输入设备备注', '修改设备备注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '不符合规范要求'
      }).then(({value}) => {
        this.product.mark = value
        this.$message({
          type: 'success',
          message: '修改成功: '
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });


    },
    goBack() {
      console.log('go back');
      this.$router.push({name: 'registerDevice'})
    },
    add() {
      this.signsForm.push({key: '', value: ''})
      this.signsData.push({key: '', value: '', count: this.dataNum++})
    },
    commitSigns() {
      console.log(this.signsForm)
      this.dialogSignsFormVisible = false
      this.sign_info = '1'

    },
    deleteSign(index) {
      this.signsData.splice(index, 1)
      this.signsForm.splice(index, 1)
      console.log(this.signsData)
      if (this.signsData.length === 0) {
        this.sign_info = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>


</style>