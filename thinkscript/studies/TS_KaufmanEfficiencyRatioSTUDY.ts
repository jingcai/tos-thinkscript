# KAUFMANEFFICIENCYRATIO
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 16 MAR 2009

declare lower;

input length = 20;
input lowerERThreshold = -30;
input upperERThreshold = 30;
input movingAvePeriod = 10;

def NetChange = hl2 - hl2[length];

def incrementalTotalChange = AbsValue(hl2 - hl2[1]);
def TotalChange = sum(incrementalTotalChange,length);

def ERatio = (NetChange/TotalChange) * 100;

plot ER = ERatio;
ER.AssignValueColor(if ER >= upperERThreshold
then Color.CYAN else if ER <= lowerERThreshold
then Color.RED else Color.GREEN);
ER.SetLineWeight(2);

plot LowerThreshold = lowerERThreshold;
LowerThreshold.SetDefaultColor(Color.RED);

plot ZeroLine = 0;
ZeroLine.SetDefaultColor(Color.GRAY);

plot UpperThreshold = upperERThreshold;
UpperThreshold.SetDefaultColor(Color.CYAN);

plot ave = average(ERatio,movingAvePeriod);
ave.setDefaultColor(color.blue);
ave.setLineWeight(2);