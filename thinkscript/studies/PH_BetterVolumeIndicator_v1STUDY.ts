# Perfect Hedge's ThinkScript Version of Emini-Watch.com's
# Better Volume Indicator (BVI) Version 25 January 2009
#
# Portions Copyright www.Emini-Watch.com, inc. (c) 2009
# Created/Modified Portions Copyright (c) 2010 by Perfect Hedge
# All rights reserved
#
# Last Modified on 8.22.2010
#______________________________________________________________________________
#****************Emini-Watch.com Change Log: ************************}
#23 November 2007 - Added LowChurn colored volume bars                      }
#28 March 2008 - Added ability to turn on and off different colored bars    }
#28 March 2008 - Got rid of redundant code calculations                     }
#19 April 2008 - Got rid of LowChurn and replaced with ClimaxDown           }
#19 April 2008 - Added open & close conditions with ClimaxUp and ClimaxDown }
#19 April 2008 - Added different calculations for tick/intra-day charts     }
#13 July 2008 - Added 2 bar climax, churn and low volume conditions         }
#4 September 2008 - Changed daily bars calculation to match tick/intra-day  }
#25 January 2009 - Added condition total volume (TotalVol) could not be -ve   }
#______________________________________________________________________________
#
# 08.22.2010 - Created Study / Modified for ThinkScript
# 

declare on_volume;
declare real_size;

input LookBack        = 21;
input AveragePeriod   = 55;
input ShowAverage     = Yes;
input UseTwoBars      = Yes;

# Since uptick and downtick data are not currently available in thinkscript, 
# must allocate volume based on price data, as follows:
#
# If Close > Open, then assume:
#    > Market upticked from Low to High (Upticks = H - L = Range)
#    > Market downticked from Open to Low and from High to Close (Downticks = O - L + H - C = Range + O - C)
#    > Total "Ticks" = Upticks + Downticks = 2 * Range + O - C
#
# Likewise, if Close < Open, then assume:
#    > Market downticked from High to Low (Downticks = H - L = Range)
#    > Market upticked from Open to High and from Low to Close (Downticks = H - O + C - L = Range + C - O)
#    > Total "Ticks" = Upticks + Downticks = 2 * Range + C - O
#
# Finally, if Close = Open, then assume that Upticks = Downticks = Range / 2
#
# Note to self: TradeStation 'BarType' <= 1 refers to tick bars(0) or intraday bars(1), 
#               >1 refers to daily(2), weekly(3), etc.
#

def Range       = High - Low; 

def Upticks;
if (Close == Open or Range == 0)
{
    Upticks = 0.5;
} 
else if (Close > Open and Range <> 0)
{
    Upticks = Range / (2 * Range + Open - Close);
}
else
{
    Upticks = (Range + Close - Open) / (2 * Range + Close - Open);
}

def AskVol                      = Volume * Upticks; # "Ask" Volume
def BidVol                      = Volume - AskVol;   # "Bid" Volume
def TotalVol                    = AbsValue(AskVol + BidVol);    # Total Volume
def AskVol_x_Range              = AskVol * Range;    # "Up" Volume * Price Range
def diff_AskVol_BidVol_x_Range  = (AskVol - BidVol) * Range;  # ("Up" - "Down" Volume) * Price Range
def BidVol_x_Range              = BidVol * Range;    # "Down" Volume * Price Range
def diff_BidVol_AskVol_x_Range  = (BidVol - AskVol) * Range;  # ("Down" - "Up") Volume * Price Range

def Value8      = if Range == 0 then 0 else AskVol / Range;
def Value9      = if Range == 0 then 0 else (AskVol - BidVol) / Range;
def Value10     = if Range == 0 then 0 else BidVol / Range;
def Value11     = if Range == 0 then 0 else (BidVol - AskVol) / Range;
def Value12     = if Range == 0 then 0 else TotalVol / Range;

def nBarHigh    = Highest(High, 2);
def nBarLow     = Lowest(Low, 2);
def nBarRange   = nBarHigh - nBarLow;
def Value13     = if !UseTwoBars then 0 else TotalVol + TotalVol[1];
def Value14     = if !UseTwoBars then 0 else (AskVol + AskVol[1]) * (nBarRange);
def Value15     = if !UseTwoBars then 0 else (AskVol + AskVol[1] - BidVol - BidVol[1]) * (nBarRange);
def Value16     = if !UseTwoBars then 0 else (BidVol + BidVol[1]) * (nBarRange);
def Value17     = if !UseTwoBars then 0 else (BidVol + BidVol[1] - AskVol - AskVol[1]) * (nBarRange);

def Value18     = if !UseTwoBars then 0 else if nBarRange == 0 then 0 else (AskVol + AskVol[1]) / (nBarRange);
def Value19     = if !UseTwoBars then 0 else if nBarRange == 0 then 0 else (AskVol + AskVol[1] - BidVol - BidVol[1]) / (nBarRange);
def Value20     = if !UseTwoBars then 0 else if nBarRange == 0 then 0 else (BidVol + BidVol[1]) / (nBarRange);
def Value21     = if !UseTwoBars then 0 else if nBarRange == 0 then 0 else (BidVol + BidVol[1] - AskVol - AskVol[1]) / (nBarRange);
def Value22     = if !UseTwoBars then 0 else if nBarRange == 0 then 0 else Value13 / (nBarRange);

def Condition1  = TotalVol  == Lowest(TotalVol, Lookback);
def Condition2  = AskVol_x_Range  == Highest(AskVol_x_Range, Lookback) and Close > Open;
def Condition3  = diff_AskVol_BidVol_x_Range  == Highest(diff_AskVol_BidVol_x_Range, Lookback) and Close > Open;
def Condition4  = BidVol_x_Range  == Highest(BidVol_x_Range, Lookback) and Close < Open;
def Condition5  = diff_BidVol_AskVol_x_Range  == Highest(diff_BidVol_AskVol_x_Range, Lookback) and Close < Open;
def Condition6  = Value8  == Lowest(Value8, Lookback) and Close < Open;
def Condition7  = Value9  == Lowest(Value9, Lookback) and Close < Open;
def Condition8  = Value10 == Lowest(Value10, Lookback) and Close > Open;
def Condition9  = Value11 == Lowest(Value11, Lookback) and Close > Open;
def Condition10 = Value12 == Highest(Value12, Lookback);
def Condition11 = !UseTwoBars and Value13 == Lowest(Value13, Lookback);
def Condition12 = !UseTwoBars and Value14 == Highest(Value14, Lookback) and Close > Open and Close[1] > Open[1];
def Condition13 = !UseTwoBars and Value15 == Highest(Value15, Lookback) and Close > Open and Close[1] > Open[1];
def Condition14 = !UseTwoBars and Value16 == Highest(Value16, Lookback) and Close < Open and Close[1] < Open[1];
def Condition15 = !UseTwoBars and Value17 == Highest(Value17, Lookback) and Close < Open and Close[1] < Open[1];
def Condition16 = !UseTwoBars and Value18 == Lowest(Value18, Lookback) and Close < Open and Close[1] < Open[1];
def Condition17 = !UseTwoBars and Value19 == Lowest(Value19, Lookback) and Close < Open and Close[1] < Open[1];
def Condition18 = !UseTwoBars and Value20 == Lowest(Value20, Lookback) and Close > Open and Close[1] > Open[1];
def Condition19 = !UseTwoBars and Value21 == Lowest(Value21, Lookback) and Close > Open and Close[1] > Open[1];
def Condition20 = !UseTwoBars and Value22 == Highest(Value22, Lookback);

# This coding is used for daily, weekly, monthly, etc. bars
def LowVolume   = (Condition1 or Condition11);
def ClimaxUp    = (Condition2 or Condition3 or Condition8 or Condition9 or Condition12 or Condition13 or Condition18 or Condition19);
def ClimaxDown  = (Condition4 or Condition5 or Condition6 or Condition7 or Condition14 or Condition15 or Condition16 or Condition17);
def Churn       = (Condition10 or Condition20);
def ClimaxChurn = (Condition10 or Condition20) and (Condition2 or Condition3 or Condition4 or Condition5 or Condition6 or Condition7 or Condition8 or Condition9 or Condition12 or Condition13 or Condition14 or Condition15 or Condition16 or Condition17 or Condition18 or Condition19);

# This coding is used for tick and intraday bars
#If BarType <= 1 then begin
#If LowVol and (Condition1 or (Condition11 and D=D[1])) then BarColor = LowVolColor;
#If ClimaxUp and (Condition2 or Condition3 or Condition8 or Condition9 or ((Condition12 or Condition13 or #Condition18 or Condition19) and D=D[1])) then BarColor = ClimaxUpColor;
#If ClimaxDown and (Condition4 or Condition5 or Condition6 or Condition7 or ((Condition14 or Condition15 or #Condition16 or Condition17) and D=D[1])) then BarColor = ClimaxDownColor;
#If Churn and (Condition10 or (Condition20 and D=D[1])) then BarColor = ChurnColor;
#If ClimaxChurn and (Condition10 or (Condition20 and D=D[1])) and (Condition2 or Condition3 or Condition4 or Condition5 or Condition6 or Condition7 or Condition8 or Condition9 or ((Condition12 or Condition13 or Condition14 or Condition15 or Condition16 or Condition17 or Condition18 or Condition19) and D=D[1])) then BarColor = ClimaxChurnColor;
#End;

plot Header           = Double.NaN;
Header.SetDefaultColor(color.LIGHT_GRAY);
Header.HideTitle();

plot BetterVolume     = TotalVol;
BetterVolume.SetLineWeight(4);

BetterVolume.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
BetterVolume.SetDefaultColor(color.Blue);
BetterVolume.DefineColor("ClimaxUp", color.RED);
BetterVolume.DefineColor("ClimaxDown", color.WHITE);
BetterVolume.DefineColor("HiVolChurn", color.GREEN);
BetterVolume.DefineColor("HiVolChurn + Climax", color.MAGENTA);
BetterVolume.DefineColor("LowVolume", color.YELLOW);
BetterVolume.DefineColor("Default", color.BLUE);

BetterVolume.AssignValueColor(
if ClimaxChurn then BetterVolume.color("HiVolChurn + Climax") else 
if ClimaxUp    then BetterVolume.color("ClimaxUp") else
if ClimaxDown  then BetterVolume.color("ClimaxDown") else
if Churn       then BetterVolume.color("HiVolChurn") else 
if LowVolume   then BetterVolume.color("LowVolume") else 
BetterVolume.color("Default"));

plot AverageVolume = if ShowAverage then Average(TotalVol, AveragePeriod) else Double.NaN;
AverageVolume.SetDefaultColor(color.RED);

