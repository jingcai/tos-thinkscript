# HACOSHORTENTRY
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 05 APR 2009

declare SHORT_ENTRY;

input avg = 34;
input avgdn = 34;

rec haopen = compoundValue(1, ((open[1] + high[1] + low[1] + close[1]) / 4 + haopen[1]) / 2, hl2);
def haclose = ((open + high + low + close) / 4 + haopen + Max(high, haopen) + Min(low, haopen)) / 4;

def HATMA1 = 3 * ExpAverage(haclose, avg)
- 3 * ExpAverage(ExpAverage(haclose, avg), avg)
+ ExpAverage(ExpAverage(ExpAverage(haclose, avg), avg), avg);

def HATMA2 = 3 * ExpAverage(HATMA1, avg)
- 3 * ExpAverage(ExpAverage(HATMA1, avg), avg)
+ ExpAverage(ExpAverage(ExpAverage(HATMA1, avg), avg), avg);

def HAdifference = HATMA1 - HATMA2;
def ZlHA = HATMA1+HADifference;

def HLTMA1 = 3 * ExpAverage(hl2, avg)
- 3 * ExpAverage(ExpAverage(hl2, avg), avg)
+ ExpAverage(ExpAverage(ExpAverage(hl2, avg), avg), avg);

def HLTMA2 = 3 * ExpAverage(HLTMA1, avg)
- 3 * ExpAverage(ExpAverage(HLTMA1, avg), avg)
+ ExpAverage(ExpAverage(ExpAverage(HLTMA1, avg), avg), avg);

def HLdifference = HLTMA1 - HLTMA2;
def ZlCl = HLTMA1+HLDifference;
def ZlDif = ZlCl-ZlHA;

def keep1 = if (haclose>=haopen and haclose[1]>=haopen[1]) or if(close>=haclose,1,if(high>high[1] or low>low[1],1,0)) then 1 else 0;
def keep2 = if ZlDif>=0 then 1 else 0;
def keeping = if (keep1 or keep2) then 1 else 0;
def keepall = if keeping or (keeping[1] and close>=open or close >=close[1]) then 1 else 0;
def keep3 = if (absValue(close-open)<((high-low)*0.35)) and high>=low[1] then 1 else 0;
def utr = if keepall or (keepall[1] and keep3) then 1 else 0;


def dHATMA1 = 3 * ExpAverage(haclose, avgdn)
- 3 * ExpAverage(ExpAverage(haclose, avgdn), avgdn)
+ ExpAverage(ExpAverage(ExpAverage(haclose, avgdn), avgdn), avgdn);

def dHATMA2 = 3 * ExpAverage(dHATMA1, avgdn)
- 3 * ExpAverage(ExpAverage(dHATMA1, avgdn), avgdn)
+ ExpAverage(ExpAverage(ExpAverage(dHATMA1, avgdn), avgdn), avgdn);

def dHAdifference = dHATMA1 - dHATMA2;
def dZlHA = dHATMA1+dHADifference;

def dHLTMA1 = 3 * ExpAverage(hl2, avgdn)
- 3 * ExpAverage(ExpAverage(hl2, avgdn), avgdn)
+ ExpAverage(ExpAverage(ExpAverage(hl2, avgdn), avgdn), avgdn);

def dHLTMA2 = 3 * ExpAverage(dHLTMA1, avgdn)
- 3 * ExpAverage(ExpAverage(dHLTMA1, avgdn), avgdn)
+ ExpAverage(ExpAverage(ExpAverage(dHLTMA1, avgdn), avgdn), avgdn);

def dHLdifference = dHLTMA1 - dHLTMA2;
def dZlCl = dHLTMA1+dHLdifference;
def dZlDif = dZlCl-dZlHA;

def dkeep1 = if (haclose<haopen and haclose[1]<haopen[1]) then 1 else 0;
def dkeep2 = if dZlDif<0 then 1 else 0;
def dkeep3 = if (absValue(close-open)<((high-low)*0.35)) and low<=high[1] then 1 else 0;
def dkeeping = if (dkeep1 or dkeep2) then 1 else 0;
def dkeepall = if dkeeping or (dkeeping[1] and close<open or close <close[1]) then 1 else 0;
def dtr = if (dkeepall or (dkeepall[1] and dkeep3)==1 , 1 , 0);


def upw = if dtr==0 and dtr[1] and utr then 1 else 0;
def dnw = if utr==0 and utr[1] and dtr then 1 else 0;

addOrder(dnw,open[-1]);
setColor(color.red);
