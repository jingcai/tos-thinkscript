# TS_CHART_VWAP_SD_BANDS
# http://www.thinkscripter.com 
# thinkscripter@gmail.com
# Last Update 03 APR 2010

input VWAPStdev1 = 1.0;
input VWAPStdev2 = 2.0;
input VWAPStdev3 = 3.0;

plot VWAP = TotalSum(((high+low+close)/3)*volume) / TotalSum(volume);
def vwapSD = sqrt(TotalSum(Sqr(((high+low+close)/3)-VWAP)*volume)/TotalSum(volume));
VWAP.SetDefaultColor(color.magenta);
VWAP.SetStyle(curve.SHORT_DASH);
VWAP.SetLineWeight(3);

plot r1 = VWAP+VWAPStdev1*vwapSD;
plot s1 = VWAP-vwapStdev1*vwapSD;
plot r2 = VWAP+VWAPStdev2*vwapSD;
plot s2 = VWAP-VWAPStdev2*vwapSD;
plot r3 = VWAP+VWAPStdev3*vwapSD;
plot s3 = VWAP-VWAPStdev3*vwapSD;

r1.setDefaultColor(color.orange);
r2.setDefaultColor(color.pink);
r3.setDefaultColor(color.cyan);
s1.setDefaultColor(color.orange);
s2.setDefaultColor(color.pink);
s3.setDefaultColor(color.cyan);

r1.SetStyle(curve.SHORT_DASH);
r2.SetStyle(curve.SHORT_DASH);
r3.SetStyle(curve.SHORT_DASH);
s1.SetStyle(curve.SHORT_DASH);
s2.SetStyle(curve.SHORT_DASH);
s3.SetStyle(curve.SHORT_DASH);


VWAP.hideBubble();
r1.hideBubble();
r2.hideBubble();
r3.hideBubble();
s1.hideBubble();
s2.hideBubble();
s3.hideBubble();

