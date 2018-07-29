<template>
  <span class="ticked-overlay">
    <span
      v-if="value !== true"
      class="ticked-overlay-content">
      {{ value }}
    </span>
    <svg
      v-if="value === true"
      class="ticked-overlay-content"
      viewBox="0 0 212.982 212.982">
      <path style="fill-rule:evenodd;clip-rule:evenodd;" d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312
        c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312
        l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937
        c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"/>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'TickedOverlay',
  props: {
    value: {
      type: [Number, Boolean],
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '@/global.scss';

.ticked-overlay {
  visibility: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: rgba(128, 128, 128, .5);
  .ticked-overlay-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $black;
  }
  span.ticked-overlay-content {
    font-size: 48px;
    line-height: 48px;
    font-weight: bold;
  }
  svg.ticked-overlay-content {
    width: 42px;
  }
}
</style>
