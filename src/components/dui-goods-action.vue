<template>
        <div class="width750 height100 flex-row dui-goods-div">
            <div class = "height100 flex1 center " v-for="items in leftItems" @click="leftItemsClick(items.leftClick)">
                <div class="height100 center width115" >
                    <text class="iconfont font-size45 " :value="decode(items.leftIcon)"  :style="{'color':items.leftIconColor}"></text>
                    <text :style="{'color':items.leftTitleColor}" >{{items.leftTitle}}</text>
                    <div class = "dui-goods-point-div background-color-white center" v-if="items.leftPointNumber>0">
                        <text class="font-size22 text-color-red">{{items.leftPointNumber}}</text>
                    </div>
                </div>
            </div>
            <div class = "width200 height100 center" v-for="items in rightItems" :style="{'backgroundColor':items.btnColor}" @click="rightItemsClick(items.rightClick)">
                <text class="font-size35" :style="{'color':items.btnTitleColor}">{{items.btnTitle}}</text>
            </div>
        </div>
</template>
<script>
    module.exports ={
        props:{
            leftItems:{
              type:Object,
              default:[{leftIcon:'&#xe676;',leftIconColor:'',leftTitle:'店铺',leftTitleColor:'',leftPointNumber:0,leftClick:'store'}
              ,{leftIcon:'&#xe64c;',leftIconColor:'',leftTitle:'收藏',leftTitleColor:'',leftPointNumber:0,leftClick:'collection'},
             {leftIcon:'&#xe6af;',leftIconColor:'',leftTitle:'购物车',leftTitleColor:'',leftPointNumber:1,leftClick:'shopCart'}]
            },
            rightItems:{
              type:Object,
              default:[{btnTitle:'加入购物车',btnTitleColor:'#ffffff',btnColor:'#ffa500',rightClick:'addShopCart'},
                  {btnTitle:'立即购买',btnTitleColor:'#ffffff',btnColor:'#ff0000',rightClick:'buyShopNow'}]
            }
        },
        beforeCreate() {
            var domModule = weex.requireModule('dom');
            domModule.addRule('fontFace', {
                fontFamily: 'iconfont',
                'src': 'url(\'bmlocal://iconfont/iconfont.ttf\')'
            });
        },
        methods:{
            decode(fontCode){
                if (/^&#x/.test(fontCode)) {
                    return String.fromCharCode(fontCode.replace(/^&#x/, '0x').replace(/;$/, ''))
                } else {
                    return fontCode;
                }
            },
            leftItemsClick(leftClick){
                this.$emit(leftClick)
            },
            rightItemsClick(rightClick){
                this.$emit(rightClick)
            }
        }
    }
</script>
<style lang="sass" src="../css/duiGoodsAction.scss"></style>
