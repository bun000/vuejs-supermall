<template>
  <div class="detail-swiper">
    <swiper>
      <swiper-item v-for="item in topImages" :key="item" class="swiper-item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from '../../../components/common/swiper/Swiper.vue'
import SwiperItem from '../../../components/common/swiper/SwiperItem.vue'


export default {
  components: { Swiper, SwiperItem },
  name:"DetailSwiper",
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
  .detail-swiper img{
    width: 100%;
  }

  .swiper-item{
    height: 300px;
    width: 100%;
  }
</style>