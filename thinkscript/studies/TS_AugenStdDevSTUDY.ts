# AUGENSTDDEVPLOT
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 14 Feb 2009

declare lower;
input price = close;

input length = 20;
def oneSD = stdev (price,length);

plot StdDevPlot = (price-price[1])/oneSD;
StdDevPlot.setPaintingStrategy(paintingStrategy.HISTOGRAM);
StdDevPlot.setLineWeight(2);
StdDevPlot.assignValueColor(if StdDevPlot > 0 then color.green else color.red);
plot zero = 0;
zero.setDefaultColor(color.white);