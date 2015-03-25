# TS_SineWaveCycles
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 17 Apr 2010

input SineWaveLength = 25;

def MesaSW =  MESASineWave(length = SineWaveLength)."Sine Wave";
def MesaLW = MESASineWave(length = SineWaveLength)."Lead Wave";

def trendChangeUp = if(MesaSW < MesaLW and MesaSW[1]>=MesaLW[1], 1, 0);
def trendChangeDown = if(MesaSW > MesaLW and MesaSW[1]<=MesaLW[1], 1, 0);

def thirBarClosed = if !isNan(close[-2]) then 1 else 0;
 
def lowPoint = if !isNan(close[-2]) then min(min(min(min(low[1],low),low[-1]),low[2]),low[-2]) else if !isNan(close[-1]) then min(min(min(low[1],low),low[-1]),low[2]) else min(min(low[1],low),low[2]);

def highPoint = if !isNan(close[-2]) then max(max(max(max(high[1],high),high[-1]),high[2]),high[-2]) else if !isNan(close[-1]) then max(max(max(high[1],high),high[-1]),high[2]) else max(max(high[1],high),high[2]);

rec support = compoundValue(1,if trendChangeUp then lowPoint else if trendChangeDown then double.nan else support[1], high);
rec resistance = compoundValue (1, if trendChangeDown then highPoint else if trendChangeUp then double.nan else resistance[1],low);

plot supportLevel =  support;
supportLevel.setDefaultColor(color.red);
supportLevel.SetStyle(curve.POINTS);
supportLevel.SetLineWeight(3);

plot resistanceLevel =  resistance;
resistanceLevel.setDefaultColor(color.white);
resistanceLevel.SetStyle(curve.POINTS);
resistanceLevel.SetLineWeight(3);
