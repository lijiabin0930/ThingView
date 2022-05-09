<template>
  <div>
    <el-container class="home_container">
      <el-aside :width="isCollapse ? '80px' :'210px'" style="margin-right: 0px">
        <el-menu router default-active="1-1-1" class="el-menu-vertical" @oepn="handleOpen" @close="handleClose"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 style="height: 100vh"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-bianyuanjisuan3" style="margin-right: 5px"></i>
              <span slot="title">云端管理</span>
            </template>
            <el-menu-item-group>
              <el-submenu index="1-1">
                <span slot="title">创建设备</span>
                <el-menu-item index="/1-1/1-1-1">创建设备模型</el-menu-item>
                <el-menu-item index="/1-1/1-1-2">创建设备实例</el-menu-item>
              </el-submenu>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-submenu index="1-2">
                <span slot="title">接入设备</span>
                <el-menu-item index="/1-2/1-2-1">设备列表</el-menu-item>
                <el-menu-item index="/1-2/1-2-2">设备管理</el-menu-item>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-bianyuanjisuanxunihua" style="margin-right: 5px"></i>
              <span slot="title">边缘管理</span>
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--        主页面-->
      <el-container>
        <el-header height="70px" style="margin-left: 0px;padding-left: 0px;">
          <!--        flex 水平布局-->
          <div>
            <i class="iconfont icon-bianyuanjisuan2"></i>
            <span>智能一体化物联网边缘管理平台</span>
          </div>
          <div>
            <!--          <el-button type="info" @click="logout">登录</el-button>-->
            <el-button type="info" @click="logout">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <!--          放一个路由的占位符-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  created() {

  },
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      console.log(123)
    }
  }
}

</script>

<style scoped lang="less">

.home_container {
  height: 100%;
}


.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-header {
  background-color: #535C65;
  display: flex;
  //左右贴边对齐
  justify-content: space-between;
  padding-left: 0;
  padding-right: 10px;
  //字体居中
  align-items: center;
  color: #f7f7f7;
  font-size: 25px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #535C65;

  > .el-menu {
    border-right: 0px;
  }

  > .toggl-button {
    background-color: #515C66;
    text-align: center;
    color: #f7f7f7;
    font-size: 10px;
    line-height: 22px;
    letter-spacing: 0.4em;
    cursor: pointer;
  }
}

.el-main {
  background-color: #F9F9FA;
  padding: 0;
}
</style>