<template>
  <div class="sidebar">
    <ul class="menu" v-for="menu in navTree" :key="menu.id">
      <li>
        <router-link :to="menu.url" v-if="menu.url!=null" class="color" ><i class="fa fa-home"></i>1{{ menu.name }}</router-link>
<!--        系统管理-->
        <a v-else @click.prevent ="test($event)" class="color"><i class="fa fa-home" ></i>2{{ menu.name }}</a>

        <ul :class="submenu" style="background-color: #5269a4" v-if="menu.children.length>0">
          <li v-for="childMenu in menu.children" :key="childMenu.id">
            <router-link :to="childMenu.url"  class="color2">{{ childMenu.name }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      submenu: {
        submenuHide: true,
        submenuShow: false
      },
    }
  },
  computed: {
    navTree() {
      let tree = this.$store.getters.getNavTree;
      return tree;
    }
  },
  methods: {
    test(a){
      console.log(a.target.parentNode.lastChild.className);
      // this.submenu.submenuHide = false;
      // this.submenu.submenuShow = true;
      if(a.target.parentNode.lastChild.className==="submenuHide"){
        a.target.parentNode.lastChild.className = "submenuShow"
      }else{
        a.target.parentNode.lastChild.className="submenuHide"
      }
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 15%;
  height: 90%;
  background-color: #033041;
  float: left;
}
/*菜单列表背景色*/
.color:hover{
  background-color: #2bbbb5;
  width: 211px;
  

}
.color2:hover{
  background-color: #083836;

}
li {
  list-style: none;
  position: relative;
  border-style: solid;
  border-width: 1px 0 0;
  border-color: #E5E5E5;
}

.submenu > li {
  position: relative;
  padding-left: 100px;
}

a {
  display: block;
  width: 170px;
  height: 36px;
  color: white;
  text-decoration: none;
  line-height: 30px;
}

.fa {
  display: inline-block;
  margin-left: 10px;
  margin-right: 14px;
  font-family: 'FontAwesome';
  font-weight: normal;
  font-style: normal;
}

.submenuHide {
  display: none;
  position: relative;
}

.submenuShow {
  display: block;
  position: relative;
}


.submenu:before {
  content: "";
  display: block;
  position: absolute;
  z-index: 1;
  left: 18px;
  top: 0;
  bottom: 0;
  border: 1px dotted;
  border-width: 0 0 0 0; /* 上 右 下 左 */
}

.submenu > li:before {
  content: "";
  display: block;
  width: 10px;
  position: absolute;
  z-index: 1;
  left: 20px;
  top: 17px;
  border: 1px dotted;
  border-width: 1px 0 0; /* 上 右 下*/
}
</style>