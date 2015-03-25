# VIDYA
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 15 MAR 2009

input sigmaperiod = 10;
input length = 20;

def sigmaConstant = 2/(sigmaperiod+1);
def absCMO = absValue(ChandeMomentumOscillator(length))/100;
rec cV = compoundValue(1, (sigmaConstant*absCMO*close)+(1-(sigmaConstant*absCMO))*cV[1],close);

plot VIDYA =cV;
