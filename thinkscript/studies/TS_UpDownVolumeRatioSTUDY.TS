# UPDOWNVOLUMERATIO
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 10 Jul 2009

declare lower;

input period = 10;
input smoothingPeriod = 3;
input priceChangeWeighted = NO;
input upper_threshold = 80.0;
input lowerThreshold = 20.0;
def delta = absValue(close-close[1]);
def multiplier = if(priceChangeWeighted, delta,1);

plot maxLine = upper_threshold;
plot minLine = lowerThreshold;
maxLine.setDefaultColor(color.BLUE);
maxLine.setLineWeight(2);
minLine.setDefaultColor(color.BLUE);
minLine.setLineWeight(2);
plot midLine = 50.0;
midLine.setDefaultColor(color.WHITE);
midLine.setLineWeight(2);

DEF up = if(close>close[1], volume*multiplier, 0);
DEF down = if(close<close[1], volume*multiplier, 0);
DEF upvol = sum(up, period);
DEF downvol = sum(down, period);

DEF ratio = (100.0*(upvol/(downvol+upvol)));
DEF UPDVR = HullMovingAvg(ratio,smoothingPeriod); 


DEF plotData = UPDVR;
plot VolumeRatio = UPDVR;
VolumeRatio.defineColor("ExtremeUp", color.red);
VolumeRatio.defineColor("ExtremeDown", color.green);
VolumeRatio.defineColor("Midrange", color.cyan);
VolumeRatio.AssignValueColor(if UPDVR>=upper_threshold then VolumeRatio.color("ExtremeUp") else if UPDVR<lowerThreshold then VolumeRatio.color("ExtremeDown") else VolumeRatio.color("Midrange"));
VolumeRatio.setLineWeight(1);
VolumeRatio.setPaintingStrategy(paintingStrategy.HISTOGRAM);

plot VolumeRatioLine = UPDVR;
VolumeRatioLine.defineColor("ExtremeUp", color.red);
VolumeRatioLine.defineColor("ExtremeDown", color.green);
VolumeRatioLine.defineColor("Midrange", color.white);
VolumeRatioLine.AssignValueColor(if UPDVR>=upper_threshold then VolumeRatioLine.color("ExtremeUp") else if UPDVR<lowerThreshold then VolumeRatioLine.color("ExtremeDown") else VolumeRatioLine.color("Midrange"));
VolumeRatioLine.setLineWeight(1);
