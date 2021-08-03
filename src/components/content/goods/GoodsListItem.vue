<template>
  <div class="goods-list-item" @click="itemClick">
    <img :src="showImage" alt="" @load="iamgeLoad"/>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }} </span>
      <span class="collect">{{ goodsItem.cfav }} </span>
    </div>
  </div>
</template>

<script>
// import emitter from 'common/mitt';

export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods:{
    itemClick(){
      this.$router.push('/detail/' + this.goodsItem.iid)
    },
    iamgeLoad(){
      // this.$bus.$emit('itemIamgeLoad')
      // console.log('------');
    }
  },
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
};
</script>

<style>
.goods-list-item {
  position: relative;
  text-align: center;
  padding-bottom: 10px;
  width: 48%;
}

.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-list-item .goods-info p {
  font-size: 12px;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>