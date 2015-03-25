# TIKI
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 25 Jan 2009

declare lower;

def highExtreme = 26;
def LowExtreme = -26;
input emaPeriod = 10;

plot h = high("$TIKI");
h.setPaintingStrategy(paintingStrategy.HISTOGRAM);
h.setDefaultColor(color.green);

plot l = low("$TIKI");
l.setDefaultColor(color.red);
l.setPaintingStrategy(paintingStrategy.HISTOGRAM);

plot zero = 0;
zero.setDefaultColor(color.white);

plot extH=highExtreme;
extH.setDefaultColor(color.red);

plot extL=LowExtreme;
extL.setDefaultColor(color.green);

plot c = close("$TIKI");
c.setStyle(curve.POINTS);
c.setDefaultColor(color.white);

plot ave = expAverage((h+l+c)/3,emaPeriod);
ave.setDefaultColor(color.white);
ave.setLineWeight(2);

plot extremeH = if(h>=highExtreme, h, double.nan);
def extremeHColor = if(h==30, 0,if(h>=28,8,  1));
extremeH.assignValueColor(getColor(extremeHColor));;
extremeH.setStyle(curve.POINTS);
extremeH.setpaintingStrategy(paintingStrategy.LINE_VS_TRIANGLES);

plot extremeL = if(l<=lowExtreme, l, double.nan);
def extremeLColor = if(l==-30, 0,if(l<=-28,8,  1));
extremeL.assignValueColor(getColor(extremeLColor));;
extremeL.setStyle(curve.POINTS);
extremeL.setpaintingStrategy(paintingStrategy.LINE_VS_TRIANGLES);