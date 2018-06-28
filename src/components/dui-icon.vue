<template>
        <text :style="duiFontStyle"  @click="onClick(name)" :value="decode(name)"></text>
</template>

<script>
    module.exports = {
        props: {
            name: {
                type:String,
                default:'&#xe64C'
            },
            size:{
                type:String,
                default:'50px'
            },
            iconStyle: {
                type: Object,
                default: () => ({})
            },
            isDefault:{
                type:Boolean,
                default:true
            },
            url:{
                type:String,
                default:'bmlocal://iconfont/iconfont.ttf'
            }
        },
        mounted(){
            let domModule = weex.requireModule('dom');
            let defaultUrl='https://at.alicdn.com/t/font_724715_ck9xylgpvyl.ttf';
            if(this.isDefault){
                this.url=defaultUrl
            }
            domModule.addRule('fontFace', {
                'fontFamily': "iconfont",
                'src': "url('" + this.url + "')"
            })
        },
        computed: {
            duiFontStyle () {
                const { iconStyle, size } = this;
                return {
                    fontFamily: 'iconfont',
                    fontSize:size,
                    ...iconStyle
                }
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
            onClick(name){
                this.$emit('iconClick',name);
            }
        }
    }
</script>

