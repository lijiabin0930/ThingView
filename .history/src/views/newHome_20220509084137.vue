<template>
  <!--    lay-out布局容器-->
  <el-container class="home_container">
    <!--      头部区域-->
    <el-header height="50px">
      <!--        flex 水平布局-->
      <div>
        <img class="img" src="../assets/img/后台.svg" alt="" height="25px" width="50px">
        <span>电商后台管理系统</span>
      </div>
      <div>
        <!--          <el-button type="info" @click="logout">登录</el-button>-->
        <el-button type="info" @click="logout">退出</el-button>
      </div>
    </el-header>

    <el-container>
      <!--        侧边栏 实现跟着一起大小变换伸缩 通过三木运算 条件? true:false -->
      <el-aside :width="iscollapsed ? '64px' :'200px'">
        <!--          侧边栏菜单区 unique-opened是否只保持一个子菜单打开-->
        <div class="toggl-button" @click="toggleButtonClick">|||</div>
        <el-menu
            :unique-opened="true"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="iscollapsed"
            :collapse-transition="false"
            router
            :default-active="activePath">
          <!--            一级菜单 index 代号是表示每一个一级菜单的区分 这样可以知道打开的是哪一个一级菜单 index是一个随机值才可以 id正好符合-->
          <el-submenu v-for="(item) in menulist" :key="item.id" :index="item.id+''">
            <!--              一级菜单模版区-->
            <template slot="title">
              <!--                菜单图标项-->
              <i :class="iconsObj[item.id]"></i>
              <!--       菜单文本-->
              <span>{{ item.authName }}</span>
            </template>
            <!--              二级菜单 saveNavState实现点击文字时候 高亮文字 -->
            <el-menu-item v-for="(subItem) in item.children" :key="subItem.id" :index="'/home/'+subItem.path"
                          @click="saveNavState('/home/'+subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i><span>{{ subItem.authName }}</span>
              </template>
              <!--                三级菜单-->
              <!--                <el-menu-item index="1-1-1">-->
              <!--                  <template slot="title">-->
              <!--                    <i class="el-icon-location"></i>-->
              <!--                    <span>导航一</span>-->
              <!--                  </template>-->
              <!--                </el-menu-item>-->
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--        主页面-->
      <el-main>
        <!--          放一个路由的占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  //生命周期函数 组建刚一创建 就执行如下内容
  created() {
    //获取菜单列表
    this.getMenuList()
    //这里实现的是点击侧边导航栏的二级菜单的时候 可以高亮文字 实现逻辑如下：
    //1）在home组建里 通过查询参数可以default-active绑定一个导航栏的index 来表示激活哪一个菜单了
    //2）然后在home组建点击这个菜单栏目的时候 在sessionStorage里存起来当前的index
    //3）点击后 组建重新渲染 会去读取在sessionStorage里存起来当前的index 绑定给default-active
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  data() {
    return {
      menulist: [],
      iconsObj: {
        125: 'iconfont icon-user',
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      // 是否折叠
      iscollapsed: false,
      activePath: '' //被激活的地址
    }
  },
  methods: {
    //退出登录
    logout() {
      //1）清空token
      window.sessionStorage.clear()
      //2）页面跳转至登录页面
      this.$router.push('/login')
    },
    //获取菜单列表
    async getMenuList() {
      const {data: res} = await this.$http.get('menus')

      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.menulist = res.data
      console.log(this.menulist,">>>>>>>>>>>>>.")
    },
    //折叠窗口时候需要改变iscollapsed来实现
    toggleButtonClick() {
      this.iscollapsed = !this.iscollapsed
    },
    //实现刷新后 还能快速定位到刚刚点击的位置
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}

//layout布局标签中 标签名字就是类名字
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