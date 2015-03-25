# TS_TDPressureRatio
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 13 Aug 09

declare lower;
input periods = 5;

def buyingPressure = if (open-close[1])/close[1]>0.15 then (high-close[1]+close-low)*volume else if close>open then (close-open)*volume else 0;
def sellingPressure = if (close[1]-open)/open>0.15 then (close[1]-low+high-close)*volume else if close<open then (close-open)*volume else 0;

def TDPR = 100*sum(buyingPressure,periods)/(sum(buyingPressure,periods)-sum(sellingPressure,periods));

plot TDPressureRatio = if TDPR>100 then 100 else if TDPR< 0 then 0 else TDPR;
TDPressureRatio.setDefaultColor(color.white);
plot low = 25;
low.setDefaultColor(color.green);
plot mid = 50;
mid.setDefaultColor(color.white);
mid.setStyle(curve.SHORT_DASH);
plot high = 75;
high.setDefaultColor(color.red);
