# TS_CCT_BB
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 27 Nov 2010

declare lower;

plot CCT_BB = (close+2*stdev(close,21)-Average(close,21))/(4*stdev(close,21))*100;
CCT_BB.setDefaultColor(color.white);

plot zero = 0;
zero.setDefaultColor(color.red);

plot onehundred = 100;
onehundred.setDefaultColor(color.red);
