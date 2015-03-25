# SCALPERBUYSELL
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 04 FEB 2009


def triggerSell = if(if(close[-1] < close,1,0) and (close[-2] < close[-1] or close[-3] <close[-1]),1,0);
def triggerBuy = if(if(close[-1] > close,1,0) and (close[-2] > close[-1] or close[-3] > close[-1]),1,0);

rec buySellSwitch = if(triggerSell, 1, if(triggerBuy, 0, buySellSwitch[1]));
 
def thirdBarClosed = if(isNan(close[-3]),0,1);

plot SBS = if(triggerSell and thirdBarClosed and !buySellSwitch[1], high, if(triggerBuy and thirdBarClosed and buySellSwitch[1], low, double.nan));
SBS.setStyle(curve.POINTS);
SBS.setPaintingStrategy(paintingStrategy.LINE_VS_SQUARES);
SBS.setLineWeight(2);
SBS.setDefaultColor(color.white);

