# TS_PreviousSessionHLC
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 16 May 2010

plot h = high(period="day")[1];
plot l = low(period="day")[1];
plot c = close(period="day")[1];

h.setdefaultColor(color.green);
l.setDefaultColor(color.red);
c.setDefaultColor(color.white);

h.setLineWeight(2);
l.setLineWeight(2);
c.setLineWeight(2);

h.setpaintingStrategy(paintingStrategy.DASHES);
l.setpaintingStrategy(paintingStrategy.DASHES);
c.setpaintingStrategy(paintingStrategy.DASHES);

