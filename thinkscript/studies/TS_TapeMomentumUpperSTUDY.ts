# TS_TapeMomentumUpper
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 22 Nov 2010

#hint: For use on tick charts <b>ONLY</b>. 
#hint period: Averaging period.
#hint capMultiplierThreshold: Multiple of standard deviation at which large spikes will be truncated and displayed on the price chart.
   
declare on_volume;
declare real_size;
declare zerobase;

input period = 14;
input capMultiplierThreshold = 5.0;

def isTickChart = if getAggregationPeriod() <= 3200 then 1 else 0;

def timer = secondsTillTime(1615);
def deltaT = absValue(timer[-1]-timer);

def momentum = if isTickChart then volume/deltaT else 0;;
def aveSM = average(momentum,period);
def sdAve = aveSM+2*stdev(momentum, period);
def spikeCap = totalSum(momentum)/barNumber()*capMultiplierThreshold;

def tickMomentum =  min(momentum, spikeCap) ;

plot highCapSpike = if (close[-1] and isTickChart) then if tickMomentum == spikeCap then tickSize() else double.nan else double.nan ;
highCapSpike.setLineWeight(5);
highCapSpike.setDefaultColor(color.magenta);
highCapSpike.setpaintingStrategy(paintingStrategy.LINE_VS_TRIANGLES);

plot tapeMomentum = if (close[-1] and isTickChart) then tickSize() else double.nan ;
tapeMomentum.setStyle(curve.POINTS);
tapeMomentum.setLineWeight(5);
tapeMomentum.assignValueColor(if tickMomentum >=min(spikeCap, sdAve) then color.green else if tickMomentum > aveSM then color.yellow else color.red);

addChartLabel(!isTickChart,"TAPE MOMENTUM ONLY FOR USE ON TICK CHARTS",color.red);
alert(!isNan(highCapSpike[1]), "TapeMomentum Alert", alert.bar, sound.bell);