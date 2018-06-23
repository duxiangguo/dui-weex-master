<template>
    <div class="center flex-row">
        <text v-for="(isFull,index) in list"  :value="isFull ? decode(selectRateIcon) : decode(rateIcon)" :style="{'color':disabled ? disabledColor : isFull ? color:voidColor,fontSize:size}" class="iconfont "  @click="onSelect(index)"></text>
    </div>
</template>

<script>
    module.exports = {
        props: {
            value: {
                type: Number,
                default: 2
            },
            count:{
                type: Number,
                default:5
            },
            color:{
                type:String,
                default:'#ff2d4d'
            },
            size:{
                type:Number,
                default:55
            },
            voidColor:{
                type:String,
                default:'#ff2d4d'
            }
            ,
            disabledColor:{
                type:String,
                default:'#7c7c7c'
            },
            disabled:{
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
                rateIcon:'&#xe64C',
                selectRateIcon:'&#xe64B'
            }
        },
        mounted(){
            let domModule = weex.requireModule('dom');
            domModule.addRule('fontFace', {
                'fontFamily': "iconfont",
                'src': 'url(\'bmlocal://iconfont/iconfont.ttf\')'
            })
        },
        computed: {
            list() {
                return Array.apply(null, { length: this.count }).map((value, index) => index < this.value);
            }
        },
        methods: {
            decode(fontCode){
                if (/^&#x/.test(fontCode)) {
                    return String.fromCharCode(fontCode.replace(/^&#x/, '0x').replace(/;$/, ''))
                } else {
                    return fontCode;
                }
            },
            onSelect(index){
                if (!this.disabled) {
                    this.value=index+1;
                    this.$emit('input', index + 1);
                    this.$emit('change', index + 1);
                }
            }
        }
    }
</script>

<style lang="sass" src="../css/duiRate.scss"></style>
