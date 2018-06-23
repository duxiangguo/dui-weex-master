<template>
    <div class="center margin-top40">
        <div class="dui-btn center" :style="{'backgroundColor':disabled?unBtnColor:btnColor,'width':btnWidth,'height':btnHeight}" @click="onClicked">
            <text class="btn-text" :style="{'color':textColor,'fontSize':textSize}">{{text}}</text>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            text: {
                type: String,
                default: '确认'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            unBtnColor:{
                type:String,
                default:'#cccccc'
            },
            btnColor:{
                type:String,
                default:'#ff4e24'
            },
            btnWidth:{
                type:String,
                default:'700px'
            },
            btnHeight:{
                type:String,
                default:'88px'
            },
            textSize:{
                type:Number,
                default:38
            },
            textColor:{
                type:String,
                default:'#fff'
            }
        },
        methods: {
            onClicked () {
                if(!this.disabled){
                    this.$emit('click');
                }
            }
        }
    };
</script>

<style lang="sass" src="../css/duiButton.scss"></style>
