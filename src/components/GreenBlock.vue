<template>
  <div class="green-block">
    <div class="green-block-container">
      <template
        v-for="(box, index) in greenBoxes">
        <div
          :key="index"
          class="tick-box-container">
          <BadgeStar
            :label="box.score.toString()"
            :highlighted="box.value"
            color="green"
            class="tick-box-above"/>
          <TickBox
            :label="box.label"
            type="tick"
            :value="box.value"
            @clicked="onClicked(index)"/>
          <template v-if="box.bonus">
            <BadgeSquare
              v-if="box.bonus.type !== 'fox'"
              :obj="box.bonus"
              :highlighted="box.value"
              class="tick-box-below"/>
            <BadgeFox
              v-if="box.bonus.type === 'fox'"
              :highlighted="box.value"
              class="tick-box-below"/>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TickBox from '@/components/TickBox';
import BadgeStar from '@/components/svg/BadgeStar';
import BadgeSquare from '@/components/svg/BadgeSquare';
import BadgeFox from '@/components/svg/BadgeFox';

export default {
  name: 'GreenBlock',
  components: {
    TickBox,
    BadgeStar,
    BadgeSquare,
    BadgeFox
  },
  data: function() {
    return {};
  },
  computed: {
    ...mapGetters(['greenBoxes']),
    tickableIndex: function() {
      return this.greenBoxes.findIndex(box => !box.value);
    }
  },
  methods: {
    onClicked: function(index) {
      if (index === this.tickableIndex) {
        this.$store.dispatch('tickBox', {
          color: 'green',
          index,
          value: true
        });  
      }
    }
  }
}
</script>

<style lang="scss">
  @import '@/global.scss';
  .green-block {
    display: inline-block;
    padding: 56px 8px 24px;
    margin-bottom: 4px;
    min-width: 708px;
    background-color: $green;
    .green-block-container {
      display: inline-block;
      vertical-align: middle;
      height: 60px;
      border-radius: 10px;
      padding: 4px;
      background-color: $green-dark;
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
        background-color: $green-light;
        color: $green;
      }
    }
  }
</style>
