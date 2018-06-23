<template>
    <dui-popup v-model="show" ref="duiPopup" height="600" duration="100" @input="maskClick">
        <dui-tabbar :tabItems="tabItems" titleSize="30px" selectedColor="#83c6c2" borderBottomColor="#83c6c2"	showSelectedLine=true  v-model="currentTab"></dui-tabbar>
        <slider class="flex1" @change="onSliderChange" :index="currentTab" :infinite="false">
            <div class="width750">
                <scroller class="width750 height550" offset-accuracy="500px"  show-scrollbar="false">
                    <div >
                        <text v-for="items in province" class="item-style" @click="checkArea(items)">{{items.title}}</text>
                    </div>
                </scroller>
            </div>
            <div class="width750">
                <scroller  class="width750 height550" offset-accuracy="500px"   show-scrollbar="false">
                    <div >
                        <text v-for="items in city" class="item-style" @click="checkArea(items)">{{items.title}}</text>
                    </div>
                </scroller>
            </div>
            <div class="width750">
                <scroller   class="width750 height550" offset-accuracy="500px"  show-scrollbar="false">
                    <div >
                        <text v-for="items in area" class="item-style" @click="checkArea(items)">{{items.title}}</text>
                    </div>
                </scroller>
            </div>
        </slider>
    </dui-popup>
</template>

<script>
    import duiPopup from './dui-popup.vue'
    import duiTabbar from './dui-tabbar.vue'
    module.exports = {
        components: {
            duiPopup,duiTabbar
        },
        props: {
            show: {
                type: Boolean,
                default: true
            },
            province:{
                type: Object,
                default: [{title:'黑龙江',value:'230000'}]
            },
            city:{
                type: Object,
                default: [{title:'哈尔滨',value:'230100'}]
            },
            area:{
                type: Object,
                default: [{title:'南岗区',value:'230103'}]
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
        data: function () {
            return {
            }
        },
        methods: {
            maskClick(){
                this.$emit('close');
            },
            onSliderChange(e){
                this.currentTab= e.index;
            },
            closeNumberKeyboard(){
                this.$emit('close');
                this.$refs.duiPopup.appearPopup(false);
                this.show=false
            },
            checkArea(e){
                if(this.currentTab===0){
                    this.currentTab=1;
                    this.tabItems[0].title=e.title;
                    this.tabItems[0].value=e.value;
                    this.tabItems[1].title='请选择';
                    this.tabItems[2].title='';
                    this.$emit('selectArea',e.value);
                }else if(this.currentTab===1){
                    this.currentTab=2;
                    this.tabItems[1].title=e.title;
                    this.tabItems[1].value=e.value;
                    this.tabItems[2].title='请选择';
                    this.$emit('selectArea',e.value);
                }else{
                    this.tabItems[2].title=e.title;
                    this.tabItems[2].value=e.value;
                    this.$emit('checkedArea',this.tabItems);
                    this.closeNumberKeyboard()
                }

            }
        }
    }
</script>
<style lang="sass" src="../css/duitabbar.scss"></style>
