<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-top: 5px;margin-bottom: 3px;font-size: 15px;margin-left: 5px">
      <el-breadcrumb-item>物联网平台</el-breadcrumb-item>
      <el-breadcrumb-item>设备创建</el-breadcrumb-item>
      <el-breadcrumb-item>产品</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 20px;margin-left: 10px">
      <el-row :gutter="20">
        <el-col :span="2" style="margin-right: 10px">
          <el-button type="primary" size="medium" @click="dialogVisible = true">创建产品</el-button>
        </el-col>
        <el-col :span="2" style="margin-right: 10px">
          <el-button type="info" size="medium" @click="dialogVisible1 = true">快速入门</el-button>
        </el-col>

        <el-col :span="4" style="margin-right: 10px">
          <el-input
              placeholder="请输入产品查询名称"
              v-model="input3">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
              placeholder="请选择产品标签"
              v-model="input4">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 20px;margin-bottom: 20px">
    </div>

    <div style="margin-left: 20px;text-align: center;">
      <el-table
          :data="tableData"
          border
          fit
          highlight-current-row
          size="medium"
          style="margin-top: 20px" stripe>
        <el-table-column
            fixed
            align="center"
            prop="product_name"
            label="产品名称"
        >
        </el-table-column>
        <el-table-column
            align="center"
            prop="product_key"
            label="ProductKey"
        >
        </el-table-column>
        <el-table-column
            align="center"
            prop="point_type"
            label="节点类型"
        >
        </el-table-column>
        <el-table-column
            align="center"
            prop="create_time"
            label="创建时间"
        >
        </el-table-column>
        <el-table-column
            align="center"
            label="操作"
            width="200">

          <template slot-scope="scope">
            <el-button type="text" size="small" @click="gotoM">查看</el-button>
            <span style="margin: 3px 3px 3px 3px;color: #606266">|</span>
            <el-button type="text" size="small">设备管理</el-button>
            <span style="margin: 3px 3px 3px 3px;color: #606266">|</span>
            <el-button type="text" size="small" @click="deleteDevice(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--    创建产品对话框-->
    <el-dialog
        title="创建产品"
        :visible.sync="dialogVisible"
        center
        width="65%"
        :before-close="handleClose">

      <el-form ref="form" :model="form">
        <el-form-item label="产品名称">
          <el-input v-model="form.product_name" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="所属品类">
          <el-tooltip class="item" effect="dark" content="用户可自定义产品分类，也可以从已经创建的产品中选择您所需的产品！" placement="right-end">
            <i class="el-icon-question"></i>
          </el-tooltip>
          <br>
          <el-radio-group v-model="form.kind">
            <el-radio-button :label="0" size="medium">自定义分类</el-radio-button>
            <el-radio-button :label="1" size="medium">已存在分类</el-radio-button>
            <div style="margin-top: 20px">
              <el-form-item v-if="form.kind===1" label="">
                <el-select v-model="form.kind_id" placeholder="请选择活动区域">
                  <el-option label="温度传感器" value="0"></el-option>
                  <el-option label="湿度传感器" value="1"></el-option>
                  <el-option label="风力传感器" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-radio-group>

        </el-form-item>
        <el-form-item label="节点品类">
          <br>
          <el-radio-group v-model="form.node_type">

            <el-radio :label="0" size="medium">
              <el-tooltip class="item" effect="light" content="直连设备" placement="right">
                <el-image
                    style="width: 20%; height: 60%"
                    :src="require('@/assets/png/直连设备.png')"
                    fit="contain"></el-image>
              </el-tooltip>
            </el-radio>
            <el-radio :label="1" size="medium">
              <el-tooltip class="item" effect="light" content="网关子设备" placement="right">
                <el-image
                    style="width: 20%; height: 60%"
                    :src="require('@/assets/png/网关子设备.png')"
                    fit="cover"></el-image>
              </el-tooltip>
            </el-radio>
            <el-radio :label="2" size="medium">
              <el-tooltip class="item" effect="light" content="网关设备" placement="right">
                <el-image
                    style="width: 20%; height: 60%"
                    :src="require('@/assets/png/网关设备.png')"
                    fit="cover"></el-image>
              </el-tooltip>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="更多信息">
          <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.more_info"
              maxlength="50"
              show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>

        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="快速入门"
               :visible.sync="dialogVisible1"
               width="30%"
               :before-close="handleClose" center>
      <el-steps :active="5" align-center>
        <el-step title="创建产品" description="产品是同类设备的集合"></el-step>
        <el-step title="创建产品" description="创建设备获取连接平台所需的身份信息"></el-step>
        <el-step title="编辑物模型" description="产品下的设备都会继承的物模型"></el-step>
        <el-step title="上传边缘侧Mapper" description="将用户编写的mapper上传"></el-step>
        <el-step title="查看上报数据" description="查看设备上报的属性数据"></el-step>
      </el-steps>
    </el-dialog>
  </div>
</template>

<script>


export default {
  name: "registerDevice",
  created() {
    //获取最新的产品列表
    console.log("获取最新的产品列表！")

  },
  data() {
    return {
      input3: '',
      input4: '',
      tableData: [{
        product_name: 'tt1',
        product_key: 'dasdasdw221dsaAAW0',
        point_type: '设备',
        create_time: '2022-04-13 08:00:00', id: 0, status: "1", kind: '自定义设备',
      },
        {
          product_name: 'tt2',
          product_key: 'dasdasdw221dsaAAW1',
          point_type: '设备',
          create_time: '2022-04-13 08:00:00',
          id: 1, status: "1", kind: '自定义设备',
        },
        {
          product_name: 'tt3',
          product_key: 'dasdasdw221dsaAAW2',
          point_type: '设备',
          create_time: '2022-04-13 08:00:00',
          id: 2, status: "1", kind: '自定义设备',
        },
        {
          product_name: 'tt4',
          product_key: 'dasdasdw221dsaAAW3',
          point_type: '设备',
          create_time: '2022-04-13 08:00:00',
          id: 3, status: "1", kind: '自定义设备',
        }],
      dialogVisible: false,
      dialogVisible1: false,
      visible: false,
      form: {
        product_name: '',
        kind: '',
        kind_id: '',
        node_type: '',
        more_info: ''
      },
    }
  },
  methods: {
    gotoM() {
      this.$router.push({name: 'setDeviceModel', params: this.form})
    },
    getDevices() {

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            //刷新列表
            this.form = {
              product_name: '',
              kind: '',
              kind_id: '',
              node_type: '',
              more_info: ''
            }
            done();
          })
          .catch(() => {
          });
    },
    // 删除设备
    deleteDevice(scope) {

      console.log(scope, scope.product_key, scope.id)
      this.$confirm(`确定删除设备-${scope.product_name}吗?删除后无法撤销请慎重删除!`, `删除设备-${scope.product_name}`, {
        confirmButtonText: '确定', type: 'warning', beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 200);
            }, 2000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.tableData.splice(this.tableData.findIndex(item => item.id === scope.id), 1)
        this.$message({
          type: 'success',
          message: `${action}:删除设备${scope.product_name}成功！！！`
        })
      });

    },
    onSubmit() {
      //设置校验 校验通过后 提交到后台 后台写入数据库

      this.$confirm('设备注册完成，是否前往创建设备模型？', '注册完成', {
        confirmButtonText: '>>',
        cancelButtonText: '稍后操作',
        callback: () => {
          this.$router.push({name: 'setDeviceModel', params: this.form})
        }
      });
      //如果创建校验基本参数成功 就可以跳转到定义物模型窗口
      // this.$router.push({name:,params:})


    }
  }
}
</script>

<style scoped lang="less">

</style>