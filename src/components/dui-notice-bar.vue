<template>
    <div>
        <div class="flex-row"  :style="{'backgroundColor': background,'height':height}" v-if="show">
            <div  class="div-start center flex-row"  :style="{'height':height}" @click="onClick('centerClick')">
                <text class="margin-right30 iconfont" :style="leftItem"  :value="decode(leftIcon)" v-if="leftIcon&&!scrollable" @click="onClick('leftClick')"></text>
                <text :style="titleStyle" ref="title" v-if="showText">{{title}} </text>
            </div>
            <div class="div-end center" :style="{'height':height}" @click="onClick('rightClick')">
                <text class="iconfont" :style="rightItem" :value="decode(rightIcon)"></text>
            </div>
        </div>
    </div>
</template>

<script>
    const animation = weex.requireModule('animation')
    export default {
        props: {
            show:{
              type:Boolean,
              default:true
            },
            background: {
                type: String,
                default: '#fff7cc'
            },
            height:{
                type: String,
                default: '100px'
            },
            title:{
                type:String,
                default:'618购物津贴，最高每满300减30，立即凑单！'
            },
            titleStyle:{
                type:Object,
                default:{color:'#ff6600',fontSize:25}
            },
            leftIcon:{
                type:String,
                default:'&#xe66B;'
            },
            leftItem:{
                type:Object,
                default:{color:'#ff6600',fontSize:35}
            },
            rightIcon:{
                type:String,
                default:'&#xe646;'
            },
            rightItem:{
                type:Object,
                default:{color:'#ff6600',fontSize:45}
            },
            rollingLength:{
                type:Number,
                default:800
            },
            scrollable:{
                type:Boolean,
                default:false
            }

        },
        data() {
            return {
                current: 0,
                showText:true
            }
        },
        mounted(){
            let domModule = weex.requireModule('dom');
            domModule.addRule('fontFace', {
                'fontFamily': "iconfont",
                'src': 'url(\'bmlocal://iconfont/iconfont.ttf\')'
            });
            if(this.scrollable){
                let that = this;
                setInterval(function () {
                    that.move()
                }, 1000)
            }
        },
        methods: {
            decode(fontCode){
                if (/^&#x/.test(fontCode)) {
                    return String.fromCharCode(fontCode.replace(/^&#x/, '0x').replace(/;$/, ''))
                } else {
                    return fontCode;
                }
            },
            onClick(itme){
                this.$emit(itme);
            },
            move () {
                let self = this;
                var el = self.$refs.title;
                this.current+=100;
                if(this.current===this.rollingLength){
                    this.current=0;
                    this.showText=false
                }
                animation.transition(el, {
                    styles: {
                        transform: 'translateX(-' + self.current + 'px)',
                        transformOrigin: 'center center'
                    },
                    duration: 1000, //ms
                    timingFunction:'linear',
                    delay: 1000 //ms
                },function () {
                    if(self.current===0){
                        self.showText=true
                    }
                })
            }
        }
    }
</script>

<style lang="sass" src="../css/duiNoticeBar.scss"></style>
