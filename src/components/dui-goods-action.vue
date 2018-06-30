<template>
        <div class="width750 height100 flex-row dui-goods-div">
            <div class = "height100 flex1 center " v-for="items in leftItems" @click="leftItemsClick(items.leftClick)">
                <div class="height100 center width115" >
                    <dui-icon size="45px" :name="items.leftIcon" :iconStyle="{'color':items.leftIconColor}" @iconClick="leftItemsClick(items.leftClick)"></dui-icon>
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
    import duiIcon from'./dui-icon';
    module.exports ={
        components:{
            duiIcon
        },
        props:{
            leftItems:{
              type:Object,
              default:[{leftIcon:'&#xe6df;',leftIconColor:'',leftTitle:'店铺',leftTitleColor:'',leftPointNumber:0,leftClick:'store'}
              ,{leftIcon:'&#xe68a;',leftIconColor:'',leftTitle:'收藏',leftTitleColor:'',leftPointNumber:0,leftClick:'collection'},
             {leftIcon:'&#xe64b;',leftIconColor:'',leftTitle:'购物车',leftTitleColor:'',leftPointNumber:1,leftClick:'shopCart'}]
            },
            rightItems:{
              type:Object,
              default:[{btnTitle:'加入购物车',btnTitleColor:'#ffffff',btnColor:'#ffa500',rightClick:'addShopCart'},
                  {btnTitle:'立即购买',btnTitleColor:'#ffffff',btnColor:'#ff0000',rightClick:'buyShopNow'}]
            }
        },
        methods:{
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
