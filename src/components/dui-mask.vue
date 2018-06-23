<template>
    <div class="dui-mask" :style="{'opacity': opacity}" @click="_click"></div>
</template>

<script>

    module.exports = {
        props: {
            "opacity": {
                default: '0.2'
            }
        },
        methods: {
            "_click": function () {
                this.$emit("click");
            }
        }
    }
</script>
<style scoped="">
    .dui-mask {
        position: fixed;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom:0px;
        opacity: 0.3;
        background-color: rgba(0, 0, 0, .8);
    }
</style>
