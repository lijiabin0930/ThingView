<template>
  <div>
    <el-table
        :data="tableData"
        border stripe fit highlight-current-row
        style="width: 100%">
      <el-table-column
          align="center"
          prop="topic"
          label="topic">
      </el-table-column>
      <el-table-column
          align="center"
          prop="publish"
          label="发布者(publish)">
      </el-table-column>
      <el-table-column
          align="center"
          prop="subscribe"
          label="订阅者(subscribe)">
      </el-table-column>
      <el-table-column
          align="center"
          prop="using"
          label="用途介绍">
      </el-table-column>
      <el-table-column
          align="center"
          prop="isneed"
          label="mapper是否实现">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isneed === '2'" type="success" effect="dark">建议实现</el-tag>
          <el-tag v-if="scope.row.isneed === '1'" type="warning" effect="dark">否</el-tag>
          <el-tag v-if="scope.row.isneed === '0'" type="danger" effect="dark">是</el-tag>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: "showTopics",
  data() {
    return {
      tableData: [{
        topic: '$hw/events/node/+/membership/updated',
        publish: 'edgecore',
        subscribe: 'mapper',
        using: '订阅设备列表的变化',
        isneed: '2'
      }, {
        topic: '$hw/events/node/+/membership/get',
        publish: 'mapper',
        subscribe: 'edgecore',
        using: '查询设备列表',
        isneed: '2'
      }, {
        topic: '$hw/events/node/+/membership/get/result',
        publish: 'edgecore',
        subscribe: 'mapper',
        using: '获取查询设备列表的结果',
        isneed: '2'
      }, {
        topic: '$hw/events/device/+/updated',
        publish: 'edgecore',
        subscribe: 'mapper',
        using: '订阅设备属性描述的变化',
        isneed: '1'
      }, {
        topic: '$hw/events/device/+/twin/update/result',
        publish: 'edgecore',
        subscribe: 'mapper',
        using: '获取设备属性更新是否成功',
        isneed: '2'
      },
        {
          topic: '$hw/events/device/+/twin/update/delta',
          publish: 'edgecore',
          subscribe: 'mapper',
          using: '获取设备属性更新的值',
          isneed: '0'
        }, {
          topic: '$hw/events/device/+/twin/update/document',
          publish: 'edgecore',
          subscribe: 'mapper',
          using: '获取设备属性更新的操作记录',
          isneed: '1'
        },
        {
          topic: '$hw/events/device/+/twin/get/result',
          publish: 'edgecore',
          subscribe: 'mapper、apps',
          using: '返回获取设备属性的值',
          isneed: '1'
        },
        {
          topic: '$hw/events/device/+/twin/update',
          publish: 'mapper',
          subscribe: 'edgecore',
          using: '通知设备属性的值更新',
          isneed: '0'
        }, {
          topic: '$hw/events/device/+/twin/get',
          publish: 'mapper,apps',
          subscribe: 'edgecore',
          using: '获取设备属性的值',
          isneed: '1'
        }, {
          topic: '$hw/events/device/+/state/update',
          publish: 'mapper',
          subscribe: 'edgecore',
          using: '通知设备状态更新',
          isneed: '2'
        }, {
          topic: '$hw/events/device/+/state/update/result',
          publish: 'edgecore',
          subscribe: 'mapper',
          using: '获取设备状态更新结果',
          isneed: '1'
        },
        {
          topic: '$ke/events/device/+/data/update',
          publish: 'mapper',
          subscribe: 'apps',
          using: '获取设备属性的时序数据',
          isneed: '0'
        },
        {
          topic: '$hw/events/upload/#',
          publish: '暂无',
          subscribe: 'edgecore',
          using: '转发云端',
          isneed: '1'
        }, {
          topic: 'SYS/dis/upload_records',
          publish: '暂无',
          subscribe: 'edgecore',
          using: '转发云端',
          isneed: '1'
        },
      ]

    }
  }, methods: {}
}
</script>

<style scoped>

</style>