<template>
    <div>
        <div class="flex-row  row-center-left margin-left40 margin-bottom20" v-if="show">
            <dui-icon :name="describeBar.icon" :iconStyle="{'fontSize':describeBar.iconSize,'color':describeBar.iconColor}" ></dui-icon>
            <div class="margin-left20">
                <text>{{describeBar.title}}</text>
                <text :style="{'color': describeBar.descriptionColor}">{{describeBar.description}}</text>
            </div>
        </div>
        <div class="row-center-left flex-row margin-left40 margin-bottom20">
            <div class="center flex-row width140" >
                <text class="iconfont" :style="{'color':1===value ? themeColor.highlightTitleColor:themeColor.pointInnerColor}">{{list[0].title}}</text>
            </div>
            <div class="center flex-row width200"  v-for="(isFull,index) in _list" v-if='index>0'>
                <text class="iconfont  " :style="{'color':index===value-1 ? themeColor.highlightTitleColor:themeColor.pointInnerColor}">{{list[index].title}}</text>
            </div>
        </div>
        <div class="row-center-left flex-row margin-left40">
            <div class=" center flex-row" >
                <text class="iconfont"  :value="value===1 ? decode(selectRateIcon) : decode(rateIcon)" :style="{'color':value>=1 ? themeColor.highlightTitleColor:themeColor.pointInnerColor,'fontSize':1===value ? themeColor.highlightTitleSize:themeColor.pointSize}"></text>
            </div>
            <div class=" center flex-row" v-for="(isFull,index) in _list" v-if='index<count-1'>
                <div class="row-line"  :style="{'width':lineWidth,'backgroundColor':isFull ? themeColor.highlightTitleColor:themeColor.lineColor}"></div>
                <text class="iconfont" :value="index===value-2  ? decode(selectRateIcon) : decode(rateIcon)" :style="{'color':isFull ? themeColor.highlightTitleColor:themeColor.pointInnerColor,'fontSize':index===value-2 ? themeColor.highlightTitleSize:themeColor.pointSize}"></text>
            </div>
        </div>
    </div>

</template>

<script>
    import duiIcon from'./dui-icon';
    module.exports = {
        components:{
            duiIcon
        },
        props: {
            show:{
                type: Boolean,
                default:true
            },
            describeBar:{
                type: Object,
                default:{icon:'&#xe6dd;',
                    iconSize:100,
                    iconColor:'#ff6600',
                    title:'标题',
                    description:'描述栏文字',
                    descriptionColor:'#7c7c7c'}
            },
            value: {
                type: Number,
                default:2
            },
            list:{
                type: Object,
                default:[{title:'买家下单'},{title:'商家接单'},{title:'买家提货'},{title:'交易完成'}]
            },
            themeColor:{
                type: Object,
                default:{lineColor:'#727272',
                    pointInnerColor:'#727272',
                    highlightTitleColor:'#ff6600',
                    pointSize:30,
                    highlightTitleSize:40}
            }
        },
        data() {
            return {
                rateIcon:'&#xe6c6;',
                selectRateIcon:'&#xe6cf;',
                lineWidth:'160px',
                count:4
            }
        },
        mounted(){
            this.count=this.list.length
        },
        computed: {
            _list() {
                return Array.apply(null, { length: this.count }).map((value, index) => index < this.value-1);
            }
        },
        methods: {
        }
    }
</script>

<style lang="sass" src="../css/duiRowSteps.scss"></style>
