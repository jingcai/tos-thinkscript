# TS_ChoppinessIndex
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 16 Nov 2010


declare lower;

input period = 14;

plot CI = 100 * LOG( SUM(AverageTrueRange(1), period) / ( highest(high,period) - lowest(low,period) ) ) / LOG(period);
CI.assignValueColor(if CI>50 then color.green else color.red);
CI.setLineWeight(2);

plot highLine = 61.8;
highLine.setdefaultcolor(color.gray);

plot midLine = 50;
midLine.setdefaultcolor(color.white);

plot lowLine = 38.2;
lowLine.setdefaultcolor(color.gray);