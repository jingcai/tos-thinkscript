input showOnlyToday = YES;

def day = getDay();
def lastDay = getLastDay();
def isToday = if(day == lastDay, 1, 0);
def shouldPlot = if(showOnlyToday and isToday, 1, if(!showOnlyToday, 1, 0));

def pp = pivotPoints()."PP";
def r1 = pivotPoints()."R1";
def r2 = pivotPoints()."R2";
def r3 = pivotPoints()."R3";
def s1 = pivotPoints()."S1";
def s2 = pivotPoints()."S2";
def s3 = pivotPoints()."S3";


plot PR1M = if(shouldPlot, pp + ((r1 - pp) / 2), double.nan);
PR1M.SetStyle(curve.POINTS);
PR1M.SetDefaultColor(color.darK_GRAY);
PR1M.SetLineWeight(1);

plot R1R2M =  if(shouldPlot, r1 + ((r2 - r1) / 2), double.nan);
R1R2M.SetStyle(curve.POINTS);
R1R2M.SetDefaultColor(color.darK_GRAY);
R1R2M.SetLineWeight(1);

plot R2R3M =  if(shouldPlot, r2 + ((r3 - r2) / 2), double.nan);
R2R3M.SetStyle(curve.POINTS);
R2R3M.SetDefaultColor(color.darK_GRAY);
R2R3M.SetLineWeight(1);

plot PS1M =  if(shouldPlot, s1 + ((pp - s1) / 2), double.nan);
PS1M.SetStyle(curve.POINTS);
PS1M.SetDefaultColor(color.darK_GRAY);
PS1M.SetLineWeight(1);

plot S1S2M =  if(shouldPlot, s2 + ((s1 - s2) / 2), double.nan);
S1S2M.SetStyle(curve.POINTS);
S1S2M.SetDefaultColor(color.darK_GRAY);
S1S2M.SetLineWeight(1);

plot S2S3M =  if(shouldPlot, s3 + ((s2 - s3) / 2), double.nan);
S2S3M.SetStyle(curve.POINTS);
S2S3M.SetDefaultColor(color.darK_GRAY);
S2S3M.SetLineWeight(1);