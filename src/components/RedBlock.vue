<template>
  <div class="red-block">
    <div class="red-block-container">
      <template
        v-for="(box, index) in redBoxes">
        <div
          :key="index"
          class="tick-box-container">
          <TickBox
            :label="box.label"
            type="number"
            :value="box.value"
            @clicked="onClicked(index)"/>
          <template v-if="box.bonus">
            <BadgeSquare
              v-if="box.bonus.type !== 'fox'"
              :highlighted="box.value"
              :obj="box.bonus"
              class="tick-box-below"/>
            <BadgeFox
              v-if="box.bonus.type === 'fox'"
              :highlighted="box.value"
              class="tick-box-below"/>
          </template>
        </div>
      </template>
    </div>
    <ValuePicker
      v-if="showValuePicker"
      @onSelect="onSelectValue"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TickBox from '@/components/TickBox';
import ValuePicker from '@/components/ValuePicker';
import BadgeSquare from '@/components/svg/BadgeSquare';
import BadgeFox from '@/components/svg/BadgeFox';

export default {
  name: 'RedBlock',
  components: {
    TickBox,
    BadgeSquare,
    BadgeFox,
    ValuePicker
  },
  data: function() {
    return {
      selectedIndex: false,
      showValuePicker: false
    };
  },
  computed: {
    ...mapGetters(['redBoxes']),
    tickableIndex: function() {
      return this.redBoxes.findIndex(box => !box.value);
    }
  },
  methods: {
    onClicked: function(index) {
      if (index === this.tickableIndex) {
        this.selectedIndex = index;
        this.showValuePicker = true;
      }
    },
    onSelectValue: function(value) {
      this.$store.dispatch('tickBox', {
        color: 'red',
        index: this.selectedIndex,
        value: value
      });  
      this.selectedIndex = false;
      this.showValuePicker = false;
    }
  }
}
</script>

<style lang="scss">
  @import '@/global.scss';
  .red-block {
    display: inline-block;
    padding: 8px 8px 24px;
    margin-bottom: 4px;
    min-width: 708px;
    background-color: $red;
    .red-block-container {
      display: inline-block;
      vertical-align: middle;
      height: 60px;
      border-radius: 10px;
      padding: 4px;
      background-color: $red-dark;
      .tick-box-container {
        position: relative;
        display: inline-block;
        vertical-align: top;
        .tick-box-above {
          position: absolute;
          bottom: calc(100% + 4px);
          left: 50%;
          transform: translate(-50%, 0);
          z-index: 10;
          &.badge-star svg {
            width: 50px;
          }
        }
        .tick-box-below {
          position: absolute;
          top: calc(100% - 12px);
          left: 50%;
          transform: translate(-50%, 0);
          z-index: 10;
        }
        &:not(:last-of-type) {
          margin-right: 4px;
        }
      }
      .tick-box {
        background-color: $red-light;
        color: $red;
      }
    }
  }
</style>
