<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles"
      :key="item"
      :class="{ active: index === currentIndex }"
      @click="tabClick(index)"
    >
      <span>
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabcontrol",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods:{
    tabClick(index){
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  }
};
</script>

<style>
.tab-control {
  text-align: center;
  font-size: 15px;
  display: flex;  
  padding-top: 15px;
  background-color: #fff;
  height: 45px;

  position: sticky;
  top: 44px;

  z-index: 1;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;
}

.active span {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
}
</style>