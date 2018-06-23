<template>
    <div class="address-list-div">
        <div class="height150 address-item-div flex-row row-center-left"  v-for="(itmes,index) in list" >
            <text class="width150 text-align-center iconfont font-size55"  :style="{'color':index===0?color:voidColor}"  :value="index===0?decode('&#xe656'):decode('&#xe6d7')"></text>
            <div @click="checkAddress(itmes.id)">
                <div class="flex-row margin-bottom10 width450">
                    <text class="font-size35" >{{itmes.name}}</text>
                    <text class="font-size35" >，</text>
                    <text class="font-size35" >{{itmes.telphone}}</text>
                </div>
                <text class="width450  text-lines2" >收货地址:{{itmes.address}}</text>
            </div>
            <text class="width150 text-align-center iconfont font-size55 text-color-gay" @click="editAddress(itmes.id)">&#xe759;</text>
        </div>
        <div class="height100 address-add-div flex-row row-center-left" @click="addAddress">
            <text class="width150 text-align-center iconfont font-size55"  style="color: #5da3f6" >&#xe6d8;</text>
            <text class="width450 font-size35" >新增收货地址</text>
            <text class="width150 text-align-center iconfont font-size45 text-color-gay" >&#xe6a3;</text>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: {
            color:{
                type: String,
                default:'#5da3f6'

            },
            voidColor:{
                type: String,
                default:'#7c7c7c'
            },
            list:{
                type: Object,
                default:[{id:'',name:'张三',telphone:'17603666581',address:'浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'}]
            }
        },
        data() {
            return {
            }
        },
        mounted(){
            let domModule = weex.requireModule('dom');
            domModule.addRule('fontFace', {
                'fontFamily': "iconfont",
                'src': 'url(\'bmlocal://iconfont/iconfont.ttf\')'
            });
        },
        methods: {
            decode(fontCode){
                if (/^&#x/.test(fontCode)) {
                    return String.fromCharCode(fontCode.replace(/^&#x/, '0x').replace(/;$/, ''))
                } else {
                    return fontCode;
                }
            },
            addAddress(){

            },
            checkAddress(addressId){

            },
            editAddress(addressId){

            }

        }
    }
</script>

<style lang="sass" src="../css/duiAddressList.scss"></style>
