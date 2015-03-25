# TS_VixStretch
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 22 JAN 2010

declare lower;

input threshold = 5.0;

plot zero = 0;
zero.setDefaultColor(color.white);
plot fivePercent = threshold;
fivePercent.setDefaultColor(color.dark_gray);
plot negFivePercent = -threshold;
negFivePercent.setDefaultColor(color.dark_gray);

def SMA = average(close,200);
def VIX = close("VIX");
def VIXSMA = Average(VIX, 10);
plot stretch = -((VIX-VIXSMA)/VIXSMA)*100.0;
stretch.setDefaultColor(color.magenta);

plot signal = if (stretch<-threshold and stretch[1]<-threshold and stretch[2]<-threshold and close>SMA) or (stretch>threshold and stretch[1]>threshold and stretch[2]>threshold and close<SMA) then stretch else double.nan;
signal.setStyle(curve.POINTS);
signal.assignValueColor(if stretch <-threshold then color.green else color.red);
signal.setLineWeight(1);

