# TS_VolumeTrend
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 16 Dec 2009

declare fullrange;
declare on_volume;
declare real_size;

input period = 50;

plot VolTrend = InertiaAll(volume, period);
def volumeSlope = if voltrend>voltrend[1] then 1 else 0;
VolTrend.assignValueColor(if voltrend>voltrend[1] then color.green else color.red);
VolTrend.setLineWeight(2);


