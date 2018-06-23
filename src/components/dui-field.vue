<template>
    <div>
        <div class="flex-row background-color-white" :class="[showTopBorder?'field-top-border':showBottomBorder?'field-bottom-border':'']" v-if="formType==='input'">
            <div class="height100 width200 flex-row center padding10" >
                <text class="text-align-center iconfont font-size35"  :style="{'color':requiredColor}" :value="(!disabled&&required)?decode('*'):decode('')"></text>
                <div class="width140 ">
                    <text class="text-align-center iconfont font-size35">{{label}}</text>
                </div>
            </div>
            <div class="height100  width480 flex-row row-center-left" >
                <input class="height100 width450 font-size35" :style="{'color':inputColor}" :maxlength="inputMaxlength" :placeholder="placeholder" :disabled="disabled" :type="inputType" :value="inputValue" @focus="focus" @input="input" @change="change" />
            </div>
            <div class="height100  width70 flex-row row-center-left" v-if="rightIcon" @click="rightClick">
                <text class=" text-align-center iconfont font-size45 text-color-gay" :value="decode(rightIcon)"></text>
            </div>
        </div>
        <div class="flex-row background-color-white row-space-between" :class="[showTopBorder?'field-top-border':showBottomBorder?'field-bottom-border':'']" v-if="formType==='switch'">
            <div class="height100 width200 flex-row center padding10">
                <text class="text-align-center iconfont font-size35 text-color-white"   :value="(!disabled&&required)?decode('*'):decode('')"></text>
                <div class="width140 ">
                    <text class="text-align-center iconfont font-size35">{{label}}</text>
                </div>
            </div>
            <div class="height100  width140 flex-row row-center-left"  >
                <switch :checked="checked" :disabled="disabled" @change="changeSwitch"></switch>
            </div>
        </div>
        <div class="flex-row background-color-white " :class="[showTopBorder?'field-top-border':showBottomBorder?'field-bottom-border':'']" v-if="formType==='text'">
            <div class="height100 width200 flex-row center padding10">
                <text class="text-align-center iconfont font-size35"   :style="{'color':requiredColor}" :value="(!disabled&&required)?decode('*'):decode('')"></text>
                <div class="width140 ">
                    <text class="text-align-center iconfont font-size35">{{label}}</text>
                </div>
            </div>
            <div class="height100  width480 flex-row row-center-left" @click="textClick">
                <text class="width450 font-size35">{{content}}</text>
            </div>
            <div class="height100  width70 flex-row row-center-left" v-if="rightIcon" @click="rightClick">
                <text class=" text-align-center iconfont font-size45 text-color-gay" :value="decode(rightIcon)"></text>
            </div>
        </div>
        <div class="flex-row background-color-white  " :class="[showTopBorder?'field-top-border':showBottomBorder?'field-bottom-border':'']" v-if="formType==='sms'">
            <div class="height100 width200 flex-row center padding10">
                <div class="width140">
                    <text class="text-align-center iconfont font-size35">{{label}}</text>
                </div>
            </div>
            <div class="height100  width250 flex-row row-center-left" >
                <input class="height100 width250 font-size35" :style="{'color':inputColor}" :maxlength="inputMaxlength" :placeholder="placeholder" :type="inputType"  />
            </div>
            <div class="height100  width300 flex-row center">
                <div class="width250 code-radius height80 center" :style="{'backgroundColor':codeColor}" @click="getCodes">
                    <text class=" text-align-center iconfont  text-color-white" >{{getCode}}</text>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var validate = require("../utils/validate");
    module.exports = {
        props: {
            formType:{
              type:String,
              default:'input'
            },
            disabled:{
                type:Boolean,
                default:false
            },
            required:{
                type:Boolean,
                default:false
            },
            requiredType:{
                type: String,
                default:''
            },
            requiredColor:{
                type: String,
                default:'#DC143C'
            },
            rightIcon:{
                type:String,
                default:''
            },
            inputType:{
                type:String,
                default:'text'
            },
            inputValue:{
                type:String,
                default:''
            },
            inputColor:{
                type: String,
                default:'#000000'
            },
            inputMaxlength:{
                type: Number,
                default:30
            },
            placeholder:{
                type:String,
                default:'请输入手机号'
            },
            label:{
                type:String,
                default:'手机号'
            },
            content:{
                type:String,
                default:'17603666581'
            },
            showTopBorder:{
                type:Boolean,
                default:true
            },
            showBottomBorder:{
                type:Boolean,
                default:false
            },
            codeColor:{
                type:String,
                default:'#00cc66'
            }
        },
        data() {
            return {
                checkResult:false,
                checked:true,
                getCode: '获取验证码',
                countdown:60
            }
        },
        mounted(){
            let domModule = weex.requireModule('dom');
            domModule.addRule('fontFace', {
                'fontFamily': "iconfont",
                'src': 'url(\'bmlocal://iconfont/iconfont.ttf\')'
            });
            this.$emit('input',this.inputValue);
            this.$emit('checkResult',this.checkResult);
        },
        methods: {
            decode(fontCode){
                if (/^&#x/.test(fontCode)) {
                    return String.fromCharCode(fontCode.replace(/^&#x/, '0x').replace(/;$/, ''))
                } else {
                    return fontCode;
                }
            },
            focus(){
                if(!this.checkResult){
                    this.inputValue='';
                    this.inputColor='#000000';
                }else{
                    this.inputValue=validate.tirm(this.inputValue,'g')
                }
            },
            input(data){
                this.$emit('input',data.value);
                this.inputValue=data.value;
                this.checkResult=true;
            },
            countDown(){
                let _this=this;
                if(_this.countdown===0){
                    _this.getCode='重新发送';
                    _this.countdown=60;
                    return
                }else{
                    _this.getCode='重新发送('+_this.countdown+')秒';
                    _this.countdown--
                }
                setTimeout(() => {
                    _this.countDown()
                }, 1000)
            },
            getCodes(){
                if(this.countdown===60){
                    this.$emit('getCode');
                    this.countDown()
                }
            },
            change(){
                if(this.required){
                    if(!this.inputValue){
                        this.inputValue=this.label+'不能为空';
                        this.inputColor='#DC143C';
                        this.checkResult=false;
                    }else if(this.requiredType==='telphone'){
                        if(validate.isValidTelephone(this.inputValue)){
                            this.inputValue=validate.formatTelphone(this.inputValue);
                        }else{
                            this.showError()
                        }
                    }else if(this.requiredType==='cardNumber'){
                        this.inputValue=validate.formatBankNum(this.inputValue);
                    }else if(this.requiredType==='idCard'){
                        if(validate.isValidIdCard(this.inputValue)){
                            this.inputValue=validate.formatIdCard(this.inputValue);
                        }else{
                            this.showError()
                        }

                    }
                    this.$emit('checkResult',this.checkResult);
                }
            },
            showError(){
                this.inputValue=this.label+'格式不正确';
                this.inputColor='#DC143C';
                this.checkResult=false;
            },
            rightClick(){
                this.$emit('rightClick')
            },
            changeSwitch(event){
                this.$emit('change',event.value)
            },
            textClick(){
                this.$emit('change')
            }
        }
    }
</script>

<style lang="sass" src="../css/duiField.scss"></style>
