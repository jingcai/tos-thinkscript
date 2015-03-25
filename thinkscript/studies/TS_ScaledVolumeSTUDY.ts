# TS_ScaledVolume
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 12 Dec 2009

declare on_volume;
declare upper;

input lowerVolumeLimit = 20000;
input upperVolumeLimit = 55000;

plot scaledVolume = upperVolumeLimit*(1-(upperVolumeLimit-min(max(volume, lowerVolumeLimit),upperVolumeLimit))/(upperVolumeLimit-lowerVolumeLimit));
scaledVolume.setPaintingStrategy(paintingStrategy.HISTOGRAM);
scaledVolume.setLineWeight(3);