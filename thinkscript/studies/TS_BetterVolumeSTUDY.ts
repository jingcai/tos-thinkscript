# BetterVolume
# Adapted from the BetterVolume Indicator:
# http://emini-watch.com/free-stuff/volume-indicator/
# By
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 19 APR 2009

declare on_volume;
declare real_size;

input movingAveragePeriod = 100;
input lookBackPeriod = 20;
def currentColor = 1; # cyan
def lowVolumeColor = 8; # yellow
def climaxUpColor = 5; # red
def churnColor = 6; # green
def climaxChurnColor = 0; # magenta
def climaxDownColor = 9; # white
def aveColor = 5; # red


def range = (high-low);
def value1 = volume;
def value2 = volume*range;
def value3 = if(range<>0 ,volume/range, 0); 
def value4 = Average(value1,movingAveragePeriod);

def Condition1 = (value1 == Lowest(value1, lookBackperiod));
def Condition2 = (value2 == Highest(value2, lookBackPeriod));
def Condition3 = (value3 == Lowest(value3, lookBackPeriod));
def Condition4 = (value3 == Highest(value3, lookBackPeriod));

plot betterVolume = value1;
plot averageVolume = value4;
averageVolume.setDefaultColor(color.red);

betterVolume.SetPaintingStrategy(paintingstrategy.histogram);
betterVolume.SetDefaultColor(color.CYAN);
betterVolume.SetLineWeight(5);

DEF temp1 =  if(Condition1, lowVolumeColor, currentColor);
betterVolume.AssignValueColor(getColor(temp1));

DEF temp2 = if(Condition2 and close>open, climaxUpColor, temp1);
betterVolume.AssignValueColor(getColor(temp2));

Def temp2a = if(((Condition3 or Condition2) and close<open),climaxDownColor, temp2);
betterVolume.AssignValueColor(getColor(temp2a));

DEF temp3 = if(Condition4, churnColor, temp2a);
betterVolume.AssignValueColor(getColor(temp3));

DEF temp4 = if(Condition4 and ((Condition2 and close>open ) or ((Condition2 or Condition3) and close < open)), climaxChurnColor, temp3);
betterVolume.AssignValueColor(getColor(temp4));
