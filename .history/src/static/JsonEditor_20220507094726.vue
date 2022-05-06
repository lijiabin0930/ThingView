<template>
    <div id="jsoneditor" style="width:100%;height:300px"></div>
</template>

<script>
import { log } from 'console';
import jsoneditor from 'jsoneditor'
export default {
    name: "JsonEditor",
    /* eslint-disable vue/require-prop-types */
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            jsonEditor: null
        };
    },
    watch: {
        value(value) {value,">>>>>>>>>>>>>")
            console.log();
            const editorValue = this.jsonEditor.get();
            if (value !== editorValue) {
                this.jsonEditor.set(value);
            }
        }
    },
    mounted() {
        this.initJsonEditor();
    },
    methods: {
        // 初始化jsonEditor
        initJsonEditor() {
            var container = document.getElementById("jsoneditor");
            var options = {
                mode: 'view',
                modes: ['code', 'view', 'tree', 'preview'], // allowed modes
                error: function (err) {
                    alert('EF1 ->' + err.toString());
                }
            };
            var editor = new jsoneditor(container, options);
            this.jsonEditor = editor;
        },
        // 获取json
        getValue() {
            return this.jsonEditor.get();
        }
    }
};
</script>

<style>
</style>