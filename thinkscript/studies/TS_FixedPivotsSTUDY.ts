# TS_FixedPivots
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 20 APR 2009

input hide_if_percent = 1.0;
input pivot = 800.0;
input r_1 = 810.0;
input r_2 = 820.0;
input r_3 = 830.0;
input s_1 = 790.0;
input s_2 = 780.0;
input s_3 = 770.0;


def deltar1 = AbsValue(close - r_1);
def percentDeltar1 = (deltar1 / close) * 100.0;
plot r1 = if (percentDeltar1 < hide_if_percent, r_1, double.nan);
r1.SetDefaultColor(color.red);

def deltapp = AbsValue(close - pivot);
def percentDeltapp = (deltapp / close) * 100.0;
plot pp = if (percentDeltapp < hide_if_percent, pivot, double.nan);
pp.SetDefaultColor(color.white);

def deltar2 = AbsValue(close - r_2);
def percentDeltar2 = (deltar2 / close) * 100.0;
plot r2 = if (percentDeltar2 < hide_if_percent, r_2, double.nan);
r2.SetDefaultColor(color.red);

def deltar3 = AbsValue(close - r_3);
def percentDeltar3 = (deltar3 / close) * 100.0;
plot r3 = if (percentDeltar3 < hide_if_percent, r_3, double.nan);
r3.SetDefaultColor(color.red);

def deltas1 = AbsValue(close - s_1);
def percentDeltas1 = (deltas1 / close) * 100.0;
plot s1 = if (percentDeltas1 < hide_if_percent, s_1, double.nan);
s1.SetDefaultColor(color.green);

def deltas2 = AbsValue(close - s_2);
def percentDeltas2 = (deltas2 / close) * 100.0;
plot s2 = if (percentDeltas2 < hide_if_percent, s_2, double.nan);
s2.SetDefaultColor(color.green);

def deltas3 = AbsValue(close - s_3);
def percentDeltas3 = (deltas3 / close) * 100.0;
plot s3 = if (percentDeltas3 < hide_if_percent, s_3, double.nan);
s3.SetDefaultColor(color.green);