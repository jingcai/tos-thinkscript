# BetterVolumeCustomColors
# Adapted from the BetterVolume Indicator:
# http://emini-watch.com/free-stuff/volume-indicator/
# By
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 18 SEP 2010


#hint priceBarColor: Select coloring of price bars.
#hint showVolumeBars: Select coloring volume bars.
#hint tolerance: Factor determines threshold for identification as a Better Volume colored bar. (e.g. 0.10 means a bar can be considered low volume if it is within 10% of the lowest volume bar)

declare on_volume;
declare real_size;
declare upper;

input movingAveragePeriod = 100;
input lookBackPeriod = 20;
input showLegend = YES;
input priceBarColor = {default NONE, BV_SPECIAL, BV_ALL};
input showVolumeBars = YES;
input tolerance = 0.10;

def range = (high - low);
def value1 = volume;
def value2 = volume * range;
def value3 = if(range <> 0 , volume / range, 0); 
def value4 = Average(value1, movingAveragePeriod);

def Condition1 = (value1 <= Lowest(value1, lookBackperiod)*(1.0+tolerance));
def Condition2 = (value2 >= Highest(value2, lookBackPeriod)*(1.0-tolerance));
def Condition3 = (value3 <= Lowest(value3, lookBackPeriod)*(1.0+tolerance));
def Condition4 = (value3 >= Highest(value3, lookBackPeriod)*(1.0-tolerance));

plot betterVolume = if showVolumeBars then value1 else double.nan;
plot averageVolume = if showVolumeBars then value4 else double.NaN;

averageVolume.SetDefaultColor(color.red);

betterVolume.SetPaintingStrategy(paintingstrategy.histogram);
betterVolume.SetLineWeight(5);

betterVolume.DefineColor("lowVolumeColor", color.yellow);
betterVolume.DefineColor("climaxUpColor", color.cyan);
betterVolume.DefineColor("climaxDownColor", color.white);
betterVolume.DefineColor("churnColor", color.violet);
betterVolume.DefineColor("climaxChurnColor", color.magenta);
betterVolume.DefineColor("defaultColor", color.dark_gray);

betterVolume.AssignValueColor(
if Condition4 and ((Condition2 and close > open ) or ((Condition2 or Condition3) and close < open)) 
    then betterVolume.color("climaxChurnColor") 
else if Condition4 
    then betterVolume.color("churnColor") 
elseif ((Condition3 or Condition2) and close < open) 
    then betterVolume.color("climaxDownColor") 
elseif Condition2 and close > open 
    then betterVolume.color("climaxUpColor") 
else if Condition1 
    then betterVolume.color("lowVolumeColor") 
else betterVolume.color("defaultColor"));

assignPriceColor(if priceBarColor==priceBarColor.BV_ALL then if Condition4 and ((Condition2 and close > open ) or ((Condition2 or Condition3) and close < open)) 
    then betterVolume.color("climaxChurnColor") 
else if Condition4 
    then betterVolume.color("churnColor") 
elseif ((Condition3 or Condition2) and close < open) 
    then betterVolume.color("climaxDownColor") 
elseif Condition2 and close > open 
    then betterVolume.color("climaxUpColor") 
else if Condition1 
    then betterVolume.color("lowVolumeColor") 
else betterVolume.color("defaultColor") else if priceBarColor==priceBarColor.BV_SPECIAL then if Condition4 and ((Condition2 and close > open ) or ((Condition2 or Condition3) and close < open)) 
    then betterVolume.color("climaxChurnColor") 
else if Condition4 
    then betterVolume.color("churnColor") 
elseif ((Condition3 or Condition2) and close < open) 
    then betterVolume.color("climaxDownColor") 
elseif Condition2 and close > open 
    then betterVolume.color("climaxUpColor") 
else if Condition1 
    then betterVolume.color("lowVolumeColor") 
else color.current else color.current);

addChartLabel(showLegend, "Low Volume",betterVolume.color("lowVolumeColor"));
addChartLabel(showLegend, "Climax Up",betterVolume.color("climaxUpColor"));
addChartLabel(showLegend, "Climax Down",betterVolume.color("climaxDownColor"));
addChartLabel(showLegend, "Churn",betterVolume.color("churnColor"));
addChartLabel(showLegend, "Climax Churn",betterVolume.color("climaxChurnColor"));