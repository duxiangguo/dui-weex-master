<template>
    <div style="margin-top: 100px">
        <dui-field label="收货人"  v-model="consignee" formType="input" placeholder="收货人姓名" required="true" rightIcon="&#xe6B7;" @rightClick="checkContacts"></dui-field>
        <dui-field label="联系电话" v-model="telphone" formType="input" placeholder="手机或固定电话" inputType="number" required="true"></dui-field>
        <dui-field label="收件地区" formType="text" :content="address" @change="checkAddress" required="true"></dui-field>
        <dui-field label="详细地址"  v-model="dictAddress" formType="input" placeholder="如街道、楼层、门牌号等" required="true"></dui-field>
        <dui-field label="邮政编码" v-model="Postcodes" formType="input" placeholder="邮政编码"></dui-field>
        <dui-field label="设为默认" formType="switch" @change="setDefault"></dui-field>
        <dui-address-selector :show="show" :province="province" :city="city" :area="area" :tabItems="tabItems" :currentTab="currentTab" @close="close" @selectArea="selectArea" @checkedArea="checkedArea" ></dui-address-selector>
        <dui-button @click="submit" :btnColor="btnColor" :disabled="disabled" :text="text" :textColor="textColor"></dui-button>
    </div>
</template>

<script>
    import duiField from './dui-field.vue';
    import duiAddressSelector from './dui-address-selector.vue';
    import duiButton from './dui-button.vue';
    module.exports = {
        components:{
            duiField,duiAddressSelector,duiButton
        },
        props:{
            btnColor:{
                type:String,
                default:'#ff4e24'
            },
            textColor:{
                type:String,
                default:'#fff'
            },
            disabled:{
                type:Boolean,
                default:false
            },
            text:{
                type:String,
                default:'确认'
            },
            province:{
                type: Object,
                default: []
            },
            city:{
                type: Object,
                default: []
            },
            area:{
                type: Object,
                default: []
            },
            tabItems:{
                type: Object,
                default:[{title: "请选择",value:''},{title: "",value:''},{title: "",value:''}]
            },
            currentTab:{
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                show:false,
                address:'请选择收件地区',
                addressId:'',
                consignee:'',
                telphone:'',
                dictAddress:'',
                Postcodes:'',
                isDefault:true,

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
            checkAddress(){
                this.show=true
            },
            close(){
                this.show=false
            },
            selectArea(value){
                this.$emit('getAddress',value)
            },
            checkedArea(items){
                this.address=items[0].title+'-'+items[1].title+'-'+items[2].title
            },
            setDefault(value){
                this.isDefault=value
            },
            checkContacts(){
                this.$coms.contacts().then(data => {
                    console.log("获取联系人信息成功", data)
                }, error => {
                    console.log("获取失败", error)
                })
            },
            submit(){
                if(!this.consignee){
                    this.showMessage('收货人姓名不能为空')
                }else if(!this.telphone){
                    this.showMessage('收货人电话不能为空')
                }else if(!this.addressId){
                    this.showMessage('收件地区不能为空')
                }else if(!this.dictAddress){
                    this.showMessage('详细地址不能为空')
                }else{
                   this.$emit('addAddress',this.consignee,this.telphone,this.address,this.addressId,this.dictAddress,this.Postcodes,this.isDefault)
                }
            },
            showMessage(message){
                this.$notice.toast({
                    message:message
                })
            }
        }
    }
</script>

<style lang="sass" src="../css/base.scss"></style>
