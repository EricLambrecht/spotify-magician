import upperFirst from 'lodash/upperFirst';

export const lineChartFeatures = [
  'acousticness',
  'energy',
  'danceability',
  'instrumentalness',
  'liveness',
  'loudness',
  'speechiness',
  'tempo',
  'valence',
];

export const getBoundsForLineChartFeature = (featureKey) => {
  switch (featureKey) {
    case 'tempo':
      return [45, 210];
    case 'loudness':
      return [-40, 0];
    default:
      return [0, 1];
  }
};

export const musicalFeatures = [
  'mode',
  'tempo',
  'time_signature',
];

export const getCaptionForFeatureName = (featureKey) => {
  if (featureKey === 'valence') {
    return 'Positiveness';
  }
  return upperFirst(featureKey);
};

export const getCaptionAndNameForFeature = featureKey => ({
  caption: getCaptionForFeatureName(featureKey),
  name: featureKey,
});

export const sortableAudioFeatures = [
  ...lineChartFeatures,
  'mode',
  'time_signature',
];
