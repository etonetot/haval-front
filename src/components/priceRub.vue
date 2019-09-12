<template>
    <div>

        <v-tooltip top :disabled="rub" class="body-2">
            <template v-slot:activator="{ on }">



                <v-chip v-if="price" class="body-1" v-on="on">
                        <v-avatar > <span :class="{ 'priceAvatar': true, 'rubAvatar': rub, 'yuanAvatar': !rub}"></span></v-avatar>

                        {{ title }} {{ p1 | currency }} 

                        <span v-if="priceTo">&nbsp;до {{ p2 | currency }} </span> 
                        
                        &nbsp; <v-icon v-if="rub" class="body-1">fa-ruble-sign</v-icon> 
                            <span v-if="!rub">юаней</span> 
                </v-chip>

            </template>


            <span class="subheading">В пересчете по сегодняшнему курсу: 
                        от {{ price*rateYuan | currency }} 
                        <span v-if="priceTo">&nbsp;до {{ priceTo*rateYuan | currency }} </span> 
                        &nbsp; <v-icon dark class="body-2">fa-ruble-sign</v-icon> 

            </span>


            </v-tooltip>


  </div>
</template>                


<script>
    import config from '@/config.js'

    export default {
        props: {
            price: Number, 
            priceTo: Number, 
            title: {
                type: String,
                default: 'От'
            },
            rub: Boolean,
            rate: Number,
        },
        data() {
            return {
                
            }
        },

        computed:
        {
            p1() {
                return this.rub ? this.price * 1000 : this.price;
            },       
            p2() {
                return this.rub ? this.priceTo * 1000 : this.priceTo;
            },   
            rateYuan() {
                return this.$store.getters.rate ? this.$store.getters.rate.yuan : 1;


            }    
        }
    }
</script>

<style>

  .priceAvatar{
    padding:10px;
    border-radius: 10px;
  }

  .rubAvatar{
    background: linear-gradient(white, white, blue, red, red);
  }

  .yuanAvatar{
    background: linear-gradient(135deg, yellow,  red, red);
  }
  
    
</style>
