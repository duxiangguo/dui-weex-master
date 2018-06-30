<template>
    <dui-popup v-model="show" ref="duiPopup" height="800" duration="100" @input="maskClick">
        <div>
            <div class="height400 center">
                <text>{{title}}</text>
                  <div class="flex-row center input-password-div">
                      <div class="flex1 center height100 input-password-div-border"  v-for="(item,index) in length">
                          <dui-icon name="&#xe6c6;"  v-if="value.length>index" size="35px"></dui-icon>
                      </div>
                  </div>
            </div>
            <div class="flex-row background-color-gay">
                <div>
                    <div class="flex-row height100 width750" v-for="(items,indexs) in DigitalPart">
                        <div class="flex1 center item-pay background-color-white"  v-for="(item,index) in items" :class="[item.isChecked ? 'itemCheckedColor' : '']"
                             @click="actionsheetPayItemClick(item.value,indexs,index,DigitalPart)">
                            <div>
                                <dui-icon :name="item.title" @iconClick="actionsheetPayItemClick(item.value,indexs,index,DigitalPart)"></dui-icon>
                            </div>
                        </div>
                    </div>
                    <div class="flex-row height100 width750" v-for="(items,indexs) in zero">
                        <div class="flex1 center item-pay"></div>
                        <div class="flex1 center item-pay background-color-white" v-for="(item,index) in items" :class="[item.isChecked ? 'itemCheckedColor' : '']"
                             @click="actionsheetPayItemClick(item.value,indexs,index,zero)">
                            <div>
                                <dui-icon :name="item.title" @iconClick="actionsheetPayItemClick(item.value,indexs,index,zero)"></dui-icon>
                            </div>
                        </div>
                        <div class="flex1 center item-pay" @click="actionsheetPayItemClick('delete')">
                            <div>
                                <dui-icon :name="rightButton" @iconClick="actionsheetPayItemClick('delete')"></dui-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </dui-popup>
</template>

<script>
    import duiPopup from './dui-popup.vue'
    import duiIcon from'./dui-icon';
    module.exports = {
        components: {
            duiPopup,duiIcon
        },
        props: {
            show: {
                type: Boolean,
                default: true
            },
            title:{
                type: String,
                default: ''
            },
            length:{
                type: Number,
                default: 6
            },
            rightButton:{
                type: String,
                default: '&#xe6c0'
            }
        },
        data: function () {
            return {
                DigitalPart:[[{title:'1',value:'1',isChecked:false}
                    ,{title:'2',value:'2',isChecked:false}
                    ,{title:'3',value:'3',isChecked:false}]
                    ,[{title:'4',value:'4',isChecked:false}
                        ,{title:'5',value:'5',isChecked:false}
                        ,{title:'6',value:'6',isChecked:false}] ,[{title:'7',value:'7',isChecked:false}
                        ,{title:'8',value:'8',isChecked:false}
                        ,{title:'9',value:'9',isChecked:false}] ],
                zero:[[{title:'0',value:'0',isChecked:false}]],
                value:''
            }
        },
        methods: {
            //上拉菜单项点击事件
            actionsheetPayItemClick(item,indexs,index,data) {
                if(data){
                    data[indexs][index].isChecked=true;
                    setTimeout(function () {
                        data[indexs][index].isChecked=false
                    }, 30);
                }
                if (item === 'delete') {
                    let  _this =this;
                    _this.value = _this.value.slice(0, _this.value.length - 1);
                    _this.rightButton='&#xe6c5';
                    setTimeout(function () {
                        _this.rightButton='&#xe6c0'
                    }, 30);
                } else {
                    if (this.value.length <this.length) {
                        this.value = this.value+ item
                    }
                    if (this.value.length === this.length) {
                        this.$emit('input', this.value);
                    }
                }
            },
            maskClick(){
                this.$emit('close');
            }
        }
    }
</script>
<style lang="sass" src="../css/duikeyboard.scss"></style>
