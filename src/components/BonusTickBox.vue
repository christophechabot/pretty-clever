<template>
  <span
    :class="{ 
      'bonus-tick-box': true,
      'available': obj.available,
      'ticked': obj.value
    }"
    @click="onClick">
    <span class="bonus-tick-box-container">
      <TickedOverlay
        :value="obj.value"/>
    </span>
  </span>
</template>

<script>
import TickedOverlay from '@/components/TickedOverlay';

export default {
  name: 'BonusTickBox',
  components: {
    TickedOverlay
  },
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick() {
      if (!this.ticked) {
        this.$emit('clicked');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/global.scss';

  .bonus-tick-box {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 60px;
    overflow: hidden;
    background-color: $black;
    padding: 1px;
    .bonus-tick-box-container {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: 60px;
      border: 6px solid $white;
      background-color: $gray-light;
    }
    &:not(:last-of-type) {
      margin-right: 16px;
    }
    &.available {
      .bonus-tick-box-container {
        border-color: $black;
      }
    }
    &:not(.ticked) {
      cursor: pointer;
    }
    &.ticked {
      .ticked-overlay {
        visibility: visible;
      }
    }
  } 
</style>
