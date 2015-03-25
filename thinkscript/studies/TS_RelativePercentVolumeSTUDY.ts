# TS_RelativePercentVolume
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 26 JUL 2009

##### DO NOT USE ON TICK CHARTS #####

declare lower;

# Use the number of hours from market open to market open the following 
# session (6.5 for stocks, 6.75 for index futures etc)
input hoursPerCycle = 6.75;
# Must select YES for /ES, /NQ etc since and extra bar appears on hourly charts
input indexFuture = YES;
input averagePeriod = 10;
input threshold = 25.0;

rec cycle = compoundValue(1, if getDay() != getDay()[1] then cycle[1]+1 else cycle[1],1);
def barLength = getAggregationPeriod()/60000;

def barsPerCycleV = round100(hoursPerCycle*60/barLength);
def barsPerCycleR = round100((hoursPerCycle*60/barLength)/100)*100;
def barsPerCycle = if barsPerCycleV > barsperCycleR then barsPerCycleR+1 else barsPerCycleR;

# This 'kludge' is in here since index futures plotted on a one hour chart add an extra bar
# Not elegant but it works until something hits me :)
def kludge = if indexFuture and barsPerCycle==7 then 1 else 0;

rec aggVolume = volume + aggVolume[barsPerCycle+kludge];
def aveVolume = aggVolume/(cycle+1);

plot percentDiff = ((volume/aveVolume))*100.0;
percentDiff.setpaintingStrategy(paintingStrategy.HISTOGRAM);
percentDiff.setLineWeight(3);
percentDiff.assignValueColor(if percentDiff < 100-threshold then color.red else if percentDiff > 100+threshold then color.green else color.white);

plot zero = 100;
zero.setDefaultColor(color.white);
zero.setStyle(curve.SHORT_DASH);

plot highMark = 200;
highMark.setDefaultColor(color.dark_gray);

plot lowMark = 0;
lowMark.setDefaultColor(color.dark_gray);

plot ave = average(percentDiff,averagePeriod);
ave.setDefaultColor(color.yellow);





