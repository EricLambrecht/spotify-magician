<template>
  <div v-if="audioFeatureData.length > 0" class="section">
    <b-headline class="headline">
      {{ featureName | caption }}
    </b-headline>
    <la-cartesian
      :data="audioFeatureData"
      :bound="bounds"
      :height="100"
      :width="width"
      :padding="0"
      class="chart"
    >
      <la-line
        :width="1.5"
        :animation-duration="1"
        prop="data"
        :label="featureName | caption"
        color="#1DB954"
        animated
        curve
      >
        <g v-show="props.actived" slot-scope="props" :fill="props.color">
          <circle :cx="props.x" :cy="props.y" r="4" />
        </g>
      </la-line>
      <la-x-axis prop="name" class="x-axis" />
      <la-tooltip>
        <!-- FIXME: slot-scope will be deprecated in Vue 3 -->
        <div slot-scope="props" class="tooltip">
          <span class="song-name">
            {{ props.label }}
          </span>
          <div v-if="props.actived[0]" class="feature-value">
            <span
              class="colored-circle"
              :style="{ background: props.actived[0].color }"
            />
            <span class="formatted-value">
              {{ props.actived[0].value | formatValue(bounds, featureName) }}
            </span>
            <span class="formatted-value-label">
              &nbsp;{{ props.actived[0].label }}
            </span>
          </div>
        </div>
      </la-tooltip>
    </la-cartesian>
    <div class="chart-bottom">
      <b-text class="start">
        Start
      </b-text>
      <b-text class="end">
        End
      </b-text>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Cartesian, Line, Tooltip, XAxis } from 'laue'

import {
  getCaptionForFeatureName,
  getBoundsForLineChartFeature,
} from '../../store/playlist-statistics/supportedAudioFeatures'

export default {
  name: 'AudioFeatureGraph',
  components: {
    LaCartesian: Cartesian,
    LaLine: Line,
    LaTooltip: Tooltip,
    LaXAxis: XAxis,
  },
  filters: {
    caption(featureName) {
      return getCaptionForFeatureName(featureName)
    },
    formatValue(val, bounds, featureName) {
      if (bounds[0] === 0 && bounds[1] === 1) {
        return `${Math.round(val * 100)}%`
      }

      if (featureName === 'tempo') {
        return `${Math.round(val)} BPM`
      }

      if (featureName === 'loudness') {
        return `${val.toFixed(2)} dB`
      }

      return val
    },
  },
  props: {
    featureName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('playlistStatistics', ['getAudioFeatureWithName']),
    ...mapGetters('app', ['appWidth']),
    audioFeatureData() {
      return this.getAudioFeatureWithName(this.featureName)
    },
    bounds() {
      return getBoundsForLineChartFeature(this.featureName)
    },
    width() {
      const padding = 40
      const maxWidth = 300
      const maximumAvailableSpace = this.appWidth - 2 * padding
      return Math.min(maximumAvailableSpace, maxWidth)
    },
  },
}
</script>

<style lang="scss" scoped>
span.headline {
  color: #cccccc;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 15px;
}
.chart {
  margin: 15px 1px 10px;
  border-left: 2px dashed var(--color-default-light);
  border-right: 2px dashed var(--color-default-light);
}
.chart-bottom {
  display: flex;
  font-size: 13px;
  color: var(--color-grey);
}
.x-axis {
  display: none;
}
.end {
  margin-left: auto;
}

.tooltip {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  padding: 5px;
  color: white;
}

.song-name {
  display: block;
  margin-bottom: 7px;
}

.feature-value {
  display: flex;
  align-items: center;
}

.colored-circle {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-right: 8px;
}

.formatted-value {
  font-weight: bold;
}
</style>
