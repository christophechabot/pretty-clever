<template>
  <div class="value-picker-backdrop">
    <div class="value-picker">
      <div class="value-picker-row">
        <span
          class="value-picker-box"
          @click="onClick(1)">1</span>
        <span
          class="value-picker-box"
          @click="onClick(2)">2</span>
        <span
          class="value-picker-box"
          @click="onClick(3)">3</span>
      </div>
      <div class="value-picker-row">
        <span
          class="value-picker-box"
          @click="onClick(4)">4</span>
        <span
          class="value-picker-box"
          @click="onClick(5)">5</span>
        <span
          class="value-picker-box"
          @click="onClick(6)">6</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ValuePicker',
  methods: {
    onClick: function(value) {
      this.$emit('onSelect', value);
    }
  }
}
</script>

<style lang="scss">
  @import '@/global.scss';

  .value-picker-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    background-color: rgba($black, 0.5);
  }
  .value-picker {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid $black;
    border-radius: 10px;
    background-color: $white;
    box-shadow: 2px 2px 8px 0px rgba($black, 0.75);  
    font-size: 60px;
    padding: 16px;

    .value-picker-row {
      &:first-of-type {
        margin-bottom: 16px;
      }
    }

    .value-picker-box {
      display: inline-block;
      vertical-align: middle;
      width: 70px;
      height: 70px;
      border: 2px solid $black;
      border-radius: 10px;
      box-sizing: border-box;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 16px;
      }
    }
  }
</style>
