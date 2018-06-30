<template>
    <div>
        <dui-field label="收货人"  v-model="data.consignee" formType="input" placeholder="收货人姓名" required="true" rightIcon="&#xe64d;" @rightClick="checkContacts"></dui-field>
        <dui-field label="联系电话" v-model="data.telphone" formType="input" placeholder="手机或固定电话" inputType="number" required="true"></dui-field>
        <dui-field label="收件地区" formType="text" :content="data.address" @change="checkAddress" required="true"></dui-field>
        <dui-field label="详细地址"  v-model="data.dictAddress" formType="input" placeholder="如街道、楼层、门牌号等" required="true"></dui-field>
        <dui-field label="邮政编码" v-model="data.Postcodes" formType="input" placeholder="邮政编码"></dui-field>
        <dui-field label="设为默认" formType="switch" @change="setDefault"></dui-field>
        <dui-address-selector :show="show" :province="province" :city="city" :area="area" :tabItems="tabItems" :currentTab="currentTab" @close="close" @selectArea="selectArea" @checkedArea="checkedArea" ></dui-address-selector>
        <dui-button @click="submit" :btnColor="addButtonInfo.btnColor" :disabled="addButtonInfo.disabled" :text="addButtonInfo.text" :textColor="addButtonInfo.textColor"></dui-button>
        <dui-button @click="deleteClick" v-if="showDelButton" :btnColor="delButtonInfo.btnColor" :disabled="delButtonInfo.disabled" :text="delButtonInfo.text" :textColor="delButtonInfo.textColor"></dui-button>
    </div>
</template>

<script>
    import duiField from './dui-field';
    import duiAddressSelector from './dui-address-selector';
    import duiButton from './dui-button';
    module.exports = {
        components:{
            duiField,duiAddressSelector,duiButton
        },
        props:{
            addButtonInfo:{
                type:Object,
                default:{
                    btnColor:'#ff4e24',
                    disabled:false,
                    text:'保存',
                    textColor:'#fff'
                }
            },
            delButtonInfo:{
                type:Object,
                default:{
                    btnColor:'#fafafa',
                    disabled:false,
                    text:'删除',
                    textColor:''
                }
            },
            showDelButton:{
                type:Boolean,
                default:false
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
            },
            data:{
                type:Object,
                default:{
                    address:'请选择收件地区',
                    addressId:'',
                    consignee:'',
                    telphone:'',
                    dictAddress:'',
                    Postcodes:'',
                    isDefault:true
                }
            }
        },
        data() {
            return {
                show:false
            }
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
                this.data.address=items[0].title+'-'+items[1].title+'-'+items[2].title;
                this.data.addressId=items[0].value+'-'+items[1].value+'-'+items[2].value;
            },
            setDefault(value){
                this.data.isDefault=value
            },
            checkContacts(){
                this.$coms.contacts().then(data => {
                    console.log("获取联系人信息成功", data)

                }, error => {
                    console.log("获取失败", error)
                })
            },
            submit(){
                if(!this.data.consignee){
                    this.showMessage('收货人姓名不能为空')
                }else if(!this.data.telphone){
                    this.showMessage('收货人电话不能为空')
                }else if(!this.data.addressId){
                    this.showMessage('收件地区不能为空')
                }else if(!this.data.dictAddress){
                    this.showMessage('详细地址不能为空')
                }else{
                    this.$emit('addAddress',this.data)
                }
            },
            deleteClick(){
                    this.$emit('deleteClick')
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
