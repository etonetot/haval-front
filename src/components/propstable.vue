<template>
<div>
 
  <div class="SecondScroll" @scroll="OnScrollSecond" ref="SecondScroll">
    <div class="SecondScrollInner" ref="SecondScrollInner"></div>
  </div>

  <div id="table-scroll" class="table-scroll" ref="TableScroll">
    <div :height="height+'px'" @scroll="OnScrollTable" ref="TableScrollDiv">
       <table class="main-table">
         <tbody ref="TableScrollTBody">
          <tr v-for="(row, ir) in rows" :class="row.class" :key="ir">
            <th v-html="row[ cols[0].key ]" class="fixed-side"></th>
            <td v-for="(col, ic) in cols" v-if="ic>0" v-html="row[ col.key ]" :key="ic">
            </td>
          </tr>
         </tbody>
       </table>
      </div>

    <table class="main-table clone">
      <tbody>
      <tr v-for="(row, ir) in rows" :class="row.class" :ref="'tr'+ir" :key="ir">
        <th v-html="row[ cols[0].key ]" class="fixed-side"></th>
        <td v-for="(col, ic) in cols" v-if="ic>0" v-html="row[ col.key ]" :key="ic">
        </td>
      </tr>
      </tbody>
    </table>

    <template v-for="(row, ir) in rows" v-if="row.class=='scrollrow'">
    <div  class="SecondScroll SecondScrollAdditional" @scroll="OnScrollSecond" :ref="'SecondScroll'+ir">
      <div class="SecondScrollInner" :ref="'SecondScrollInner'+ir"></div>
    </div>
    </template>




  </div>
</div>
</template>

<script>


  export default {

    props:['rows', 'cols', 'height'],
    data() {
      return {
      }
    },

    computed: {
      scrollrows() {
        return rows.filter( row => {
          return row.class=='scrollrow';
        });
      },
    },

    watch: {
    },

    methods: {
      OnScrollTable(param){
        this.$refs.SecondScroll.scrollLeft = param.srcElement.scrollLeft ;

        this.rows.forEach(  (item, i) => {
          if (item.class == 'scrollrow') {
            this.$refs[('SecondScroll'+i)][0].scrollLeft = param.srcElement.scrollLeft ;
          }
        });

      },

      OnScrollSecond(param){
        this.$refs.TableScrollDiv.scrollLeft = param.srcElement.scrollLeft ;
      },

      UpdateScroll(){
        let wInner = this.$refs.TableScrollTBody.scrollWidth;
        let w = this.$refs.TableScroll.offsetWidth;

        //console.log('Table resized', w, wInner);
        this.$refs.SecondScrollInner.style.width = wInner+'px';
        this.$refs.SecondScroll.style.width = w+'px';

        //console.log(this.$refs);
        this.rows.forEach(  (item, i) => {
          if (item.class == 'scrollrow')
          {
            this.$refs['SecondScrollInner'+i][0].style.width = wInner+'px';
            this.$refs[('SecondScroll'+i)][0].style.width = w+'px';

            let top = this.$refs['tr'+i][0].offsetTop;
            this.$refs[('SecondScroll'+i)][0].style.top = top+'px';
          }
        });
      }


    },

    mounted: function () {
      //console.log('Table ready');
      window.addEventListener('resize', this.UpdateScroll)
      this.UpdateScroll();
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.UpdateScroll)
    },

    activated: function()
    {
      //console.log('Table activated', this._inactive)
    },

    updated: function ()
    {
      //console.log('Table updated');
      this.UpdateScroll();
    },
  }
</script>


<style>

  .SecondScrollAdditional {
    position:absolute;
  }

  .SecondScroll {
    width: 100%;
    height: 19px;
    background:#ccc;
    overflow:auto;
    z-index:10;
  }

  .SecondScrollInner{
    height: 19px;
    -z-index:11;
  }

  .table-scroll {
    position:relative;
    /* max-width:830px; */
    width: 100%;
    overflow:hidden;
    border:1px solid #ccc;
  }

  .table-scroll>div {
    width:100%;
    overflow:auto;
  }

  .table-scroll table {
    width:100%;
    -margin:auto;
    border-collapse:separate;
    border-spacing:0;
    -webkit-overflow-scrolling: touch;
  }

  .table-scroll th, .table-scroll td {
    text-align:left;
    padding:5px 5px;
    border:1px solid #ccc;
    white-space:nowrap;
    vertical-align:top;
  }

  .table-scroll thead, .table-scroll tfoot {
    background:#fff3f3;
  }

  .table-scroll .clone {
    position:absolute;
    top:0;
    left:0;
    -pointer-events:none;
  }
  .table-scroll .clone th, .clone td {
    visibility:hidden
  }
  .table-scroll .clone td, .clone th {
    border-color:transparent
  }
  .table-scroll .clone tbody th {
    visibility:visible;
    font-weight:bold;
  }

  .table-scroll .clone .fixed-side {
    border:1px solid #ccc;
    text-align:left;
    background:#eee;
    visibility:visible;
  }
  .table-scroll .clone  .hilight1, .table-scroll .hilight1, .table-scroll .clone .hilight1 .fixed-side{
    background:#FFFFEE;
  }
  .table-scroll .clone  .hilight2, .table-scroll .hilight2, .table-scroll .clone .hilight2 .fixed-side{
    background:#ECE4B4;
  }

  .table-scroll .clone thead, .clone tfoot
  {
    background:transparent;
  }
  .table-scroll .scrollrow, .table-scroll .scrollrow td, .table-scroll .scrollrow th
  {
    height: 19px;
    padding: 0;
  }

  .table-scroll .opencloserow
  {
    width:20px;
    display:inline-block;
    cursor: pointer;
    font-size:140%;
  }

  .table-scroll .RowHide
  {
    display: none;
  }
  .table-scroll	.notActual
  {
    color: #888;
  }

  @media screen and (max-width: 650px)
  {
    .table-scroll .clone, .SecondScroll, .table-scroll .scrollrow
    {
      display:none;
    }

  }

</style>
