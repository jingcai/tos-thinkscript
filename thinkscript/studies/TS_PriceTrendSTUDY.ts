# TS_PriceTrend
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 16 Dec 2009

declare fullrange;

input price = close;
input period = 50;
def offset = 100;

def linearPriceTrend = InertiaAll(close, period);
def priceSlope =  if linearPriceTrend>linearPriceTrend[1] then 1 else 0;
def dist = HighestAll(AbsValue(linearPriceTrend - price)) * (offset / 100.0);


def VolTrend = InertiaAll(volume, period);
def volumeSlope = if voltrend>voltrend[1] then 1 else 0;

plot PriceTrend = if priceSlope==0 then linearPriceTrend-dist else if priceSlope==1 then linearPriceTrend+dist else linearPriceTrend; 
PriceTrend.assignValueColor(if volumeSlope != priceSlope then color.blue else color.white);
PriceTrend.setLineWeight(2);
