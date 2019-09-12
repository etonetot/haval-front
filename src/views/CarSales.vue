<template>
    <div class="my-3">
        <v-card>    
            <div class="salesCaption">
                <span class="title mb-4">Продажи в </span>
                <toggle-button 
                    v-model="rusCountry"
                    :labels="{checked: 'России', unchecked: 'Китае'}"
                    :switch-color="{checked: 'linear-gradient(white, white, blue, red, red)', unchecked: 'red'}"
                    :color="{checked: '#88f', unchecked: '#f88'}"
                    class="title toggleCountry" :width=120 :height=30
                />
            </div>

            <div class="chartWrapper">

                <vue-chart 
                    ref="refChart"
                    :columns="chartColumns"
                    :rows="chartRows"
                    :options="chartOptions"
                    chart-type = "Bar"
                    class="chart"
                ></vue-chart>

            </div>


            <v-divider></v-divider>
            <v-data-table
                :headers="tableHeaders"
                :items="tableRows"
                class="elevation-1"
                :hide-actions="true"
                no-data-text = "Нет данных"
            >
                <template v-slot:items="{item}">
                    <td class="subheading">{{ item.dt }}</td>
                    <td nowrap v-for="i in 12" :key="i" :class="{ 'oddSales' : i%2, 'text-xs-right': true}">{{ item["value"+(i-1).toString()] | volume }}</td>
                </template>                
            </v-data-table>


        </v-card>
    </div>
</template>



<script>
    import config from '@/config.js'

    export default {
        components: {
        },

        metaInfo () { 
            return  {
                    title: this.$store.state.curCarData.modelname + " - Статистика продаж",
            }
        },

        data() {
            return {
                needReload: 1,

                rusCountry: true,

                months:['Январь', 'Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],

                chartColumns: [
                    {
                        'type': 'string',
                        'label': ''
                    }, 
                    {
                        'type': 'number',
                        'label': 'Sales'
                    }, 
                ],

                chartOptions: {
                    title2: 'Company Performance',
                    hAxis: {

                        direction:-1,
                    },
                    vAxis: {
                        title: '',
                    },
                    series: {   0: { color: '#9F1102' }	},
                    //width: 400,
                    height: 400,
                    'legend': {position:'none'} ,
                    curveType2: 'bar'
                },


            }
        },

        computed: {
            curCar() {
                return this.$store.getters.curCar;
            },
            sales(){
                let arr = this.rusCountry ? this.$store.getters.GET_SALES_RUS : this.$store.getters.GET_SALES_CHINA;
                return arr ? arr : [];
            },

            chartRows(){
                let prev = this.sales[0];     
                let arr = [];
                this.sales.forEach((item, ind) => {
                    if (ind>0)    
                    {
                        for (let y=prev.year ; y<=item.year ; y++)
                        {
                            let m1 = y==prev.year ? prev.mon+1 : 1;    
                            let m2 = y==item.year ? item.mon : 13;    
                            for (let i=m1 ; i<m2 ; i++)
                                arr.push( [ i+"."+(2000+y), 0 ] );
                        }        
                        prev=item;
                    }
                    arr.push( [ item.mon+"."+(2000+item.year), item.sales ] );
                });     
                return arr;   

            },

            tableHeaders(){
                let arr = [{   text: 'Год', align: 'left', sortable: false, class: "subheading", value: 'dt'   }];
                this.months.forEach( (item, ind) => 
                    arr.push({   
                        text: item, 
                        align: 'center', 
                        sortable: false, 
                        class: "subheading",
                        value: 'value'+ind   
                    })
                );
                return arr;
            },

            tableRows(){
                let years = [];
                this.sales.forEach(item => {
                     if (years.indexOf(item.year)==-1)
                        years.push(item.year);
                });

                if (!years.length)
                    return [];

                let arr = [];
                years.forEach(year=>{
                    let row = { dt: year+2000 };
                    arr.push(row);
                });    
                
                this.sales.forEach(item=>{
                    let indYear = years.indexOf(item.year);
                    let m = "value"+(item.mon-1).toString();
                    arr[indYear][m] = item.sales;    
                });

                return arr;
             },


          


        },

        watch: {
            curCar(newCar)
            {
                if (!this._inactive)
                    this.load();
                else {
                    this.needReload = 1;
                }
            },
        },

        methods: {
            load(){
                this.needReload = 0;
                this.$store.dispatch('LOAD_SALES');
            },
            redrawChart(){
                //console.log("this.$refs.refChart.drawChart");
                this.$refs.refChart.drawChart();
            }
        },

        activated: function()
        {
            if (this.needReload && this.curCar)
                this.load();
        },

        mounted: function () {
            window.addEventListener('resize', this.redrawChart)
            
        },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.redrawChart)
        },        

    }
</script>


<style>
.salesCaption {
    text-align:center;
}

.salesCaption span{
    vertical-align: -0.2em;
}
    

.chartWrapper{
    padding: 50px; 
}

.chart{
    /* width:100%; */

}


.toggleCountry{
vertical-align: top;
}


.oddSales{
    background-color: #f5f5f5;
}



</style>
