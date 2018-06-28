<template>
    <dui-popup v-model="show" ref="duiPopup" :height="height" duration="100" :showMask="showMask" @input="maskClick">
        <div  v-if="theme==='default'">
            <div class="flex-row">
                <div >
                    <div class="flex-row height100 width550" v-for="(items,indexs) in DigitalUpperPart">
                        <div class="flex1 center item" v-for="(item,index) in items" :class="[item.isChecked ? 'itemCheckedColor' : '']"
                             @click="actionsheetItemClick(item.value,indexs,index,DigitalUpperPart)">
                            <div>
                                <dui-icon :name="item.title"></dui-icon>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="height200 flex1 center item "
                     @click="actionsheetItemClick('delete')">
                    <dui-icon name="&#xe6c0" size="60px"></dui-icon>
                </div>
            </div>
            <div  class="flex-row">
                <div >
                    <div class="flex-row height100 width550" v-for="(items,indexs) in DigitalLowerPart">
                        <div class="flex1 center item " v-for="(item,index) in items" :class="[item.isChecked ? 'itemCheckedColor' : '']"
                             @click="actionsheetItemClick(item.value,indexs,index,DigitalLowerPart)">
                            <div>
                                <dui-icon :name="item.title"></dui-icon>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="height200 flex1 center item " :style="{'backgroundColor':closeButtonBackgroundColor}" @click="closeNumberKeyboard()">
                    <text  class="text-color-white" :style="closeButtonTextStyle" :value="closeButtonText"></text>
                </div>
            </div>
        </div>        <div>
        <div class="flex-row" v-if="theme==='custom'">
            <div >
                <div class="row-center-bottom width750 height80">
                    <div class="row-center-bottom height80" @click="closeNumberKeyboard()">
                        <text class="text-color-blue font-size35 margin-right40" :style="closeButtonTextStyle" :value="closeButtonText" ></text>
                    </div>
                </div>
                <div class="flex-row height100 width750" v-for="(items,indexs) in DigitalPart">
                    <div class="flex1 center item" v-for="(item,index) in items" :class="[item.isChecked ? 'itemCheckedColor' : '']"
                         @click="actionsheetItemClick(item.value,indexs,index,DigitalPart)">
                        <div>
                            <dui-icon :name="item.title"></dui-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </dui-popup>
</template>

<script>
    import duiPopup from './dui-popup';
    import duiIcon from'./dui-icon';
    module.exports = {
        components: {
            duiPopup,duiIcon
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            showMask:{
                type: Boolean,
                default: false
            },
            theme:{
                type: String,
                default: 'default'
            },
            closeButtonText:{
                type: String,
                default: '确定'
            },
            closeButtonBackgroundColor:{
                type: String,
                default: '#83c6c2'
            },
            closeButtonTextStyle:{
                type: Object,
                default: () => ({
                    fontSize: '35px'
                })
            }
        }, data () {
            return {
                DigitalUpperPart:[[{title:'1',value:'1',isChecked:false}
                    ,{title:'2',value:'2',isChecked:false}
                    ,{title:'3',value:'3',isChecked:false}]
                    ,[{title:'4',value:'4',isChecked:false}
                        ,{title:'5',value:'5',isChecked:false}
                        ,{title:'6',value:'6',isChecked:false}]],
                DigitalLowerPart:[[{title:'7',value:'7',isChecked:false},
                    {title:'8',value:'8',isChecked:false},
                    {title:'9',value:'9',isChecked:false}]
                    ,[{title:'.',value:'.',isChecked:false}
                        ,{title:'0',value:'0',isChecked:false}
                        ,{title:'&#xe90D',value:'close',isChecked:false}]],
                DigitalPart:[[{title:'1',value:'1',isChecked:false}
                    ,{title:'2',value:'2',isChecked:false}
                    ,{title:'3',value:'3',isChecked:false}]
                    ,[{title:'4',value:'4',isChecked:false}
                        ,{title:'5',value:'5',isChecked:false}
                        ,{title:'6',value:'6',isChecked:false}] ,[{title:'7',value:'7',isChecked:false}
                        ,{title:'8',value:'8',isChecked:false}
                        ,{title:'9',value:'9',isChecked:false}] ,[{title:'.',value:'.',isChecked:false}
                        ,{title:'0',value:'0',isChecked:false}
                        ,{title:'&#xe90E',value:'delete',isChecked:false}]],
                height:400


            }
        },
        mounted(){
            if(this.theme==='custom'){
                this.height=480
            }else{
                this.height=400
            }
        },
        methods: {
            //上拉菜单项点击事件
            actionsheetItemClick (item,indexs,index,data) {
                if(data){
                    data[indexs][index].isChecked=true
                    setTimeout(function () {
                        data[indexs][index].isChecked=false
                    }, 30);
                }
                if(item==='close'){
                    this.closeNumberKeyboard()
                }else if(item==='delete'){
                    this.$emit('delete', item);
                }else{
                    this.$emit('input', item);
                }

            },
            closeNumberKeyboard(){
                this.$emit('close');
                this.$refs.duiPopup.appearPopup(false);
                this.show=false
            },
            maskClick(){
                this.$emit('close');
            }
        }
    }
</script>

<style lang="sass" src="../css/duikeyboard.scss"></style>
