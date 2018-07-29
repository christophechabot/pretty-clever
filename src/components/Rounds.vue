<template>
  <div id="rounds-row">
    <div
      v-for="(round, index) in rounds"
      :key="index"
      class="rounds-block">
      <TickBox
        :label="(index + 1).toString()"
        type="tick"
        :value="round.value"
        @clicked="onClicked(index)"/>

      <div class="rounds-block-bonuses">
        <BadgeSquare
          v-if="index === 0 || index === 2"
          :obj="rerollBadgeObj"
          :highlighted="false"/>

        <BadgeSquare
          v-if="index === 1"
          :obj="plusOneBadgeObj"
          :highlighted="false"/>

        <span
          class="double-bonuses"
          v-if="index === 3">
          <BadgeSquare
            :obj="tickBadgeObj"
            :highlighted="false"/>
          <span class="delimiter"></span>
          <BadgeSquare
            :obj="sixBadgeObj"
            :highlighted="false"/>
        </span>

        <span
          class="bonuses-5"
          v-if="index === 4">
          <svg class="player" viewBox="0 0 466.146 466.146">
            <path d="M289.285,191.86c28.844-18.539,47.995-50.83,47.995-87.654C337.28,46.659,290.621,0,233.088,0c-57.559,0-104.207,46.659-104.207,104.207c0,36.824,19.151,69.121,47.996,87.654c-67.959,6.082-121.422,63.331-121.422,132.854v108.155l0.274,1.69l7.457,2.328c70.196,21.929,131.195,29.259,181.401,29.259c98.048,0,154.886-27.97,158.408-29.743l6.963-3.534h0.732V324.714C410.698,255.197,357.253,197.957,289.285,191.86z" fill="#FFFFFF"/>
          </svg>
          <svg class="player" viewBox="0 0 466.146 466.146">
            <path d="M289.285,191.86c28.844-18.539,47.995-50.83,47.995-87.654C337.28,46.659,290.621,0,233.088,0c-57.559,0-104.207,46.659-104.207,104.207c0,36.824,19.151,69.121,47.996,87.654c-67.959,6.082-121.422,63.331-121.422,132.854v108.155l0.274,1.69l7.457,2.328c70.196,21.929,131.195,29.259,181.401,29.259c98.048,0,154.886-27.97,158.408-29.743l6.963-3.534h0.732V324.714C410.698,255.197,357.253,197.957,289.285,191.86z" fill="#FFFFFF"/>
          </svg>
          <svg class="player" viewBox="0 0 466.146 466.146">
            <path d="M289.285,191.86c28.844-18.539,47.995-50.83,47.995-87.654C337.28,46.659,290.621,0,233.088,0c-57.559,0-104.207,46.659-104.207,104.207c0,36.824,19.151,69.121,47.996,87.654c-67.959,6.082-121.422,63.331-121.422,132.854v108.155l0.274,1.69l7.457,2.328c70.196,21.929,131.195,29.259,181.401,29.259c98.048,0,154.886-27.97,158.408-29.743l6.963-3.534h0.732V324.714C410.698,255.197,357.253,197.957,289.285,191.86z" fill="#FFFFFF"/>
          </svg>
        </span>

        <span
          class="bonuses-6"
          v-if="index === 5">
          <svg class="player" viewBox="0 0 466.146 466.146">
            <path d="M289.285,191.86c28.844-18.539,47.995-50.83,47.995-87.654C337.28,46.659,290.621,0,233.088,0c-57.559,0-104.207,46.659-104.207,104.207c0,36.824,19.151,69.121,47.996,87.654c-67.959,6.082-121.422,63.331-121.422,132.854v108.155l0.274,1.69l7.457,2.328c70.196,21.929,131.195,29.259,181.401,29.259c98.048,0,154.886-27.97,158.408-29.743l6.963-3.534h0.732V324.714C410.698,255.197,357.253,197.957,289.285,191.86z" fill="#FFFFFF"/>
          </svg>
          <span class="delimiter"></span>
          <svg class="player" viewBox="0 0 466.146 466.146">
            <path d="M289.285,191.86c28.844-18.539,47.995-50.83,47.995-87.654C337.28,46.659,290.621,0,233.088,0c-57.559,0-104.207,46.659-104.207,104.207c0,36.824,19.151,69.121,47.996,87.654c-67.959,6.082-121.422,63.331-121.422,132.854v108.155l0.274,1.69l7.457,2.328c70.196,21.929,131.195,29.259,181.401,29.259c98.048,0,154.886-27.97,158.408-29.743l6.963-3.534h0.732V324.714C410.698,255.197,357.253,197.957,289.285,191.86z" fill="#FFFFFF"/>
          </svg>
          <svg class="player" viewBox="0 0 466.146 466.146">
            <path d="M289.285,191.86c28.844-18.539,47.995-50.83,47.995-87.654C337.28,46.659,290.621,0,233.088,0c-57.559,0-104.207,46.659-104.207,104.207c0,36.824,19.151,69.121,47.996,87.654c-67.959,6.082-121.422,63.331-121.422,132.854v108.155l0.274,1.69l7.457,2.328c70.196,21.929,131.195,29.259,181.401,29.259c98.048,0,154.886-27.97,158.408-29.743l6.963-3.534h0.732V324.714C410.698,255.197,357.253,197.957,289.285,191.86z" fill="#FFFFFF"/>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TickBox from '@/components/TickBox';
import BadgeSquare from '@/components/svg/BadgeSquare';

export default {
  name: 'Rounds',
  data() {
    return {
      plusOneBadgeObj: {
        type: 'plusOne',
        color: 'black'
      },
      rerollBadgeObj: {
        type: 'reroll',
        color: 'black'
      },
      tickBadgeObj: {
        type: 'black',
        color: 'black',
        value: 'X'
      },
      sixBadgeObj: {
        type: 'black',
        color: 'black',
        value: 6
      }
    };
  },
  components: {
    TickBox,
    BadgeSquare
  },
  computed: {
    ...mapGetters(['rounds']),
    tickableIndex: function() {
      return this.rounds.findIndex(round => !round.value);
    }
  },
  methods: {
    onClicked: function(index) {
      if (index === this.tickableIndex) {
        this.$store.dispatch('tickRound', index);
      }
    }
  }
}
</script>

<style lang="scss">
  @import '@/global.scss';

  #rounds-row {
    background-color: $gray-light;
    padding: 16px 0;
    margin-bottom: 4px;
    .rounds-block {
      display: inline-block;
      vertical-align: middle;
      border: 1px solid $black;
      border-radius: 10px;
      background-color: $gray;
      padding: 4px 8px;
      &:not(:last-child) {
        margin-right: 8px;
      }
      .tick-box {
        display: block;
        border: 1px solid $black;
        background-color: $white;
        width: 64px;
        height: 64px;
      }
      .rounds-block-bonuses {
        display: block;
        text-align: center;
        padding: 4px 0;
        .double-bonuses {
          padding: 2px 0;
          display: inline-block;
          .badge-square {
            width: 24px;
            height: 24px;
            .badge-square-content span {
              font-size: 18px;
            }
          }
        }
        .bonuses-5 {
          padding: 8px 0;
          display: inline-block;
        }
        .bonuses-6 {
          padding: 2px 0;
          display: inline-block;
        }
        .delimiter {
          display: inline-block;
          vertical-align: middle;
          width: 1px;
          height: 32px;
          border-right: 3px solid $white;
          margin: 0 3px;
        }
        .badge-square {
          display: inline-block;
          vertical-align: middle;
        }
        svg.player {
          display: inline-block;
          vertical-align: middle;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
</style>
