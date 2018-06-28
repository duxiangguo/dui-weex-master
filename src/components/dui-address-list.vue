<template>
    <div class="address-list-div">
        <div class="height150 address-item-div flex-row row-center-left"  v-for="(itmes,index) in list" >
            <div  class="width150  center " @click="editAddress(itmes)">
                <dui-icon :name="index===showIndex?'&#xe6cf':'&#xe664'"  :iconStyle="{'color':index===showIndex?color:voidColor}"></dui-icon>
            </div>
            <div @click="checkAddress(itmes,index)">
                <div class="flex-row margin-bottom10 width450">
                    <text class="font-size35" >{{itmes.name}}</text>
                    <text class="font-size35" >，</text>
                    <text class="font-size35" >{{itmes.telphone}}</text>
                </div>
                <text class="width450  text-lines2" >收货地址:{{itmes.address}}</text>
            </div>
            <div  class="width150  center " @click="editAddress(itmes)">
                <dui-icon name="&#xe71a;"  :iconStyle="{color:'#b2b2b2'}"></dui-icon>
            </div>
        </div>
        <div class="height100 address-add-div flex-row row-center-left" @click="addAddress">
            <div  class="width150 height100 center " >
                <dui-icon name="&#xe6cf;"  :iconStyle="{color:'#5da3f6'}"></dui-icon>
            </div>
            <text class="width450 font-size35 " >新增收货地址</text>
            <div  class="width150 height100 center " >
                <dui-icon name="&#xe643" size="45px" :iconStyle="{color:'#b2b2b2'}"></dui-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import duiIcon from'./dui-icon'
    module.exports = {
        components:{
            duiIcon
        },
        props: {
            color:{
                type: String,
                default:'#5da3f6'

            },
            voidColor:{
                type: String,
                default:'#7c7c7c'
            },
            showIndex:{
                type:Number,
                default:0
            },
            list:{
                type: Object,
                default:[{id:'',name:'张三',telphone:'17603666581',address:'黑龙江省哈尔滨市南岗区中兴大道109号'}]
            }
        },
        data() {
            return {
            }
        },
        methods: {
            addAddress(){
                this.$emit('addAddress')

            },
            checkAddress(value,index){
                this.showIndex=index;
                this.$emit('checkAddress',value)
            },
            editAddress(value){
                this.$emit('editAddress',value)
            }

        }
    }
</script>

<style lang="sass" src="../css/duiAddressList.scss"></style>
