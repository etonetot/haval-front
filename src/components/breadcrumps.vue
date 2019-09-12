<template>
<ol class="breadcrumb" v-if="items.length">
        <template v-for="(crumb, i) in items">
            <li>
                <router-link active-class="active" 
                    :to="{ path: crumb.path }" 
                    :tag="i != items.length-1 ? 'a' : lastTag"
                >
                    {{ crumb.name }}
                </router-link>
            </li>
            <li v-if="i != items.length-1" v-html="delimiter"></li>
        </template>
        
</ol>
</template>

<script>

  export default {
    data() {
      return {
          delimiter: "&raquo;",
          lastTag: "a",  // "span"
      }
    },

    computed: {
        items() {
            return this.getItems();
        },
        //curCarName(){
            //return this.$store.state.curCarData ? this.$store.state.curCarData.modelname : "";  
        //}

    },

    methods: {
        getBreadcrumb: function (bc) {
          return typeof bc === 'function' ? bc.call(this, this.$route.params) : bc;
        },

        getItems: function () {
            const breadcrumbs = [];
            this.$route.matched.forEach(routeRecord => {
                if (!routeRecord.meta.breadcrumb)
                    return;

                let path = routeRecord.path.length > 0 ? routeRecord.path : '/';
                let name = this.getBreadcrumb( routeRecord.meta.breadcrumb );
                
                // if (routeRecord.name=="car")    
                // {
                //     console.dir(routeRecord);
                //     name = routeRecord.components.default.methods.getBreadCrumpName(this);
                // }
                if (routeRecord.meta.parent)
                {
                    let parent = this.$router.resolve(routeRecord.meta.parent);
                    if (parent)
                    {
                        let path2 = this.resolveParams(parent.route.path);
                        let name2 = this.getBreadcrumb(parent.route.meta.breadcrumb);
                        breadcrumbs.push({
                            path: path2,
                            name:name2
                        });
                    }
                }

                // Object.keys(this.$route.params).forEach(param => {
                //     path = path.replace(':' + param, this.$route.params[param]);
                //  }, this);

                path = this.resolveParams(path);
                breadcrumbs.push({
                    name, path
                });
            }, this);

            return breadcrumbs;
        },

        resolveParams: function(path){
                Object.keys(this.$route.params).forEach(param => {
                     path = path.replace(':' + param, this.$route.params[param] ? this.$route.params[param] : "");
                 }, this);
                path = path.replace(':page', "");
                return path;
        }


    },

  }
</script>


<style>

.breadcrumb 
{
    padding: 18px 12px;
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 auto;
}

.breadcrumb li
{
    display: inline-flex;
    list-style-type: none;
}

.breadcrumb li:nth-child(2n) 
{
    padding: 0 12px;
}

.breadcrumb a
{
   text-decoration: none;
}
</style>
