<template>
  <div class="yellow-block">
    <div class="yellow-block-container">
      <template
        v-for="(box, index) in yellowBoxes">
        <div
          :key="index"
          class="tick-box-container">
          <TickBox
            :label="box.label"
            type="tick"
            :value="box.value"
            @clicked="onClicked(index)"/>
        </div>
      </template>
    </div>
    <div class="horizontal-bonuses-container">
      <template v-for="(bonus, index) in yellowBoxesHorizontalBonuses">
        <div 
          :key="index"
          class="horizontal-bonus">
          <BadgeSquare
            v-if="bonus.type !== 'fox'"
            :obj="bonus"
            :highlighted="bonus.highlighted"/>
          <BadgeFox
            v-if="bonus.type === 'fox'"
            :highlighted="bonus.highlighted"/>
        </div>
      </template>
    </div>
    <div class="vertical-bonuses-container">
      <template v-for="(bonus, index) in yellowBoxesVerticalBonuses">
        <div 
          :key="index"
          class="vertical-bonus">
          <BadgeStar
            :label="bonus.score.toString()"
            :highlighted="bonus.highlighted"
            color="yellow"/>
        </div>
      </template>
    </div>
    <div class="diagonal-bonus-container">
      <BadgeSquare
        v-for="(bonus, index) in yellowBoxesDiagonalBonuses"
        :key="index"
        :obj="bonus"
        :highlighted="bonus.highlighted"/>
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
  name: 'YellowBlock',
  components: {
    TickBox,
    BadgeStar,
    BadgeSquare,
    BadgeFox
  },
  computed: {
    ...mapGetters(['yellowBoxes',
    'yellowBoxesHorizontalBonuses',
    'yellowBoxesVerticalBonuses',
    'yellowBoxesDiagonalBonuses']),
  },
  methods: {
    onClicked(index) {
      this.$store.dispatch('tickBox', {
        color: 'yellow',
        index,
        value: true
      });  
    }
  }
}
</script>


<style lang="scss">
  @import '@/global.scss';

  .yellow-block {
    display: inline-block;
    padding: 8px; // 56px 8px 24px;
    margin-bottom: 4px;
    width: 50%;
    background-color: $yellow;
    text-align: left;
  }
  .yellow-block-container {
    display: inline-block;
    vertical-align: top;
    width: 274px;
    height: 274px;
    border-radius: 10px;
    padding: 4px;
    background-color: $yellow-dark;
    .tick-box-container {
      position: relative;
      display: inline-block;
      vertical-align: top;
      padding: 4px;
      .tick-box {
        background-color: $yellow-light;
        color: $yellow;
      }
      &:nth-of-type(4) {
        clear: both;
      }
    }
  }
  .horizontal-bonuses-container {
    display: inline-block;
    vertical-align: top;
    margin-left: 4px;
    padding: 4px;
    border-radius: 10px;
    width: 60px;
    height: 274px;
    // background-color: $yellow-dark;
    .horizontal-bonus {
      padding: 8px 4px;
      .badge-square,
      .badge-fox {
        width: 48px;
        height: 48px;
        .badge-square-content span {
          font-size: 32px;
        }
      }
    }
  }
  .vertical-bonuses-container {
    display: inline-block;
    vertical-align: top;
    margin-left: 4px;
    padding: 4px;
    border-radius: 10px;
    width: 274px;
    height: 60px;
    // background-color: $yellow-dark;
    .vertical-bonus {
      display: inline-block;
      vertical-align: top;
      padding: 4px 7px;
      .badge-star {
        display: inline-block;
        vertical-align: top;
        width: 52px;
        height: 52px;
      }
    }
  }
  .diagonal-bonus-container {
    display: inline-block;
    vertical-align: top;
    margin-left: 4px;
    padding: 8px 4px 4px;
    border-radius: 10px;
    width: 60px;
    height: 60px;
    .badge-square {
      width: 48px;
      height: 48px;
      .badge-square-content span {
        font-size: 32px;
      }
    }
  }
</style>
