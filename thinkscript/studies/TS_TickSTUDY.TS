# TICK
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 24 Jan 2008

declare lower;

input highExtreme = 1000;
input LowExtreme = -1000;
input emaPeriod = 10;

plot h = high("$TICK");
h.setPaintingStrategy(paintingStrategy.HISTOGRAM);
h.setDefaultColor(color.green);

plot l = low("$TICK");
l.setDefaultColor(color.red);
l.setPaintingStrategy(paintingStrategy.HISTOGRAM);

plot zero = 0;
zero.setDefaultColor(color.white);

plot midH = 600;
midH.setDefaultColor(color.green);

plot midL = -600;
midL.setDefaultColor(color.red);

plot extH=highExtreme;
extH.setDefaultColor(color.red);

plot extL=LowExtreme;
extL.setDefaultColor(color.green);

plot c = close("$TICK");
c.setStyle(curve.POINTS);
c.setDefaultColor(color.white);

plot ave = expAverage((h+l+c)/3,emaPeriod);
ave.setDefaultColor(color.white);
ave.setLineWeight(2);

plot extreme = if(h>highExtreme, h, if(l<lowExtreme, l, double.nan));
extreme.setDefaultColor(color.yellow);
extreme.setStyle(curve.POINTS);
extreme.setpaintingStrategy(paintingStrategy.LINE_VS_TRIANGLES);