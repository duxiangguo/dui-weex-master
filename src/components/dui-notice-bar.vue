<template>
    <div>
        <div class="flex-row"  :style="{'backgroundColor': background,'height':height}" v-if="show">
            <div  class="div-start center flex-row"  :style="{'height':height}" @click="onClick('centerClick')">
                <dui-icon  class="margin-right30" :iconStyle="leftItem" :name="leftIcon"  v-if="leftIcon&&!scrollable"  @iconClick="onClick('leftClick')"></dui-icon>
                <text :style="titleStyle" ref="title" v-if="showText">{{title}} </text>
            </div>
            <div class="div-end center" :style="{'height':height}" @click="onClick('rightClick')">
                <dui-icon :iconStyle="rightItem" :name="rightIcon"></dui-icon>
            </div>
        </div>
    </div>
</template>

<script>
    const animation = weex.requireModule('animation')
    import duiIcon from'./dui-icon';
    export default {
        components:{
            duiIcon
        },
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
                default:'&#xe694;'
            },
            leftItem:{
                type:Object,
                default:{color:'#ff6600',fontSize:35}
            },
            rightIcon:{
                type:String,
                default:'&#xe6c9;'
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
            if(this.scrollable){
                let that = this;
                setInterval(function () {
                    that.move()
                }, 1000)
            }
        },
        methods: {
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
