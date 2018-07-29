<template>
  <div class="purple-block">
    <div class="purple-block-container">
      <template
        v-for="(box, index) in purpleBoxes">
        <div
          :key="index"
          class="tick-box-container">
          <svg
            v-if="index !== 0"
            class="lower-than purple-color"
            viewBox="0 0 30.072763 63.900002">
            <path
              d="m 20.7,4 c 0.4,0 0.8,0 1.2,0.1 2.9,0.7 4.7,3.4 4,6.2 l -10.8,21 10.8,22.3 c 0.7,2.8 -1.1,5.6 -4,6.2 -0.4,0.1 -0.8,0.1 -1.2,0.1 -2.4,0 -4.6,-1.6 -5.2,-4 L 4.1,31.4 v 0 -0.1 -0.1 0 L 15.5,8 c 0.6,-2.4 2.8,-4 5.2,-4 m 0,-4 c -4.2,0 -7.8,2.7 -9,6.6 L 0.6,29.2 C 0.2,29.8 0,30.5 0,31.2 0,32 0.2,32.8 0.6,33.5 l 11,23.8 c 1.2,3.9 4.8,6.6 9,6.6 0.7,0 1.4,-0.1 2.1,-0.2 2.5,-0.6 4.6,-2 5.9,-4.2 1.3,-2.1 1.7,-4.5 1.1,-6.9 -0.1,-0.3 -0.2,-0.5 -0.3,-0.8 l -9.9,-20.5 10,-19.1 c 0.1,-0.3 0.3,-0.6 0.3,-0.9 C 30.4,8.9 30,6.5 28.7,4.4 27.4,2.3 25.3,0.8 22.8,0.2 22.1,0.1 21.4,0 20.7,0"
              style="fill:currentColor"/>
            <path
              d="M 19.72862,59.763471 C 17.797082,59.375773 16.382255,58.129872 15.610187,56.136769 15.43381,55.681446 12.781337,49.929205 9.715805,43.354011 4.54143,32.255605 4.149949,31.376573 4.251514,31.08451 c 0.06017,-0.173032 2.615138,-5.411165 5.677703,-11.640296 3.062565,-6.229132 5.657134,-11.578087 5.76571,-11.886567 0.556564,-1.5812975 1.985016,-2.8904646 3.61789,-3.3157742 0.892091,-0.2323602 2.285695,-0.2096734 3.038912,0.049471 1.676592,0.5768323 2.872136,1.753427 3.409308,3.3552722 0.187297,0.55852 0.220531,0.852112 0.183997,1.625447 l -0.04459,0.943808 -5.426824,10.539187 -5.426824,10.539187 0.254171,0.524337 c 0.139793,0.288386 2.585319,5.337758 5.434502,11.220826 l 5.180334,10.696488 v 1.161613 c 0,1.156161 -0.0021,1.165845 -0.446992,2.063516 -0.705222,1.422941 -1.855369,2.345067 -3.428923,2.749127 -0.66323,0.170306 -1.618626,0.192346 -2.31127,0.05332 z"
              style="fill:#ffffff"/>
          </svg>
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
  name: 'PurpleBlock',
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
    ...mapGetters(['purpleBoxes']),
    tickableIndex: function() {
      return this.purpleBoxes.findIndex(box => !box.value);
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
        color: 'purple',
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
  .purple-block {
    display: inline-block;
    padding: 8px 8px 24px;
    margin-bottom: 8px;
    min-width: 708px;
    background-color: $purple;
    .purple-block-container {
      display: inline-block;
      vertical-align: middle;
      height: 60px;
      border-radius: 10px;
      padding: 4px;
      background-color: $purple-dark;
      .tick-box-container {
        position: relative;
        display: inline-block;
        vertical-align: top;
        .lower-than {
          position: absolute;
          top: 50%;
          left: -4px;
          transform: translate(-50%, -50%);
          z-index: 10;
          width: 18px;
        }
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
        background-color: $purple-light;
        color: $purple;
      }
    }
  }
</style>
