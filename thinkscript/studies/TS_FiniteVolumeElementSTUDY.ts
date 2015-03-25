# TS_FiniteVolumeElement
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 25 AUG 2009

declare lower;

input FVEPeriod = 22;
input smoothingPeriod = 10;
def intra = log(high)-log(low);
def vintra = stdev(intra, FVEPeriod);
def inter = log(hlc3)-log(hlc3[1]);
def vinter = stdev(inter,FVEPeriod);
def cutoff = 0.1*(vinter+vintra)*close;

def MF = (Close - (High + Low ) / 2 )+ hlc3 - hlc3[1] ;
def VE = if MF>cutoff then volume else if MF < -cutoff then -volume else 0;
def FVE = 100*sum(VE,FVEPeriod)/(average(volume,FVEPeriod)*FVEPeriod);

plot FiniteVolumeElement = FVE;
FiniteVolumeElement.setDefaultColor(color.cyan);

plot SmoothedFVE = Average(FVE,smoothingPeriod)  ;
SmoothedFVE.setDefaultColor(color.blue);

plot zero = 0;
zero.setDefaultColor(color.white);
