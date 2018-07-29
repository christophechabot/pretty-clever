<template>
  <span
    :class="{ 'tick-box': true, 'ticked': value }"
    @click.prevent="onClick">
    <span class="tick-box-label">
      {{ label }}
    </span>
    <TickedOverlay
      :value="value"/>
  </span>
</template>

<script>
import TickedOverlay from '@/components/TickedOverlay';

export default {
  name: 'TickBox',
  components: {
    TickedOverlay
  },
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: [Boolean, Number],
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

  .tick-box {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 60px;
    border-radius: 8px;
    overflow: hidden;
    .tick-box-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
      font-weight: bold;
      font-style: italic;
    }
    &:not(:last-of-type) {
      margin-right: 4px;
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
