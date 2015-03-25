# TS_DTOscillator thinkScript translation by ThinkScripter
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 15 OCT 2009

declare lower;

input RSIPeriod = 13;
input StochasticPeriod=8;
input MAType = {default SMA,EMA};
input KPeriod = 5;
input DPeriod = 3;
input upper = 70;
input lower = 30;

def StoRSI= 100*(( RSIWilder( RSIPeriod) - lowest( RSIWilder( RSIPeriod ) , StochasticPeriod ) ) / ( (
highest( RSIWilder( RSIPeriod) , StochasticPeriod ) ) - lowest(RSIWilder( RSIPeriod ), StochasticPeriod ) )
);

def SK;
def SD;

Switch (MAType){
case SMA:
SK=average(StoRSI,KPeriod);
SD=average(SK,Dperiod);
case EMA:
SK=ExpAverage(StoRSI,KPeriod);
SD=ExpAverage(SK,DPeriod);
}

Plot DTOscSK = SK;
DTOscSK.setDefaultColor(color.blue);
plot DTOscSD = SD;
DTOscSD.setDefaultCOlor(color.gray);
DTOscSD.setStyle(curve.SHORT_DASH);
plot zero = 50;
zero.setDefaultColor(color.white);
plot UpperL = upper;
UpperL.setDefaultColor(color.red);
plot LowerL = lower;
lowerL.setDefaultColor(color.green);