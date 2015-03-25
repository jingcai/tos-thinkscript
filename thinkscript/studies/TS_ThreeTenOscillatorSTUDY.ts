# THREE TEN OSCILLATOR
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 06 APR 2009

declare lower;

input price = close;

def SMA3 = average(price, 3);
def SMA10 = average(price, 10);

def osc = SMA3-SMA10; 
def ave = average(osc, 16);

plot deltaHistogram = osc-ave;
deltaHistogram.setPaintingStrategy(paintingStrategy.HISTOGRAM);
deltaHistogram.assignValueColor(if deltaHistogram > 0 then color.green else color.red);
deltaHistogram.hide();

plot osc310 = osc;
osc310.setDefaultColor(color.red);

plot ave16 = ave;
ave16.setDefaultColor(color.cyan);

plot zero = 0;
zero.setDefaultColor(color.white);
