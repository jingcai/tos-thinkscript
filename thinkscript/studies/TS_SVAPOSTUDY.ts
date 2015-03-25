# TS_ShortTermVolumeAndPriceOscillator
# (c) 2009 http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 20 SEP 2009

declare lower;

input period = 8;
input cutoff = 1.0;

input devH = 1.5; #Standard Deviation High
input devL = 1.3; #Standard Deviation Low 
input stdevper = 100; #Standard Deviation Period

rec haopen = compoundValue(1, ((open[1] + high[1] + low[1] + close[1]) / 4 + haopen[1]) / 2, hl2);
def haclose = ((open + high + low + close) / 4 + haopen + Max(high, haopen) + Min(low, haopen)) / 4;

def hac = 3 * ExpAverage(haclose, period / 1.6)
- 3 * ExpAverage(ExpAverage(haclose, period / 1.6), period / 1.6)
+ ExpAverage(ExpAverage(ExpAverage(haclose, period / 1.6), period / 1.6), period / 1.6);

def vave = Average(volume, period * 5)[1];
def vmax = vave * 2;
def vc = if(volume < vmax, volume, vmax);

def vtrendi = inertia(volume,period);
def vtrend =vtrendi-vtrendi[1];

def vtr = 3 * ExpAverage(vtrend, period)
- 3 * ExpAverage(ExpAverage(vtrend, period), period)
+ ExpAverage(ExpAverage(ExpAverage(vtrend, period), period), period);

def calc1 = If haC > (haC[1]*(1+cutoff/1000)) and (vtr>=
vtr[1] and vtr[1]>vtr[2]) then vc else If haC < (haC[1]*(1-cutoff/1000)) and (vtr >=
vtr[1] and vtr[1]>vtr[2]) then -vc else 0;
def SVAPOBase = Sum(calc1,period)/(vave+1);

plot SVAPO = 3 * ExpAverage(SVAPOBase, period)
- 3 * ExpAverage(ExpAverage(SVAPOBase, period), period)
+ ExpAverage(ExpAverage(ExpAverage(SVAPOBase, period), period), period);
SVAPO.setDefaultColor(color.cyan);


plot upperSDLine = devH*Stdev(SVAPO,stdevper);
upperSDLine.setDefaultColor(color.red);
upperSDLine.setStyle(curve.SHORT_DASH);
plot lowerSDLine = -devL*Stdev(SVAPO,stdevper);
lowerSDLine.setDefaultColor(color.green);
lowerSDLine.setStyle(curve.SHORT_DASH);
plot zero = 0;
zero.setDefaultColor(color.white);


