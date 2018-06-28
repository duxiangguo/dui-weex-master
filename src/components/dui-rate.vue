<template>
    <div class="center flex-row">
        <dui-icon v-for="(isFull,index) in list" :name="isFull ?selectRateIcon:rateIcon"  :iconStyle="{'color':disabled ? disabledColor : isFull ? color:voidColor,fontSize:size}"   @iconClick="onSelect(index)"></dui-icon>
    </div>
</template>

<script>
    import duiIcon from'./dui-icon';
    module.exports = {
        components:{
            duiIcon
        },
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
                rateIcon:'&#xe68a;',
                selectRateIcon:'&#xe689;'
            }
        },
        computed: {
            list() {
                return Array.apply(null, { length: this.count }).map((value, index) => index < this.value);
            }
        },
        methods: {
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
