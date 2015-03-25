# TS_VolumetricTrendline
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 16 Aug 2009

declare fullrange;

input period = 55;

def vwap = TotalSum(Volume * Close) / TotalSum(Volume);
plot VolTrend = InertiaAll(vwap, period);
VolTrend.assignValueColor(if voltrend>voltrend[1] then color.green else color.red);