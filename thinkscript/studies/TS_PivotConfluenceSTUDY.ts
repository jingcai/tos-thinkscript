# TS_PivotConfluence
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# (c) 2009 ThinkScripter.com
# Last Update 27 APR 2009

input confluencePercentage = 0.50;
input showOnlyToday = NO;
input showDaily = YES;

def shouldPlot = if(showOnlyToday and getDay() == getLastDay(), 1, if(!showOnlyToday, 1, 0));

def dH = high(period = "DAY")[1];
def dL = low(period = "DAY")[1];
def dC = close(period = "DAY")[1];

def wH = high(period = "WEEK")[1];
def wL = low(period = "WEEK")[1];
def wC = close(period = "WEEK")[1];

def mH = high(period = "MONTH")[1];
def mL = low(period = "MONTH")[1];
def mC = close(period = "MONTH")[1];

def dPP = (dH + dL + dC) / 3;
def dR1 =  (2 * dPP) - dL;
def dR2 = dPP + dH - dL;
def dR3 = dH + 2 * (dPP - dL);
def dS1 = (2 * dPP) - dH;
def dS2 = dPP - dH + dL;
def dS3 = dL - 2 * (dH - dPP);

def wPP = (wH + wL + wC) / 3;
def wR1 =  (2 * wPP) - wL;
def wR2 = wPP + wH - wL;
def wR3 = wH + 2 * (wPP - wL);
def wS1 = (2 * wPP) - wH;
def wS2 = wPP - wH + wL;
def wS3 = wL - 2 * (wH - wPP);

def mPP = (mH + mL + mC) / 3;
def mR1 =  (2 * mPP) - mL;
def mR2 = mPP + mH - mL;
def mR3 = mH + 2 * (mPP - mL);
def mS1 = (2 * mPP) - mH;
def mS2 = mPP - mH + mL;
def mS3 = mL - 2 * (mH - mPP);

def dppwpp = if AbsValue(dpp - wpp) / dpp * 100 < confluencePercentage then 1 else 0;
def dppwr1 = if AbsValue(dpp - wr1) / dpp * 100 < confluencePercentage then 1 else 0;
def dppwr2 = if AbsValue(dpp - wr2) / dpp * 100 < confluencePercentage then 1 else 0;
def dppwr3 = if AbsValue(dpp - wr3) / dpp * 100 < confluencePercentage then 1 else 0;
def dppws1 = if AbsValue(dpp - ws1) / dpp * 100 < confluencePercentage then 1 else 0;
def dppws2 = if AbsValue(dpp - ws2) / dpp * 100 < confluencePercentage then 1 else 0;
def dppws3 = if AbsValue(dpp - ws3) / dpp * 100 < confluencePercentage then 1 else 0;
def dppmpp = if AbsValue(dpp - mpp) / dpp * 100 < confluencePercentage then 1 else 0;
def dppmr1 = if AbsValue(dpp - mr1) / dpp * 100 < confluencePercentage then 1 else 0;
def dppmr2 = if AbsValue(dpp - mr2) / dpp * 100 < confluencePercentage then 1 else 0;
def dppmr3 = if AbsValue(dpp - mr3) / dpp * 100 < confluencePercentage then 1 else 0;
def dppms1 = if AbsValue(dpp - ms1) / dpp * 100 < confluencePercentage then 1 else 0;
def dppms2 = if AbsValue(dpp - ms2) / dpp * 100 < confluencePercentage then 1 else 0;
def dppms3 = if AbsValue(dpp - ms3) / dpp * 100 < confluencePercentage then 1 else 0;


def dr1wpp = if AbsValue(dr1 - wpp) / dr1 * 100 < confluencePercentage then 1 else 0;
def dr1wr1 = if AbsValue(dr1 - wr1) / dr1 * 100 < confluencePercentage then 1 else 0;
def dr1wr2 = if AbsValue(dr1 - wr2) / dr1 * 100 < confluencePercentage then 1 else 0;
def dr1wr3 = if AbsValue(dr1 - wr3) / dr1 * 100 < confluencePercentage then 1 else 0;
def dr1ws1 = if AbsValue(dr1 - ws1) / dr1 * 100 < confluencePercentage then 1 else 0;
def dr1ws2 = if AbsValue(dr1 - ws2) / dr1 * 100 < confluencePercentage then 1 else 0;
def dr1ws3 = if AbsValue(dr1 - ws3) / dr1 * 100 < confluencePercentage then 1 else 0;
def dr1mpp = if AbsValue(dr1 - mpp) / dr1 * 100 < confluencePercentage then 1 else 0;
def dr1mr1 = if AbsValue(dr1 - mr1) / dr1 * 100 < confluencePercentage then 1 else 0;
def dr1mr2 = if AbsValue(dr1 - mr2) / dr1 * 100 < confluencePercentage then 1 else 0;
def dr1mr3 = if AbsValue(dr1 - mr3) / dr1 * 100 < confluencePercentage then 1 else 0;
def dr1ms1 = if AbsValue(dr1 - ms1) / dr1 * 100 < confluencePercentage then 1 else 0;
def dr1ms2 = if AbsValue(dr1 - ms2) / dr1 * 100 < confluencePercentage then 1 else 0;
def dr1ms3 = if AbsValue(dr1 - ms3) / dr1 * 100 < confluencePercentage then 1 else 0;

def dr2wpp = if AbsValue(dr2 - wpp) / dr2 * 100 < confluencePercentage then 1 else 0;
def dr2wr1 = if AbsValue(dr2 - wr1) / dr2 * 100 < confluencePercentage then 1 else 0;
def dr2wr2 = if AbsValue(dr2 - wr2) / dr2 * 100 < confluencePercentage then 1 else 0;
def dr2wr3 = if AbsValue(dr2 - wr3) / dr2 * 100 < confluencePercentage then 1 else 0;
def dr2ws1 = if AbsValue(dr2 - ws1) / dr2 * 100 < confluencePercentage then 1 else 0;
def dr2ws2 = if AbsValue(dr2 - ws2) / dr2 * 100 < confluencePercentage then 1 else 0;
def dr2ws3 = if AbsValue(dr2 - ws3) / dr2 * 100 < confluencePercentage then 1 else 0;
def dr2mpp = if AbsValue(dr2 - mpp) / dr2 * 100 < confluencePercentage then 1 else 0;
def dr2mr1 = if AbsValue(dr2 - mr1) / dr2 * 100 < confluencePercentage then 1 else 0;
def dr2mr2 = if AbsValue(dr2 - mr2) / dr2 * 100 < confluencePercentage then 1 else 0;
def dr2mr3 = if AbsValue(dr2 - mr3) / dr2 * 100 < confluencePercentage then 1 else 0;
def dr2ms1 = if AbsValue(dr2 - ms1) / dr2 * 100 < confluencePercentage then 1 else 0;
def dr2ms2 = if AbsValue(dr2 - ms2) / dr2 * 100 < confluencePercentage then 1 else 0;
def dr2ms3 = if AbsValue(dr2 - ms3) / dr2 * 100 < confluencePercentage then 1 else 0;

def dr3wpp = if AbsValue(dr3 - wpp) / dr3 * 100 < confluencePercentage then 1 else 0;
def dr3wr1 = if AbsValue(dr3 - wr1) / dr3 * 100 < confluencePercentage then 1 else 0;
def dr3wr2 = if AbsValue(dr3 - wr2) / dr3 * 100 < confluencePercentage then 1 else 0;
def dr3wr3 = if AbsValue(dr3 - wr3) / dr3 * 100 < confluencePercentage then 1 else 0;
def dr3ws1 = if AbsValue(dr3 - ws1) / dr3 * 100 < confluencePercentage then 1 else 0;
def dr3ws2 = if AbsValue(dr3 - ws2) / dr3 * 100 < confluencePercentage then 1 else 0;
def dr3ws3 = if AbsValue(dr3 - ws3) / dr3 * 100 < confluencePercentage then 1 else 0;
def dr3mpp = if AbsValue(dr3 - mpp) / dr3 * 100 < confluencePercentage then 1 else 0;
def dr3mr1 = if AbsValue(dr3 - mr1) / dr3 * 100 < confluencePercentage then 1 else 0;
def dr3mr2 = if AbsValue(dr3 - mr2) / dr3 * 100 < confluencePercentage then 1 else 0;
def dr3mr3 = if AbsValue(dr3 - mr3) / dr3 * 100 < confluencePercentage then 1 else 0;
def dr3ms1 = if AbsValue(dr3 - ms1) / dr3 * 100 < confluencePercentage then 1 else 0;
def dr3ms2 = if AbsValue(dr3 - ms2) / dr3 * 100 < confluencePercentage then 1 else 0;
def dr3ms3 = if AbsValue(dr3 - ms3) / dr3 * 100 < confluencePercentage then 1 else 0;

def ds1wpp = if AbsValue(ds1 - wpp) / ds1 * 100 < confluencePercentage then 1 else 0;
def ds1wr1 = if AbsValue(ds1 - wr1) / ds1 * 100 < confluencePercentage then 1 else 0;
def ds1wr2 = if AbsValue(ds1 - wr2) / ds1 * 100 < confluencePercentage then 1 else 0;
def ds1wr3 = if AbsValue(ds1 - wr3) / ds1 * 100 < confluencePercentage then 1 else 0;
def ds1ws1 = if AbsValue(ds1 - ws1) / ds1 * 100 < confluencePercentage then 1 else 0;
def ds1ws2 = if AbsValue(ds1 - ws2) / ds1 * 100 < confluencePercentage then 1 else 0;
def ds1ws3 = if AbsValue(ds1 - ws3) / ds1 * 100 < confluencePercentage then 1 else 0;
def ds1mpp = if AbsValue(ds1 - mpp) / ds1 * 100 < confluencePercentage then 1 else 0;
def ds1mr1 = if AbsValue(ds1 - mr1) / ds1 * 100 < confluencePercentage then 1 else 0;
def ds1mr2 = if AbsValue(ds1 - mr2) / ds1 * 100 < confluencePercentage then 1 else 0;
def ds1mr3 = if AbsValue(ds1 - mr3) / ds1 * 100 < confluencePercentage then 1 else 0;
def ds1ms1 = if AbsValue(ds1 - ms1) / ds1 * 100 < confluencePercentage then 1 else 0;
def ds1ms2 = if AbsValue(ds1 - ms2) / ds1 * 100 < confluencePercentage then 1 else 0;
def ds1ms3 = if AbsValue(ds1 - ms3) / ds1 * 100 < confluencePercentage then 1 else 0;

def ds2wpp = if AbsValue(ds2 - wpp) / ds2 * 100 < confluencePercentage then 1 else 0;
def ds2wr1 = if AbsValue(ds2 - wr1) / ds2 * 100 < confluencePercentage then 1 else 0;
def ds2wr2 = if AbsValue(ds2 - wr2) / ds2 * 100 < confluencePercentage then 1 else 0;
def ds2wr3 = if AbsValue(ds2 - wr3) / ds2 * 100 < confluencePercentage then 1 else 0;
def ds2ws1 = if AbsValue(ds2 - ws1) / ds2 * 100 < confluencePercentage then 1 else 0;
def ds2ws2 = if AbsValue(ds2 - ws2) / ds2 * 100 < confluencePercentage then 1 else 0;
def ds2ws3 = if AbsValue(ds2 - ws3) / ds2 * 100 < confluencePercentage then 1 else 0;
def ds2mpp = if AbsValue(ds2 - mpp) / ds2 * 100 < confluencePercentage then 1 else 0;
def ds2mr1 = if AbsValue(ds2 - mr1) / ds2 * 100 < confluencePercentage then 1 else 0;
def ds2mr2 = if AbsValue(ds2 - mr2) / ds2 * 100 < confluencePercentage then 1 else 0;
def ds2mr3 = if AbsValue(ds2 - mr3) / ds2 * 100 < confluencePercentage then 1 else 0;
def ds2ms1 = if AbsValue(ds2 - ms1) / ds2 * 100 < confluencePercentage then 1 else 0;
def ds2ms2 = if AbsValue(ds2 - ms2) / ds2 * 100 < confluencePercentage then 1 else 0;
def ds2ms3 = if AbsValue(ds2 - ms3) / ds2 * 100 < confluencePercentage then 1 else 0;

def ds3wpp = if AbsValue(ds3 - wpp) / ds3 * 100 < confluencePercentage then 1 else 0;
def ds3wr1 = if AbsValue(ds3 - wr1) / ds3 * 100 < confluencePercentage then 1 else 0;
def ds3wr2 = if AbsValue(ds3 - wr2) / ds3 * 100 < confluencePercentage then 1 else 0;
def ds3wr3 = if AbsValue(ds3 - wr3) / ds3 * 100 < confluencePercentage then 1 else 0;
def ds3ws1 = if AbsValue(ds3 - ws1) / ds3 * 100 < confluencePercentage then 1 else 0;
def ds3ws2 = if AbsValue(ds3 - ws2) / ds3 * 100 < confluencePercentage then 1 else 0;
def ds3ws3 = if AbsValue(ds3 - ws3) / ds3 * 100 < confluencePercentage then 1 else 0;
def ds3mpp = if AbsValue(ds3 - mpp) / ds3 * 100 < confluencePercentage then 1 else 0;
def ds3mr1 = if AbsValue(ds3 - mr1) / ds3 * 100 < confluencePercentage then 1 else 0;
def ds3mr2 = if AbsValue(ds3 - mr2) / ds3 * 100 < confluencePercentage then 1 else 0;
def ds3mr3 = if AbsValue(ds3 - mr3) / ds3 * 100 < confluencePercentage then 1 else 0;
def ds3ms1 = if AbsValue(ds3 - ms1) / ds3 * 100 < confluencePercentage then 1 else 0;
def ds3ms2 = if AbsValue(ds3 - ms2) / ds3 * 100 < confluencePercentage then 1 else 0;
def ds3ms3 = if AbsValue(ds3 - ms3) / ds3 * 100 < confluencePercentage then 1 else 0;

def wppmpp = if AbsValue(wpp - mpp) / wpp * 100 < confluencePercentage then 1 else 0;
def wppmr1 = if AbsValue(wpp - mr1) / wpp * 100 < confluencePercentage then 1 else 0;
def wppmr2 = if AbsValue(wpp - mr2) / wpp * 100 < confluencePercentage then 1 else 0;
def wppmr3 = if AbsValue(wpp - mr3) / wpp * 100 < confluencePercentage then 1 else 0;
def wppms1 = if AbsValue(wpp - ms1) / wpp * 100 < confluencePercentage then 1 else 0;
def wppms2 = if AbsValue(wpp - ms2) / wpp * 100 < confluencePercentage then 1 else 0;
def wppms3 = if AbsValue(wpp - ms3) / wpp * 100 < confluencePercentage then 1 else 0;

def wr1mpp = if AbsValue(wr1 - mpp) / wr1 * 100 < confluencePercentage then 1 else 0;
def wr1mr1 = if AbsValue(wr1 - mr1) / wr1 * 100 < confluencePercentage then 1 else 0;
def wr1mr2 = if AbsValue(wr1 - mr2) / wr1 * 100 < confluencePercentage then 1 else 0;
def wr1mr3 = if AbsValue(wr1 - mr3) / wr1 * 100 < confluencePercentage then 1 else 0;
def wr1ms1 = if AbsValue(wr1 - ms1) / wr1 * 100 < confluencePercentage then 1 else 0;
def wr1ms2 = if AbsValue(wr1 - ms2) / wr1 * 100 < confluencePercentage then 1 else 0;
def wr1ms3 = if AbsValue(wr1 - ms3) / wr1 * 100 < confluencePercentage then 1 else 0;

def wr2mpp = if AbsValue(wr2 - mpp) / wr2 * 100 < confluencePercentage then 1 else 0;
def wr2mr1 = if AbsValue(wr2 - mr1) / wr2 * 100 < confluencePercentage then 1 else 0;
def wr2mr2 = if AbsValue(wr2 - mr2) / wr2 * 100 < confluencePercentage then 1 else 0;
def wr2mr3 = if AbsValue(wr2 - mr3) / wr2 * 100 < confluencePercentage then 1 else 0;
def wr2ms1 = if AbsValue(wr2 - ms1) / wr2 * 100 < confluencePercentage then 1 else 0;
def wr2ms2 = if AbsValue(wr2 - ms2) / wr2 * 100 < confluencePercentage then 1 else 0;
def wr2ms3 = if AbsValue(wr2 - ms3) / wr2 * 100 < confluencePercentage then 1 else 0;

def wr3mpp = if AbsValue(wr3 - mpp) / wr3 * 100 < confluencePercentage then 1 else 0;
def wr3mr1 = if AbsValue(wr3 - mr1) / wr3 * 100 < confluencePercentage then 1 else 0;
def wr3mr2 = if AbsValue(wr3 - mr2) / wr3 * 100 < confluencePercentage then 1 else 0;
def wr3mr3 = if AbsValue(wr3 - mr3) / wr3 * 100 < confluencePercentage then 1 else 0;
def wr3ms1 = if AbsValue(wr3 - ms1) / wr3 * 100 < confluencePercentage then 1 else 0;
def wr3ms2 = if AbsValue(wr3 - ms2) / wr3 * 100 < confluencePercentage then 1 else 0;
def wr3ms3 = if AbsValue(wr3 - ms3) / wr3 * 100 < confluencePercentage then 1 else 0;

def ws1mpp = if AbsValue(ws1 - mpp) / ws1 * 100 < confluencePercentage then 1 else 0;
def ws1mr1 = if AbsValue(ws1 - mr1) / ws1 * 100 < confluencePercentage then 1 else 0;
def ws1mr2 = if AbsValue(ws1 - mr2) / ws1 * 100 < confluencePercentage then 1 else 0;
def ws1mr3 = if AbsValue(ws1 - mr3) / ws1 * 100 < confluencePercentage then 1 else 0;
def ws1ms1 = if AbsValue(ws1 - ms1) / ws1 * 100 < confluencePercentage then 1 else 0;
def ws1ms2 = if AbsValue(ws1 - ms2) / ws1 * 100 < confluencePercentage then 1 else 0;
def ws1ms3 = if AbsValue(ws1 - ms3) / ws1 * 100 < confluencePercentage then 1 else 0;

def ws2mpp = if AbsValue(ws2 - mpp) / ws2 * 100 < confluencePercentage then 1 else 0;
def ws2mr1 = if AbsValue(ws2 - mr1) / ws2 * 100 < confluencePercentage then 1 else 0;
def ws2mr2 = if AbsValue(ws2 - mr2) / ws2 * 100 < confluencePercentage then 1 else 0;
def ws2mr3 = if AbsValue(ws2 - mr3) / ws2 * 100 < confluencePercentage then 1 else 0;
def ws2ms1 = if AbsValue(ws2 - ms1) / ws2 * 100 < confluencePercentage then 1 else 0;
def ws2ms2 = if AbsValue(ws2 - ms2) / ws2 * 100 < confluencePercentage then 1 else 0;
def ws2ms3 = if AbsValue(ws2 - ms3) / ws2 * 100 < confluencePercentage then 1 else 0;

def ws3mpp = if AbsValue(ws3 - mpp) / ws3 * 100 < confluencePercentage then 1 else 0;
def ws3mr1 = if AbsValue(ws3 - mr1) / ws3 * 100 < confluencePercentage then 1 else 0;
def ws3mr2 = if AbsValue(ws3 - mr2) / ws3 * 100 < confluencePercentage then 1 else 0;
def ws3mr3 = if AbsValue(ws3 - mr3) / ws3 * 100 < confluencePercentage then 1 else 0;
def ws3ms1 = if AbsValue(ws3 - ms1) / ws3 * 100 < confluencePercentage then 1 else 0;
def ws3ms2 = if AbsValue(ws3 - ms2) / ws3 * 100 < confluencePercentage then 1 else 0;
def ws3ms3 = if AbsValue(ws3 - ms3) / ws3 * 100 < confluencePercentage then 1 else 0;

def plotDPP = if dppwpp or dppwr1 or dppwr2 or dppwr3 or dppws1 or dppws2 or dppws3 
or dppmpp or dppmr1 or dppmr2 or dppmr3 or dppms1 or dppms2 or dppms3 
then 1 else 0;
plot dailyPivot = if plotdpp and shouldPlot and showDaily then dpp else double.nan;
dailyPivot.SetDefaultColor(color.white);

def plotDR1 = if dr1wpp or dr1wr1 or dr1wr2 or dr1wr3 or dr1ws1 or dr1ws2 or dr1ws3 
or dr1mpp or dr1mr1 or dr1mr2 or dr1mr3 or dr1ms1 or dr1ms2 or dr1ms3 
then 1 else 0;
plot dailyR1 = if plotDR1 and shouldPlot and showDaily  then dR1 else double.nan;
dailyR1.SetDefaultColor(color.red);

def plotDR2 = if dr2wpp or dr2wr1 or dr2wr2 or dr2wr3 or dr2ws1 or dr2ws2 or dr2ws3 
or dr2mpp or dr2mr1 or dr2mr2 or dr2mr3 or dr2ms1 or dr2ms2 or dr2ms3 
then 1 else 0;
plot dailyR2 = if plotDR2 and shouldPlot and showDaily then dR2 else double.nan;
dailyR2.SetDefaultColor(color.red);

def plotDR3 = if dr3wpp or dr3wr1 or dr3wr2 or dr3wr3 or dr3ws1 or dr3ws2 or dr3ws3 
or dr3mpp or dr3mr1 or dr3mr2 or dr3mr3 or dr3ms1 or dr3ms2 or dr3ms3 
then 1 else 0;
plot dailyR3 = if plotDR3 and shouldPlot and showDaily  then dR3 else double.nan;
dailyR3.SetDefaultColor(color.red);

def plotDS1 = if ds1wpp or ds1wr1 or ds1wr2 or ds1wr3 or ds1ws1 or ds1ws2 or ds1ws3 
or ds1mpp or ds1mr1 or ds1mr2 or ds1mr3 or ds1ms1 or ds1ms2 or ds1ms3 
then 1 else 0;
plot dailyS1 = if plotDS1 and shouldPlot and showDaily then dS1 else double.nan;
dailyS1.SetDefaultColor(color.green);

def plotDS2 = if ds2wpp or ds2wr1 or ds2wr2 or ds2wr3 or ds2ws1 or ds2ws2 or ds2ws3 
or ds2mpp or ds2mr1 or ds2mr2 or ds2mr3 or ds2ms1 or ds2ms2 or ds2ms3 
then 1 else 0;
plot dailyS2 = if plotDS2 and shouldPlot and showDaily then dS2 else double.nan;
dailyS2.SetDefaultColor(color.green);

def plotDS3 = if ds3wpp or ds3wr1 or ds3wr2 or ds3wr3 or ds3ws1 or ds3ws2 or ds3ws3 
or ds3mpp or ds3mr1 or ds3mr2 or ds3mr3 or ds3ms1 or ds3ms2 or ds3ms3 
then 1 else 0;
plot dailyS3 = if plotDS3 and shouldPlot and showDaily then dS3 else double.nan;
dailyS3.SetDefaultColor(color.green);

def plotWPP = if wppmpp or wppmr1 or wppmr2 or wppmr3 or wppms1 or wppms2 or wppms3 
or dppwpp or dr1wpp or dr2wpp or dr3wpp or ds1wpp or ds2wpp or ds3wpp
then 1 else 0;
plot weeklyPivot = if plotwpp and shouldPlot  then wpp else double.nan;
weeklyPivot.SetDefaultColor(color.white);

def plotWR1 = if wr1mpp or wr1mr1 or wr1mr2 or wr1mr3 or wr1ms1 or wr1ms2 or wr1ms3 
or dppwr1 or dr1wr1 or dr2wr1 or dr3wr1 or ds1wr1 or ds2wr1 or ds3wr1
then 1 else 0;
plot weeklyR1 = if plotWR1 and shouldPlot  then wR1 else double.nan;
weeklyR1.SetDefaultColor(color.red);

def plotWR2 = if wr2mpp or wr2mr1 or wr2mr2 or wr2mr3 or wr2ms1 or wr2ms2 or wr2ms3 
or dppwr2 or dr1wr2 or dr2wr2 or dr3wr2 or ds1wr2 or ds2wr2 or ds3wr2
then 1 else 0;
plot weeklyR2 = if plotWR2 and shouldPlot  then wR2 else double.nan;
weeklyR2.SetDefaultColor(color.red);

def plotWR3 = if wr3mpp or wr3mr1 or wr3mr2 or wr3mr3 or wr3ms1 or wr3ms2 or wr3ms3 
or dppwr3 or dr1wr3 or dr2wr3 or dr3wr3 or ds1wr3 or ds2wr3 or ds3wr3
then 1 else 0;
plot weeklyR3 = if plotWR3 and shouldPlot  then wR3 else double.nan;
weeklyR3.SetDefaultColor(color.red);

def plotWS1 = if ws1mpp or ws1mr1 or ws1mr2 or ws1mr3 or ws1ms1 or ws1ms2 or ws1ms3
or dppws1 or dr1ws1 or dr2ws1 or dr3ws1 or ds1ws1 or ds2ws1 or ds3ws1 
then 1 else 0;
plot weeklyS1 = if plotWS1 and shouldPlot  then wS1 else double.nan;
weeklyS1.SetDefaultColor(color.green);

def plotWS2 = if ws2mpp or ws2mr1 or ws2mr2 or ws2mr3 or ws2ms1 or ws2ms2 or ws2ms3
or dppws2 or dr1ws2 or dr2ws2 or dr3ws2 or ds1ws2 or ds2ws2 or ds3ws2  
then 1 else 0;
plot weeklyS2 = if plotWS2 and shouldPlot  then wS2 else double.nan;
weeklyS2.SetDefaultColor(color.green);

def plotWS3 = if ws3mpp or ws3mr1 or ws3mr2 or ws3mr3 or ws3ms1 or ws3ms2 or ws3ms3
or dppws3 or dr1ws3 or dr2ws3 or dr3ws3 or ds1ws3 or ds2ws3 or ds3ws3  
then 1 else 0;
plot weeklyS3 = if plotWS3 and shouldPlot  then wS3 else double.nan;
weeklyS3.SetDefaultColor(color.green);

def plotMPP = if dppmpp or dr1mpp or dr2mpp or dr3mpp or ds1mpp or ds2mpp or ds3mpp 
or wppmpp or wr1mpp or wr2mpp or wr3mpp or ws1mpp or ws2mpp or ws3mpp 
then 1 else 0;
plot monthlyPivot = if plotmpp and shouldPlot  then mpp else double.nan;
monthlyPivot.SetDefaultColor(color.white);

def plotMR1 = if dppmr1 or dr1mr1 or dr2mr1 or dr3mr1 or ds1mr1 or ds2mr1 or ds3mr1 
or wppmr1 or wr1mr1 or wr2mr1 or wr3mr1 or ws1mr1 or ws2mr1 or ws3mr1 
then 1 else 0;
plot monthlyR1 = if plotMR1 and shouldPlot  then mR1 else double.nan;
monthlyR1.SetDefaultColor(color.red);

def plotMR2 = if dppmr2 or dr1mr2 or dr2mr2 or dr3mr2 or ds1mr2 or ds2mr2 or ds3mr2 
or wppmr2 or wr1mr2 or wr2mr2 or wr3mr2 or ws1mr2 or ws2mr2 or ws3mr2 
then 1 else 0;
plot monthlyR2 = if plotMR2 and shouldPlot  then mR2 else double.nan;
monthlyR2.SetDefaultColor(color.red);

def plotMR3 = if dppmr3 or dr1mr3 or dr2mr3 or dr3mr3 or ds1mr3 or ds2mr3 or ds3mr3 
or wppmr3 or wr1mr3 or wr2mr3 or wr3mr3 or ws1mr3 or ws2mr3 or ws3mr3 
then 1 else 0;
plot monthlyR3 = if plotMR3 and shouldPlot  then mR3 else double.nan;
monthlyR3.SetDefaultColor(color.red);

def plotMS1 = if dppms1 or dr1ms1 or dr2ms1 or dr3ms1 or ds1ms1 or ds2ms1 or ds3ms1 
or wppms1 or wr1ms1 or wr2ms1 or wr3ms1 or ws1ms1 or ws2ms1 or ws3ms1 
then 1 else 0;
plot monthlyS1 = if plotMS1 and shouldPlot  then mS1 else double.nan;
monthlyS1.SetDefaultColor(color.green);

def plotMS2 = if dppms2 or dr1ms2 or dr2ms2 or dr3ms2 or ds1ms2 or ds2ms2 or ds3ms2 
or wppms2 or wr1ms2 or wr2ms2 or wr3ms2 or ws1ms2 or ws2ms2 or ws3ms2 
then 1 else 0;
plot monthlyS2 = if plotMS2 and shouldPlot  then mS2 else double.nan;
monthlyS2.SetDefaultColor(color.green);

def plotMS3 = if dppms3 or dr1ms3 or dr2ms3 or dr3ms3 or ds1ms3 or ds2ms3 or ds3ms3 
or wppms3 or wr1ms3 or wr2ms3 or wr3ms3 or ws1ms3 or ws2ms3 or ws3ms3 
then 1 else 0;
plot monthlyS3 = if plotMS3 and shouldPlot  then mS3 else double.nan;
monthlyS3.SetDefaultColor(color.green);



dailyPivot.SetStyle(curve.points);
dailyR1.SetStyle(curve.points);
dailyR2.SetStyle(curve.points);
dailyR3.SetStyle(curve.points);
dailyS1.SetStyle(curve.points);
dailyS2.SetStyle(curve.points);
dailyS3.SetStyle(curve.points);

weeklyPivot.SetStyle(curve.points);
weeklyR1.SetStyle(curve.points);
weeklyR2.SetStyle(curve.points);
weeklyR3.SetStyle(curve.points);
weeklyS1.SetStyle(curve.points);
weeklyS2.SetStyle(curve.points);
weeklyS3.SetStyle(curve.points);

monthlyPivot.SetStyle(curve.points);
monthlyR1.SetStyle(curve.points);
monthlyR2.SetStyle(curve.points);
monthlyR3.SetStyle(curve.points);
monthlyS1.SetStyle(curve.points);
monthlyS2.SetStyle(curve.points);
monthlyS3.SetStyle(curve.points);