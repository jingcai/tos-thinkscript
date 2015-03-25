# TS_RelativeVigorIndex
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 02 Mar 2010

declare lower;

input smoothingPeriod = 10;

def value1 = ((close-open)+2*(close[1]-open[1])+2*(close[2]-open[2])+(close[3]-open[3]))/6;

def value2 = ((high-low)+2*(high[1]-low[1])+2*(high[2]-low[2])+(high[3]-low[3]))/6;

def numerator = sum(value1, smoothingPeriod);
def denominator = sum(value2,smoothingPeriod);

plot zero = 0;
zero.setDefaultColor(color.gray);

plot RVI = numerator/denominator;
RVI.setDefaultColor(color.cyan);
RVI.SetLineWeight(2);

plot RVISignal = (RVI+2*RVI[1]+2*RVI[2]+RVI[3])/6;
RVISignal.setDefaultColor(color.yellow);




